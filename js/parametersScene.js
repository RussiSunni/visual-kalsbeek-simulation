class ParametersScene extends Phaser.Scene {
    constructor() {
        super('ParametersScene');

    }
    preload() {
    }

    create() {

        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });

        var text1 = this.add.text(20, 15, "climb rate", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_up_rate");
        this.formUtil.scaleToGameW("r_bar_up_rate", .1);
        this.formUtil.placeElementAt(3, 'r_bar_up_rate', true);
        this.formUtil.addChangeCallback("r_bar_up_rate", this.textAreaChanged, this);

        var text2 = this.add.text(20, 70, "drop rate", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_down_rate");
        this.formUtil.scaleToGameW("r_bar_down_rate", .1);
        this.formUtil.placeElementAt(14, 'r_bar_down_rate', true);
        this.formUtil.addChangeCallback("r_bar_down_rate", this.textAreaChanged, this);


    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("r_bar_up_rate");
        console.log(text);
    }


    update() { }

}