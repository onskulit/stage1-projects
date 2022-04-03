import pets from '../scripts/pets.js';

const hamburgerIcon = document.querySelector('.hamburger');
const navigation = document.querySelector('.nav__list');
const backdrop = document.querySelector('.backdrop');

const petsContainer = document.querySelector('.pets');
const prevBtns = document.querySelectorAll('.button_prev');
const nextBtns = document.querySelectorAll('.button_next');

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

// pet creation

let uniquePetIndexes = [4, 0, 2];

const createPetBlock = (pet, index) => {
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

    return petBlock;
}


const updatePets = () => {
    petsContainer.innerHTML = '';
    updateUniqueIndexes(3, pets.length);

    createPetBlock(pets[uniquePetIndexes[0]], uniquePetIndexes[0]);
    createPetBlock(pets[uniquePetIndexes[1]], uniquePetIndexes[1]).classList.add('desktop_hidden')
    createPetBlock(pets[uniquePetIndexes[2]], uniquePetIndexes[2]).classList.add('tablet_hidden');
}

const updateUniqueIndexes = (requiredLength, arrLength) => {
    const newIndexes = [];

    for (let i = 0; i < requiredLength; i++) {
        let index = Math.floor(Math.random() * arrLength);

        while (newIndexes.includes(index) || uniquePetIndexes.includes(index)) {
            index = Math.floor(Math.random() * arrLength);
        }

        newIndexes.push(index);
    }

    uniquePetIndexes = newIndexes;
}

prevBtns.forEach(btn => {
    btn.addEventListener('click', updatePets);
})

nextBtns.forEach(btn => {
    btn.addEventListener('click', updatePets);
})

// modal window


// image preload

const preloadImages = () => {
    for (let pet of pets) {
        const img = new Image();
        img.src = pet['img'];
    }
};

preloadImages();

// credit card input validation
/* 
const creditInput = document.querySelector('.card-input');

creditInput.addEventListener('keydown', function validateCreditCard(e) {
    const notNumbers = [192, 189, 187, 219, 221, 220, 186, 222, 188, 190, 191]
        
    if ((e.keyCode >= 65 && e.keyCode <= 90) || notNumbers.includes(e.keyCode)) {
        e.preventDefault();
    }

    if (window.getSelection) {
        creditInput.value.replace(new RegExp(window.getSelection().toString()), e.key);
    }

    if ((e.keyCode === 8 || e.keyCode === 46) && creditInput.value.length) {
        if (window.getSelection) {
            creditInput.value.replace(new RegExp(window.getSelection().toString()), '');
        } else {
            creditInput.value.slice(0, -1);
        }
    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        e.preventDefault();
        creditInput.value += e.key;

        if (creditInput.value.length === 4 || creditInput.value.length === 9 || creditInput.value.length === 14 || creditInput.value.length === 19) {
            creditInput.value += ' ';
        }
        
        if (creditInput.value.length > 24) return;
    }
}) */