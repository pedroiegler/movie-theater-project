var token = getToken();

var object_filter = {
    "limit": 10,
    "offset": 0,
}

var current_page = 1;

function getAPIResponse(filters = false) {
    let filter = filters ? { ...object_filter, ...filters } : object_filter;
    var url = buildURLWithFilter("http://127.0.0.1:8000/api/v1/movie/", filter);

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
        attachPaginationEvents();  
    }).catch(error => {
        console.error('Erro:', error);
    });
} getAPIResponse();

function buildListFromAPI(data) {
    const wrapper = document.getElementById("list-movie-wrapper");
    let htmlContent = '';

    document.getElementById("count-movie").innerText = data.count;
    data.results.forEach(movie => {
        htmlContent += buildListHTML(movie);
    });

    wrapper.innerHTML = htmlContent;

    document.getElementById("pagination").innerHTML = buildLinksPagination(data);

    attachPaginationEvents();
}

function attachPaginationEvents() {
    document.querySelectorAll("#pagination a[data-page]").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute("data-page"));
            if (page !== current_page) {
                current_page = page;
                object_filter["offset"] = (current_page - 1) * object_filter["limit"];

                let activeFilter = inputSearch.value ? { ...object_filter, search: inputSearch.value } : object_filter;

                getAPIResponse(activeFilter);  
            }
        });
    });
}

function buildListHTML(movie) {
    let poster = movie.poster ? movie.poster : defaultPosterUrl;
    let classification = movie.classification === 'Livre' ? movie.classification : movie.classification + ' anos';    
    return `
        <div id="movie-${movie.id}" onclick="viewMovie(${movie.id})" class="list-movie-single rounded-lg p-3 bg-white" style="max-width: 100%; box-sizing: border-box; border: 1px solid rgb(230, 230, 230);">
            <a href="#" class="block">
                <img alt="${movie.title}" src="${poster}" class="h-64 w-full rounded-md object-cover" />
                <div class="mt-2">
                    <div>
                        <h4 class="text-xs text-gray-500">${classification}</h4>
                        <h2 class="text-sm" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${movie.title}</h2>
                    </div>

                    <div class="mt-2 flex flex-row sm:flex-row sm:gap-4 text-xs">
                        <div class="flex items-center sm:gap-2 mt-2 sm:mt-0">
                            <i class="ri-star-fill text-blue-800 text-base"></i>
                            <div class="ml-2">
                                <p class="text-gray-500 font-xs">Avaliação</p>
                                <p class="font-xs">${movie.average_rating}</p>
                            </div>
                        </div>
                        ${movie.in_theaters ? 
                            `<div class="flex items-center sm:gap-2 mt-2 sm:mt-0">
                                <i class="ri-checkbox-circle-line text-blue-800 text-base"></i>
                                <p class="text-gray-500 font-xs">Em cartaz</p>
                            </div>`
                        : ''}
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

const defaultPosterUrl = "{% static 'movie_theater/images/image-empty.png' %}";

let inputSearch = document.getElementById('Search');

inputSearch.addEventListener('input', function() {
    const query = this.value;
    let last_offset = object_filter["offset"];
    let newfilter = { ...object_filter }; 
    
    if(query) {
        object_filter["offset"] = 0;  
        newfilter["search"] = query;  
    } else {
        newfilter = { ...object_filter }; 
    }

    getAPIResponse(newfilter);
    object_filter["offset"] = last_offset; 
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const selectedGenres = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.id.replace('genre-', ''));
        
        console.log(selectedGenres);
    });
});

document.querySelector('button[style]').addEventListener('click', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    getAPIResponse(); 
});

document.querySelectorAll('input[name="radio-classification"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const selectedClassification = document.querySelector('input[name="radio-classification"]:checked').id.replace('classification-', '');

        console.log(selectedClassification);
    });
});