class Page7Scene extends Phaser.Scene {
    constructor() {
        super('Page7Scene');
    }
    preload() {
        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        this.load.image("fish01", "images/fish01.png");
        this.load.image("tick", "images/tick.png");
    }

    create() {
        // Background.
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);

        // Images.
        this.logo = this.add.image(120, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        // Sprites
        this.fish01 = this.add.image(220, 400, "fish01");
        this.fish01.scaleX = 0.3;
        this.fish01.scaleY = 0.3;
        this.fish01.flipX = true;

        // Rounded Rectangle.
        this.roundedRect1 = this.add.graphics();
        this.roundedRect1.fillStyle(0x4472c4, 1);
        this.roundedRect1.fillRoundedRect(610, 360, 600, 80, 16);

        // Objective 2
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x70ad47, 1);
        roundedRect2.fillRoundedRect(0, 0, 600, 80, 16);

        // Arrow.
        var arrow = this.add.triangle(540, 40, 0, 0, 50, 35, 0, 70, 0xffc000);
        var objective2Text = this.add.text(10, 22, "Determine Unknown Side Lengths", { fontFamily: "Arial", fontSize: "32px" });
        var Objective2Container = this.add.container(610, 480, [roundedRect2, objective2Text, arrow]);
        Objective2Container.setInteractive(new Phaser.Geom.Rectangle(0, 0, 600, 80), Phaser.Geom.Rectangle.Contains);
        Objective2Container.on('pointerover', function () {
            Objective2Container.scaleY = 1.05;
            Objective2Container.y = 478;
        });
        Objective2Container.on('pointerout', function () {
            Objective2Container.scale = 1;
            Objective2Container.y = 480;
        });
        Objective2Container.on('pointerdown', function () {
            this.scene.start("Page8Scene");
        }, this);

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

        // Text.
        this.text1 = this.add.text(game.config.width / 2 + 200, game.config.height / 2 - 100, "PERIMETER", { fontFamily: "Arial", fontSize: "100px" });
        this.text1.setOrigin(0.5, 0.5);

        this.objectiveText2 = this.add.text(620, 382, "Finding Perimeter", { fontFamily: "Arial", fontSize: "32px" });

        // Tick
        this.tick = this.add.image(560, 380, "tick");
        this.tick.scaleX = 0.40;
        this.tick.scaleY = 0.40;
    }
}