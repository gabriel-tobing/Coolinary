/* Fetch API for Favorite Foods Section */

const cardContainer = document.getElementById("card-container");

const fetchAPI = async () => {
    let card = "";
    
    const API_KEY = "527465d2b6514ee7b5ea0e42fb8b7eb6";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/random?number=4&apiKey=${API_KEY}`);
    const result = await fetchData.json();
    const datas = result.recipes;

    datas.forEach((data) => card += cardComponent(data));

    cardContainer.innerHTML = card;
}

const cardComponent = (data) => {
    if(data.dishTypes.length == 0) {
        return `
            <div class="card-group">
                <div class="card shadow-sm ${ data.vegetarian ? "vegan" : "not-vegan" } ${ data.glutenFree ? "free-sugar" : "not-free-sugar" }">
                    <img src="${ data.image }" class="card-img-top" alt="${ data.title }" style="height: 200px; object-fit: cover;">

                    <div class="card-body pt-3 px-2">
                        <h5 class="title card-title text-truncate">${ data.title }</h5>

                        <div class="d-flex justify-content-between align-items-center flex-wrap mt-3">
                            <div class="card-info">
                                <i class="bi bi-stopwatch me-1"></i>
                                <span>${ data.readyInMinutes } minutes</span>
                            </div>
                            
                            <div>
                                <svg viewBox="0 0 1000 200" class="rating">
                                    <defs>
                                        <polygon id="star" points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "/>
                                        <clipPath id="stars">
                                            <use xlink:href="#star"/>
                                            <use xlink:href="#star" x="20%"/>
                                            <use xlink:href="#star" x="40%"/>
                                            <use xlink:href="#star" x="60%"/>
                                            <use xlink:href="#star" x="80%"/>
                                        </clipPath>
                                    </defs>
                                    <rect class="rating-background" clip-path="url(#stars)"></rect>
                                    <rect width="${ (data.aggregateLikes / 5) * 20 }%" class="rating-value" clip-path="url(#stars)"></rect>
                                </svg>
                            </div>
                        </div>

                        <div class="d-flex align-items-center gap-2 mt-3">
                            <div class="vegan-parameter" title="${ data.vegan ? "Cocok untuk Vegetarian" : "Tidak cocok untuk Vegetarian" }"></div>
                            <div class="sugar-parameter" title="${ data.glutenFree ? "Bebas gula" : "Tidak bebas gula" }"></div>
                        </div>

                        <div class="mt-4">
                            <a href="details.html" class="primary-button shadow-sm" id="detail-button">Lihat Resep</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    } else {
        return `
            <div class="card-group">
                <div class="card shadow-sm ${ data.vegan ? "vegan" : "not-vegan" } ${ data.glutenFree ? "free-sugar" : "not-free-sugar" }">
                    <img src="${ data.image }" class="card-img-top" alt="${ data.title }" style="width: 100%; height: 200px; object-fit: cover;">

                    <div class="card-body pt-3 px-2">
                        <h5 class="title card-title text-truncate">${ data.title }</h5>

                        <div class="d-flex justify-content-between align-items-center flex-wrap mt-3">
                            <div class="card-info">
                                <i class="bi bi-stopwatch me-1"></i>
                                <span>${ data.readyInMinutes } minutes</span>
                            </div>
                            
                            <div>
                                <svg viewBox="0 0 1000 200" class="rating">
                                    <defs>
                                        <polygon id="star" points="100,0 131,66 200,76 150,128 162,200 100,166 38,200 50,128 0,76 69,66 "/>
                                        <clipPath id="stars">
                                            <use xlink:href="#star"/>
                                            <use xlink:href="#star" x="20%"/>
                                            <use xlink:href="#star" x="40%"/>
                                            <use xlink:href="#star" x="60%"/>
                                            <use xlink:href="#star" x="80%"/>
                                        </clipPath>
                                    </defs>
                                    <rect class="rating-background" clip-path="url(#stars)"></rect>
                                    <rect width="${ (data.aggregateLikes / 5) * 20 }%" class="rating-value" clip-path="url(#stars)"></rect>
                                </svg>
                            </div>
                        </div>

                        <div class="d-flex align-items-center gap-2 mt-3">
                            <div class="vegan-parameter" title="${ data.vegan ? "Cocok untuk Vegetarian" : "Tidak cocok untuk Vegetarian" }"></div>
                            <div class="sugar-parameter" title="${ data.glutenFree ? "Bebas gula" : "Tidak bebas gula" }"></div>
                        </div>

                        <div class="mt-4">
                            <a href="details.html" class="primary-button shadow-sm" id="detail-button">Lihat Resep</a>
                        </div>
                    </div>

                    <div class="type shadow-sm">
                        <p class="food-type mb-0">${ data.dishTypes[0] }</p>
                    </div>
                </div>
            </div>
        `
    }
}

