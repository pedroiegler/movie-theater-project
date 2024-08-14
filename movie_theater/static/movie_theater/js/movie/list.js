

function getAPIResponse(){
   let url =  "http://127.0.0.1:8000/api/v1/movie/";
   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNTExNDI0LCJpYXQiOjE3MjM1MTExMjQsImp0aSI6IjQzYzU0OGNiYTBhNjRiYjVhZDNiNzU2NTFhMWIzMDdhIiwidXNlcl9pZCI6MX0.gO877TUuF-Btq18puRN6Uh4eOcgj_jqotk4SO2atGsY";

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
            console.log('Sucesso:', data);
        }).catch(error => {
            console.error('Erro:', error);
        });
} getAPIResponse();
