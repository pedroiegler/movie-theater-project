const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

if (dropdownButton) {
    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });
}

document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});

const mobileMenuButton = document.getElementById('mobileMenuButton');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    });
}