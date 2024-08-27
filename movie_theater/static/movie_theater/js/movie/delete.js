function deleteMovie(){
    let idMovie = localStorage.getItem('id-movie');

    let url = `http://127.0.0.1:8000/api/v1/movie/${idMovie}/`;

    fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        if (response.status === 204) {
            return null;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            buildItemFromAPI(data);
        }
        document.getElementById(`movie-${idMovie}`).remove();
        closeModal("my_modal_1");
    })
    .catch(error => {
        console.error('Erro:', error);
    });    
}