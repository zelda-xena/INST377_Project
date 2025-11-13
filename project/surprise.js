function surpriseMe() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then((result) => result.json())
        .then((data) => {
        const drink = data.drinks[0];
        localStorage.setItem("drinkResult", JSON.stringify(drink));
        window.location.href = "result.html";
        })}