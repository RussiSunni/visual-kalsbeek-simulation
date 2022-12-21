class ParametersScene extends Phaser.Scene {
    constructor() {
        super('ParametersScene');
        this.rRiseRate = 1;
        this.rDropRate = 8;
        this.rPenaltyRate = 0;
    }

    preload() {
    }

    create() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });

        this.formUtil.showElement("r_bar_up_rate");
        this.formUtil.showElement("r_bar_down_rate");
        this.formUtil.showElement("r_bar_penalty_rate");

        var rTitle = this.add.text(50, 25, "Right Side", { fontFamily: "Arial", fontSize: "48px", color: '#FFFFFF' });
        var lTitle = this.add.text(450, 25, "Left Side", { fontFamily: "Arial", fontSize: "48px", color: '#FFFFFF' });

        var text1 = this.add.text(450, 120, "climb rate", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_up_rate");
        this.formUtil.scaleToGameW("r_bar_up_rate", .1);
        this.formUtil.placeElementAt(31, 'r_bar_up_rate', true);

        var text2 = this.add.text(450, 175, "drop rate", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_down_rate");
        this.formUtil.scaleToGameW("r_bar_down_rate", .1);
        this.formUtil.placeElementAt(42, 'r_bar_down_rate', true);

        var text3 = this.add.text(450, 230, "penalty", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_penalty_rate");
        this.formUtil.scaleToGameW("r_bar_penalty_rate", .1);
        this.formUtil.placeElementAt(53, 'r_bar_penalty_rate', true);


        // Save button
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        var text1 = this.add.text(20, 15, "Save", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 400, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerover', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x5d913a, 1);
            roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container1.on('pointerout', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x70ad47, 1);
            roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
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
        this.container2.on('pointerover', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x5d913a, 1);
            roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container2.on('pointerout', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x70ad47, 1);
            roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container2.on('pointerdown', function () {
            this.scene.start("MenuScene", { r_bar_up_rate: this.rRiseRate, r_bar_down_rate: this.rDropRate, r_bar_penalty_rate: this.rPenaltyRate });
        }, this);
    }

    saveValues() {
        this.rRiseRate = this.formUtil.getTextAreaValue("r_bar_up_rate");
        this.rDropRate = this.formUtil.getTextAreaValue("r_bar_down_rate");
        this.rPenaltyRate = this.formUtil.getTextAreaValue("r_bar_penalty_rate");
    }
}