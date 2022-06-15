// * DOM Content Loaded * //;
document.addEventListener("DOMContentLoaded", () => {
    // * -------------------------- diamond drop down
    const diamondItem = new ElementsControl({
        manager: ".result__item-list",
        managed: ".result__drop-down",
    });
    diamondItem.toggler({ single: true, notThis: ".label-result" });

    // * -------------------------- diamond more info
    const diamondMoreInfo = new ElementsControl({
        manager: ".btn-more--info",
        managed: ".body-more--info",
    });
    diamondMoreInfo.toggler({ single: true });

    // * -------------------------- diamond label
    const diamondLabel = new ElementsControl({
        manager: '.label-result',
        managed: '.checkbox-result'
    });
    diamondLabel.label();

    // * -------------------------- hold hours
    function hoursToggle() {
        // hours container
        const hours = document.querySelector('#hours-item');
        // hours value
        const hoursValue = document.querySelector('#hold-hours--title');
        // hours items
        const hoursItems = document.querySelectorAll('.hold-hours__select');
        // hours toggle
        hours.addEventListener('click', () => {
            hours.classList.toggle('active');
        });
        // hours item text content
        hoursItems.forEach(elem => {
            elem.addEventListener('click', () => {
                // hours item value
                let value = elem.textContent;
                // hours value set new value
                hoursValue.textContent = value;
            })
        });
    } hoursToggle();

    // * -------------------------- sort items
    const sort = new ElementsControl({
        manager: '.params-filter--sort'
    });
    sort.sort();

    // * -------------------------- sort modal
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

    // * -------------------------- resutlScroll
    const resutlScroll = new ScrollFix({
        container: '#cart-items'
    });
});
