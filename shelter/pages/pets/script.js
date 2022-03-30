const hamburgerIcon = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav__list');
const navItems = document.querySelectorAll('.nav__item');
const backdrop = document.querySelector('.backdrop');

// adaptive menu creation

const closeHamburgerMenu = () => {
    hamburgerIcon.classList.remove('active');
    navigation.classList.remove('adaptive-menu');
    backdrop.classList.remove('active');
};

const toggleNavLinksTheme = () => {
    navItems.forEach(item => {
        item.classList.toggle('nav__item_dark');
        item.classList.toggle('nav__item_light');
        if (item.classList.contains('nav__item_light_active') || item.classList.contains('nav__item_dark_active')) {
            item.classList.toggle('nav__item_dark_active');
            item.classList.toggle('nav__item_light_active');
        }
    })
}

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('active');
    navigation.classList.toggle('adaptive-menu');
    backdrop.classList.toggle('active');
    toggleNavLinksTheme();
}); 

navigation.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__link')) {
        closeHamburgerMenu();
        toggleNavLinksTheme();
    }
});

backdrop.addEventListener('click', () => {
    closeHamburgerMenu();
    toggleNavLinksTheme();
});
