async function addCocktail() {
    const cocktailName = document.getElementById("cocktail-name").textContent;
    const cocktailImg = document.getElementById("cocktail-img").src;
    const cocktailInstructions = document.getElementById("p-1").textContent;
    const cocktailIngredients = document.getElementById("p-2").textContent;

    const data = await fetch(`/drinks`, {
    method: 'POST',
    body: JSON.stringify({
      drink_name: cocktailName,
      drink_img: cocktailImg,
      drink_instructions: cocktailInstructions,
      drink_ingredients: cocktailIngredients
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());

  console.log("Inserted into Supabase: ", data);
}

function surpriseDrink() {
    const cocktailName = document.getElementById("cocktail-name");
    const cocktailImg = document.getElementById("cocktail-img");
    const cocktailInstructions = document.getElementById("p-1");
    const cocktailIngredients = document.getElementById("p-2");

    // generating a random cocktail
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((result) => result.json())
    .then((data) => {
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
            // removes trailing comma and space
            cocktailIngredients.textContent = ingredientList.slice(0, -2);
        }
    });
}

document.addEventListener("DOMContentLoaded", surpriseDrink);