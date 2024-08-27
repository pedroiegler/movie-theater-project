function getToken(){
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NzY0MDE1LCJpYXQiOjE3MjQ3NTY1MTUsImp0aSI6ImYyM2EwYTVjNmM5YzQ5MzNhMjZlZWQxYjNkYWM5ZmJhIiwidXNlcl9pZCI6MX0.H2za7V6CBjmx9M6nN_je9TdvnnvIxanRep5tv_loeTQ';
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

