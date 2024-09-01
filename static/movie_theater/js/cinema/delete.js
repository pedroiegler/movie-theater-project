function deleteCinema(id, name){
    Swal.fire({
        title: 'Você tem certeza?',
        text: `Remover cinema - ${name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1c45ab',
        cancelButtonColor: '#a30b0b',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        customClass: {
            title: 'custom-swal-title',  
            htmlContainer: 'custom-swal-text',
            icon: 'custom-icon-class',
            confirmButton: 'custom-button',
            cancelButton: 'custom-button custom-cancel-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
            let url = `http://127.0.0.1:8000/api/v1/movie-theater/${id}/`;

            fetch(url, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                if (response.status === 204) {
                    return null;
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: 'Deletado!',
                    text: 'O cinema foi deletado com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#1c45ab',
                    customClass: {
                        title: 'custom-swal-title',  
                        htmlContainer: 'custom-swal-text',
                        icon: 'custom-icon-class',
                        confirmButton: 'custom-button',
                    }
                });
                document.getElementById(`cinema-${id}`).remove();
            })
            .catch(error => {
                console.error('Erro:', error);
            }); 
        }
    });   
}