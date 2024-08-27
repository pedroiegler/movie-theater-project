function showModalCreate(){
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
    
    document.getElementById('action-cinema').innerText = "Cadastrar";

    document.getElementById("btn-create").style.display = "block";
    document.getElementById("btn-edit").style.display = "none";
    
    clearForm();
}
