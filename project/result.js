async function addCocktail({name, img, instructions, ingredients}) {
    const data = await fetch(`/drinks`, {
    method: 'POST',
    body: JSON.stringify({
      drink_name: name,
      drink_img: img,
      drink_instructions: instructions,
      drink_ingredients: ingredients
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());

  console.log("Inserted into Supabase: ", data);
}

async function loadCocktail() {
    const storedIngredient = localStorage.getItem("chosenCocktailIngredients");
    const ingredients = JSON.parse(storedIngredient);
    const chosenIngredient = ingredients[0];
    
    // use encondeURIcomponent so strings with spaces can still be valid
    // filter for a list of cocktails by chosen ingredients from form
    const filterData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(chosenIngredient)}`)
                              .then((result) => result.json());
    //picks one cocktail from the filtered list
    const randomDrink = filterData.drinks[Math.floor(Math.random() * filterData.drinks.length)];

    //look up full details of the cocktail from the filtered list
    const detailData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrink.idDrink}`)
                            .then((result) => result.json());
    const drink = detailData.drinks[0];
    
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
    let ingredientArray = [];

    // loop goes through all 15 ingredients and measures in the api
    for(let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        // checks if there are both ingredients and measurements from the api
        if(ingredient) {
             ingredientArray.push(measure ? `${measure.trim()} ${ingredient}` : ingredient);
         }
    }
    cocktailIngredients.textContent = ingredientArray.join(", ");
    localStorage.removeItem("chosenCocktailIngredients")
    // automatically saves to supabase table
    addCocktail({
      name: drink.strDrink,
      img: drink.strDrinkThumb,
      instructions: drink.strInstructions,
      ingredients: ingredientArray.join(", ")
    });
}

document.addEventListener("DOMContentLoaded", loadCocktail);
