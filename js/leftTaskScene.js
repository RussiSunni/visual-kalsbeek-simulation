class LeftTaskScene extends Phaser.Scene {
    constructor() {
        super('LeftTaskScene');
        this.leftSideRect;
        this.toneArray = [];
        this.currentTone;
        this.barTimedEvent;
        this.toneTimedEvent;
        this.WKey;
        this.SKey;
        this.XKey;
        this.gameOver = false;
        this.hasWon = false;
        this.gameOverAudio;
        this.gameOverAudioIteration = 0;
        this.winTimer;
        this.winText;
        this.lRiseRate;
        this.lDropRate;
        this.lPenaltyRate;
    }

    init(data) {
        this.lRiseRate = parseInt(data.l_bar_up_rate);
        this.lDropRate = parseInt(data.l_bar_down_rate);
        this.lPenaltyRate = parseInt(data.l_bar_penalty_rate);
    }

    preload() {
        this.load.audio("gameOver", ["audio/game-over.wav"]);
    }
    create() {
        // Bar.
        this.leftSideRect = this.add.graphics();
        this.leftSideRect.fillStyle(0x0000FF);
        this.leftSideRect.fillRect(200, 400, 100, 600);
        this.barTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseBar, callbackScope: this, loop: true });

        // Tones -----------------------.        
        // Tone Timer.
        this.toneTimedEvent = this.time.addEvent({ delay: 50, callback: this.changeLetter, callbackScope: this, loop: true });

        // Keyboard Keys.
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.XKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        // Audio
        this.gameOverAudio = this.sound.add("gameOver");
        this.gameOverAudio.on("complete", this.repeatAudio, this);

        // Win State------------------------------------
        this.winTimer = this.time.delayedCall(40000, this.winEvent, [], this);

        this.winText = this.add.text(100, 100, "Congratulations", { fontFamily: "Arial", fontSize: "80px" });
        this.winText.alpha = 0;
    }

    update() {
        // Test for Correct Key.
        if (this.hasWon == false && this.gameOver == false) {
            if (Phaser.Input.Keyboard.JustDown(this.WKey)) {
                if (this.currentTone == "a") {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.leftSideRect.y - this.lPenaltyRate > -400)
                        this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                    else
                        this.leftSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
                if (this.currentTone == "b") {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.leftSideRect.y - this.lPenaltyRate > -400)
                        this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                    else
                        this.leftSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.XKey)) {
                if (this.currentTone == "c") {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.leftSideRect.y - this.lPenaltyRate > -400)
                        this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                    else
                        this.leftSideRect.y = -400
                }
            }
        }
    }

    changeLetter() {
        if (this.gameOver == false && this.hasWon == false) {
            //this.letterText.text = this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)];
            //this.currentTone = this.letterText.text;
        }
    }

    raiseBar() {
        // Bar rising.
        if (this.leftSideRect.y > -400 && this.hasWon == false && this.gameOver == false) {
            this.leftSideRect.y = this.leftSideRect.y - this.lRiseRate;
        }
        else if (this.hasWon == false) {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.gameOverAudio.play();
            }
        }
    }

    gameOver() {

    }

    winEvent() {
        if (this.gameOver == false) {
            this.winText.alpha = 1;
            this.hasWon = true;
        }
    }

    repeatAudio() {
        if (this.gameOverAudioIteration < 4) {
            this.gameOverAudioIteration++;
            this.gameOverAudio.play();
        }
    }
}