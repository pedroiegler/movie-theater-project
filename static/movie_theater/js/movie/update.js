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
        if (!field.value) { 
            allFieldsFilled = false;
        }
    });

    closeModal("my_modal_1");
    Swal.fire({
        title: 'Editar filme',
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
            submitFormDataUpdate(); 
        } else {
            openModal("my_modal_1");
        }
    });
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

        Swal.fire(
            'Editado!',
            'O filme foi editado com sucesso.',
            'success'
        );

        closeModal("my_modal_1");
        getAPIResponse(); 
    }).catch(error => {
        console.error('Erro:', error);
    });
}