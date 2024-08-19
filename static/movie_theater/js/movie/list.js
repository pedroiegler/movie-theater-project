var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MDc1MjUxLCJpYXQiOjE3MjQwNjc3NTEsImp0aSI6ImFmOTRjZDM1MzlkODRlMGQ5ZDFkMjZhNDAwY2RhZjc3IiwidXNlcl9pZCI6MX0.ZWytRzf68pnl0DNJo83qcrE2nLeADHPPUmh1fAPrP9o';

function getAPIResponse(){
   let url =  "http://127.0.0.1:8000/api/v1/movie/";

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
            buildListFromAPI(data);
        }).catch(error => {
            console.error('Erro:', error);
        });
} getAPIResponse();

function buildListFromAPI(data){
    const wrapper = document.getElementById("list-movie-wraper");
    let htmlContent = '';

    document.getElementById("count-movie").innerText = data.count;
    data.results.forEach(movie => {
        htmlContent += buildListHTML(movie);
    });

    wrapper.innerHTML = htmlContent;
}

function buildListHTML(movie) {
    let poster = movie.poster ? movie.poster : defaultPosterUrl;
    let classification = movie.classification === 'Livre' ? movie.classification : movie.classification + ' anos';    
    let formatDateItem = formatDate(movie.release_date, 'pt-BR');
    
    return `
        <div id="movie-${movie.id}" onclick="viewMovie(${movie.id})" class="list-movie-single shadow-md shadow-gray-100 hover:shadow-gray-200 rounded-lg p-4 bg-white h-96">
            <a href="#">
                <img alt="${movie.title}" src="${poster}" class="h-64 w-full rounded-md object-cover" />
                <div class="mt-2">
                    <div>
                        <h4 class="text-xs text-gray-500">${classification}</h4>
                        <h2 class="text-base">${movie.title}</h2>
                    </div>
            
                    <div class="mt-2 flex gap-5 text-xs">
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <i class="ri-calendar-2-fill text-blue-800 text-lg"></i>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">Lançamento</p>
                                <p class="font-medium">${formatDateItem}</p>
                            </div>
                        </div>
            
                        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <i class="ri-star-fill text-blue-800 text-lg"></i>
                            <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">Avaliação</p>
                                <p class="font-medium">${movie.average_rating}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function multiSelect(genres) {
    return {
        open: false,
        options: genres,
        selectedOptions: [],
        toggleOption(option) {
            if (this.selectedOptions.map(o => o.id).includes(option.id)) {
                this.selectedOptions = this.selectedOptions.filter(item => item.id !== option.id);
            } else {
                this.selectedOptions.push(option);
            }
        }
    }
}


function clearForm() {
    const form = document.querySelector("#my_modal_1 form");

    form.querySelectorAll('input[type="text"], input[type="date"], input[type="url"]').forEach(input => {
        input.value = '';
    });

    form.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });

    form.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = '';
    });

    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    form.querySelectorAll('input[type="file"]').forEach(fileInput => {
        fileInput.value = '';
    });

    const genreSelect = form.querySelector('#genre');
    if (genreSelect) {
        genreSelect.selectedIndex = -1; 
    }
}