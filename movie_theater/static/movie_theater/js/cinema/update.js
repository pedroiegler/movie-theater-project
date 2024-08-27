function editCinema(id) {

    let url = `http://127.0.0.1:8000/api/v1/movie-theater/${id}/`;

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
        //buildItemFromAPI(data);
        document.getElementById('action-cinema').innerText = "Editar";
        openModal("my_modal_1");
        document.getElementById("btn-create").style.display = "none";
        document.getElementById("btn-edit").style.display = "block";
    }).catch(error => {
        console.error('Erro:', error);
    });
}
