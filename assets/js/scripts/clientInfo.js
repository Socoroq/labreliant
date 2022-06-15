"use strict";

// ? add shipping
class AddShipping {
    constructor(params) {
        this.form = document.querySelector(params.form);
        this.element = this.form.querySelector(params.element);
        this.add = this.form.querySelector(params.add);
        this.clones = [];
    }
    // create 
    create() {
        this.event();
        return this;
    }
    // clone
    clone() {
        let clone = this.element.cloneNode(true);
        this.clones.push(clone);
        return this;
    }
    // event
    event() {
        this.add.addEventListener('click', () => {
            // cloning element
            this.clone();
            // set new settings for clone
            this.settings();
            // insert element
            this.insert(this.clones, this.form);
        });
        return this;
    }
    // settings for clone
    settings() {
        this.clones.forEach((clone, index) => {
            let h4 = clone.querySelector('.shipping-clone-parent');
            h4.innerHTML = `<span>Shipping Address ${index + 2}</span> <i class="fa fa-angle-down fs-4 me-3" aria-hidden="true"></i>`
        });
    }
    // insert
    insert(arr, parent) {
        arr.forEach((elem, index) => {
            if (index < 19) {
                parent.insertAdjacentElement('beforeend', elem);
            }
        });

        // * toggle client info item
        const clientInfoDrop = new ElementsControl({
            manager: '.client-info-manager',
            managed: '.client-info-managed'
        });
        clientInfoDrop.toggler({});
    }
}
// ? edit client info
function editClientInfo(edit, names, inputsName, save, changePass, changeInp) {
    // get items from DOM
    const editButton = document.querySelector(edit);
    const inputsText = document.querySelectorAll(names);
    const inputs = document.querySelectorAll(inputsName);
    const saveButton = document.querySelector(save);
    const change = document.querySelector(changePass);
    const changeInput = document.querySelectorAll(changeInp);
    // set event for edit
    editButton.addEventListener('click', () => {
        inputsText.forEach((text, index) => {
            // toggle active class from text info
            text.classList.toggle('active');
            // toggle disabled from input
            if (inputs[index].hasAttribute('disabled')) {
                inputs[index].removeAttribute('disabled');
            }
            else if (!inputs[index].hasAttribute('disabled')) {
                inputs[index].setAttribute('disabled', null);
                changeInput.forEach(elem => {
                    if (elem.classList.contains('active')) {
                        elem.classList.remove('active');
                    }
                });
            }
        });
        // toggle disabled & active from save button
        saveButton.classList.toggle('active');
        if (saveButton.hasAttribute('disabled')) {
            saveButton.removeAttribute('disabled');
        }
        else if (!saveButton.hasAttribute('disabled')) {
            saveButton.setAttribute('disabled', null);
        }
        // toggle change button
        change.classList.toggle('active');
        if (change.hasAttribute('disabled')) {
            change.removeAttribute('disabled');
        }
        else if (!change.hasAttribute('disabled')) {
            change.setAttribute('disabled', null);
        }
    });
}
// ? chnage password
function changePassword(button, inputsName) {
    // get elements from DOM
    const change = document.querySelector(button);
    const inputs = document.querySelectorAll(inputsName);
    // set chenge event
    change.addEventListener('click', () => {
        inputs.forEach(input => {
            input.classList.toggle('active');
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {

    // * edit client info
    editClientInfo('#edit-client-info', '.client-info__input-group--name', '.form-control-client-info', '#save-changes', '#change-password', '.change-password-item');
    
    // * change password
    changePassword('#change-password', '.change-password-item');


    // * add new shipping addres
    const addShipping = new AddShipping({
        form: '#client-info-form',
        element: '#shipping-item',
        add: '#add-shipping-address',
    });
    addShipping.create();


    // * toggle client info item
    const clientInfoDrop = new ElementsControl({
        manager: '.client-info-manager',
        managed: '.client-info-managed'
    });
    clientInfoDrop.toggler({});

});