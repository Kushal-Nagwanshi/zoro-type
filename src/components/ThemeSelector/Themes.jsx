class Theme {
    constructor(primaryColor, untypedColor, wrongColor, correctColor) {
        this.primaryColor = primaryColor;
        this.untypedCOlor = untypedColor;
        this.wrongColor = wrongColor;
        this.correctColor = correctColor;
    }
}

export let Themes = {
    Luffy: {
        primary_color: "hsl(0, 89%, 61%)",
        correct_color: "hsl(0, 100%, 62%)",
        wrong_color:   "hsl(0, 0%, 0%)",
        untyped_color: "hsl(0, 32%, 76%)"
    },
    Zoro: {
        primary_color: "hsl(71,80%,69%)",
        correct_color: "hsl(71,80%,60%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(71,40%,75%)",
    },

    Nami: {
        primary_color: "hsl(32,100%,57%)",
        correct_color: "hsl(32,100%,60.6%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(37, 100%, 74%)",
    },

    Ussop: {
        primary_color: "hsl(28,74%,60%)",
        correct_color: "hsl(28,74%,70%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(28,20%,80%)",
    },

    Sanji: {
        primary_color: "hsl(57,99%,72%)",
        correct_color: "hsl(57,100%,67%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(57,30%,60%)"
    },

    Chopper: {
        primary_color: "hsl(354,74%,75%)",
        correct_color: "hsl(354, 100%, 81%)",
        wrong_color:   "hsl(14, 41%, 40%)",
        untyped_color: "hsl(354,20%,85%)"
    },
    Robin: {
        primary_color: "hsl(278,67%,74%)",
        correct_color: "hsl(278,70%,65%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(278,15%,84%)"
    },
    Franky: {
        primary_color: "hsl(179,100%,54%)",
        correct_color: "hsl(179, 60%, 67%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(179,20%,80%)"
    },
    Brook: {
        primary_color: "hsl(0, 0%, 95%)",
        correct_color: "hsl(0, 0%, 98%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(0, 0%, 60%)"
    },
    Jinbe: {
        primary_color: "hsl(204, 82%, 76%)",
        correct_color: "hsl(204, 82%, 66%)",
        wrong_color:   "hsl(0,72%,60%)",
        untyped_color: "hsl(204,20%,80%)"
    }
};
