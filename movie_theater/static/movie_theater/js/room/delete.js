function deleteRoom(){
    closeModal('my_modal_1');
    
    Swal.fire({
        title: 'Deletar sala',
        text: `Deseja continuar?`,
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
            deleteData(); 
        }
    });
}


function deleteData(){
    let idRoom = localStorage.getItem('id-room');

    let url = `http://127.0.0.1:8000/api/v1/room/${idRoom}/`;

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
        if (data) {
            buildItemFromAPI(data);
        }
        Swal.fire({
            title: 'Deletado!',
            text: 'A sala foi deletada com sucesso.',
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
        document.getElementById(`room-${idRoom}`).remove();
        closeModal("my_modal_1");
    })
    .catch(error => {
        console.error('Erro:', error);
    });    
}