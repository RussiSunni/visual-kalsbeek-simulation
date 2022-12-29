class BothTasksScene extends Phaser.Scene {
    constructor() {
        super('BothTasksScene');
        this.leftSideRect;
        this.rightSideRect;
        this.toneArray;
        this.currentTone;
        this.letterTextArray = ["a", "b", "c"];
        this.currentLetter;
        this.leftBarTimedEvent;
        this.rightBarTimedEvent;
        this.WKey;
        this.SKey;
        this.XKey;
        this.MKey;
        this.COMMAKey;
        this.PERIODKey;
        this.gameOver = false;
        this.hasWon = false;
        //   this.gameOverAudio;
        //   this.gameOverAudioIteration = 0;
        this.winTimer;
        this.winText;
        this.lRiseRate;
        this.lDropRate;
        this.lPenaltyRate;
        this.rRiseRate;
        this.rDropRate;
        this.rPenaltyRate;
    }

    init(data) {
        this.lRiseRate = parseFloat(data.l_bar_up_rate);
        this.lDropRate = parseFloat(data.l_bar_down_rate);
        this.lPenaltyRate = parseFloat(data.l_bar_penalty_rate);
        this.rRiseRate = parseFloat(data.r_bar_up_rate);
        this.rDropRate = parseFloat(data.r_bar_down_rate);
        this.rPenaltyRate = parseFloat(data.r_bar_penalty_rate);
    }

    preload() {
        //    this.load.audio("gameOver", ["audio/game-over.wav"]);
        this.load.audio("tone200hz", ["audio/200.wav"]);
        this.load.audio("tone500hz", ["audio/500.wav"]);
        this.load.audio("tone800hz", ["audio/800.wav"]);
        this.load.audio("lose", ["audio/glass-smash.wav"]);
    }
    create() {
        // Left Side Task.
        // Bar.
        this.leftSideRect = this.add.graphics();
        this.leftSideRect.fillStyle(0x0000FF);
        this.leftSideRect.fillRect(100, 400, 100, 600);
        this.leftBarTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseLeftBar, callbackScope: this, loop: true });

        // Tones -----------------------.        
        this.tone200hzAudio = this.sound.add("tone200hz");
        this.tone500hzAudio = this.sound.add("tone500hz");
        this.tone800hzAudio = this.sound.add("tone800hz");
        this.toneArray = [this.tone200hzAudio, this.tone500hzAudio, this.tone800hzAudio];
        this.currentTone = this.toneArray[Math.floor(Math.random() * this.toneArray.length)];
        this.currentTone.play();

        // Keyboard Keys.
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.XKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        // Right Side Task.
        // Bar.
        this.rightSideRect = this.add.graphics();
        this.rightSideRect.fillStyle(0xFF0000);
        this.rightSideRect.fillRect(600, 400, 100, 600);
        this.rightBarTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseRightBar, callbackScope: this, loop: true });

        // Letters -----------------------.
        this.letterText = this.add.text(350, 200, this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)], { fontFamily: "Arial", fontSize: "168px" });
        this.currentLetter = this.letterText.text;

        // Keyboard Keys.
        this.MKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.COMMAKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.PERIODKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);

        // Both Tasks.
        // Audio
        //  this.gameOverAudio = this.sound.add("gameOver");
        //  this.gameOverAudio.on("complete", this.repeatAudio, this);
        this.loseAudio = this.sound.add("lose");

        // Win State------------------------------------
        this.winTimer = this.time.delayedCall(40000, this.winEvent, [], this);
        this.winText = this.add.text(100, 100, "Congratulations", { fontFamily: "Arial", fontSize: "80px" });
        this.winText.alpha = 0;

        // Play Again Button --------------------------------
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 180, 60, 8);
        var text1 = this.add.text(20, 15, "Play Again", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 500, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.alpha = 0;
        this.container1.disableInteractive()
        this.container1.on('pointerover', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x5d913a, 1);
            roundedRect1.fillRoundedRect(0, 0, 180, 60, 8);
        }, this);
        this.container1.on('pointerout', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x70ad47, 1);
            roundedRect1.fillRoundedRect(0, 0, 180, 60, 8);
        }, this);
        this.container1.on('pointerdown', function () {
            this.scene.start("MenuScene");
        }, this);
    }

    update() {
        // Test for Correct Key.
        if (this.hasWon == false && this.gameOver == false) {
            if (Phaser.Input.Keyboard.JustDown(this.WKey)) {
                if (this.currentTone == this.toneArray[0]) {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.changeToneTimer = this.time.delayedCall(25, this.changeTone, [], this);
                }
                else {
                    if (this.leftSideRect.y - this.lPenaltyRate > -400)
                        this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                    else
                        this.leftSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
                if (this.currentTone == this.toneArray[1]) {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.changeToneTimer = this.time.delayedCall(25, this.changeTone, [], this);
                }
                else {
                    if (this.leftSideRect.y - this.lPenaltyRate > -400)
                        this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                    else
                        this.leftSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.XKey)) {
                if (this.currentTone == this.toneArray[2]) {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.changeToneTimer = this.time.delayedCall(25, this.changeTone, [], this);
                }
                else {
                    if (this.leftSideRect.y - this.lPenaltyRate > -400)
                        this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                    else
                        this.leftSideRect.y = -400
                }
            }

            if (Phaser.Input.Keyboard.JustDown(this.MKey)) {
                if (this.currentLetter == "a") {
                    this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.rightSideRect.y - this.rPenaltyRate > -400)
                        this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                    else
                        this.rightSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.COMMAKey)) {
                if (this.currentLetter == "b") {
                    this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.rightSideRect.y - this.rPenaltyRate > -400)
                        this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                    else
                        this.rightSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.PERIODKey)) {
                if (this.currentLetter == "c") {
                    this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.rightSideRect.y - this.rPenaltyRate > -400)
                        this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                    else
                        this.rightSideRect.y = -400
                }
            }
        }

        if (this.leftSideRect.y < -400) {
            this.leftSideRect.y = -400;
        }
        if (this.rightSideRect.y < -400) {
            this.rightSideRect.y = -400;
        }
    }

    changeTone() {
        if (this.gameOver == false && this.hasWon == false) {
            this.currentTone = this.toneArray[Math.floor(Math.random() * this.toneArray.length)];
            this.currentTone.play();
        }
    }

    changeLetter() {
        if (this.gameOver == false && this.hasWon == false) {
            this.letterText.text = this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)];
            this.currentLetter = this.letterText.text;
        }
    }

    raiseLeftBar() {
        // Bar rising.
        if (this.leftSideRect.y > -400 && this.hasWon == false && this.gameOver == false) {
            this.leftSideRect.y = this.leftSideRect.y - this.lRiseRate;
        }
        else if (this.hasWon == false) {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.loseAudio.play();
                this.container1.alpha = 1;
                this.container1.setInteractive()
            }
        }
    }

    raiseRightBar() {
        // Bar rising.
        if (this.rightSideRect.y > -400 && this.hasWon == false && this.gameOver == false) {
            this.rightSideRect.y = this.rightSideRect.y - this.rRiseRate;
        }
        else if (this.hasWon == false) {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.loseAudio.play();
                this.container1.alpha = 1;
                this.container1.setInteractive()
            }
        }
    }

    winEvent() {
        if (this.gameOver == false) {
            this.winText.alpha = 1;
            this.hasWon = true;

            this.container1.alpha = 1;
            this.container1.setInteractive()
        }
    }
}