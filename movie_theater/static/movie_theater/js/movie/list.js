

function getAPIResponse(){
   let url =  "http://127.0.0.1:8000/api/v1/movie/";
   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNzg3MzE4LCJpYXQiOjE3MjM3Nzk4MTgsImp0aSI6ImMyNjI1NjczNDQ0ZDRlOTk4YTk4N2ZjZjEwZTUwMzJlIiwidXNlcl9pZCI6MX0.WwXthAdu-tRa7nAUEwSdZ7utja9_BZ-6yAG0J1e0Lvk";

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
            console.log(data);
            buildListFromAPI(data);
        }).catch(error => {
            console.error('Erro:', error);
        });
} getAPIResponse();

function buildListFromAPI(data){
    const wrapper = document.getElementById("list-movie-wraper");
    let htmlContent = '';

    data.results.forEach(movie => {
        htmlContent += buildListHTML(movie);
    });

    wrapper.innerHTML = htmlContent;
}

function buildListHTML(movie) {
    let poster = movie.poster ? movie.poster : defaultPosterUrl;
    let classification = movie.classification === 'Livre' ? movie.classification : movie.classification + ' anos';    

    return `
        <div class="list-movie-single shadow-md shadow-gray-100 hover:shadow-gray-200 rounded-lg p-4 bg-white">
            <a href="#">
                <img alt="${movie.title}" src="https://a-static.mlcdn.com.br/350x350/poster-cartaz-deadpool-wolverine-g-pop-arte-poster/poparteskins2/pos-03770-60x90cm/c64c2ef2459a22810c53a3c4c167a7bf.jpeg" class="h-72 w-full rounded-md object-cover" />
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
                                <p class="font-medium">${movie.release_date}</p>
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
