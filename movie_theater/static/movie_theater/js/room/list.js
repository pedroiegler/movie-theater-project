var token = getToken();

var object_filter = {
    "limit": 10,
    "offset": 0,
}

var current_page = 1;

function getAPIResponse(filters = false) {
    let filter = filters ? { ...object_filter, ...filters } : object_filter;
    var url = buildURLWithFilter("http://127.0.0.1:8000/api/v1/room/", filter);

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
    const wrapper = document.getElementById("list-room-wrapper");
    let htmlContent = '';

    document.getElementById("count-room").innerText = data.count;
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

function buildListHTML(room) {
    let name = room.name ? room.name : '';
    let total_seats = room.total_seats ? room.total_seats : '';
    let created_on = room.created_on ? formatDate(room.created_on) : '';
    let updated_on = room.updated_on ? formatDate(room.updated_on) : '';

    return `
        <tr id="room-${room.id}">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="cursor-pointer" onclick="deleteRoom(${room.id}, '${name}')">
                    <i class='ri-delete-bin-7-fill text-xl text-red-700 hover:text-red-800 transform hover:scale-110 transition-transform duration-105'></i>
                </button>
                <button class="cursor-pointer" onclick="viewRoom(${room.id})">
                    <i class='ri-edit-box-fill text-xl text-blue-800 hover:text-blue-900 transform hover:scale-110 transition-transform duration-105'></i>
                </button>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${name}</p>
            </td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${total_seats}</p>
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

    form.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = '';
    });
}

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