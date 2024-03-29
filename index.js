import { cocktailRecipes } from '/recipes.js'


const spiritRadios = document.getElementById('spirit-radios')
const getRecipeBtn = document.getElementById('get-recipe-btn')
const noShakenCocktailsOption = document.getElementById('no-shaken-cocktails-option')
const recipeModalInner = document.getElementById('recipe-modal-inner')
const recipeModal = document.getElementById('recipe-modal')
const recipeModalCloseBtn = document.getElementById('recipe-modal-close-btn')

spiritRadios.addEventListener('change', highlightCheckedOption)

recipeModalCloseBtn.addEventListener('click', closeModal)

document.addEventListener('mouseup', closeModalByClickingAnywhere)

getRecipeBtn.addEventListener('click', renderCocktail)

function highlightCheckedOption(e){
    const radioItemsArray = document.getElementsByClassName('radio')
    for (let item of radioItemsArray){
        item.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight') 
}

function closeModal() {
    recipeModal.style.display = 'none'
}

function closeModalByClickingAnywhere(e){
    if(recipeModal.style.display === 'flex' && !recipeModal.contains(e.target)){
            closeModal()
    }
}

function getMatchingCocktailsArray(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedSpirit = document.querySelector('input[type="radio"]:checked').value
        const isNotShaken = noShakenCocktailsOption.checked
        
        const matchingCocktailsArray = cocktailRecipes.filter(function(recipe){
            
            if(isNotShaken){
                return recipe.ingredients[0] === selectedSpirit && !recipe.isShaken
            }
            else{
                return recipe.ingredients[0] === selectedSpirit
            }
            
        })
        
        return matchingCocktailsArray
    
    }
}

function getSingleCocktail(){
    const cocktailsArray = getMatchingCocktailsArray()
    
    if(cocktailsArray.length === 1){
        return cocktailsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * cocktailsArray.length)
        return cocktailsArray[randomNumber]
    }
}

function renderCocktail(){
    if(document.querySelector('input[type="radio"]:checked')){
        const cocktailObject = getSingleCocktail()

        let ingredientsUl = ""
        for (let ingredient of cocktailObject.ingredients){
        ingredientsUl += `<li>${ingredient[0].toUpperCase() + ingredient.slice(1)}</li>`
        }
        
        recipeModalInner.innerHTML = 
        `
        <div id="recipe-result" class="recipe-result">
            <h3>${cocktailObject.cocktailName}</h3>
            <ul class="listed-ingredients" id="listed-ingredients">
                ${ingredientsUl}
            </ul>
            <img
            class="cocktail-img" 
            src="${cocktailObject.image}" 
            alt="${cocktailObject.alt}"
            >
            <p>${cocktailObject.instructions}</p>
        </div>
        `
        recipeModal.style.display = 'flex'
    } else {
        recipeModalInner.innerHTML = `
        <h1>No cocktails on this list yet...</h1>`
    }
    
    
}

function getSpiritsArray(recipes){
     const spiritsArray = []
     for (let recipe of recipes){
        if(!spiritsArray.includes(recipe.ingredients[0])){
             spiritsArray.push(recipe.ingredients[0])
         }
        
     } 
   return spiritsArray
}

function renderSpirits(recipes) {
    const spirits = getSpiritsArray(recipes)
    for (let spirit of spirits) {
        spiritRadios.innerHTML += `
        <div class="radio">
            <label for="${spirit}">${spirit}</label>
            <input
            type="radio"
            id="${spirit}"
            value="${spirit}"
            name="spirits"
            >
        </div>`
    }
    
}
renderSpirits(cocktailRecipes)
