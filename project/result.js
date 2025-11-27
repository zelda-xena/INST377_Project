function loadDrink() {
    const drinkData = localStorage.getItem("drinkResult");
    const drink = JSON.parse(drinkData);

    const drinkName = document.getElementById("cocktail-name");
    drinkName.textContent = drink.strDrink;

    const instructionText = drink.strInstructions;
    const instructionPara = document.getElementById("h3-1");
    instructionPara.innerHTML = instructionText;
}
