function viewMovie(id) {
    
    localStorage.setItem('id-movie', id);

    let url = `http://127.0.0.1:8000/api/v1/movie/${id}/`;

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
        document.getElementById('action-movie').innerText = "Editar";
        openModal("my_modal_1");
        document.getElementById("btn-create").style.display = "none";
        document.getElementById("btn-edit").style.display = "block";
        document.getElementById("btn-delete").style.display = "block";
    }).catch(error => {
        console.error('Erro:', error);
    });
}

function buildItemFromAPI(data) {
    document.getElementById('field-title').value = data.title || '';
    document.getElementById('field-date-release').value = data.release_date || '';
    document.getElementById('field-description').value = data.description || '';
    document.getElementById('field-duration').value = data.duration || '';
    document.getElementById('field-classification').value = data.classification || '';
    document.getElementById('field-language').value = data.language || '';
    document.getElementById('field-director').value = data.director || '';
    document.getElementById('field-trailer-url').value = data.trailer_url || '';

    let genreSelect = document.getElementById('field-genre');
    for (var i = 0; i < genreSelect.options.length; i++) {
        var option = genreSelect.options[i];
        if (data.genres.includes(parseInt(option.value))) {
            option.selected = true;
        }
    }

    let toggleCheckbox = document.getElementById('toggle');
    if (data.in_theaters) {
        toggleCheckbox.checked = data.in_theaters;
    }
}

function editMovie() {
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
            title: 'Editar filme',
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
    let idMovie = localStorage.getItem('id-movie');
    const formData = getData();
    const url = `http://127.0.0.1:8000/api/v1/movie/${idMovie}/`;

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
            text: 'O filme foi editado com sucesso.',
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