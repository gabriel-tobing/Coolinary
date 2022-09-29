const cardContainer = document.getElementById("card-container");

const fetchAPI = async () => {
    
    const API_KEY = "f497c4b7256042e9af6f4ccccfc458d1";

    const fetchData = await fetch(`https://api.spoonacular.com/recipes/random?number=4&apiKey=${API_KEY}`);
    const result = await fetchData.json();
    const datas = result.recipes;

    let card = "";

    datas.forEach((data) => card += cardComponent(data));

    cardContainer.innerHTML = card;
}

const cardComponent = (data) => {
    if(data.dishTypes.length == 0) {
        return `
        <div class="card-group">
            <div class="card shadow-sm">
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

                    <div class="mt-4">
                        <a href="${ data.id }" class="primary-button shadow-sm">Lihat Resep</a>
                    </div>
                </div>
            </div>
        </div>
    `
    } else {
        return `
            <div class="card-group">
                <div class="card shadow-sm">
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

                        <div class="mt-4">
                            <a href="${ data.id }" class="primary-button shadow-sm">Lihat Resep</a>
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

fetchAPI();