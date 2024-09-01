function getData() {
    const data = {
        name: document.getElementById('field-name').value,
        phone_number: document.getElementById('field-phone-number').value,
        email: document.getElementById('field-email').value,
        address: {
            street: document.getElementById('field-street').value,
            number: parseInt(document.getElementById('field-number').value),
            neighborhood: document.getElementById('field-neighborhood').value,
            city: document.getElementById('field-city').value,
            state: document.getElementById('field-state').value,
            country: document.getElementById('field-country').value,
            zip_code: document.getElementById('field-zip-code').value,
        }
    };

    return data;
}
