// ****** select items **********

const form = document.querySelector(".shopping-form");
const alert = document.querySelector(".alert");
const shopping = document.getElementById("shopping");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".shopping-container");
const list = document.querySelector(".shopping-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

// add item
function addItem(e) {
    e.preventDefault();
    const value = shopping.value;
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("shopping-item");
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
        // add event listeners to both buttons;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);
        // display alert
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // set back to default
        setBackToDefault();
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger");
    }
}
// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// clear items
function clearItems() {
    const items = document.querySelectorAll(".shopping-item");
    if (items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
}

// delete item

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");

    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}
// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    shopping.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    //
    submitBtn.textContent = "edit";
}
// set backt to defaults
function setBackToDefault() {
    shopping.value = "";
}
