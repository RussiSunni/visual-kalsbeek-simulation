class RightTaskScene extends Phaser.Scene {
    constructor() {
        super('RightTaskScene');
        this.rightSideRect;
        this.letterTextArray = ["a", "b", "c"];
        this.currentLetter;
        this.timedEvent;
        this.BKey;
        this.NKey;
        this.MKey;
        this.gameOver = false;
        this.gameOverAudio;
        this.gameOverAudioIteration = 0;
    }
    preload() {
        this.load.audio("gameOver", ["audio/game-over.wav"]);
    }
    create() {
        // Bar.
        this.rightSideRect = this.add.graphics();
        this.rightSideRect.fillStyle(0xFF0000);
        this.rightSideRect.fillRect(500, 400, 100, 600);

        // Letters -----------------------.
        this.letterText = this.add.text(350, 200, this.letterTextArray[0], { fontFamily: "Arial", fontSize: "168px" });

        // Letter Timer.
        this.timedEvent = this.time.addEvent({ delay: 500, callback: this.changeLetter, callbackScope: this, loop: true });

        // Keyboard Keys.
        this.BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.NKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.MKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // Audio
        this.gameOverAudio = this.sound.add("gameOver");
        this.gameOverAudio.on("complete", this.repeatAudio, this);

    }

    update() {
        // Bar rising.
        if (this.rightSideRect.y > -400) {
            this.rightSideRect.y--;
        }
        else {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.gameOverAudio.play();
            }
        }

        // Test for Correct Key.
        if (Phaser.Input.Keyboard.JustDown(this.BKey)) {
            if (this.currentLetter == "a") {
                this.rightSideRect.y = this.rightSideRect.y + 100;
            }
        }
        else if (Phaser.Input.Keyboard.JustDown(this.NKey)) {
            if (this.currentLetter == "b") {
                this.rightSideRect.y = this.rightSideRect.y + 100;
            }
        }
        else if (Phaser.Input.Keyboard.JustDown(this.MKey)) {
            if (this.currentLetter == "c") {
                this.rightSideRect.y = this.rightSideRect.y + 100;
            }
        }
    }

    changeLetter() {
        this.letterText.text = this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)];
        this.currentLetter = this.letterText.text;
    }

    gameOver() {

    }

    repeatAudio() {
        if (this.gameOverAudioIteration < 4) {
            this.gameOverAudioIteration++;
            this.gameOverAudio.play();
        }
    }
}