"use strict";

// * NoUI Control
class NoUIControl {
    constructor(params) {
        // arr for sliders
        this.sliders = [];
        // arr for sliders values default
        this.sliderValuesDefault = {
            price: "",
            carat: "",
            cut: "",
            color: "",
            clarity: "",
            lwRatio: "",
            symmetry: "",
            polish: "",
            fluour: "",
            table: "",
            depth: "",
            length: "",
            width: "",
            depthMM: "",
        };
        // is equal
        this.isEqual = {
            price: true,
            carat: true,
            cut: true,
            color: true,
            clarity: true,
            lwRatio: true,
            symmetry: true,
            polish: true,
            fluour: true,
            table: true,
            depth: true,
            length: true,
            width: true,
            depthMM: true,
        };
        // text info
        this.text = document.querySelectorAll(params.text);
        // reset button
        this.reset = document.querySelector(params.reset);
        // reset event
        this.resetFilter();
        // comparison bool
        this.sliderCompare = true;
        this.checkboxCompare = true;
        // debug
        if (params !== undefined) {
            this.debug = params.debug;
            if (this.debug === true) {
                this.debuging();
            }
        }
    }
    // debuging
    debuging(log = this) {
        console.log(log);
    }
    // get sliders
    pushSlider(obj) {
        // push slider
        this.sliders.push(obj);
        // get value name
        let valueName = obj.target.getAttribute("data-slider");
        // set value name in default value
        for (let name in this.sliderValuesDefault) {
            if (name === valueName) {
                this.sliderValuesDefault[name] = obj.get();
            }
        }
    }
    // update sluders values
    update() {
        // arr for sliders values
        this.sliderValues = {
            price: "",
            carat: "",
            cut: "",
            color: "",
            clarity: "",
            lwRatio: "",
            symmetry: "",
            polish: "",
            fluour: "",
            table: "",
            depth: "",
            length: "",
            width: "",
            depthMM: "",
        };
        // get new values
        this.sliders.forEach((slider) => {
            let name = slider.target.getAttribute("data-slider");
            for (let value in this.sliderValues) {
                if (name === value) {
                    this.sliderValues[name] = slider.get();
                }
            }
        });
        // debug
        if (this.debug === true) {
            this.debuging();
        }
        // comparison values
        this.comparison();
        // update event
        this.updateEvent();
        // return
        return this;
    }
    // checkbox update
    updateCheckbox(params) {
        // checkbox elements
        this.checkbox = params.checkbox;
        // checkbox values default
        this.checkboxValueDefault = params.checkboxValueDefault;
        // checkbox values updates
        this.checkboxValue = params.checkboxValue;
        // checkbox compare values
        this.checkboxCompare = params.checkboxCompare;
        // update event
        this.updateEvent();
    }
    // slider comparison
    comparison() {
        // bool for slider compare
        this.sliderCompare = true;
        // comparison
        for (let name in this.sliderValuesDefault) {
            // old + new values
            let oldValue = this.sliderValuesDefault[name];
            let newValue = this.sliderValues[name];
            // compare
            for (let i = 0; i < oldValue.length; i++) {
                if (oldValue[i] !== newValue[i]) {
                    this.sliderCompare = false;
                }
            }
        }
    }
    // update function
    updateEvent() {
        if (this.checkboxCompare === false || this.sliderCompare === false) {
            this.reset.classList.remove("hidden");
            this.reset.removeAttribute("disabled");
        } else if (
            this.checkboxCompare === true &&
            this.sliderCompare === true
        ) {
            this.reset.classList.add("hidden");
            this.reset.setAttribute("disabled", null);
        }
    }
    // reset filters
    resetFilter() {
        this.reset.addEventListener("click", () => {
            // reset checkbox
            if (this.checkbox !== undefined) {
                this.checkbox.forEach((chb) => {
                    chb.checked = false;
                });
                this.checkboxCompare = true;
            }
            // reset noUI
            this.sliders.forEach((slider) => {
                slider.reset();
            });
            // hide reset button
            this.reset.classList.add("hidden");
            this.reset.setAttribute("disabled", null);
        });
    }
    // text info
    textInfo(name, value, pips) {
        // get old value
        let oldValue = this.sliderValuesDefault[name];
        // create bool var
        let bool = true;
        // compare values
        for (let i = 0; i < oldValue.length; i++) {
            if (oldValue[i] !== value[i]) {
                bool = false;
            }
        }
        // set bool to equal
        if (bool === false) {
            this.isEqual[name] = false;
        } else if (bool === true) {
            this.isEqual[name] = true;
        }
        // set text info
        if (this.isEqual[name] === false) {
            this.text.forEach((elem) => {
                if (elem.getAttribute("data-slider-info") === name) {
                    elem.classList.add("active");
                    if (pips === undefined) {
                        elem.textContent = `${this.sliderValues[name][0]} - ${this.sliderValues[name][1]}`;
                    } else if (pips !== undefined) {
                        // get length
                        let start = this.sliderValues[name][0] - 1;
                        let end = this.sliderValues[name][1] - 1;
                        // clear text info
                        elem.textContent = "";
                        // set text content to text elem
                        pips.forEach((pip, i) => {
                            if (i >= start && i <= end) {
                                if (i !== end) {
                                    elem.textContent += `${pip} | `;
                                } else if (i === end) {
                                    elem.textContent += `${pip}`;
                                }
                            }
                        });
                    }
                }
            });
        }
        // clear text info
        else if (this.isEqual[name] === true) {
            this.text.forEach((elem) => {
                if (elem.getAttribute("data-slider-info") === name) {
                    elem.classList.remove("active");
                    elem.textContent = "";
                }
            });
        }
    }
}
// * NoUI
class NoUI {
    constructor(params) {
        // init items
        this.slider = this.getElement(params.slider);
        // settings for noUiSlider
        this.settings = params.settings;
        // pips items
        this.pips = params.pips;
        // pips values
        this.pipsName = params.pipsName;
        // controll object
        this.control = params.control;
        // this inputs
        this.inputs = params.inputs;
        if (this.inputs !== undefined) {
            this.inputMin = this.getElement(this.inputs.min);
            this.inputMax = this.getElement(this.inputs.max);
        }
        // text info items
        this.textItems = document.querySelectorAll(params.text);
    }
    // debuging
    debuging(log = this) {
        console.log(log);
    }
    // get elements from DOM
    getElement(selector, parent = document) {
        // get element from parent
        const elemets = parent.querySelector(selector);
        return elemets;
    }
    // create
    create() {
        // create noUiSlider
        this.noUI = noUiSlider.create(this.slider, this.settings);
        // push noUI to control obj
        if (this.control !== undefined) {
            this.control.pushSlider(this.noUI);
        }
        // create noUI event
        this.noUI.on("update", () => {
            // set inputs if inputs is defined
            if (this.inputs !== undefined) {
                // set value in input
                this.inputMin.value = this.noUI.get()[0];
                this.inputMax.value = this.noUI.get()[1];
                // input min onchange
                this.inputMin.addEventListener("change", () => {
                    // get input value
                    this.valueMin = this.inputMin.value;
                    // remove $ prefix
                    if (Number.isNaN(Number(this.valueMin))) {
                        this.valueMin = this.valueMin.slice(
                            0,
                            this.valueMin.length - 1
                        );
                    }
                    // set value to noUI
                    this.noUI.set([this.valueMin, null]);
                });
                // input max onchange
                this.inputMax.addEventListener("change", () => {
                    // get input value
                    this.valueMax = this.inputMax.value;
                    // remove $ prefix
                    if (Number.isNaN(Number(this.valueMax))) {
                        this.valueMax = this.valueMax.slice(
                            0,
                            this.valueMax.length - 1
                        );
                    }
                    // set value to noUI
                    this.noUI.set([null, this.valueMax]);
                });
            }
            // control function
            if (this.control !== undefined) {
                this.control.update();
                // text info
                this.control.textInfo(
                    this.noUI.target.getAttribute("data-slider"),
                    this.noUI.get(),
                    this.pipsName
                );
            }
        });
        // if pips is defined
        if (this.pips !== undefined) {
            // get pips from this slider
            this.pips = this.slider.querySelectorAll(this.pips);
            // set values to pips
            if (this.pipsName !== undefined) {
                this.pips.forEach((pip, i) => {
                    pip.textContent = this.pipsName[i];
                });
            }
        }
        // return this
        return this;
    }
}
// * checkboxes updates
class Checkbox {
    constructor(params) {
        // get checkboxes
        this.checkbox = document.querySelectorAll(params.checkbox);
        // control obj
        this.control = params.control;
        // debug
        if (params.debug === true) {
            this.debuging();
        }
    }
    // debug
    debuging(log = this) {
        console.log(log);
    }
    // update
    update() {
        // create arr for new values
        this.checkboxValue = [];
        // get nev values
        this.checkbox.forEach((chb) => {
            this.checkboxValue.push(chb.checked);
        });
    }
    // comparison
    comparison() {
        // bool var for compare
        this.checkboxCompare = true;
        // compare values
        this.checkboxValueDefault.forEach((value, i) => {
            if (value !== this.checkboxValue[i]) {
                this.checkboxCompare = false;
            }
        });
        // return info
        return this;
    }
    // create obj
    create() {
        // create arr for default values
        this.checkboxValueDefault = [];
        // get default values
        this.checkbox.forEach((chb) => {
            this.checkboxValueDefault.push(chb.checked);
        });
        // add event listener
        this.checkbox.forEach((chb) => {
            chb.addEventListener("input", () => {
                // update values
                this.update();
                // compare values
                this.comparison();
                // send this to control
                this.control.updateCheckbox(this);
            });
        });
        // return
        return this;
    }
}
// @ DOM Content loaded
document.addEventListener("DOMContentLoaded", () => {
    // ? noUI Control ---------------------------------------------------
    const noUIControl = new NoUIControl({
        reset: "#reset-filter",
        text: "[data-slider-info]",
    });

    // @ noUI Number Sliders --------------------------------------------
    function noUINumber() {
        // * -------------------------------------------------- Price noUI
        const priceParams = {
            control: noUIControl,
            slider: "#price-range",
            type: "number",
            inputs: {
                min: "#input-price-min",
                max: "#input-price-max",
            },
            settings: {
                start: [117, 53030],
                connect: true,
                step: 1,
                tooltips: true,
                range: {
                    min: 117,
                    max: 53030,
                },
                format: {
                    to: function (value) {
                        return parseInt(value) + "$";
                    },
                    from: function (value) {
                        return parseInt(value);
                    },
                },
            },
        };
        const price = new NoUI(priceParams).create();

        // * -------------------------------------------------- Carat noUI
        const caratParams = {
            control: noUIControl,
            slider: "#carat-range",
            inputs: {
                min: "#input-carat-min",
                max: "#input-carat-max",
            },
            settings: {
                start: [0.32, 5.55],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 0.32,
                    max: 5.55,
                },
            },
        };
        const carat = new NoUI(caratParams).create();

        // * -------------------------------------------------- Lw-Ratio noUI

        const lwRatioParams = {
            control: noUIControl,
            slider: "#lw-ratio-range",
            inputs: {
                min: "#input-lw-ratio-min",
                max: "#input-lw-ratio-max",
            },
            settings: {
                start: [0.32, 5.55],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 0.32,
                    max: 5.55,
                },
            },
        };
        const lwRatio = new NoUI(lwRatioParams).create();

        // * -------------------------------------------------- Table noUI

        const tableParams = {
            control: noUIControl,
            inputs: {
                min: "#input-table-min",
                max: "#input-table-max",
            },
            slider: "#table-range",
            settings: {
                start: [53.0, 76.0],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 53.0,
                    max: 76.0,
                },
            },
        };
        const table = new NoUI(tableParams).create();

        // * -------------------------------------------------- Depth noUI

        const depthParams = {
            control: noUIControl,
            inputs: {
                min: "#input-depth-min",
                max: "#input-depth-max",
            },
            slider: "#depth-range",
            settings: {
                start: [56.0, 76.0],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 56.0,
                    max: 76.0,
                },
            },
        };
        const depth = new NoUI(depthParams).create();

        // * -------------------------------------------------- Length noUI

        const lengthParams = {
            control: noUIControl,
            inputs: {
                min: "#input-length-min",
                max: "#input-length-max",
            },
            slider: "#length-range",
            settings: {
                start: [0.0, 15.0],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 0.0,
                    max: 15.0,
                },
            },
        };
        const length = new NoUI(lengthParams).create();

        // * -------------------------------------------------- Width noUI

        const widthParams = {
            control: noUIControl,
            inputs: {
                min: "#input-width-min",
                max: "#input-width-max",
            },
            slider: "#width-range",
            settings: {
                start: [0.0, 15.0],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 0.0,
                    max: 15.0,
                },
            },
        };
        const width = new NoUI(widthParams).create();

        // * -------------------------------------------------- DepthMM noUI

        const depthmmParams = {
            control: noUIControl,
            inputs: {
                min: "#input-depth-mm-min",
                max: "#input-depth-mm-max",
            },
            slider: "#depth-mm-range",
            settings: {
                start: [0.0, 8.0],
                connect: true,
                step: 0.01,
                tooltips: true,
                range: {
                    min: 0.0,
                    max: 8.0,
                },
            },
        };
        const depthmm = new NoUI(depthmmParams).create();
    }
    noUINumber();

    // @ noUI Text Sliders ----------------------------------------------
    function noUIText() {
        // * -------------------------------------------------- Cut noUI
        const cutParams = {
            control: noUIControl,
            slider: "#cut-range",
            text: "[data-slider-info]",
            tooltips: true,
            pips: ".noUi-value",
            pipsName: ["Fair", "Good", "Very Good", "Ideal", "Super Ideal"],
            settings: {
                start: [1, 5],
                connect: true,
                step: 1,
                range: {
                    min: 1,
                    max: 5,
                },
                pips: {
                    mode: "positions",
                    values: [1, 25, 50, 75, 96],
                    density: 1,
                    steped: true,
                },
            },
        };
        const cut = new NoUI(cutParams).create();

        // * -------------------------------------------------- Color noUI
        const colorParams = {
            control: noUIControl,
            slider: "#color-range",
            tooltips: true,
            pips: ".noUi-value",
            pipsName: ["M", "L", "K", "J", "I", "H", "G", "F", "E", "D"],
            settings: {
                start: [1, 10],
                connect: true,
                step: 1,
                range: {
                    min: 1,
                    max: 10,
                },
                pips: {
                    mode: "count",
                    values: 10,
                    density: 1,
                },
            },
        };
        const color = new NoUI(colorParams).create();

        // * -------------------------------------------------- Clarity noUI
        const clarityParams = {
            control: noUIControl,
            slider: "#clarity-range",
            tooltips: true,
            pips: ".noUi-value",
            pipsName: [
                "I2",
                "I1",
                "SI2",
                "SI1",
                "VS2",
                "VS1",
                "VVS2",
                "VVS1",
                "IF",
                "FI",
            ],
            settings: {
                start: [1, 10],
                connect: true,
                step: 1,
                range: {
                    min: 1,
                    max: 10,
                },
                pips: {
                    mode: "count",
                    values: 10,
                    density: 1,
                },
            },
        };
        const clarity = new NoUI(clarityParams).create();

        // * -------------------------------------------------- Symmetry noUI
        const symmetryParams = {
            control: noUIControl,
            slider: "#symmetry-range",
            tooltips: true,
            pips: ".noUi-value",
            pipsName: ["Good", "Very Good", "Excellent"],
            settings: {
                start: [1, 3],
                connect: true,
                step: 1,
                range: {
                    min: 1,
                    max: 3,
                },
                pips: {
                    mode: "positions",
                    values: [2, 50, 96],
                    density: 1,
                },
            },
        };
        const symmetry = new NoUI(symmetryParams).create();

        // * -------------------------------------------------- Polish noUI
        const polishParams = {
            control: noUIControl,
            slider: "#polish-range",
            tooltips: true,
            pips: ".noUi-value",
            pipsName: ["Good", "Very Good", "Excellent"],
            settings: {
                start: [1, 3],
                connect: true,
                step: 1,
                range: {
                    min: 1,
                    max: 3,
                },
                pips: {
                    mode: "positions",
                    values: [2, 50, 96],
                    density: 1,
                },
            },
        };
        const polish = new NoUI(polishParams).create();

        // * -------------------------------------------------- Fluour noUI
        const fluourParams = {
            control: noUIControl,
            slider: "#fluor-range",
            tooltips: true,
            pips: ".noUi-value",
            pipsName: ["Very Strong", "Strong", "Medium", "Faint", "None"],
            settings: {
                start: [1, 5],
                connect: true,
                step: 1,
                range: {
                    min: 1,
                    max: 5,
                },
                pips: {
                    mode: "positions",
                    values: [5, 27, 51, 76, 98],
                    density: 1,
                },
            },
        };
        const fluour = new NoUI(fluourParams).create();
    }
    noUIText();

    // @ diamond shape --------------------------------------------------
    const diamondShape = new Checkbox({
        checkbox: ".diamond-filter-chb",
        control: noUIControl,
    });
    diamondShape.create();
});
