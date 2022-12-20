class ParametersScene extends Phaser.Scene {
    constructor() {
        super('ParametersScene');
        this.rRiseRate = 1;
        this.rDropRate = 100;
    }

    preload() {
    }

    create() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });

        var text1 = this.add.text(20, 15, "climb rate", { fontFamily: "Arial", fontSize: "30px" }); this.formUtil.showElement("r_bar_up_rate");
        this.formUtil.scaleToGameW("r_bar_up_rate", .1);
        this.formUtil.placeElementAt(3, 'r_bar_up_rate', true);

        var text2 = this.add.text(20, 70, "drop rate", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_down_rate");
        this.formUtil.scaleToGameW("r_bar_down_rate", .1);
        this.formUtil.placeElementAt(14, 'r_bar_down_rate', true);

        // Save button
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        var text1 = this.add.text(20, 15, "Save", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 400, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerdown', function () {
            this.saveValues();
        }, this);

        // Menu button
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x70ad47, 1);
        roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        var text2 = this.add.text(20, 15, "Return", { fontFamily: "Arial", fontSize: "30px" });
        this.container2 = this.add.container(300, 500, [roundedRect2, text2]);
        this.container2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container2.on('pointerdown', function () {
            this.scene.start("MenuScene", { r_bar_up_rate: this.rRiseRate, r_bar_down_rate: this.rDropRate });
        }, this);
    }

    saveValues() {
        this.rRiseRate = this.formUtil.getTextAreaValue("r_bar_up_rate");
        this.rDropRate = this.formUtil.getTextAreaValue("r_bar_down_rate");
    }
}