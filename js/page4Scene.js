class Page4Scene extends Phaser.Scene {

    constructor() {
        super('Page4Scene');
        this.frame = 0;
        this.hasBeenAnimated = false;
        this.instructionText;
        this.inputTextField;
        this.inputText;
    }
    preload() {

        this.load.dragonbone(
            "shark02",
            "resource/shark02/without top fin/Shark02_tex.png",
            "resource/shark02/without top fin/Shark02_tex.json",
            "resource/shark02/without top fin/Shark02_ske.json"
        );

        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        // this.load.image("shark02", "images/shark02.png");

        this.load.audio("correctAudio", ["audio/applause.wav"]);
        this.load.audio("incorrectAudio", ["audio/page4/2-SubBlock_I-am-sorry-that-is-incorrect.mp3"]);
    }

    create() {
        // Background.
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);


        // Images.
        this.logo = this.add.image(1150, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        // Text.
        this.text1 = this.add.text(10, 40, "Finding Perimeter", { fontFamily: "Arial", fontSize: "60px" });

        // Sprites
        //  var shark02 = this.add.image(-45, 200, "shark02");
        //  shark02.scaleX = 1;
        //  shark02.scaleY = 1;

        // Dragonbones animation
        this.sharkAnimation1 = this.add.armature("Armature", "shark02");  // create armature, the second argument should use the name you set when load your db file in preload method, but it's actually optional, so just ignore it if you like.
        this.sharkAnimation1.animation.play("animtion0");   // play animation
        this.sharkAnimation1.x = -45;
        this.sharkAnimation1.y = 200;

        // Graphics
        this.rect = this.add.graphics();
        this.rect.lineStyle(12, 0xffffff);
        this.rect.fillStyle(0xb0500f);
        //  this.rect.fillGradientStyle(0xb0500f, 0xffffff, 1);
        this.rect.strokeRect(0, 0, 250, 400);
        this.rect.fillRect(0, 0, 250, 400);

        this.text5 = this.add.text(100, -50, "9 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text6 = this.add.text(- 90, 180, "12 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text8 = this.add.text(100, 405, "9 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text9 = this.add.text(260, 180, "12 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text7 = this.add.text(50, 180, "Rectangle", { fontFamily: "Arial", fontSize: "36px", color: '#000000' });

        var rectContainer = this.add.container(game.config.width / 2 - 80, game.config.height / 2 - 170, [this.rect, this.text5, this.text6, this.text7, this.text8, this.text9]);

        // Circles.
        this.circle1 = this.add.graphics();
        this.circle1.lineStyle(12, 0xffffff);
        this.circle1.fillStyle(0xf414b4);
        this.circle1.strokeCircle(130, game.config.height / 2 - 45, 40);
        this.circle1.fillCircle(130, game.config.height / 2 - 45, 40);
        this.circle1.alpha = 0;

        this.circle2 = this.add.graphics();
        this.circle2.lineStyle(12, 0xffffff);
        this.circle2.fillStyle(0xf414b4);
        this.circle2.strokeCircle(130, game.config.height / 2 + 105, 40);
        this.circle2.fillCircle(130, game.config.height / 2 + 105, 40);
        this.circle2.alpha = 0;

        // Text.
        this.number1 = this.add.text(130, game.config.height / 2 - 45, "1", { fontFamily: "Arial", fontSize: "48px", fontStyle: "bold" });
        this.number1.setOrigin(0.5, 0.5);
        this.number1.alpha = 0;
        this.number2 = this.add.text(130, game.config.height / 2 + 105, "2", { fontFamily: "Arial", fontSize: "48px", fontStyle: "bold" });
        this.number2.setOrigin(0.5, 0.5);
        this.number2.alpha = 0;

        // Answers 
        // 1
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 1030, 100, 16);
        var text3 = this.add.text(20, 15, "Since this is a rectangle, we know that the parallel side lengths are equal \nin length. The bottom side length is 9 ft and the right side length is 12 ft.", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(190, game.config.height / 2 - 95, [roundedRect1, text3]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 1000, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerover', function () {
            this.container1.scaleY = 1.05;
            this.container1.y = game.config.height / 2 - 97.5;
        }, this);
        this.container1.on('pointerout', function () {
            this.container1.scale = 1;
            this.container1.y = game.config.height / 2 - 95;
        }, this);
        this.container1.on('pointerdown', function () {
            this.correctAudio = this.sound.add("correctAudio");
            this.correctAudio.play();
            this.scene.start("Page5Scene");
            this.hasBeenAnimated = true;
        }, this);
        this.container1.alpha = 0;

        // 2
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x70ad47, 1);
        roundedRect2.fillRoundedRect(0, 0, 1030, 100, 16);
        var text4 = this.add.text(20, 15, "If we add 9 + 12, we know that the bottom side length is 21 ft and the right \nside length is also 21 ft.", { fontFamily: "Arial", fontSize: "30px" });
        this.container2 = this.add.container(190, game.config.height / 2 + 55, [roundedRect2, text4]);
        this.container2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 1000, 100), Phaser.Geom.Rectangle.Contains);
        this.container2.on('pointerover', function () {
            this.container2.scaleY = 1.05;
            this.container2.y = game.config.height / 2 + 52.5;
        }, this);
        this.container2.on('pointerout', function () {
            this.container2.scale = 1;
            this.container2.y = game.config.height / 2 + 55;
        }, this);
        this.container2.on('pointerdown', function () {
            this.incorrectAudio = this.sound.add("incorrectAudio");
            this.incorrectAudio.on("complete", this.transition, this);
            this.incorrectAudio.play();
            this.hasBeenAnimated = true;
            // Animation     

        }, this);
        this.container2.alpha = 0;

        // Text.

        this.instructionText = this.add.text(game.config.width / 2, game.config.height - 50, "Click the correct answer.", { fontFamily: "Arial", fontSize: "40px", fontStyle: "bold" });
        this.instructionText.setOrigin(0.5);
        this.instructionText.alpha = 0;

        // Animation     
        var timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.sharkAnimation1,
            x: game.config.width / 4,
            ease: 'Power1',
            duration: 1000
        });

        timeline.add({
            targets: [this.circle1, this.circle2, this.number1, this.number2, this.container1, this.container2, this.instructionText],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline.play();



        this.timeline2 = this.tweens.createTimeline();


        this.timeline2.add({
            targets: this.instructionText,
            scale: 1.3,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline2.add({
            targets: this.instructionText,
            scale: 1,
            ease: 'Power1',
            duration: 1000
        });




    }

    update() {
        this.frame = this.frame + 1;
        if (this.frame >= 200 && this.hasBeenAnimated == false) {
            this.timeline2.play();
            this.hasBeenAnimated = true;
        }


        // this.inputTextField.setText(this.inputText);
    }

    // updateText(number) {
    //     if (this.inputText)
    //         this.inputText = this.inputText + number;
    //     else {
    //         this.inputText = number;
    //     }
    // }

    // checkAnswer(answer) {
    //     if (answer == "42") {
    //         console.log("correct")
    //         this.scene.start("Page6Scene");
    //     } else {
    //         console.log("incorrect");
    //         this.inputText = "";
    //     }
    // }

    transition() {
        this.scene.start("Page5Scene");
    }
}