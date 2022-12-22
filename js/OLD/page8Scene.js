class Page8Scene extends Phaser.Scene {
    constructor() {
        super('Page8Scene');
        this.inputTextField;
        this.inputText;
        this.isComplete = false;
    }
    preload() {
        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        this.load.image("fish02", "images/fish02.png");

        this.load.audio("applause", ["audio/applause.wav"]);
        this.load.audio("buzzer", "audio/buzzer.mp3");
        this.load.audio("S8IncorrectAudio", "audio/page8/4-SubBlock_That-is-incorrect-66-equals.mp3");
        this.load.audio("page8correctAudio2", "audio/page9/3-SubBlock_Wow-that-is-quite-excellent.mp3");
        this.load.audio("page8IncorrectAudio2", "audio/page9/4-SubBlock_Oops-that-is-wrong-Line-up-y.mp3");

    }

    create() {
        // Background.
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        // this.background.setInteractive();
        // this.background.on("pointerdown", this.onButtonDown, this);

        this.applauseSound = this.sound.add("applause");
        this.buzzerSound = this.sound.add("buzzer");
        this.buzzerSound.on("complete", this.playSecondSound, this);
        this.S8IncorrectAudioSound = this.sound.add("S8IncorrectAudio");

        this.applauseSound2 = this.sound.add("applause");
        this.applauseSound2.on("complete", this.playSecondSound2, this);
        this.correctSound2 = this.sound.add("page8correctAudio2");
        this.correctSound2.on("complete", this.nextScene, this);

        this.buzzerSound2 = this.sound.add("buzzer");
        this.buzzerSound2.on("complete", this.playSecondSound3, this);
        this.incorrectSound2 = this.sound.add("page8IncorrectAudio2");

        // Images.
        this.logo = this.add.image(1150, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        this.fish02 = this.add.image(1400, 350, "fish02");
        this.fish02.flipX = true;
        this.fish02.scaleX = 1.7;
        this.fish02.scaleY = 1.7;

        // Text.
        this.text1 = this.add.text(10, 30, "Determine Unknown Side Lengths", { fontFamily: "Arial", fontSize: "60px" });
        this.text2 = this.add.text(320, game.config.height - 180, "Step 1: Add all the known side lengths together.", { fontFamily: "Arial", fontSize: "40px", fontStyle: "bold" });
        this.text2.alpha = 0;
        this.text8 = this.add.text(320, game.config.height - 100, "Step 2: Subtract the sum of all side lengths from\n the perimeter to find your answer.", { fontFamily: "Arial", fontSize: "40px", fontStyle: "bold" });
        this.text8.alpha = 0;

        // Graphics  
        var data = [0, 0, 300, 0, 350, 200, -50, 200];
        var trapezoid = this.add.polygon(750, 350, data, 0xf414b4, 1);
        trapezoid.setStrokeStyle(3, 0x000000);

        this.text3 = this.add.text(560, 350, "Perimeter = 36in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text4 = this.add.text(660, 210, "10in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text5 = this.add.text(460, 330, "6in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text6 = this.add.text(883, 330, "6in", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });
        this.text7 = this.add.text(680, 450, "?", { fontFamily: "Arial", fontSize: "36px", fontStyle: "bold" });

        // Answer pad.
        var answerPadBG = this.add.rectangle(0, 0, 230, 300, 0xacb6de);
        answerPadBG.setStrokeStyle(1, 0x00000);
        var answerPadText = this.add.text(20, -150, "10\n  6\n+6", { fontFamily: "Arial", fontSize: "48px", color: "0x000000" });
        var answerPadBox = this.add.rectangle(0, 80, 200, 100, 0xffffff);
        answerPadBox.setStrokeStyle(3, 0x00000);
        this.inputTextField = this.add.text(0, 70, this.inputText, { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        var answerPadLine = this.add.graphics();
        answerPadLine.lineStyle(5, 0x000000, 1);
        answerPadLine.lineBetween(-100, 10, 100, 10);
        this.answerPadContainer = this.add.container(330, 260, [answerPadBG, answerPadText, answerPadBox, answerPadLine, this.inputTextField]);
        this.answerPadContainer.alpha = 0;


        // Answer pad.
        var answerPadBG2 = this.add.rectangle(0, 5, 250, 170, 0xacb6de);
        answerPadBG2.setStrokeStyle(1, 0x00000);
        this.answerPadText2 = this.add.text(20, -70, " 36\n-22", { fontFamily: "Arial", fontSize: "48px", color: "0x000000" });
        this.hilightedText = this.add.text(20, -70, "   6\n  -2\n   4", { fontFamily: "Arial", fontSize: "48px", color: "#000000" });
        this.hilightedText2 = this.add.text(20, -70, "  3\n -2\n  1", { fontFamily: "Arial", fontSize: "48px", color: "#000000" });
        this.hilightedText3 = this.add.text(20, -70, "  36\n -22\n  14", { fontFamily: "Arial", fontSize: "48px", color: "#000000" });
        var answerPadLine2 = this.add.graphics();
        answerPadLine2.lineStyle(5, 0x000000, 1);
        answerPadLine2.lineBetween(-100, 38, 100, 38);
        var answerPadContainer2 = this.add.container(200, 250, [answerPadBG2, this.answerPadText2, answerPadLine2, this.hilightedText, this.hilightedText2, this.hilightedText3]);
        answerPadContainer2.alpha = 0;
        this.hilightedText.alpha = 0;
        this.hilightedText2.alpha = 0;
        this.hilightedText3.alpha = 0;

        this.text9 = this.add.text(100, 350, "Click the correct answer.", { fontFamily: "Arial", fontSize: "24px", fontStyle: "bold" });
        this.text9.alpha = 0;

        // Keypad    
        var calcBG = this.add.rectangle(0, 0, 300, 320, 0xacb6de);
        calcBG.setStrokeStyle(2, 0x000000);

        var key1 = this.add.rectangle(-100, -120, 100, 80, 0xacb6de);
        key1.setStrokeStyle(2, 0x000000);
        var key1Text = this.add.text(0, 0, "1", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key1Text, key1);
        key1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key1.on('pointerdown', function () {
            key1.setFillStyle(0x939bba);
            this.updateText("1");
        }, this);
        key1.on('pointerup', function () {
            key1.setFillStyle(0xacb6de);
        }, this);

        var key2 = this.add.rectangle(0, -120, 100, 80, 0xacb6de);
        key2.setStrokeStyle(2, 0x000000);
        var key2Text = this.add.text(0, 0, "2", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key2Text, key2);
        key2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key2.on('pointerdown', function () {
            key2.setFillStyle(0x939bba);
            this.updateText("2");
        }, this);
        key2.on('pointerup', function () {
            key2.setFillStyle(0xacb6de);
        }, this);

        var key3 = this.add.rectangle(100, -120, 100, 80, 0xacb6de);
        key3.setStrokeStyle(2, 0x000000);
        var key3Text = this.add.text(0, 0, "3", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key3Text, key3);
        key3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key3.on('pointerdown', function () {
            key3.setFillStyle(0x939bba);
            this.updateText("3");
        }, this);
        key3.on('pointerup', function () {
            key3.setFillStyle(0xacb6de);
        }, this);

        var key4 = this.add.rectangle(-100, -40, 100, 80, 0xacb6de);
        key4.setStrokeStyle(2, 0x000000);
        var key4Text = this.add.text(0, 0, "4", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key4Text, key4);
        key4.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key4.on('pointerdown', function () {
            key4.setFillStyle(0x939bba);
            this.updateText("4");
        }, this);
        key4.on('pointerup', function () {
            key4.setFillStyle(0xacb6de);
        }, this);

        var key5 = this.add.rectangle(0, -40, 100, 80, 0xacb6de);
        key5.setStrokeStyle(2, 0x000000);
        var key5Text = this.add.text(0, 0, "5", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key5Text, key5);
        key5.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key5.on('pointerdown', function () {
            key5.setFillStyle(0x939bba);
            this.updateText("5");
        }, this);
        key5.on('pointerup', function () {
            key5.setFillStyle(0xacb6de);
        }, this);

        var key6 = this.add.rectangle(100, -40, 100, 80, 0xacb6de);
        key6.setStrokeStyle(2, 0x000000);
        var key6Text = this.add.text(0, 0, "6", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key6Text, key6);
        key6.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key6.on('pointerdown', function () {
            key6.setFillStyle(0x939bba);
            this.updateText("6");
        }, this);
        key6.on('pointerup', function () {
            key6.setFillStyle(0xacb6de);
        }, this);

        var key7 = this.add.rectangle(-100, 40, 100, 80, 0xacb6de);
        key7.setStrokeStyle(2, 0x000000);
        var key7Text = this.add.text(0, 0, "7", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key7Text, key7);
        key7.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key7.on('pointerdown', function () {
            key7.setFillStyle(0x939bba);
            this.updateText("7");
        }, this);
        key7.on('pointerup', function () {
            key7.setFillStyle(0xacb6de);
        }, this);

        var key8 = this.add.rectangle(0, 40, 100, 80, 0xacb6de);
        key8.setStrokeStyle(2, 0x000000);
        var key8Text = this.add.text(0, 0, "8", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key8Text, key8);
        key8.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key8.on('pointerdown', function () {
            key8.setFillStyle(0x939bba);
            this.updateText("8");
        }, this);
        key8.on('pointerup', function () {
            key8.setFillStyle(0xacb6de);
        }, this);

        var key9 = this.add.rectangle(100, 40, 100, 80, 0xacb6de);
        key9.setStrokeStyle(2, 0x000000);
        var key9Text = this.add.text(0, 0, "9", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key9Text, key9);
        key9.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key9.on('pointerdown', function () {
            key9.setFillStyle(0x939bba);
            this.updateText("9");
        }, this);
        key9.on('pointerup', function () {
            key9.setFillStyle(0xacb6de);
        }, this);

        var key10 = this.add.rectangle(-100, 120, 100, 80, 0xacb6de);
        key10.setStrokeStyle(2, 0x000000);
        var key10Text = this.add.text(0, 0, "10", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key10Text, key10);
        key10.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key10.on('pointerdown', function () {
            key10.setFillStyle(0x939bba);
            this.updateText("10");
        }, this);
        key10.on('pointerup', function () {
            key10.setFillStyle(0xacb6de);
        }, this);

        var key11 = this.add.rectangle(0, 120, 100, 80, 0xacb6de);
        key11.setStrokeStyle(2, 0x000000);
        var key11Text = this.add.text(0, 0, "11", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key11Text, key11);
        key11.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key11.on('pointerdown', function () {
            key11.setFillStyle(0x939bba);
            this.updateText("11");
        }, this);
        key11.on('pointerup', function () {
            key11.setFillStyle(0xacb6de);
        }, this);

        var key12 = this.add.rectangle(100, 120, 100, 80, 0xacb6de);
        key12.setStrokeStyle(2, 0x000000);
        var key12Text = this.add.text(0, 0, "12", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(key12Text, key12);
        key12.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        key12.on('pointerdown', function () {
            key12.setFillStyle(0x939bba);
            this.updateText("12");
        }, this);
        key12.on('pointerup', function () {
            key12.setFillStyle(0xacb6de);
        }, this);

        var submitButton = this.add.rectangle(0, 190, 150, 60, 0x70ad47);
        submitButton.setStrokeStyle(2, 0x000000);
        var submitButtonText = this.add.text(0, 0, "Submit", { fontFamily: "Arial", fontSize: "36px", color: "0x000000", align: "center" });
        Phaser.Display.Align.In.Center(submitButtonText, submitButton);
        submitButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, 150, 60), Phaser.Geom.Rectangle.Contains);
        submitButton.on('pointerdown', function () {
            submitButton.setFillStyle(0x939bba);
            this.checkAnswer(this.inputText);
        }, this);
        submitButton.on('pointerup', function () {
            submitButton.setFillStyle(0x70ad47);
        }, this);

        this.calcContainer = this.add.container(150, 500, [calcBG, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, submitButton, key1Text, key2Text, key3Text, key4Text, key5Text, key6Text, key7Text, key8Text, key9Text, key10Text, key11Text, key12Text, submitButtonText]);
        this.calcContainer.scale = 0.8;
        this.calcContainer.alpha = 0;

        var answer4Circle = this.add.circle(0, 0, 60, 0x00b0f0);
        answer4Circle.setStrokeStyle(5, 0xffffff);
        var answer4Text = this.add.text(-60, -60, "14", { fontFamily: "Arial", fontSize: "48px" });
        var answer4Container = this.add.container(730, 495, [answer4Circle, answer4Text]);
        answer4Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        answer4Container.alpha = 0;


        var answer1Circle = this.add.circle(0, 0, 60, 0x548135);
        answer1Circle.setStrokeStyle(5, 0xffffff);
        var answer1Text = this.add.text(-60, -60, "12", { fontFamily: "Arial", fontSize: "48px" });
        var answer1Container = this.add.container(100, 480, [answer1Circle, answer1Text]);
        answer1Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        answer1Container.on('pointerover', function () {
            answer1Container.scale = 1.05;
        });
        answer1Container.on('pointerout', function () {
            answer1Container.scale = 1;
        });
        answer1Container.on('pointerdown', function () {
            this.buzzerSound2.play();
        }, this);
        answer1Container.alpha = 0;


        var answer2Circle = this.add.circle(0, 0, 60, 0xf414b4);
        answer2Circle.setStrokeStyle(5, 0xffffff);
        var answer2Text = this.add.text(-55, -60, "11", { fontFamily: "Arial", fontSize: "48px" });
        var answer2Container = this.add.container(240, 480, [answer2Circle, answer2Text]);
        answer2Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        answer2Container.on('pointerover', function () {
            answer2Container.scale = 1.05;
        });
        answer2Container.on('pointerout', function () {
            answer2Container.scale = 1;
        });
        answer2Container.on('pointerdown', function () {
            this.buzzerSound2.play();
        }, this);
        answer2Container.alpha = 0;

        var answer3Circle = this.add.circle(0, 0, 60, 0x00b0f0);
        answer3Circle.setStrokeStyle(5, 0xffffff);
        var answer3Text = this.add.text(-60, -60, "14", { fontFamily: "Arial", fontSize: "48px" });
        var answer3Container = this.add.container(380, 480, [answer3Circle, answer3Text]);
        answer3Container.setInteractive(new Phaser.Geom.Circle(0, 0, 70), Phaser.Geom.Circle.Contains);
        answer3Container.on('pointerover', function () {
            answer3Container.scale = 1.05;
        });
        answer3Container.on('pointerout', function () {
            answer3Container.scale = 1;
        });
        answer3Container.on('pointerdown', function () {
            this.applauseSound2.play();
            timeline3.play();
            this.isCorrectAnswer = true;
            this.isComplete = true;
        }, this);

        answer3Container.alpha = 0;


        // Animation
        var timeline1 = this.tweens.createTimeline();

        timeline1.add({
            targets: [this.text2, this.answerPadContainer, this.calcContainer],
            alpha: 0,
            ease: 'Power1',
            duration: 2000
        });

        timeline1.add({
            targets: [this.text2, this.answerPadContainer, this.calcContainer],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        timeline1.play();


        this.timeline2 = this.tweens.createTimeline();

        this.timeline2.add({
            targets: [this.answerPadContainer, this.calcContainer],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline2.add({
            targets: this.text8,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline2.add({
            targets: [this.fish02],
            x: 1100,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline2.add({
            targets: [answerPadContainer2, answer1Container, answer2Container, answer3Container, this.text9],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });


        // Animation     
        var timeline3 = this.tweens.createTimeline();

        timeline3.add({
            targets: answer4Container,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });


        this.correctAnswerText1 = this.add.text(300, 330, "12", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        this.correctAnswerText1.alpha = 0;
        this.correctAnswerText2 = this.add.text(300, 330, "22", { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        this.correctAnswerText2.alpha = 0;


        // Show correct answer.
        this.timeline4 = this.tweens.createTimeline();

        this.timeline4.add({
            targets: this.correctAnswerText1,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: this.correctAnswerText1,
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: this.correctAnswerText1,
            alpha: 1,
            ease: 'Power1',
            duration: 2000
        });

        this.timeline4.add({
            targets: this.correctAnswerText1,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline4.add({
            targets: [this.correctAnswerText2],
            alpha: 1,
            ease: 'Power1',
            duration: 4000
        });

        this.timeline4.add({
            targets: [this.correctAnswerText2],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });


        // Show correct answer.
        this.timeline5 = this.tweens.createTimeline();

        this.timeline5.add({
            targets: this.answerPadText2,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: this.answerPadText2,
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText2],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText2],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText3],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText3],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.hilightedText3],
            alpha: 0,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline5.add({
            targets: [this.answerPadText2],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });



    }

    onButtonDown() {
        if (this.isComplete) {
            this.scene.start("Page10Scene");
        }
    }

    update() {
        this.inputTextField.setText(this.inputText);
    }

    updateText(number) {
        if (this.inputText)
            this.inputText = this.inputText + number;
        else {
            this.inputText = number;
        }
    }

    checkAnswer(answer) {
        if (answer == "22") {
            this.applauseSound.play();

            this.timeline2.play();
            //this.calcContainer.alpha = 0;
            //this.answerPadContainer.alpha = 0;
        } else {
            this.buzzerSound.play();
            this.inputText = "";
        }
    }

    playSecondSound() {
        this.S8IncorrectAudioSound.play();
        this.timeline4.play();
    }

    playSecondSound2() {
        this.correctSound2.play();
    }

    playSecondSound3() {
        this.incorrectSound2.play();
        this.timeline5.play();
    }

    nextScene() {
        this.scene.start("Page10Scene");
    }

}