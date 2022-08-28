const searchMeals = () => {
  const searchItem = document.getElementById("search-item");
  const search = searchItem.value;

  if (search === "" || search === "undefined") {
    alert("Please Search A Correct Meal from the Categorie");
    searchItem.value = "";
  } else if (parseFloat(search) === "number") {
    alert("Please Search A Correct Meal from the Categorie");
    searchItem.value = "";
  } else {
    mealApi(search);
    searchItem.value = "";
  }
};

const mealApi = (searchItem) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>
      data.meals ? displayMeals(data.meals) : alert("Out of Stock")
    );
};

const displayMeals = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">
                ${meal.strInstructions.slice(0, 200)}
            </p>
            </div>
        </div>
    `;
    mealContainer.appendChild(mealDiv);
  });
};

const mealApi2 = (searchItem) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.meals));
};

const displayCategories = (Categories) => {
  const cate = Categories;
  const categoryContainer = document.getElementById("category-container");
  cate.forEach((cat) => {
    const option = document.createElement("option");
    option.setAttribute("value", `${cat.strCategory}`);
    option.setAttribute("onclick", `selectOption(this)`);
    const catId = cat.strCategory.toLowerCase();
    option.setAttribute("id", `${catId}`);
    option.innerText = `${cat.strCategory}`;
    categoryContainer.appendChild(option);
  });
};

const selectOption = (op) => {
  const option = op.innerText;
  mealApi(option);
};

mealApi("");
mealApi2("");