// fetchAPI();



/* Fetch API for Recipe */

const foodContainer = document.getElementById("food-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchInput.addEventListener("keyup", (e) => {
    const userInput = searchInput.value;

    if(userInput == "") {
        fetchRandomFood();
        listEl.style.display = "none";
        searchInput.classList.remove("active");
    } else if(userInput != "" && e.keyCode == 13) {
        fetchSearchFood(userInput);
        searchInput.classList.add("active");
    } else if(userInput == "" && e.keyCode == 13) {
        return false;
    } else if(userInput != "") {
        fetchAutoComplete(userInput);
        searchInput.classList.add("active");
    }
});

searchButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const userValue = searchInput.value;

    fetchSearchFood(userValue);
});

const foodComponent = (data) => {
    return `
        <div class="card-group">
            <div class="card shadow-sm">
                <img src="${ data.image }" class="card-img-top" alt="${ data.title }" style="width: 100%; height: 200px; object-fit: cover;">

                <div class="card-body pt-3 px-2">
                    <h5 class="title card-title text-truncate">${ data.title }</h5>

                    <div class="mt-4">
                        <a href="details.html" class="primary-button shadow-sm" id="detail-button" data-id="${ data.id }">Lihat Resep</a>
                    </div>
                </div>
            </div>
        </div>
    `
}

const fetchSearchFood = async (value) => {
    let foodCard = "";
    
    const API_KEY = "527465d2b6514ee7b5ea0e42fb8b7eb6";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&number=12&apiKey=${API_KEY}`);
    const data = await fetchData.json();
    const results = data.results;

    results.forEach((result) => foodCard += foodComponent(result));

    foodContainer.innerHTML = foodCard;
}

const fetchRandomFood = async () => {
    let card = "";
    
    const API_KEY = "527465d2b6514ee7b5ea0e42fb8b7eb6";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`);
    const result = await fetchData.json();
    const datas = result.recipes;

    datas.forEach((data) => card += foodComponent(data));

    foodContainer.innerHTML = card;
}

fetchRandomFood();

const listEl = document.getElementById("list-group");

const fetchAutoComplete = async (value) => {
    let listGroupEl = "";

    const API_KEY = "527465d2b6514ee7b5ea0e42fb8b7eb6";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/autocomplete?number=5&query=${value}&apiKey=${API_KEY}`);
    const datas = await fetchData.json();

    datas.forEach((data) => listGroupEl += listComponent(data));

    listEl.innerHTML = listGroupEl;
}

const listComponent = (data) => {
    return `
        <a href="${ data.id }" class="list-group-item list-group-item-action">${ data.title }</a>
    `
}

const submitButton = document.getElementById("submit-button");
const selectEl = document.querySelector("select");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userInput = searchInput.value;
    const optionValue = selectEl.value;

    if(userInput != "") {
        filterSearchRecipe(userInput, optionValue);
    } else {
        filterRecipe(optionValue);
    }

});

const filterSearchRecipe = async (value, filter) => {
    let foodCard = "";
    
    const API_KEY = "527465d2b6514ee7b5ea0e42fb8b7eb6";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&type=${filter}&number=12&apiKey=${API_KEY}`);
    const data = await fetchData.json();
    const results = data.results;

    results.forEach((result) => foodCard += foodComponent(result));

    foodContainer.innerHTML = foodCard;
}

const filterRecipe = async (filter) => {
    let foodCard = "";
    
    const API_KEY = "527465d2b6514ee7b5ea0e42fb8b7eb6";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${filter}&number=12&apiKey=${API_KEY}`);
    const data = await fetchData.json();
    const results = data.results;

    results.forEach((result) => foodCard += foodComponent(result));

    foodContainer.innerHTML = foodCard;
}