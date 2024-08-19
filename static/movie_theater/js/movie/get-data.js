function getData() {
    const formData = new FormData();

    formData.append('title', document.getElementById('field-title').value);
    formData.append('description', document.getElementById('field-description').value);
    formData.append('release_date', document.getElementById('field-date-release').value);
    formData.append('duration', parseInt(document.getElementById('field-duration').value));
    formData.append('in_theaters', document.getElementById('toggle').checked);
    formData.append('classification', document.getElementById('field-classification').value);
    formData.append('language', document.getElementById('field-language').value);
    formData.append('director', document.getElementById('field-director').value);
    formData.append('trailer_url', document.getElementById('field-trailer-url').value);

    const poster = document.getElementById('field-poster').files[0];
    if (poster) {
        formData.append('poster', poster);
    }

    const genreSelect = document.getElementById('genre');
    const genresAsIntegers = Array.from(genreSelect.selectedOptions).map(option => option.value);
    genresAsIntegers.forEach(genreId => {
        formData.append('genres', genreId);
    });

    return formData;
}