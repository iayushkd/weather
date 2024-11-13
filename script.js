import cities from "./cities.js";

const apiKey = "36f031f1ea51e44def8ad5923d7145f8";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const resultsList = document.getElementById("results");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
console.log(url);

function searchCities(query) {
    let cityName = document.querySelector(".city-container");
    cityName.style.display = "block";
    const weather = document.getElementById("weather");
    resultsList.innerHTML = "";
    const matchedCities = cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
    );
    matchedCities.forEach((city) => {
        const cityName = document.createElement("div");
        cityName.classList.add("cityName");
        cityName.textContent = city;
        resultsList.appendChild(cityName);
    });
    cityName.addEventListener("click", (e) => {
        search.value = e.target.innerText;
        resultsList.innerHTML = "";
        search.focus();
        cityName.style.display = "none";
    });
}

search.addEventListener("input", function () {
    searchCities(this.value);
});

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros", //once try after removing it
    });

    try {
        const respData = await resp.json();
        addWeatherToPage(respData);
    } catch {
        alert("Please enter the correct city name");
        search.value = "";
    }
}

function addWeatherToPage(data) {
    console.log(data);
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `<h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp} °C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
});