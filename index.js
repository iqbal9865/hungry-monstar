const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click',function() {
    const inputFood = document.getElementById('first-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFood}`)
    .then(res => res.json())
    .then(data => { 
        document.getElementById('items').innerHTML = "";
        document.getElementById('food-info').innerHTML = ' ';
        const items = document.getElementById('items');
        data.meals.forEach(searchResult => {
            const searchFood = document.createElement('div');
            searchFood.innerHTML = `
                <img src="${ searchResult.strMealThumb }" onclick="showResult(${ searchResult.idMeal })">
                <h1 onclick="showResult(${ searchResult.idMeal })">${ searchResult.strMeal }</h1>
            `;
            searchFood.className = "card";
            items.appendChild(searchFood);
        });
    })
    .catch(error => {
        document.getElementById('items').innerHTML = "";
        document.getElementById('food-info').innerHTML = ' ';
        const items = document.getElementById('items');
        const noResult = document.createElement('h2');
        noResult.innerHTML = "No Items Found...";
        items.appendChild(noResult);
    })
})

let showResult = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        let foodInfo = document.getElementById('food-info');
        document.getElementById('food-info').innerHTML = ' ';
        document.getElementById('food-info').style.display = 'block';
        let detailsInfo = document.createElement('div');
        detailsInfo.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1> 
            <br>
            <h2>${ data.meals[0].strArea }</h2>
            <br>

            <h3>${ data.meals[0].strIngredient1 }</h3>
            <h3>${ data.meals[0].strIngredient2 }</h3>
            <h3>${ data.meals[0].strIngredient3 }</h3>
            <h3>${ data.meals[0].strIngredient4 }</h3>
            <h3>${ data.meals[0].strIngredient5 }</h3>
            <h3>${ data.meals[0].strIngredient6 }</h3>
            <h3>${ data.meals[0].strIngredient7 }</h3> 
            
        `;
        detailsInfo.className = 'total-info';
        foodInfo.appendChild(detailsInfo);
    })
}
//need to change strMeasuring