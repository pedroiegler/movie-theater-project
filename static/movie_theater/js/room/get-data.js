function getData() {
    const formData = new FormData();
    const movie_theater = getCurrentCinemaID();
    
    formData.append('name', document.getElementById('field-name').value);
    formData.append('total_seats', document.getElementById('field-total-seats').value);
    formData.append('movie_theater', movie_theater);

    return formData;
}