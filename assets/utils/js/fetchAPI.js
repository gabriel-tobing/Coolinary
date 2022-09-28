const cardContainer = document.getElementById("card-container");

const fetchAPI = async () => {
    
    const API_KEY = "7b494b0b46074792ac326816bdace5c3";

    const fetchData = await fetch(`https://api.spoonacular.com/food/menuItems/search?query=pizza&number=4&apiKey=${API_KEY}`);
    const result = await fetchData.json();
    const datas = result.menuItems;
    console.log(datas)

    let card = "";

    datas.forEach((data) => card += cardComponent(data));

    cardContainer.innerHTML = card;
}

const cardComponent = (data) => {
    return `
        <div class="card-group">
            <div class="card shadow-sm">
                <img src="${ data.image }" class="card-img-top" alt="${ data.title }" style="height: 200px; object-fit: cover;">

                <div class="card-body">
                    <h5 class="card-title">${ data.title }</h5>
                </div>
            </div>
        </div>
    `
}

fetchAPI();