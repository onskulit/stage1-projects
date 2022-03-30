const hamburgerIcon = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav__list');
const backdrop = document.querySelector('.backdrop');

// adaptive menu creation

const closeHamburgerMenu = () => {
    hamburgerIcon.classList.remove('active');
    navigation.classList.remove('adaptive-menu');
    backdrop.classList.remove('active');
};

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('active');
    navigation.classList.toggle('adaptive-menu');
    backdrop.classList.toggle('active');
}); 

navigation.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__link')) {
        closeHamburgerMenu();
    }
});

backdrop.addEventListener('click', () => {
    closeHamburgerMenu();
});