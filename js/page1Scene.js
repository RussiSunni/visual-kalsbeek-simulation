class Page1Scene extends Phaser.Scene {
    constructor() {
        super('Page1Scene');
    }
    preload() {

    }
    create() {


        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        var text3 = this.add.text(20, 15, "Parameters", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 400, [roundedRect1, text3]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerover', function () {
        }, this);
        this.container1.on('pointerout', function () {
        }, this);
        this.container1.on('pointerdown', function () {
            console.log("pressed")
        }, this);


    }

}