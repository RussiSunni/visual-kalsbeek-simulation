class Page6Scene extends Phaser.Scene {
    constructor() {
        super('Page6Scene');
        this.zone1Rect;
        this.zone2Rect;
        this.isSquareCorrect;
        this.isRectCorrect;
        this.isTriangleCorrect;
        this.isPentagonCorrect;

        this.hasAudioStarted = false;
    }
    preload() {
        //load our images or sounds
        this.load.image("background", "images/background.jpg");
        this.load.image("logo", "images/logo.png");
        //   this.load.image("shark02", "images/shark02.png");
        this.load.image("dotted-rect", "images/dotted-rect.png");

        this.load.audio("p6CorrectAudio", "audio/page6/2-SubBlock_Way-to-go-dude-You-really-kno.mp3");
        this.load.audio("ding", "audio/ding.mp3");
        this.load.audio("buzzer", "audio/buzzer.mp3");

        this.load.dragonbone(
            "shark04",
            "resource/shark02/without top fin/Shark02_tex.png",
            "resource/shark02/without top fin/Shark02_tex.json",
            "resource/shark02/without top fin/Shark02_ske.json"
        );
    }

    create() {
        // Background.
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        // this.background.setInteractive();
        // this.background.on("pointerdown", this.onButtonDown, this);

        // Images.
        this.logo = this.add.image(1150, 80, "logo");
        this.logo.scaleX = 0.15;
        this.logo.scaleY = 0.15;

        this.dingSound = this.sound.add("ding");
        this.buzzerSound = this.sound.add("buzzer");

        // Text.
        this.text1 = this.add.text(10, 40, "Finding Perimeter", { fontFamily: "Arial", fontSize: "60px" });
        this.text2 = this.add.text(400, game.config.height - 50, "Drag the shape into the correct box.", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });

        // Sprites
        // this.shark02 = this.add.image(-45, 200, "shark02");
        // this.shark02.scaleX = 1;
        // this.shark02.scaleY = 1;

        // Dragonbones animation
        this.sharkAnimation2 = this.add.armature("Armature", "shark04");  // create armature, the second argument should use the name you set when load your db file in preload method, but it's actually optional, so just ignore it if you like.
        this.sharkAnimation2.animation.play("animtion0");   // play animation
        this.sharkAnimation2.x = -45;
        this.sharkAnimation2.y = 200;

        // Animation
        this.tweens.add({ targets: this.sharkAnimation2, duration: 1000, x: game.config.width / 5 });

        //  A drop zone
        var zone1 = this.add.zone(1040, 300, 360, 200).setRectangleDropZone(360, 200);
        this.dottedRect1 = this.add.image(1040, 300, "dotted-rect");
        this.dottedRect1.scaleX = 0.16;
        this.dottedRect1.scaleY = 0.2;
        this.zone1Rect = new Phaser.Geom.Rectangle(860, 200, 360, 200);

        var zone2 = this.add.zone(1040, 550, 360, 200).setRectangleDropZone(360, 200);
        this.dottedRect1 = this.add.image(1040, 550, "dotted-rect");
        this.dottedRect1.scaleX = 0.16;
        this.dottedRect1.scaleY = 0.2;
        this.zone2Rect = new Phaser.Geom.Rectangle(860, 450, 360, 200);

        // Drop zones graphics
        //   var dropZone1 = this.add.graphics();
        //  dropZone1.lineStyle(6, 0x000000);
        //   dropZone1.strokeRect(zone1.x - zone1.input.hitArea.width / 2, zone1.y - zone1.input.hitArea.height / 2, zone1.input.hitArea.width, zone1.input.hitArea.height);

        // var dropZone2 = this.add.graphics();
        // dropZone2.lineStyle(6, 0x000000);
        // dropZone2.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);


        this.header1 = this.add.graphics();
        this.header1.lineStyle(6, 0x000000);
        this.header1.fillStyle(0x4472c4);
        this.header1.strokeRect(900, 170, 280, 40);
        this.header1.fillRect(900, 170, 280, 40);

        this.header2 = this.add.graphics();
        this.header2.lineStyle(6, 0x000000);
        this.header2.fillStyle(0x4472c4);
        this.header2.strokeRect(900, 420, 280, 40);
        this.header2.fillRect(900, 420, 280, 40);

        this.text13 = this.add.text(960, 175, "Perimeter = 28", { fontFamily: "Arial", fontSize: "24px" });
        this.text14 = this.add.text(960, 425, "Perimeter = 30", { fontFamily: "Arial", fontSize: "24px" });

        // Shapes ---------
        // Square
        var square = this.add.graphics();
        square.lineStyle(6, 0x000000);
        square.fillStyle(0xffc000);
        square.strokeRect(0, 0, 120, 120);
        square.fillRect(0, 0, 120, 120);
        var squareText = this.add.text(-50, 46, "7m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        this.squareContainer = this.add.container(100, 300, [square, squareText]);
        this.squareContainer.name = "squareContainer";
        this.squareContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 120, 120), Phaser.Geom.Rectangle.Contains);
        this.squareContainerGeom = new Phaser.Geom.Rectangle(this.squareContainer.x, this.squareContainer.y, 120, 120);
        this.input.setDraggable(this.squareContainer);

        this.input.on('dragstart', function (pointer, squareContainer) {
            this.children.bringToTop(squareContainer);
        }, this);
        this.input.on('drag', function (pointer, squareContainer, dragX, dragY) {
            squareContainer.x = dragX;
            squareContainer.y = dragY;
        });
        this.input.on('dragenter', function (pointer, squareContainer, zone1) {
            //   dropZone1.lineStyle(6, 0x00ffff);
            //   dropZone1.strokeRect(zone1.x - zone1.input.hitArea.width / 2, zone1.y - zone1.input.hitArea.height / 2, zone1.input.hitArea.width, zone1.input.hitArea.height);
        });
        this.input.on('dragenter', function (pointer, squareContainer, zone2) {
            //  dropZone2.lineStyle(6, 0x00ffff);
            //   dropZone2.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
        });
        this.input.on('dragleave', function (pointer, squareContainer, zone1) {
            //   dropZone1.lineStyle(6, 0x000000);
            //   dropZone1.strokeRect(zone1.x - zone1.input.hitArea.width / 2, zone1.y - zone1.input.hitArea.height / 2, zone1.input.hitArea.width, zone1.input.hitArea.height);
        });
        this.input.on('dragleave', function (pointer, squareContainer, zone2) {
            //    dropZone2.lineStyle(6, 0x000000);
            //    dropZone2.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
        });


        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.name == "squareContainer") {
                gameObject.x = dropZone.x - 60;
                gameObject.y = dropZone.y - 60;

                if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone1Rect, this.squareContainerGeom)) {
                    this.dingSound.play();
                }
                else {
                    this.buzzerSound.play();
                }
            }
            else if (gameObject.name == "rectContainer") {
                gameObject.x = dropZone.x - 120;
                gameObject.y = dropZone.y - 50;

                if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone2Rect, this.rectContainerGeom)) {
                    this.dingSound.play();
                }
                else {
                    this.buzzerSound.play();
                }
            }
            else if (gameObject.name == "triangleContainer") {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;

                if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone1Rect, this.triangleContainerGeom)) {
                    this.dingSound.play();
                }
                else {
                    this.buzzerSound.play();
                }
            }
            else if (gameObject.name == "pentagonContainer") {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;

                if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone2Rect, this.pentagonContainerGeom)) {
                    this.dingSound.play();
                }
                else {
                    this.buzzerSound.play();
                }
            }
        }, this);



        // Rectangle
        var rectangle = this.add.graphics();
        rectangle.lineStyle(6, 0x000000);
        rectangle.fillStyle(0xa8d08c);
        rectangle.strokeRect(0, 0, 240, 100);
        rectangle.fillRect(0, 0, 240, 100);
        var rectText1 = this.add.text(-50, 36, "5m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var rectText2 = this.add.text(90, -35, "10m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        this.rectContainer = this.add.container(500, 500, [rectangle, rectText1, rectText2]);
        this.rectContainer.name = "rectContainer";
        this.rectContainerGeom = new Phaser.Geom.Rectangle(this.rectContainer.x, this.rectContainer.y, 240, 100);
        // this.graphics1 = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        // this.graphics1.fillRectShape(this.rectContainerGeom);
        this.rectContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 240, 100), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(this.rectContainer);
        this.input.on('dragstart', function (pointer, rectContainer) {
            this.children.bringToTop(rectContainer);
        }, this);

        this.input.on('drag', function (pointer, rectContainer, dragX, dragY) {
            rectContainer.x = dragX;
            rectContainer.y = dragY;
        });

        var triangle = this.add.triangle(0, 0, 50, 0, 100, 200, 0, 200, 0xed7d31);
        triangle.setStrokeStyle(3, 0x000000);
        var triangleText1 = this.add.text(-90, 0, "11m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var triangleText2 = this.add.text(30, 0, "11m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var triangleText3 = this.add.text(-20, 100, "6m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        this.triangleContainer = this.add.container(480, 330, [triangle, triangleText1, triangleText2, triangleText3]);
        this.triangleContainer.name = "triangleContainer";
        this.triangleContainerGeom = new Phaser.Geom.Rectangle(this.triangleContainer.x - 50, this.triangleContainer.y - 100, 100, 200);
        this.triangleContainer.setInteractive(new Phaser.Geom.Rectangle(-50, -100, 100, 200), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(this.triangleContainer);
        this.input.on('dragstart', function (pointer, triangleContainer) {
            this.children.bringToTop(triangleContainer);
        }, this);
        this.input.on('drag', function (pointer, triangleContainer, dragX, dragY) {
            triangleContainer.x = dragX;
            triangleContainer.y = dragY;
        });

        var data = [60, 0, 120, 50, 100, 120, 20, 120, 0, 50];
        var pentagon = this.add.polygon(0, 0, data, 0x9966ff, 1);
        pentagon.setStrokeStyle(3, 0x000000);
        var pentagonText1 = this.add.text(-80, -60, "6m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var pentagonText2 = this.add.text(40, -60, "6m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var pentagonText3 = this.add.text(50, 20, "6m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var pentagonText4 = this.add.text(-20, 60, "6m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        var pentagonText5 = this.add.text(-90, 20, "6m", { fontFamily: "Arial", fontSize: "28px", fontStyle: "bold" });
        this.pentagonContainer = this.add.container(680, 300, [pentagon, pentagonText1, pentagonText2, pentagonText3, pentagonText4, pentagonText5]);
        this.pentagonContainer.name = "pentagonContainer";
        this.pentagonContainerGeom = new Phaser.Geom.Rectangle(this.pentagonContainer.x - 60, this.pentagonContainer.y - 60, 120, 120);
        this.pentagonContainer.setInteractive(new Phaser.Geom.Rectangle(-60, -60, 120, 120), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(this.pentagonContainer);
        this.input.on('dragstart', function (pointer, pentagonContainer) {
            this.children.bringToTop(pentagonContainer);
        }, this);
        this.input.on('drag', function (pointer, pentagonContainer, dragX, dragY) {
            pentagonContainer.x = dragX;
            pentagonContainer.y = dragY;
        });

    }

    update() {
        this.squareContainerGeom.x = this.squareContainer.x;
        this.squareContainerGeom.y = this.squareContainer.y;
        this.rectContainerGeom.x = this.rectContainer.x;
        this.rectContainerGeom.y = this.rectContainer.y;
        this.triangleContainerGeom.x = this.triangleContainer.x - 50;
        this.triangleContainerGeom.y = this.triangleContainer.y - 100;
        this.pentagonContainerGeom.x = this.pentagonContainer.x - 50;
        this.pentagonContainerGeom.y = this.pentagonContainer.y - 100;

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone1Rect, this.squareContainerGeom)) {
            this.isSquareCorrect = true;
        }
        else {
            this.isSquareCorrect = false;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone2Rect, this.rectContainerGeom)) {
            this.isRectCorrect = true;
        }
        else {
            this.isRectCorrect = false;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone1Rect, this.triangleContainerGeom)) {
            this.isTriangleCorrect = true;
        }
        else {
            this.isTriangleCorrect = false;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.zone2Rect, this.pentagonContainerGeom)) {
            this.isPentagonCorrect = true;
        }
        else {
            this.isPentagonCorrect = false;
        }

        if (this.isSquareCorrect && this.isRectCorrect && this.isTriangleCorrect && this.isPentagonCorrect) {

            if (this.hasAudioStarted == false) {
                this.correct();
            }
            //this.scene.start("Page7Scene");
        }
    }

    correct() {
        this.hasAudioStarted = true;
        this.correctAudioSound = this.sound.add("p6CorrectAudio");

        this.correctAudioSound.on('complete', () => { this.scene.start("Page7Scene") });
        this.correctAudioSound.play();
    }
}