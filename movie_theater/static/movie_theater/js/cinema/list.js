var token = getToken();

var object_filter = {
    "limit": 10,
    "offset": 0,
}

var current_page = 1;

function getAPIResponse(filters = false) {
    let filter = filters ? { ...object_filter, ...filters } : object_filter;
    var url = buildURLWithFilter("http://127.0.0.1:8000/api/v1/movie-theater/", filter);

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
    const wrapper = document.getElementById("list-movie-theater-wrapper");
    let htmlContent = '';

    document.getElementById("count-cinema").innerText = data.count;
    data.results.forEach(cinema => {
        htmlContent += buildListHTML(cinema);
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

function buildListHTML(cinema) {
    let logo = cinema.logo ? cinema.logo : defaultPosterUrl;
    let name = cinema.name ? cinema.name : '';
    let email = cinema.email ? cinema.email : '';
    let phone_number = cinema.phone_number ? cinema.phone_number : '';
    let created_on = cinema.created_on ? formatDate(cinema.created_on) : '';
    let updated_on = cinema.updated_on ? formatDate(cinema.updated_on) : '';

    return `
        <tr id="cinema-${cinema.id}">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="cursor-pointer" onclick="deleteCinema(${cinema.id}, '${name}')">
                    <i class='ri-delete-bin-7-fill text-xl text-red-700 hover:text-red-800 transform hover:scale-110 transition-transform duration-105'></i>
                </button>
                <button class="cursor-pointer" onclick="editCinema(${cinema.id})">
                    <i class='ri-edit-box-fill text-xl text-blue-800 hover:text-blue-900 transform hover:scale-110 transition-transform duration-105'></i>
                </button>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <div class="flex-shrink-0 w-10 h-10">
                    <img class="w-full h-full rounded-full object-cover ${logo ? 'bg-gray-800' : ''}"
                        ${logo ? src="${logo}" : ''} />
                </div>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${name}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${email}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${phone_number}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${created_on}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${updated_on}</p>
            </td>
        </tr>
    `;
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

