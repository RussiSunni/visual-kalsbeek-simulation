class Page5Scene extends Phaser.Scene {
    constructor() {
        super('Page5Scene');
        this.inputTextField;
        this.inputText;
    }
    preload() {

        this.load.dragonbone(
            "shark03",
            "resource/shark02/without top fin/Shark02_tex.png",
            "resource/shark02/without top fin/Shark02_tex.json",
            "resource/shark02/without top fin/Shark02_ske.json"
        );

        //load our images or sounds 
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        //  this.load.image("shark02", "images/shark02.png");

        this.load.audio("correctAudio", "audio/page5/3-SubBlock_Wowzers-You-are-pretty-good-a.mp3");
        this.load.audio("page5IncorrectAudio", "audio/page5/4-SubBlock_Sorry-pal-That-is-not-correct.mp3");

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
        // this.shark02 = this.add.image(-45, 200, "shark02");
        // this.shark02.scaleX = 1;
        // this.shark02.scaleY = 1;

        // Dragonbones animation
        this.sharkAnimation2 = this.add.armature("Armature", "shark03");  // create armature, the second argument should use the name you set when load your db file in preload method, but it's actually optional, so just ignore it if you like.
        this.sharkAnimation2.animation.play("animtion0");   // play animation
        this.sharkAnimation2.x = -45;
        this.sharkAnimation2.y = 200;

        // Animation
        this.tweens.add({ targets: this.sharkAnimation2, duration: 1000, x: game.config.width / 4 });

        // Graphics
        this.rect = this.add.graphics();
        this.rect.lineStyle(12, 0xffffff);
        this.rect.fillStyle(0xb0500f);
        //  this.rect.fillGradientStyle(0xb0500f, 0xffffff, 1);
        this.rect.strokeRect(0, 0, 250, 400);
        this.rect.fillRect(0, 0, 250, 400);
        this.rect.setInteractive(new Phaser.Geom.Rectangle(0, 0, 250, 400), Phaser.Geom.Rectangle.Contains);
        this.rect.on('pointerdown', function () {
            timeline2.play();
        }, this);


        this.text5 = this.add.text(100, -50, "9 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text6 = this.add.text(- 90, 180, "12 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text8 = this.add.text(100, 405, "9 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text9 = this.add.text(260, 180, "12 ft", { fontFamily: "Arial", fontSize: "36px", color: '#000000', fontStyle: "bold" });
        this.text7 = this.add.text(50, 180, "Rectangle", { fontFamily: "Arial", fontSize: "36px", color: '#000000' });

        var rectContainer = this.add.container(game.config.width / 2 - 80, game.config.height / 2 - 170, [this.rect, this.text5, this.text6, this.text7, this.text8, this.text9]);


        // Answer pad.
        var answerPadBG = this.add.rectangle(0, 0, 230, 360, 0xacb6de);
        answerPadBG.setStrokeStyle(1, 0x00000);
        var text8 = this.add.text(-40, -180, "    9\n    9\n  12\n+12", { fontFamily: "Arial", fontSize: "48px", color: "0x000000" });
        var answerBox = this.add.rectangle(0, 110, 200, 100, 0xffffff);
        answerBox.setStrokeStyle(3, 0x00000);
        var line = this.add.graphics();
        line.lineStyle(5, 0x000000, 1);
        line.lineBetween(-100, 40, 100, 40);
        this.inputTextField = this.add.text(-15, 70, this.inputText, { fontFamily: "Arial", fontSize: "48px", color: "0x000000", align: "center" });
        this.inputContainer = this.add.container(1150, 330);

        this.inputContainer.add(answerPadBG);
        this.inputContainer.add(text8);
        this.inputContainer.add(answerBox);
        this.inputContainer.add(line);
        this.inputContainer.add(line);
        this.inputContainer.add(this.inputTextField);
        this.inputContainer.alpha = 0;

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

        this.calcContainer = this.add.container(950, 550, [calcBG, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, submitButton, key1Text, key2Text, key3Text, key4Text, key5Text, key6Text, key7Text, key8Text, key9Text, key10Text, key11Text, key12Text, submitButtonText]);
        this.calcContainer.scale = 0.8;
        this.calcContainer.alpha = 0;


        // Animation
        var timeline2 = this.tweens.createTimeline();
        timeline2.add({
            targets: [this.inputContainer],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });
        timeline2.add({
            targets: [this.calcContainer],
            alpha: 1,
            ease: 'Power1',
            duration: 1000
        });


        // Animation
        this.timeline3 = this.tweens.createTimeline();
        this.timeline3.add({
            targets: [this.inputTextField],
            scale: 1.3,
            ease: 'Power1',
            duration: 1000
        });

        this.timeline3.add({
            targets: [this.inputTextField],
            scale: 1,
            ease: 'Power1',
            duration: 1000
        });

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
        if (answer == "42") {
            this.timeline3.play();
            this.correctAudio = this.sound.add("correctAudio");
            this.correctAudio.on("complete", this.nextScene, this);
            this.correctAudio.play();
        } else {
            this.incorrectAudio = this.sound.add("page5IncorrectAudio");
            this.incorrectAudio.play();
            this.inputText = "";
        }
    }

    nextScene() {
        this.scene.start("Page6Scene");
    }
}