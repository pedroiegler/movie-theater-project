var token = getToken();

function showModalCreate(){
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
    
    document.getElementById('action-movie').innerText = "Cadastrar";

    document.getElementById("btn-create").style.display = "block";
    document.getElementById("btn-edit").style.display = "none";
    document.getElementById("btn-delete").style.display = "none";
    
    clearForm();
}


function createMovie() {
    const requiredFields = document.querySelectorAll(".required");
    let allFieldsFilled = true;

    requiredFields.forEach(function(field) {
        if (field.type === 'select-one' || field.type === 'select-multiple') {
            if (field.value === '') {
                allFieldsFilled = false;
            }
        } else {
            if (!field.value) {
                allFieldsFilled = false;
            }
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
            title: 'Cadastrar filme',
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
                submitFormDataCreate(); 
            } else{
                openModal('my_modal_1');
            }
        });
    }
}

function submitFormDataCreate() {
    const formData = getData();
    const url = "http://127.0.0.1:8000/api/v1/movie/";

    fetch(url, {
        method: "POST",
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
            title: 'Cadastrado!',
            text: 'O filme foi cadastrado com sucesso.',
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
