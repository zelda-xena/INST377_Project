// populates the ingredients for the ingredient drop down
async function populateIngredients() {
    const ingredients = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list").then(
        (result) => result.json()
    );
    const datalist1 = document.getElementById("ingredient1");
    const datalist2 = document.getElementById("ingredient2");
    const datalist3 = document.getElementById("ingredient3");

    ingredients.drinks.forEach(ingredient => {
        console.log(`Drink: ${JSON.stringify(ingredient)}`);

        const option = document.createElement("option");
        option.value = ingredient.strIngredient1;
        option.innerHTML = ingredient.strIngredient1;

        datalist1.appendChild(option.cloneNode(true));
        datalist2.appendChild(option.cloneNode(true));
        datalist3.appendChild(option.cloneNode(true));
    });
}

function handleFormSubmission(event) {
    event.preventDefault();

    // pulls the input from the ingredient form
    const inputs = document.querySelectorAll("input[name='drink-ingredient']")
    const ingredients = Array.from(inputs)
                        .map(input => input.value.trim()) // gets ingredient values from datalist
                        .filter(value => value != ""); // removes any empty values from array

    if(ingredients.length > 0) {
        // save all chosen ingredients to an array
        localStorage.setItem("chosenCocktailIngredients", JSON.stringify(ingredients));
        // navigate to the results page
        window.location.href = "result.html";
    }
}

window.onload = populateIngredients;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#generateForm");
    form.addEventListener("submit", handleFormSubmission);
});