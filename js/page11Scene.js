class Page11Scene extends Phaser.Scene {
    constructor() {
        super('Page11Scene');
    }
    preload() {
        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        this.load.image("fish01", "images/fish01.png");
        this.load.image("shark01", "images/shark01.png");
        this.load.image("tick", "images/tick.png");
    }

    create() {
        // Background.
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.background.setInteractive();
        this.background.on("pointerdown", this.onButtonDown, this);

        // Images.
        this.logo = this.add.image(120, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        // Text.
        this.text1 = this.add.text(game.config.width / 2 + 200, game.config.height / 2 - 150, "PERIMETER", { fontFamily: "Arial", fontSize: "120px" });
        this.text1.setOrigin(0.5, 0.5);


        // Rounded Rectangle.
        this.roundedRect1 = this.add.graphics();
        this.roundedRect1.fillStyle(0x4472c4, 1);
        this.roundedRect1.fillRoundedRect(610, 360, 600, 80, 16);

        this.roundedRect2 = this.add.graphics();
        this.roundedRect2.fillStyle(0x4472c4, 1);
        this.roundedRect2.fillRoundedRect(610, 480, 600, 80, 16);

        // Graphics
        this.circle1 = this.add.graphics();
        this.circle1.lineStyle(12, 0xffffff);
        this.circle1.fillStyle(0xf414b4);
        this.circle1.strokeCircle(550, 400, 40);
        this.circle1.fillCircle(550, 400, 40);

        this.circle2 = this.add.graphics();
        this.circle2.lineStyle(12, 0xffffff);
        this.circle2.fillStyle(0xf414b4);
        this.circle2.strokeCircle(550, 520, 40);
        this.circle2.fillCircle(550, 520, 40);

        // Text.
        this.number1 = this.add.text(550, 400, "1", { fontFamily: "Arial", fontSize: "48px", fontStyle: "bold" });
        this.number1.setOrigin(0.5, 0.5);
        this.number2 = this.add.text(550, 520, "2", { fontFamily: "Arial", fontSize: "48px", fontStyle: "bold" });
        this.number2.setOrigin(0.5, 0.5);

        // Tick
        this.tick = this.add.image(560, 380, "tick");
        this.tick.scaleX = 0.40;
        this.tick.scaleY = 0.40;

        this.tick = this.add.image(560, 500, "tick");
        this.tick.scaleX = 0.40;
        this.tick.scaleY = 0.40;

        this.objectiveText2 = this.add.text(620, 382, "Finding Perimeter", { fontFamily: "Arial", fontSize: "32px" });
        this.objectiveText3 = this.add.text(620, 502, "Determine Unknown Side Lengths", { fontFamily: "Arial", fontSize: "32px" });


        this.fish01 = this.add.image(150, 320, "fish01");
        this.fish01.flipX = true;
        this.fish01.scaleX = 0.15;
        this.fish01.scaleY = 0.15;

        this.shark01 = this.add.image(370, 530, "shark01");
        this.shark01.flipX = true;
        this.shark01.scaleX = 0.21;
        this.shark01.scaleY = 0.21;

        this.roundedRect3 = this.add.graphics();
        this.roundedRect3.fillStyle(0xd1112c, 1);
        this.roundedRect3.fillRoundedRect(760, 600, 300, 80, 16);
        this.roundedRect3.lineStyle(4, 0x000000, 1);
        this.roundedRect3.strokeRoundedRect(760, 600, 300, 80, 16);
        this.objectiveText4 = this.add.text(800, 615, "End Lesson", { fontFamily: "Arial", fontSize: "42px" });

        this.roundedRect3.setInteractive(new Phaser.Geom.Rectangle(760, 600, 300, 80), Phaser.Geom.Rectangle.Contains);
        this.roundedRect3.on('pointerdown', function () {
            window.close();
        }, this);
    }

    onButtonDown() {

    }

}