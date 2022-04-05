import pets from '../scripts/pets.js';

const hamburgerIcon = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav__list');
const navItems = document.querySelectorAll('.nav__item');
const backdrop = document.querySelector('.backdrop');

const petsContainer = document.querySelector('.pets');
const prevBtn = document.querySelector('.button_prev-page');
const nextBtn = document.querySelector('.button_next-page');
const firstBtn = document.querySelector('.button_first-page');
const lastBtn = document.querySelector('.button_last-page');

const modalWindow = document.querySelector('.modal');
const modalWindowCloseBtn = document.querySelector('.modal__close-button');

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
    if (navigation.classList.contains('adaptive-menu')) {
        closeHamburgerMenu();
        toggleNavLinksTheme();
    } 
    if (modalWindow.classList.contains('active')) closeModalWindow();
});


// new array creation

let indexesArr = [4, 0, 2, 1, 5, 7, 3, 6];

const createNewIndexes = (requiredLength, arrLength) => {
    const newIndexes = [];

    for (let i = 0; i < requiredLength; i++) {
        let index = Math.floor(Math.random() * arrLength);

        while (newIndexes.includes(index)) {
            index = Math.floor(Math.random() * arrLength);
        }

        newIndexes.push(index);
    }

    return newIndexes;
}

const createIndexesArray = (repeatTimes) => {
    for (let i = 0; i < repeatTimes; i++) {
        indexesArr = indexesArr.concat(createNewIndexes(8, pets.length));
    }
}

createIndexesArray(5);

// pets creation

const createPetBlock = (pet) => {
    const petBlock = document.createElement('div');
    petBlock.classList.add('pet');
    petsContainer.append(petBlock);

    const petCover = document.createElement('div');
    petCover.classList.add('pet__cover');
    petBlock.append(petCover);

    const petImg = document.createElement('img');
    petImg.classList.add('pet__img');
    petImg.src = pet['img'];
    petImg.alt = pet['name'];
    petCover.append(petImg);

    const petContent = document.createElement('div');
    petContent.classList.add('pet__content');
    petBlock.append(petContent);

    const petTitle = document.createElement('h3');
    petTitle.textContent = pet['name'];
    petContent.append(petTitle);

    const petButton = document.createElement('button');
    petButton.classList.add('button', 'button-oval', 'button-bordered');
    petButton.textContent = 'Learn more';
    petContent.append(petButton);

    petBlock.setAttribute('pet-id', pets.indexOf(pet));
    return petBlock;
}

let currentPage = 0;
let itemsOnPage = 8;
let pages = indexesArr.length / itemsOnPage;

const updatePets = () => {
    const startingItem = currentPage * itemsOnPage;
    let indexes = indexesArr.slice(startingItem, startingItem + itemsOnPage);

    petsContainer.innerHTML = '';

    indexes.forEach(index => createPetBlock(pets[index]));
}

updatePets();

prevBtn.addEventListener('click', () => {
    if(!prevBtn.classList.contains('button_inactive')) {
        if (currentPage + 1 === pages) enableButtonStyles('next');

        currentPage--;
        updatePets();
        updatePage();

        if (currentPage === 0) {
            disableButtonsStyles('prev');
        }
    }
});

nextBtn.addEventListener('click', () => {
    if(!nextBtn.classList.contains('button_inactive')) {
        if (currentPage === 0) enableButtonStyles('prev');

        currentPage++;
        updatePets();
        updatePage();

        if (currentPage + 1 === pages) {
            disableButtonsStyles('next');
        }
    }
});

firstBtn.addEventListener('click', () => {
    if(!firstBtn.classList.contains('button_inactive')) {
        if (currentPage + 1 === pages) enableButtonStyles('next');

        currentPage = 0;
        updatePets();
        updatePage();
        disableButtonsStyles('prev');
    }
})

lastBtn.addEventListener('click', () => {
    if(!lastBtn.classList.contains('button_inactive')) {
        if (currentPage === 0) enableButtonStyles('prev');

        currentPage = pages - 1;
        updatePets();
        updatePage();
        disableButtonsStyles('next');
    }
})


// pagination

const enableButtonStyles = (buttonsType) => {
    switch (buttonsType) {
        case 'prev':
            prevBtn.classList.remove('button_inactive');
            firstBtn.classList.remove('button_inactive');
            break;
        case 'next':
            nextBtn.classList.remove('button_inactive');
            lastBtn.classList.remove('button_inactive');
    }
}

const disableButtonsStyles = (buttonsType) => {
    switch (buttonsType) {
        case 'prev':
            prevBtn.classList.add('button_inactive');
            firstBtn.classList.add('button_inactive');
            break;
        case 'next':
            nextBtn.classList.add('button_inactive');
            lastBtn.classList.add('button_inactive');
    }
}

const updatePage = () => {
    document.querySelector('.current-page').textContent = currentPage + 1;
}

// modal window

petsContainer.addEventListener('click', (e) => {
    if (e.target.closest('.pet')) {
        createModalWindow(e.target.closest('.pet'));
        openModalWindow();
    }
})

modalWindow.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModalWindow();
    }
})

const createModalWindow = (pet) => {
    const petId = pet.getAttribute('pet-id');
    const modalElements = document.querySelectorAll('[data-modal]');
    const modalImg = document.querySelector('.modal__img');
    modalImg.src = pets[petId]['img'];

    modalElements.forEach((elem) => {
        let data = pets[petId][elem.dataset.modal];

        if (Array.isArray(data)) {
            data = data.join(', ');
        }

        elem.textContent = data;
    })
}

const openModalWindow = () => {
    modalWindow.classList.add('active');
    backdrop.classList.add('active');
}

const closeModalWindow = () => {
    modalWindow.classList.remove('active');
    backdrop.classList.remove('active');
}

modalWindowCloseBtn.addEventListener('click', closeModalWindow);