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

async function surpriseDrink() {
    const cocktailName = document.getElementById("cocktail-name");
    const cocktailImg = document.getElementById("cocktail-img");
    const cocktailInstructions = document.getElementById("p-1");
    const cocktailIngredients = document.getElementById("p-2");

    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const data = await response.json();
    const drink = data.drinks[0];

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
            ingredientList += (measure ? measure + " " : "") + ingredient + ", ";
        }
    }
    // removes trailing comma and space
    cocktailIngredients.textContent = ingredientList.slice(0, -2);

    // automatically saves to supabase table
    addCocktail({
      name: drink.strDrink,
      img: drink.strDrinkThumb,
      instructions: drink.strInstructions,
      ingredients: ingredientList
    });
}

document.addEventListener("DOMContentLoaded", surpriseDrink);