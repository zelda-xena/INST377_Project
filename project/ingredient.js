// populates the ingredients for the ingredient drop down
async function populateIngredients() {
    const ingredients = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list").then(
        (result) => result.json()
    );
    const datalist = document.getElementById("ingredient");

    ingredients.drinks.forEach(ingredient => {
        console.log(`Drink: ${JSON.stringify(ingredient)}`);

        const option = document.createElement("option");
        option.value = ingredient.strIngredient1;
        option.innerHTML = ingredient.strIngredient1;
        datalist.appendChild(option);
    });
}

window.onload = populateIngredients;