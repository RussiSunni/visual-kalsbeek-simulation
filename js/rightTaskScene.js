class RightTaskScene extends Phaser.Scene {
    constructor() {
        super('RightTaskScene');
        this.rightSideRect;
        this.letterTextArray = ["a", "b", "c"];
        this.timedEvent;
    }
    preload() {

    }
    create() {

        // Right side
        this.rightSideRect = this.add.graphics();
        this.rightSideRect.fillStyle(0xFF0000);
        this.rightSideRect.fillRect(500, 400, 100, 600);

        this.letterText = this.add.text(350, 200, this.letterTextArray[0], { fontFamily: "Arial", fontSize: "168px" });

        // var timer = this.scene.time.addEvent({
        //     delay: 500,                // ms
        //     callback: callback,
        //     //args: [],
        //     callbackScope: thisArg,
        //     repeat: 4
        // });

        // function callback() {
        //     console.log("test")
        // }

        this.timedEvent = this.time.addEvent({ delay: 500, callback: this.onEvent, callbackScope: this, loop: true });

    }

    update() {
        if (this.rightSideRect.y > -400)
            this.rightSideRect.y--;
    }

    onEvent() {
        console.log("test")
    }
}