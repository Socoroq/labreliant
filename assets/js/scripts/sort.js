"use strict";

// * modal sortable
class SortModal {
    constructor(params) {
        // * modal parent
        this.modalBody = this.getElement(params.body);
        // * parents elements
        this.by = this.getElement(params.by, this.modalBody);
        this.priority = this.getElement(params.priority, this.modalBody);
        // * sort elements
        this.elements = this.getElement(params.elements, this.modalBody);
        // * plus items
        this.plus = this.getElement(params.plus, this.modalBody);
        // * angle items
        this.angle = this.getElement(params.angle, this.modalBody);
        // * handle items
        this.handle = this.getElement(params.handle, this.modalBody);
        // * from simple sort
        this.simpleSortParent = this.getElement(params.simpleSortParent)
        this.simpleSort = this.getElement(params.simpleSort, this.simpleSortParent);

        this.simpleData = 'data-io-simple-sort';
        // ? debug
        this.debug = params.debug;
        if (this.debug === true) {
            this.debuging();
        }
    }

    // -- create
    create() {
        // -- pluse button click event
        this.plusEvent();
        // -- angle button click event
        this.angleEvent();
        // -- drag & drop
        this.dragDrop();
        // -- simple sort
        this.simple();
    }

    // ? debug
    debuging(info = this) {
        console.log(info);
    }

    // ? get elements
    getElement(selector, parent = document) {
        // get elemetns
        let elements = parent.querySelectorAll(selector);
        // if is single
        if (elements.length === 1) {
            elements = elements[0];
        }
        // return elements
        return elements;
    }

    // -- jumper
    plusEvent() {
        // * create click event
        this.plus.forEach((plus, i) => {
            plus.addEventListener('click', () => {
                if (!this.elements[i].classList.contains('active-1') && !this.elements[i].classList.contains('active-2')) {
                    // * add active class name
                    this.elements[i].classList.add('active-1');
                    // * jump element
                    this.priority.insertAdjacentElement('afterbegin', this.elements[i]);
                }
                else if (this.elements[i].classList.contains('active-1') || this.elements[i].classList.contains('active-2')) {
                    // * remove active class name
                    this.elements[i].classList.remove('active-1');
                    this.elements[i].classList.remove('active-2');
                    // * jump element
                    this.by.insertAdjacentElement('afterbegin', this.elements[i]);
                }
            });
        });
    }

    // -- angle toggler
    angleEvent() {
        this.angle.forEach((angle, i) => {
            angle.addEventListener('click', () => {
                if (this.elements[i].classList.contains('active-1')) {
                    this.elements[i].classList.remove('active-1');
                    this.elements[i].classList.add('active-2');
                }
                else if (this.elements[i].classList.contains('active-2')) {
                    this.elements[i].classList.remove('active-2');
                    this.elements[i].classList.add('active-1');
                }
            });
        });
    }

    // -- drag & drop
    dragDrop() {
        const drag = new Sortable(this.priority, {
            handle: '.drag-handle'
        });
    }

    // -- simple sort
    simple() {
        this.simpleSort.forEach(simple => {
            simple.addEventListener('click', () => {
                // simple data name
                let simpleName = simple.getAttribute(this.simpleData);
                // simple direction
                let simpleDirection = 0;
                if (simple.classList.contains('active-1')) { simpleDirection = 1 }
                else if (simple.classList.contains('active-2')) { simpleDirection = 2 }
                // get sort element
                let sortElement;
                // get sort element index
                let sortElementIndex;
                this.elements.forEach((elem, index) => {
                    if (elem.getAttribute(this.simpleData) === simpleName) {
                        sortElement = elem;
                        sortElementIndex = index;
                    }
                });
                // insert element in to priority
                if (simpleDirection === 1 || simpleDirection === 2) {
                    this.priority.insertAdjacentElement('afterbegin', sortElement);
                    console.log(simpleDirection);
                    if (simpleDirection === 1) {
                        sortElement.classList.add('active-1');
                    }
                    else if (simpleDirection === 2) {
                        sortElement.classList.add('active-2');
                    }
                }
                // insert element in to by
                else if (simpleDirection === 0) {
                    this.by.insertAdjacentElement('afterbegin', sortElement);
                    sortElement.classList.remove('active-1');
                    sortElement.classList.remove('active-2');
                }
            });
        });
    }

}
