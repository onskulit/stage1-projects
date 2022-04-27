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

const defaultQuery = window.matchMedia('(min-width: 1280px)');
const desktopQuery = window.matchMedia('(max-width: 1279px)');
const desktopQueryMin = window.matchMedia('(min-width: 768px)');
const tabletQuery = window.matchMedia('(max-width: 767px)');


document.addEventListener('DOMContentLoaded', () => {
    if (defaultQuery.matches) updatesPetsForQuery(8);
    if (desktopQuery.matches) updatesPetsForQuery(6);
    if (tabletQuery.matches) updatesPetsForQuery(3);
})
// adaptive menu creation

const closeHamburgerMenu = () => {
    hamburgerIcon.classList.remove('active');
    navigation.classList.remove('adaptive-menu');
    backdrop.classList.remove('active');
    document.body.classList.remove('disable-scroll');
};

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('active');
    navigation.classList.toggle('adaptive-menu');
    backdrop.classList.toggle('active');
    document.body.classList.toggle('disable-scroll');
}); 

navigation.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__link')) {
        closeHamburgerMenu();
    }
});

backdrop.addEventListener('click', () => {
    if (navigation.classList.contains('adaptive-menu')) {
        closeHamburgerMenu();
    } 
    if (modalWindow.classList.contains('active')) closeModalWindow();
});


// new array creation

let indexesArr = [];

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
        indexesArr.push(createNewIndexes(8, pets.length));
    }

    for (let i = 0; i < indexesArr.length; i++) {
        if (i > 0) {
            for (let j = 0; j < 5; j++) {
                const group = indexesArr[i];
                const prevGroup = indexesArr[i - 1];
                function checkPosition(element) {
                    const distance = j + (8 - prevGroup.indexOf(group[j]));
                    if (distance < 7) {
                        let forReplacement = group[j + 7 - distance];
                        group[j + 7 - distance] = group[j];
                        group[j] = forReplacement;
                        checkPosition(group[j]);
                    }
                };
                checkPosition(group[j]);
            }
        }
    }

    let currentArr = [];
    for (let arr of indexesArr) {
        currentArr = currentArr.concat(arr);
    }
    
    indexesArr = currentArr;
}

createIndexesArray(6);

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

// adaptive pagination

const updatesPetsForQuery = (items) => {
    itemsOnPage = items;

    pages = indexesArr.length / itemsOnPage;

    if (currentPage < pages && lastBtn.classList.contains('button_inactive')) enableButtonStyles('next');

    if (currentPage + 1 > pages) {
        currentPage = pages - 1;
    }
    
    updatePets();
    updatePage();
}

defaultQuery.addListener(e => {
    if (e.matches) updatesPetsForQuery(8);
});

desktopQuery.addListener(e => {
    if (e.matches) {
        updatesPetsForQuery(6);
    } 
});

desktopQueryMin.addListener(e => {
    if (e.matches) {
        updatesPetsForQuery(6);
    } 
});

tabletQuery.addListener(e => {
    if (e.matches) updatesPetsForQuery(3);
});


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
    document.body.classList.add('disable-scroll');
}

const closeModalWindow = () => {
    modalWindow.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.classList.remove('disable-scroll');
}

modalWindowCloseBtn.addEventListener('click', closeModalWindow);