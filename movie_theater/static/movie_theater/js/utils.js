function getToken(){
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0NTM1NDk5LCJpYXQiOjE3MjQ1Mjc5OTksImp0aSI6ImUyNGM1NjdkNGM2ZTRkMmU5MDk0N2MzODViZWM0MmYzIiwidXNlcl9pZCI6MX0.oywCo5eH4VEfUbAcq0aUE-kGsg1tz0MroxdBCg-9DXA';
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
                       class="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
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
                   class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                   data-page="${current_page + 1}">
                    <span class="sr-only">Next Page</span>
                    <i class="ri-arrow-right-s-line"></i>
                </a>
            </li>
        `;
    }

    return html;
}