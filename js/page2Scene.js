class Page2Scene extends Phaser.Scene {
    constructor() {
        super('Page2Scene');
        this.arrowHeadX = 825;
        this.arrowHeadY = 470;
        this.arrowHead;
    }
    preload() {
        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        this.load.image("shark01", "images/shark01.png");

        this.load.audio("shark01", ["audio/page2/shark01.mp3"])
        this.load.audio("shark02", ["audio/page2/shark02.mp3"])
    }

    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        // this.background.setInteractive();
        // this.background.on("pointerdown", this.onButtonDown, this);

        // Text.
        this.text1 = this.add.text(game.config.width / 2 + 200, game.config.height / 2 - 150, "PERIMETER", { fontFamily: "Arial", fontSize: "120px" });
        this.text1.setOrigin(0.5, 0.5);
        this.text1.scale = 0;

        var descriptionTextBackground = this.add.rectangle(0, 0, 600, 135, 0xb3c6e7);
        var text2 = this.add.text(0, - 4,
            "Definition: \nThe measure of the length around the \nedge or boundary of an object or shape.",
            { fontFamily: "Arial", fontSize: "32px", color: '#000000', align: 'center' });
        text2.setOrigin(0.5, 0.5);
        var descriptionContainer = this.add.container(game.config.width / 2 + 200, game.config.height / 2 - 6, [descriptionTextBackground, text2]);
        descriptionContainer.alpha = 0;

        // Images.
        this.logo = this.add.image(120, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        this.shark01 = this.add.image(-200, 450, "shark01");
        this.shark01.scaleX = 0.3;
        this.shark01.scaleY = 0.3;

        // Rect
        var rect = this.add.graphics();
        rect.lineStyle(12, 0xffffff);
        rect.fillStyle(0xffc000);
        rect.strokeRect(650, 508, 400, 160);
        rect.fillRect(650, 508, 400, 160);
        rect.alpha = 0;

        var arrowLine = this.add.line(0, 0, 0, 0, 250, 0, 0xed7d31);
        arrowLine.setLineWidth(4);
        this.arrowHead = this.add.triangle(this.arrowHeadX, this.arrowHeadY, 0, 0, 50, 20, 0, 40, 0xed7d31);
        this.arrowHead.alpha = 0;
        // this.arrowContainer = this.add.container(this.arrow1X, this.arrow1Y, [arrowLine, arrowHead]);

        // Graphics
        var circle1 = this.add.graphics();
        circle1.lineStyle(12, 0xffffff);
        circle1.fillStyle(0xf414b4);
        circle1.strokeCircle(550, 400, 40);
        circle1.fillCircle(550, 400, 40);
        circle1.alpha = 0;

        var circle2 = this.add.graphics();
        circle2.lineStyle(12, 0xffffff);
        circle2.fillStyle(0xf414b4);
        circle2.strokeCircle(550, 520, 40);
        circle2.fillCircle(550, 520, 40);
        circle2.alpha = 0;

        // Text.
        var number1 = this.add.text(550, 400, "1", { fontFamily: "Arial", fontSize: "48px", fontStyle: "bold" });
        number1.setOrigin(0.5, 0.5);
        number1.alpha = 0;
        var number2 = this.add.text(550, 520, "2", { fontFamily: "Arial", fontSize: "48px", fontStyle: "bold" });
        number2.setOrigin(0.5, 0.5);
        number2.alpha = 0;

        // Objective 1. 
        // Rounded Rectangle.
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 600, 80, 16);

        var objectiveText1 = this.add.text(10, 22, "Finding Perimeter", { fontFamily: "Arial", fontSize: "32px" });

        // Arrow.
        var arrow = this.add.triangle(540, 40, 0, 0, 50, 35, 0, 70, 0xffc000);


        // Objective 1 container.
        var container = this.add.container(610, 360, [roundedRect1, objectiveText1, arrow]);
        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, 600, 80), Phaser.Geom.Rectangle.Contains);
        container.on('pointerover', function () {
            container.scaleY = 1.05;
            container.y = 358;
        });
        container.on('pointerout', function () {
            container.scale = 1;
            container.y = 360;
        });
        container.on('pointerdown', function () {
            this.scene.start("Page4Scene");
        }, this);
        container.alpha = 0;

        // Objective 2.
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x4472c4, 1);
        roundedRect2.fillRoundedRect(610, 480, 600, 80, 16);
        roundedRect2.alpha = 0;

        // Text.
        var objectiveText2 = this.add.text(620, 502, "Determine Unknown Side Lengths", { fontFamily: "Arial", fontSize: "32px" });
        objectiveText2.alpha = 0;


        // Animation     
        var timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.shark01,
            x: game.config.width / 4 - 100,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: this.text1,
            scale: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: descriptionContainer,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: rect,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: this.arrowHead,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: [this.text1, descriptionContainer, rect, this.arrowHead],
            alpha: 1,
            ease: 'Power1',
            duration: 5000
        });

        timeline.add({
            targets: [this.text1, descriptionContainer, rect, this.arrowHead],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: [circle1, circle2, number1, number2, container, roundedRect2, objectiveText2],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.play();

        console.log(timeline);


        // Audio
        this.sharkSound01 = this.sound.add("shark01");
        this.sharkSound01.on("complete", this.playSecondSound, this);
        this.sharkSound01.play();
    }

    update() {
        if (this.arrowHeadX < 1100 && this.arrowHeadY <= 470) {
            this.arrowHead.angle = 0;
            this.arrowHeadX = this.arrowHeadX + 3;
            //  console.log("1")
        }
        else if (this.arrowHeadX >= 1100 && this.arrowHeadY <= 700) {
            this.arrowHead.angle = 90;
            this.arrowHeadY = this.arrowHeadY + 3;
            //  console.log("2")
        }
        else if (this.arrowHeadY >= 700 && this.arrowHeadX > 600) {
            this.arrowHead.angle = 180;
            this.arrowHeadX = this.arrowHeadX - 3;
            //  console.log("3")
        }
        else if (this.arrowHeadX <= 600 && this.arrowHeadY <= 702) {
            this.arrowHead.angle = 270;
            this.arrowHeadY = this.arrowHeadY - 3;
            //  console.log("4")
        }
        this.arrowHead.x = this.arrowHeadX;
        this.arrowHead.y = this.arrowHeadY;

        //  console.log(this.arrowHeadX)
        //  console.log(this.arrowHeadY)
    }

    // onButtonDown() {
    //     this.scene.start("Page3Scene");
    // }

    playSecondSound() {
        this.sharkSound02 = this.sound.add("shark02");
        this.sharkSound02.play();
    }

}