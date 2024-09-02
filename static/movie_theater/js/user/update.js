function viewUser(id) {
    localStorage.setItem('id-user', id);

    let url = `http://127.0.0.1:8000/api/v1/user/${id}/`;

    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        buildItemFromAPI(data);
        document.getElementById('action-user').innerText = "Editar";
        openModal("my_modal_1");
        document.getElementById("btn-create").style.display = "none";
        document.getElementById("btn-edit").style.display = "block";
    }).catch(error => {
        console.error('Erro:', error);
    });
}

function buildItemFromAPI(data) {
    document.getElementById('field-username').value = data.username || '';
    document.getElementById('field-email').value = data.email || '';
    document.getElementById('field-first-name').value = data.first_name || '';
    document.getElementById('field-last-name').value = data.last_name || '';
    document.getElementById('field-is-active').checked = data.is_active;
    document.getElementById('field-is-staff').checked = data.is_staff;
}

function editUser() {
    const requiredFields = document.querySelectorAll(".required");
    let allFieldsFilled = true;

    requiredFields.forEach(function(field) {
        if (!field.value) { 
            allFieldsFilled = false;
        }
    });

    if(!allFieldsFilled){
        closeModal('my_modal_1');
        Swal.fire({
            title: 'Atenção',
            text: `Preencha os campos obrigatórios`,
            icon: 'warning',
            confirmButtonColor: '#1c45ab',
            confirmButtonText: 'Ok',
            customClass: {
                title: 'custom-swal-title',  
                htmlContainer: 'custom-swal-text',
                icon: 'custom-icon-class',
                confirmButton: 'custom-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                openModal('my_modal_1');
            }
        });
    } else{
        closeModal('my_modal_1');
        Swal.fire({
            title: 'Editar usuário',
            text: `Deseja continuar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1c45ab',
            cancelButtonColor: '#a30b0b',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                title: 'custom-swal-title',  
                htmlContainer: 'custom-swal-text',
                icon: 'custom-icon-class',
                confirmButton: 'custom-button',
                cancelButton: 'custom-button custom-cancel-button'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                submitFormDataUpdate(); 
            } else{
                openModal('my_modal_1');
            }
        });
    }

}

function submitFormDataUpdate() {
    const formData = getData();
    const id = localStorage.getItem('id-user');
    const url = `http://127.0.0.1:8000/api/v1/user/${id}/`;

    fetch(url, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        Swal.fire({
            title: 'Editado!',
            text: 'O usuário foi editado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#1c45ab',
            customClass: {
                title: 'custom-swal-title',  
                htmlContainer: 'custom-swal-text',
                icon: 'custom-icon-class',
                confirmButton: 'custom-button',
            }
        });
        closeModal("my_modal_1");
        getAPIResponse(); 
    }).catch(error => {
        console.error('Erro:', error);
    });
}