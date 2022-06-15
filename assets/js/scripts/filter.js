"use strict";

// * DOM Content Loaded * //;
document.addEventListener("DOMContentLoaded", () => {
    // * -------------------------- filter drop down
    const filterDropDown = new ElementsControl({
        parent: '.diamonds-filter-container',
        manager: "#filter-more",
        managed: "#filter-acordion-body",
    });
    filterDropDown.toggler();

    // * -------------------------- filter more
    const filterMore = new ElementsControl({
        parent: filterDropDown.parent,
        manager: "#filter-more-btn",
        managed: "#filter-2",
    });
    filterMore.toggler();

    // * -------------------------- filter col
    const filterCol = new ElementsControl({
        parent: filterDropDown.parent,
        manager: ".filter-info",
        managed: ".filter-item",
    });
    filterCol.toggler({ single: true });

    // * -------------------------- filter show
    const filterShow = new ElementsControl({
        parent: filterDropDown.parent,
        manager: "#filters-container-toggler",
        managed: "#filters-container",
    });
    filterShow.toggler();

    // * -------------------------- filter hide
    const filterHide = new ElementsControl({
        parent: filterDropDown.parent,
        manager: "#filter-exit-btn",
        managed: "#filters-container",
    });
    filterHide.toggler();

    // * -------------------------- filter advanced
    const filterAdvenced = new ElementsControl({
        parent: filterDropDown.parent,
        manager: "#filter-advenced-btn",
        managed: ".filter-row",
    });
    filterAdvenced.switcher();

    // * -------------------------- shape jump
    const shapeJump = new ElementsControl({
        parent: filterDropDown.parent,
        manager: "#filter-shape",
        managed: "#shape-jump-container",
    });
    shapeJump.screen(() => {
        shapeJump.jump("beforeend");
    });

    // * -------------------------- reset jump
    const resetJump = new ElementsControl({
        parent: filterDropDown.parent,
        manager: "#reset-filter",
        managed: "#filter-reset-container",
    });
    resetJump.screen(() => {
        resetJump.jump("beforeend");
    });

    // * -------------------------- sort items
    const sort = new ElementsControl({
        manager: '.params-filter--sort'
    });
    sort.sort();

    // * -------------------------- lab info text
    function labInfo(parentID, inputsName, infoID, resetID) {
        // get elements from DOM
        const parent = document.querySelector(parentID);
        const inputs = parent.querySelectorAll(inputsName);
        const info = parent.querySelector(infoID);
        const resetBtn = document.querySelector(resetID);
        
        resetBtn.addEventListener('click', () => {
            info.textContent = '';
            info.classList.remove('active');
        });

        function active() {
            // active arr
            const checked = [];
            // set event
            inputs.forEach(input => {
                if (input.checked === true) {
                    checked.push(input.getAttribute('data-lab-info-text'));
                }
            });
            // return info
            return checked;
        }

        // add event
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                // get checked text
                const cheched = active();
                // set text info
                info.textContent = '';
                if (cheched.length > 0) {
                    info.classList.add('active');
                    for (let i = 0; i < cheched.length; i++) {
                        if (i !== cheched.length - 1) {
                            info.textContent += cheched[i] + ' | ';
                        } else {
                            info.textContent += cheched[i] + '';
                        }
                    }
                } else {
                    info.classList.remove('active');
                }
            });
        });

    }
    labInfo('#filter-lab-container', 'input[type="checkbox"]', '#slider-lab-info', '#reset-filter');

    // * -------------------------- Sort Result
    const sortResult = new SortModal({
        body: '#result-name--modal',
        by: '#result-name-sort',
        priority: '#result-name-priority',
        elements: '.modal-sort-item',
        plus: '.fa-plus',
        angle: '.fa-angle-down',
        handle: '.drag-handle',
        simpleSortParent: '#result-simple-sort',
        simpleSort: '[data-io-simple-sort]'
    });
    sortResult.create();
    
    // * -------------------------- Sort Best
    const sortBest = new SortModal({
        body: '#best-name--modal',
        by: '#best-name-sort',
        priority: '#best-name-priority',
        elements: '.modal-sort-item',
        plus: '.fa-plus',
        angle: '.fa-angle-down',
        handle: '.drag-handle',
        simpleSortParent: '#best-simple-sort',
        simpleSort: '[data-io-simple-sort]'
    });
    sortBest.create();
    
    // * -------------------------- Sort Comparison
    const sortComparison = new SortModal({
        body: '#comparison-name--modal',
        by: '#comparison-name-sort',
        priority: '#comparison-name-priority',
        elements: '.modal-sort-item',
        plus: '.fa-plus',
        angle: '.fa-angle-down',
        handle: '.drag-handle',
        simpleSortParent: '#comparison-simple-sort',
        simpleSort: '[data-io-simple-sort]'
    });
    sortComparison.create();


    // * -------------------------- resutlScroll
    const resutlScroll = new ScrollFix({
        container: '#result__items'
    });
    
    // * -------------------------- bestlScroll
    const bestlScroll = new ScrollFix({
        container: '#best__items'
    });
    
    // * -------------------------- comparisonlScroll
    const comparisonlScroll = new ScrollFix({
        container: '#comparison__items'
    });

});
