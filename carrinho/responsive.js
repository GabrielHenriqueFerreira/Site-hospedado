document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    // Abrir/fechar o menu ao clicar no ícone de hambúrguer
    menuIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // Impede que o clique se propague para o documento
        navbar.classList.toggle('active');
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = navbar.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInsideMenu) {
            navbar.classList.remove('active');
        }
    });

    // Impedir que o menu feche ao clicar em qualquer parte dele
    navbar.addEventListener('click', function (event) {
        event.stopPropagation(); // Impede que o clique se propague para o documento
    });
});