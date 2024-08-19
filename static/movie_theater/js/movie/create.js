var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MDc1MjUxLCJpYXQiOjE3MjQwNjc3NTEsImp0aSI6ImFmOTRjZDM1MzlkODRlMGQ5ZDFkMjZhNDAwY2RhZjc3IiwidXNlcl9pZCI6MX0.ZWytRzf68pnl0DNJo83qcrE2nLeADHPPUmh1fAPrP9o';

function showModalCreate(){
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
    
    document.getElementById('action-movie').innerText = "Cadastrar";

    document.getElementById("btn-create").style.display = "block";
    document.getElementById("btn-edit").style.display = "none";
    document.getElementById("btn-delete").style.display = "none";
    
    clearForm();
    createMovie();
}


function createMovie() {
    const requiredFields = document.querySelectorAll(".required");
    let allFieldsFilled = true;

    requiredFields.forEach(function(field) {
        if (!field.value) { 
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        
    } else {
        closeModal("my_modal_1");
        Swal.fire({
            title: 'Cadastrar filme',
            text: "Você deseja continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(30 64 175)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                popup: 'swal2-front'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                submitFormDataCreate(); 
            } else {
                openModal("my_modal_1");
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
        Swal.fire(
            'Cadastrado!',
            'O filme foi criado com sucesso.',
            'success'
        );

        closeModal("my_modal_1");
        getAPIResponse(); 
    }).catch(error => {
        console.error('Erro:', error);
    });
}
