// New ingredient.js

function handleFormSubmission(event) {
    // Prevent the default navigation for now
    event.preventDefault(); 

    // pulls the input from the ingredient form
    const inputs = document.querySelectorAll("input[name='drink-ingredient']");
    const ingredient1 = inputs[0].value.trim();
    const ingredient2 = inputs[1].value.trim();
    const ingredient3 = inputs[2].value.trim();

    const chosenIngredient = ingredient1 || ingredient2 || ingredient3;

    if (chosenIngredient) {
        // 1. Save the chosen ingredient to local storage
        localStorage.setItem('chosenCocktailIngredient', chosenIngredient);
        
        // 2. Navigate to the results page
        window.location.href = "result.html";
    } else {
        alert("Please enter at least one ingredient.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#generateForm");
    // Change the handler function
    form.addEventListener("submit", handleFormSubmission); 
});

// New result.js (This replaces the ingredientList part from earlier)

function loadCocktail() {
    // 1. Get the ingredient from local storage
    const chosenIngredient = localStorage.getItem('chosenCocktailIngredient');

    if (!chosenIngredient) {
        // Handle case where user navigates directly to result.html
        document.getElementById("cocktail-name").textContent = "Error: No ingredient chosen!";
        return;
    }
    
    // ... your original fetching logic starts here ...
    
    // use encondeURIcomponent so strings with spaces can still be valid
    // filter for a list of cocktails by chosen ingredients from form
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(chosenIngredient)}`)
    .then((result) => result.json())
    .then((data) => {
        if(!data.drinks) {
            alert("No cocktails found.");
            // Display an error on the page
            document.getElementById("cocktail-name").textContent = "No cocktails found with that ingredient.";
            return;
        }

        // picks one cocktail from the filtered list
        const randomDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];

        // look up the full details of the cocktail using id
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrink.idDrink}`);
    })
    .then((result) => result.json())
    .then((data) => {
        const drink = data.drinks[0];

        const cocktailName = document.getElementById("cocktail-name");
        const cocktailImg = document.getElementById("cocktail-img");
        const cocktailInstructions = document.getElementById("p-1");
        const cocktailIngredients = document.getElementById("p-2");

        // update name and image
        cocktailName.textContent = drink.strDrink;
        cocktailImg.src = drink.strDrinkThumb;

        // update instructions
        cocktailInstructions.textContent = drink.strInstructions;
        
        // update ingredients list (Using the array.join() fix for cleanliness)
        const ingredientsArray = [];
        for(let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];

            if(ingredient) {
                ingredientsArray.push(measure ? `${measure.trim()} ${ingredient}` : ingredient);
            }
        }
        
        cocktailIngredients.textContent = ingredientsArray.join(', ');
        
        // Clean up local storage after use
        localStorage.removeItem('chosenCocktailIngredient');
    });
}

document.addEventListener("DOMContentLoaded", loadCocktail);