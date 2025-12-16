function loadCocktail(event) {
    event.preventDefault(); // prevent form from submitting

    const ingredient1 = document.querySelector("input[list='ingredient1']").value.trim();
    const ingredient2 = document.querySelector("input[list='ingredient2']").value.trim();
    const ingredient3 = document.querySelector("input[list='ingredient3']").value.trim();

    // pick the first non-empty ingredient (API requires at least one)
    const chosenIngredient = ingredient1 || ingredient2 || ingredient3;

    if (!chosenIngredient) {
        alert("Please choose at least one ingredient!");
        return;
    }

    // Step 1: filter cocktails by chosen ingredient
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(chosenIngredient)}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.drinks) {
                alert("No cocktails found with that ingredient.");
                return;
            }

            // pick a random cocktail from the filtered list
            const randomDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];

            // Step 2: lookup full details by ID
            return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrink.idDrink}`);
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data || !data.drinks) return;

            const drink = data.drinks[0];

            // update DOM (make sure your result.html has these IDs)
            const cocktailName = document.getElementById("cocktail-name");
            const cocktailImg = document.getElementById("cocktail-img");
            const cocktailInstructions = document.getElementById("p-1");
            const cocktailIngredients = document.getElementById("p-2");

            cocktailName.textContent = drink.strDrink;
            cocktailImg.src = drink.strDrinkThumb;
            cocktailInstructions.textContent = drink.strInstructions;

            // build ingredient list
            let ingredientList = "";
            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];
                if (ingredient) {
                    ingredientList += (measure ? measure : "") + " " + ingredient + ", ";
                }
            }
            cocktailIngredients.textContent = ingredientList.replace(/,\s*$/, ""); // remove trailing comma
        })
        .catch((err) => console.error(err));
}

// attach event listener to form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".generateForm");
    form.addEventListener("submit", loadCocktail);
});