// script.js

const form = document.getElementById("form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");
const complaintsGroup = document.getElementById("complaints-group");
const complaintDescription = document.getElementById("complaint-description");
const solutionsGroup = document.getElementById("solutions-group");
const solutionDescription = document.getElementById("solution-description");
const messageBox = document.getElementById("message-box");

const complaintCheckboxes = complaintsGroup.querySelectorAll("input[type='checkbox']");
const solutionRadios = solutionsGroup.querySelectorAll("input[type='radio']");

function getCheckedCheckboxes() {
    return Array.from(complaintCheckboxes).filter(checkbox => checkbox.checked);
}

function getSelectedRadio() {
    return Array.from(solutionRadios).find(radio => radio.checked);
}

function validateForm() {
    const nameValid = fullName.value.trim() !== "";
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const orderNoValid = /^2024\d{6}$/.test(orderNo.value);
    const productCodeValid = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}$/.test(productCode.value);
    const quantityValid = parseInt(quantity.value) > 0;

    const complaintsChecked = getCheckedCheckboxes();
    const complaintsGroupValid = complaintsChecked.length > 0;

    const complaintDescValid = complaintsChecked.some(cb => cb.value === "other") ?
        complaintDescription.value.trim().length >= 20 :
        true;

    const selectedRadio = getSelectedRadio();
    const solutionsGroupValid = selectedRadio !== undefined;

    const solutionDescValid = selectedRadio && selectedRadio.value === "other" ?
        solutionDescription.value.trim().length >= 20 :
        true;

    return {
        "full-name": nameValid,
        "email": emailValid,
        "order-no": orderNoValid,
        "product-code": productCodeValid,
        "quantity": quantityValid,
        "complaints-group": complaintsGroupValid,
        "complaint-description": complaintDescValid,
        "solutions-group": solutionsGroupValid,
        "solution-description": solutionDescValid
    };
}

function isValid(results) {
    return Object.values(results).every(value => value);
}

function setFieldValidity(field, isValid) {
    field.style.borderColor = isValid ? "green" : "red";
}

function applyValidationStyle(results) {
    setFieldValidity(fullName, results["full-name"]);
    setFieldValidity(email, results["email"]);
    setFieldValidity(orderNo, results["order-no"]);
    setFieldValidity(productCode, results["product-code"]);
    setFieldValidity(quantity, results["quantity"]);
    setFieldValidity(complaintsGroup, results["complaints-group"]);
    setFieldValidity(complaintDescription, results["complaint-description"]);
    setFieldValidity(solutionsGroup, results["solutions-group"]);
    setFieldValidity(solutionDescription, results["solution-description"]);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const results = validateForm();
    applyValidationStyle(results);

    if (isValid(results)) {
        messageBox.textContent = "Form submitted successfully!";
        messageBox.style.color = "green";
        form.reset();
    } else {
        messageBox.textContent = "Please correct the highlighted errors.";
        messageBox.style.color = "red";
    }
});

[fullName, email, orderNo, productCode, quantity, complaintDescription, solutionDescription].forEach(field => {
    field.addEventListener("change", () => {
        const results = validateForm();
        applyValidationStyle(results);
    });
});

[...complaintCheckboxes, ...solutionRadios].forEach(input => {
    input.addEventListener("change", () => {
        const results = validateForm();
        applyValidationStyle(results);
    });
});