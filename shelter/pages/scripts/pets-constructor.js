import pets from '../scripts/pets.js';

const petsConstructor = {
    petsContainer: document.querySelector('.pets'),
    uniquePetIndexes: [],

    createPetBlock(pet) {
        const petBlock = document.createElement('div');
        petBlock.classList.add('pet');
        this.petsContainer.append(petBlock);

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
    },

    updateUniqueIndexes(requiredLength, arrLength) {
        const newIndexes = [];
    
        for (let i = 0; i < requiredLength; i++) {
            let index = Math.floor(Math.random() * arrLength);
    
            while (newIndexes.includes(index) || this.uniquePetIndexes.includes(index)) {
                index = Math.floor(Math.random() * arrLength);
            }
    
            newIndexes.push(index);
        }
    
        this.uniquePetIndexes = newIndexes;
    }
}

export default petsConstructor;