"use strict";

const orderDetails = new ElementsControl({
    manager: '[data-order-datails="manager"]',
    managed: '[data-order-datails="managed"]'
});
orderDetails.toggler({ single: true });

const showSearch = new ElementsControl({
    manager: '#orders-search-btn',
    managed: '#orders-search-body'
});
showSearch.toggler();