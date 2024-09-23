function dropdownLogin(){
    const loginButton = document.getElementById('login-button');
    const loginDropdown = document.getElementById('dropdown-login');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();  
        loginDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!loginButton.contains(event.target) && !loginDropdown.contains(event.target)) {
            loginDropdown.classList.add('hidden');
        }
    });
} dropdownLogin();

function makeLogin(){
    const username = document.getElementById('username-input-login').value;
    const password = document.getElementById('password-input-login').value;

    if(username !== '' && password !== ''){
        let data = {
            username,
            password
        };

        const url = `http://127.0.0.1:8000/api/v1/token/`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        }).then(data => {
            if (data.access) { 
                localStorage.setItem('jwtToken', data.access);
                Swal.fire({
                    title: 'Logado!',
                    text: 'Você foi logado com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#1c45ab',
                    customClass: {
                        title: 'custom-swal-title',  
                        htmlContainer: 'custom-swal-text',
                        icon: 'custom-icon-class',
                        confirmButton: 'custom-button',
                    }
                }).then(() => {
                    location.reload();
                });
            } else {
                throw new Error('Falha ao obter o token JWT.');
            }
        }).catch(error => {
            console.error('Erro:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível fazer login. Verifique suas credenciais e tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#1c45ab'
            });
        });
    }
}
