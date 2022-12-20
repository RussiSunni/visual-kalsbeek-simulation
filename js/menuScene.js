class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.rRiseRate = 1;
        this.rDropRate = 100;
    }
    init(data) {
        console.log(data);
        if (data
            && Object.keys(data).length === 0
            && Object.getPrototypeOf(data) === Object.prototype) {
        }
        else {
            this.rRiseRate = data.r_bar_down_rate;
            this.rDropRate = data.r_bar_up_rate;
        }

        console.log(this.rRiseRate);
        console.log(this.rDropRate);
    }

    preload() {

    }
    create() {
        // Menu button
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        var text1 = this.add.text(20, 15, "Parameters", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 400, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerover', function () {
        }, this);
        this.container1.on('pointerout', function () {
        }, this);
        this.container1.on('pointerdown', function () {
            this.scene.start("ParametersScene");
        }, this);

        // Left Task button
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x70ad47, 1);
        roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        var text2 = this.add.text(20, 15, "Left Task", { fontFamily: "Arial", fontSize: "30px" });
        this.container2 = this.add.container(100, 200, [roundedRect2, text2]);
        this.container2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container2.on('pointerover', function () {
        }, this);
        this.container2.on('pointerout', function () {
        }, this);
        this.container2.on('pointerdown', function () {
            console.log("pressed")
        }, this);


        // Right Task button
        var roundedRect3 = this.add.graphics();
        roundedRect3.fillStyle(0x70ad47, 1);
        roundedRect3.fillRoundedRect(0, 0, 200, 60, 8);
        var text3 = this.add.text(20, 15, "Right Task", { fontFamily: "Arial", fontSize: "30px" });
        this.container3 = this.add.container(500, 200, [roundedRect3, text3]);
        this.container3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container3.on('pointerover', function () {
        }, this);
        this.container3.on('pointerout', function () {
        }, this);
        this.container3.on('pointerdown', function () {
            this.scene.start("RightTaskScene", { r_bar_up_rate: this.rRiseRate, r_bar_down_rate: this.rDropRate });
        }, this);



        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        this.formUtil.hideElement("r_bar_up_rate");
        this.formUtil.hideElement("r_bar_down_rate");
    }
}