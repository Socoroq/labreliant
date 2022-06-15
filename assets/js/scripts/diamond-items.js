// * DOM Content Loaded * //;
document.addEventListener("DOMContentLoaded", () => {
    // * -------------------------- diamond drop down
    const diamondItem = new ElementsControl({
        manager: ".result__item-list",
        managed: ".result__drop-down",
    });
    diamondItem.toggler({ single: true, notThis: ".label-result" });
    
    // diamondItem.screen(() => {
    //     diamondItem.toggler({ single: false, notThis: ".label-result" });
    // }, 1065);

    // diamondItem.screen2(() => {
    //     diamondItem.toggler({ single: true, notThis: ".label-result" });
    // }, 1065);


    // * -------------------------- diamond more info
    const diamondMoreInfo = new ElementsControl({
        manager: ".btn-more--info",
        managed: ".body-more--info",
    });
    diamondMoreInfo.toggler({ single: true });

     // * -------------------------- diamond label
    const diamondLabel = new ElementsControl({
        manager: '[data-io-label]',
        managed: '.checkbox-results'
    });
    diamondLabel.label();
});
