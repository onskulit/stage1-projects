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


// image preload

const preloadImages = () => {
    for (let pet of pets) {
        const img = new Image();
        img.src = pet['img'];
    }
};

preloadImages();