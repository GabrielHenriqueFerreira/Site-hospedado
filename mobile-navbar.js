document.addEventListener('DOMContentLoaded', function () {
    const hamburguer = document.querySelector('.hamburguer');
    const navLink = document.querySelector('.nav-link');

    hamburguer.addEventListener('click', () => {
        navLink.classList.toggle('active');
    });
});