function viewRoom(id) {
    localStorage.setItem('id-room', id);

    let url = `http://127.0.0.1:8000/api/v1/room/${id}/`;

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
        document.getElementById('action-room').innerText = "Editar";
        openModal("my_modal_1");
        document.getElementById("btn-create").style.display = "none";
        document.getElementById("btn-edit").style.display = "block";
    }).catch(error => {
        console.error('Erro:', error);
    });
}

function buildItemFromAPI(data) {
    document.getElementById('field-name').value = data.name || '';
    document.getElementById('field-total-seats').value = data.total_seats || '';
}

function editRoom() {
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
            title: 'Editar sala',
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
    const id = localStorage.getItem('id-room');
    const url = `http://127.0.0.1:8000/api/v1/room/${id}/`;

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
            text: 'A sala foi editada com sucesso.',
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