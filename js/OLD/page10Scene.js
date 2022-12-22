class Page10Scene extends Phaser.Scene {
    constructor() {
        super('Page10Scene');
        this.audio1Sound;
        this.isAlreadyWrongOnce = false;
    }
    preload() {
        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        this.load.image("fish02", "images/fish02.png");
        //   this.load.image("shark02", "images/shark02.png");
        this.load.image("cross", "images/cross.png");

        this.load.audio("audio1", ["audio/page10/1-SubBlock_Oh-dear-Nitro-the-shark-is-ch.mp3"]);
        this.load.audio("applause", ["audio/applause.wav"]);
        this.load.audio("correctAudio", ["audio/page10/3-SubBlock_5-is-correct-Excellent-work.mp3"]);

        this.load.audio("buzzer", "audio/buzzer.mp3");
        this.load.audio("page10IncorrectAudio", ["audio/page10/4-SubBlock_Oh-dear-no-That-is-incorrect.mp3"]);
        this.load.audio("page10IncorrectAudio2", ["audio/page10/5-SubBlock_I-am-sorry-that-is-incorrect (1).mp3"]);

        this.load.dragonbone(
            "shark05",
            "resource/shark03/Shark03_tex.png",
            "resource/shark03/Shark03_tex.json",
            "resource/shark03/Shark03_ske.json"
        );
    }

    create() {
        // Background.
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        // this.background.setInteractive();
        // this.background.on("pointerdown", this.onButtonDown, this);

        this.audio1Sound = this.sound.add("audio1");
        this.audio1Sound.on("complete", this.playSharkAnimation, this);
        this.applauseSound = this.sound.add("applause");
        this.applauseSound.on("complete", this.playSecondCorrectSound, this);
        this.correctSound = this.sound.add("correctAudio");
        this.correctSound.on("complete", this.playFishAnimation, this);
        this.buzzerSound = this.sound.add("buzzer");
        this.buzzerSound.on("complete", this.playSecondIncorrectSound, this);
        this.incorrectSound = this.sound.add("page10IncorrectAudio");
        this.incorrectSound2 = this.sound.add("page10IncorrectAudio2");
        this.incorrectSound2.on("complete", this.playFishAnimation, this);

        // Images.
        this.logo = this.add.image(1150, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        // Text.
        this.text1 = this.add.text(10, 40, "Determine Unknown Side Lengths", { fontFamily: "Arial", fontSize: "60px" });

        var answer1Circle = this.add.circle(0, 0, 70, 0xed7d31);
        var answer1Text = this.add.text(-70, -60, "5in", { fontFamily: "Arial", fontSize: "48px" });
        this.answer1Container = this.add.container(770, 670, [answer1Circle, answer1Text]);
        // this.answer1Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer1Container.on('pointerover', function () {
            this.answer1Container.scale = 1.05;
        }, this);
        this.answer1Container.on('pointerout', function () {
            this.answer1Container.scale = 1;
        }, this);
        this.answer1Container.on('pointerdown', function () {
            // this.scene.start("Page11Scene");
            this.applauseSound.play();
        }, this);


        var answer2Circle = this.add.circle(0, 0, 70, 0xed7d31);
        var answer2Text = this.add.text(-70, -60, "7in", { fontFamily: "Arial", fontSize: "48px" });
        var answer2Cross = this.add.image(-35, -35, "cross");
        answer2Cross.scale = 2;
        answer2Cross.alpha = 0;
        this.answer2Container = this.add.container(920, 670, [answer2Circle, answer2Text, answer2Cross]);
        // this.answer2Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer2Container.on('pointerover', function () {
            this.answer2Container.scale = 1.05;
        }, this);
        this.answer2Container.on('pointerout', function () {
            this.answer2Container.scale = 1;
        }, this);
        this.answer2Container.on('pointerdown', function () {
            if (!this.isAlreadyWrongOnce) {
                answer2Cross.alpha = 1;
                this.buzzerSound.play();
                this.isAlreadyWrongOnce = true;
            }
            else {
                this.incorrectSound2.play();
            }
        }, this);

        var answer3Circle = this.add.circle(0, 0, 70, 0xed7d31);
        var answer3Text = this.add.text(-70, -60, "9in", { fontFamily: "Arial", fontSize: "48px" });
        var answer3Cross = this.add.image(-35, -35, "cross");
        answer3Cross.scale = 2;
        answer3Cross.alpha = 0;
        this.answer3Container = this.add.container(1070, 670, [answer3Circle, answer3Text, answer3Cross]);
        // this.answer3Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer3Container.on('pointerover', function () {
            this.answer3Container.scale = 1.05;
        }, this);
        this.answer3Container.on('pointerout', function () {
            this.answer3Container.scale = 1;
        }, this);
        this.answer3Container.on('pointerdown', function () {
            if (!this.isAlreadyWrongOnce) {
                answer3Cross.alpha = 1;
                this.buzzerSound.play();
                this.isAlreadyWrongOnce = true;
            } else {
                this.incorrectSound2.play();
            }
        }, this);

        var answer4Circle = this.add.circle(0, 0, 70, 0xed7d31);
        var answer4Text = this.add.text(-70, -60, "6in", { fontFamily: "Arial", fontSize: "48px" });
        var answer4Cross = this.add.image(-35, -35, "cross");
        answer4Cross.scale = 2;
        answer4Cross.alpha = 0;
        this.answer4Container = this.add.container(1220, 670, [answer4Circle, answer4Text, answer4Cross]);
        // this.answer4Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer4Container.on('pointerover', function () {
            this.answer4Container.scale = 1.05;
        }, this);
        this.answer4Container.on('pointerout', function () {
            this.answer4Container.scale = 1;
        }, this);
        this.answer4Container.on('pointerdown', function () {
            if (!this.isAlreadyWrongOnce) {
                answer4Cross.alpha = 1;
                this.buzzerSound.play();
                this.isAlreadyWrongOnce = true;
            } else {
                this.incorrectSound2.play();
            }
        }, this);



        var triangle = this.add.triangle(-123, 195, 0, 0, 250, 0, 125, 200, 0x4472c4);
        triangle.setStrokeStyle(6, 0xffffff);
        var rect = this.add.rectangle(0, 0, 500, 200, 0x4472c4);
        // rect.setStrokeStyle(6, 0xffffff);
        var line1 = this.add.line(2, -100, 0, 0, 500, 0, 0xffffff);
        line1.setLineWidth(3);
        var line2 = this.add.line(-244, 0, 0, 0, 0, 200, 0xffffff);
        line2.setLineWidth(3);
        var line3 = this.add.line(250, 0, 0, 0, 0, 200, 0xffffff);
        line3.setLineWidth(3);


        this.text3 = this.add.text(-150, -30, "Perimeter = 44in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text10 = this.add.text(-60, 30, "44 - 39", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text10.alpha = 0;

        this.text4 = this.add.text(-50, -140, "13in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text5 = this.add.text(260, -20, "6in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text6 = this.add.text(-310, -20, "6in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text7 = this.add.text(-245, 180, "7in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text8 = this.add.text(-50, 180, "7in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text9 = this.add.text(120, 100, "?", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });

        var shapeContainer = this.add.container(310, 250, [triangle, rect, line1, line2, line3, this.text3, this.text4, this.text5, this.text6, this.text7, this.text8, this.text9, this.text10]);

        this.fish02 = this.add.image(900, 350, "fish02");
        this.fish02.flipX = true;
        this.fish02.scaleX = 1;
        this.fish02.scaleY = 1;

        // Animation
        var timeline1 = this.tweens.createTimeline();

        timeline1.add({
            targets: [this.fish02],
            scale: 4,
            ease: 'Power1',
            duration: 2000
        });

        timeline1.play();

        var timer = this.time.delayedCall(2000, this.audio1Play, null, this);
        //var timedEvent = this.time.delayedCall(2000, this.audio1Play, this);

        // var shark02 = this.add.image(1700, 150, "shark02");
        // shark02.flipX = true;
        // shark02.scaleX = 2;
        // shark02.scaleY = 2;

        // Dragonbones animation
        this.sharkAnimation3 = this.add.armature("Armature", "shark05");
        this.sharkAnimation3.animation.play("animtion0");   // play animation      
        this.sharkAnimation3.scale = 2;
        this.sharkAnimation3.x = 1700;
        this.sharkAnimation3.y = 150;


        // Animation
        this.timeline2 = this.tweens.createTimeline();

        this.timeline2.add({
            targets: [this.sharkAnimation3],
            x: 1300,
            ease: 'Power1',
            duration: 2000
        });


        // Animation
        this.timeline3 = this.tweens.createTimeline();

        this.timeline3.add({
            targets: [this.fish02],
            scale: 1.5,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline3.add({
            targets: [this.fish02],
            y: 450,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline3.add({
            targets: [this.fish02],
            x: 450,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline3.add({
            targets: [this.fish02],
            y: 250,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline3.add({
            targets: [this.fish02],
            x: 200,
            ease: 'Power1',
            duration: 1000
        });


        this.timeline3.add({
            targets: [this.sharkAnimation3],
            y: 500,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline3.add({
            targets: [this.sharkAnimation3],
            x: 700,
            ease: 'Power1',
            duration: 1000
        });




        // Animation
        this.timeline4 = this.tweens.createTimeline();

        this.timeline4.add({
            targets: [this.text4, this.text5, this.text6, this.text7, this.text8, this.text9],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: [this.text4, this.text5, this.text6, this.text7, this.text8, this.text9],
            alpha: 0,
            ease: 'Power1',
            duration: 5000
        });

        this.timeline4.add({
            targets: [this.text5, this.text6],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: [this.text7, this.text8],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: [this.text7, this.text8],
            alpha: 1,
            ease: 'Power1',
            duration: 3000
        });

        this.timeline4.add({
            targets: [this.text4],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: [this.text10],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });


    }

    changeScene() {
        this.scene.start("Page11Scene");
    }

    audio1Play(sound) {
        this.audio1Sound.play()
    }

    playSharkAnimation() {
        console.log("test")
        this.timeline2.play();

        this.answer1Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer2Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer3Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        this.answer4Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
    }

    playSecondCorrectSound() {
        this.correctSound.play();
    }

    playFishAnimation() {
        this.timeline3.play();
        var timer2 = this.time.delayedCall(12000, this.changeScene, null, this);
    }

    playSecondIncorrectSound() {
        this.incorrectSound.play();
        this.timeline4.play();
    }

}