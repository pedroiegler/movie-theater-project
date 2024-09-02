function deleteUser(){
    closeModal('my_modal_1');
    
    Swal.fire({
        title: 'Deletar usuário',
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
    let idUser = localStorage.getItem('id-user');

    let url = `http://127.0.0.1:8000/api/v1/user/${idUser}/`;

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
            text: 'O usuário foi deletado com sucesso.',
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
        document.getElementById(`user-${idUser}`).remove();
        closeModal("my_modal_1");
    })
    .catch(error => {
        console.error('Erro:', error);
    });    
}