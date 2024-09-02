function getData() {
    const formData = new FormData();
    
    formData.append('username', document.getElementById('field-username').value);
    formData.append('email', document.getElementById('field-email').value);
    formData.append('first_name', document.getElementById('field-first-name').value);
    formData.append('last_name', document.getElementById('field-last-name').value);
    formData.append('is_staff', document.getElementById('field-is-staff').checked);
    formData.append('is_active', document.getElementById('field-is-active').checked);

    return formData;
}