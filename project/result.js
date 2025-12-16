function loadCocktail() {
    // pulls the input from the ingredient form
    const ingredient1 = document.querySelector("input[list='ingredient1']").value.trim();
    const ingredient2 = document.querySelector("input[list='ingredient2']").value.trim();
    const ingredient3 = document.querySelector("input[list='ingredient3']").value.trim();

    const chosenIngredient = ingredient1 || ingredient2 || ingredient3;
    
    // use encondeURIcomponent so strings with spaces can still be valid
    // filter for a list of cocktails by chosen ingredients from form
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(chosenIngredient)}`)
    .then((result) => result.json())
    .then((data) => {
        if(!data.drinks) {
            alert("No cocktails found.");
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
        
        // update ingredients list
        let ingredientList = "";

        // loop goes through all 15 ingredients and measures in the api
        for(let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];

            // checks if there are both ingredients and measurements from the api
            if(ingredient) {
                if(measure) {
                    ingredientList += measure + " " + ingredient + ", ";
                }
                else {
                    ingredientList += ingredient + ", ";
                }
            }
        }
        cocktailIngredients.textContent = ingredientList.trim();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#generateForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        loadCocktail();
    });
});