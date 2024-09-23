function getToken(){
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MDk4MjE0LCJpYXQiOjE3MjcwOTA3MTQsImp0aSI6IjYyZTY1NmFiZDdhYzQ3ZWRhYmNhNjc5MmE4YWZiNGQ4IiwidXNlcl9pZCI6NH0.Y_rjWBWxNtJuK8b8jknmNHUMCodkG2ljgy7tQs_k1EM'
}

function isAuthenticated() {
    return localStorage.getItem('jwtToken') !== null;
}

function formatDate(dateString, locale) {
    const [year, month, day] = dateString.split('-');
    
    const date = new Date(`${month}/${day}/${year}`);
    
    if (isNaN(date.getTime())) {
        throw new Error('Data inválida');
    }

    const formatter = new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formatter.format(date);
}

function closeModal(id_modal) {
    let modal = document.getElementById(id_modal);
    modal.close();
}

function openModal(id_modal) {
    let modal = document.getElementById(id_modal);
    modal.showModal();
}

function buildURLWithFilter(path, filter = {}) {
    var filter_params = [];

    Object.keys(filter).forEach(function (key) {
        filter_params.push(key + "=" + filter[key]);
    });

    if (path.endsWith("?")) {
        return path + filter_params.join("&");
    } else if (path.endsWith("/")) {
        return path + "?" + filter_params.join("&");
    } else {
        return path + "/?" + filter_params.join("&");
    }
}

function buildLinksPagination(response) {
    let pages = Math.ceil(response.count / object_filter["limit"]);
    let html = '';

    if (current_page > 1) {
        html += `
            <li>
                <a href="#"
                   class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                   style="border: 1px solid rgb(230, 230, 230);"
                   data-page="${current_page - 1}">
                    <span class="sr-only">Prev Page</span>
                    <i class="ri-arrow-left-s-line"></i>
                </a>
            </li>
        `;
    }

    for (let page = 1; page <= pages; page++) {
        if (page === current_page) {
            html += `
                <li class="block size-8 rounded border-blue-800 bg-blue-800 text-center leading-8 text-white">
                    ${page}
                </li>
            `;
        } else {
            html += `
                <li>
                    <a href="#"
                       class="block size-8 rounded border bg-white text-center leading-8 text-gray-900"
                       style="border: 1px solid rgb(230, 230, 230);"
                       data-page="${page}">
                        ${page}
                    </a>
                </li>
            `;
        }
    }

    if (current_page < pages) {
        html += `
            <li>
                <a href="#"
                   class="inline-flex size-8 items-center justify-center rounded border bg-white text-gray-900 rtl:rotate-180"
                   style="border: 1px solid rgb(230, 230, 230);"
                   data-page="${current_page + 1}">
                    <span class="sr-only">Next Page</span>
                    <i class="ri-arrow-right-s-line"></i>
                </a>
            </li>
        `;
    }

    return html;
}

function formatDate(date) {
    const date_init = new Date(date);

    const day = String(date_init.getDate()).padStart(2, '0'); 
    const month = String(date_init.getMonth() + 1).padStart(2, '0'); 
    const year = date_init.getFullYear(); 

    const hours = String(date_init.getHours()).padStart(2, '0'); 
    const minutes = String(date_init.getMinutes()).padStart(2, '0');
    const seconds = String(date_init.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function handleCinemaSelection(event) {
    const selectedCinemaId = event.target.value;

    if (selectedCinemaId) {
        localStorage.setItem('selectedCinemaId', selectedCinemaId);
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('select-cinema');
    const storedCinemaId = localStorage.getItem('selectedCinemaId');

    if (storedCinemaId) {
        selectElement.value = storedCinemaId;
        loadCinemaInfo(storedCinemaId); 
    } else {
        clearCinemaInfo(); 
    }

    if (isAuthenticated()) {
        document.getElementById('dropdown-management').style.display = 'block';
        document.getElementById('dropdown-reports').style.display = 'block';
        document.getElementById('dropdown-info-user').style.display = 'block';
        document.getElementById('btns-login-register').style.display = 'none';
    }

    if (!isAuthenticated()) {
        document.getElementById('dropdown-management').style.display = 'none';
        document.getElementById('dropdown-reports').style.display = 'none';
        document.getElementById('dropdown-info-user').style.display = 'none';
        document.getElementById('btns-login-register').style.display = 'block';
    }
});

function loadCinemaInfo(cinemaId) {
    const cinemaPhone = localStorage.getItem('cinemaPhone_' + cinemaId);
    const cinemaEmail = localStorage.getItem('cinemaEmail_' + cinemaId);

    if (cinemaPhone && cinemaEmail) {
        document.getElementById("phone-cinema-current").innerText = cinemaPhone;
        document.getElementById("email-cinema-current").innerText = cinemaEmail;
    } else {
        fetchCinemaInfo(cinemaId);
    }
}

function fetchCinemaInfo(cinemaId) {
    var url = `http://127.0.0.1:8000/api/v1/movie-theater/${cinemaId}`;

    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        document.getElementById("phone-cinema-current").innerText = data.phone_number;
        document.getElementById("email-cinema-current").innerText = data.email;

        localStorage.setItem('cinemaPhone_' + cinemaId, data.phone_number);
        localStorage.setItem('cinemaEmail_' + cinemaId, data.email);
    }).catch(error => {
        console.error('Erro:', error);
    });
}

function clearCinemaInfo() {
    document.getElementById("phone-cinema-current").innerText = '';
    document.getElementById("email-cinema-current").innerText = '';
}

function getCurrentCinemaID(){
    return localStorage.getItem('selectedCinemaId'); 
}