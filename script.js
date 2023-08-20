const toggleBtn = document.getElementById("toggleBtn");
const secondNav = document.getElementById("secondNav");
let progressBarr = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");
const thebutton = document.getElementById("thebutton");
const containerFlipCard = document.getElementById("containerFlipCard");
const statusCoundition = document.getElementById("status");
const instruction = document.getElementById("instruction");
const closeInfo = document.getElementById("closeInfo");
const instructionmessage = document.getElementById("instructionmessage");
const degree = document.getElementById("degree");
const iconsWheather = document.getElementById("icons");
const conditionText = document.getElementById("conditionText");
const temprature = document.getElementById("temprature");
const uvIndex = document.getElementById("uvIndex");
const humidityInfo = document.getElementById("humidityInfo");
const cloudInfo = document.getElementById("cloudInfo");

// navbar
function toggleBtnHandler() {
  secondNav.classList.toggle("-translate-x-full");
  if (toggleBtn.querySelector("span").textContent.trim() == "menu") {
    toggleBtn.querySelector("span").textContent = "close";
  } else {
    toggleBtn.querySelector("span").textContent = "menu";
  }
}
toggleBtn.onclick = toggleBtnHandler;

// close info
function closeButtonHandler() {
  instruction.classList.add("hidden");
}
closeInfo.onclick = closeButtonHandler;
// circle progres
let progressBarrValue = 0;
let speedCircle = 10;
function runCircle(value) {
  let progress = setInterval(() => {
    let progressBarrEndValue = value;
    progressBarrValue++;
    valueContainer.textContent = `${progressBarrValue}`;
    if (progressBarrValue <= 50) {
      progressBarr.style.background = `conic-gradient(
          #02d422 ${progressBarrValue * 0.5}deg,
          #cadcff ${progressBarrValue * 0.5}deg
        )`;
    } else if (progressBarrValue > 50 && progressBarrValue <= 100) {
      progressBarr.style.background = `conic-gradient(
          #ffc400 ${progressBarrValue * 0.5}deg,
          #cadcff ${progressBarrValue * 0.5}deg
        )`;
    } else if (progressBarrValue > 100 && progressBarrValue <= 200) {
      progressBarr.style.background = `conic-gradient(
          #f79605 ${progressBarrValue * 0.5}deg,
          #cadcff ${progressBarrValue * 0.5}deg
        )`;
    } else if (progressBarrValue > 200 && progressBarrValue <= 400) {
      progressBarr.style.background = `conic-gradient(
          #ff0000 ${progressBarrValue * 0.5}deg,
          #cadcff ${progressBarrValue * 0.5}deg
        )`;
    } else {
      progressBarr.style.background = `conic-gradient(
          #80039c ${progressBarrValue * 0.5}deg,
          #cadcff ${progressBarrValue * 0.5}deg
        )`;
    }

    if (progressBarrValue == progressBarrEndValue) {
      clearInterval(progress);
      if (progressBarrValue <= 50) {
        statusCoundition.textContent = "well";
        statusCoundition.style.color = "#02d422";
        instruction.classList.add("bg-[#02d422]");
        instructionmessage.textContent = "Open your windows to bring clean, fresh air indoors. and 	Enjoy outdoor activities";
        instruction.classList.remove("hidden");
      } else if (progressBarrValue > 50 && progressBarrValue <= 100) {
        statusCoundition.textContent = "medium";
        statusCoundition.style.color = "#ffc400";
        instruction.classList.add("bg-[#ffc400]");
        instruction.classList.remove("hidden");
        instructionmessage.textContent = "Sensitive groups should wear a mask outdoors, Sensitive groups should run an air purifier, and 	Close your windows to avoid dirty outdoor air";
      } else if (progressBarrValue > 100 && progressBarrValue <= 200) {
        statusCoundition.textContent = "unhealthy";
        statusCoundition.style.color = "#f79605";
        instruction.classList.add("bg-[#f79605]");
        instruction.classList.remove("hidden");
        instructionmessage.textContent = "Wear a mask outdoors,  run an air purifier, and 	Close your windows to avoid dirty outdoor air";
      } else if (progressBarrValue > 200 && progressBarrValue <= 400) {
        statusCoundition.textContent = "very unhealthy";
        statusCoundition.style.color = "#ff0000";
        instruction.classList.add("bg-[#ff0000]");
        instruction.classList.remove("hidden");
        instructionmessage.textContent = "Wear a mask outdoors, run an air purifier, and 	Close your windows to avoid dirty outdoor air";
      } else {
        closeInfo.onclick = closeButtonHandler;
        statusCoundition.textContent = "dangerous";
        statusCoundition.style.color = "#80039c";
        instruction.classList.add("bg-[#80039c]");
        instruction.classList.remove("hidden");
        instructionmessage.textContent = "Wear a mask outdoors, run an air purifier, and 	Close your windows to avoid dirty outdoor air";
      }
    }
  }, speedCircle);
}

// switch card
function toggleBtnCardHandler() {
  containerFlipCard.classList.toggle("rotate-y-180");
}
thebutton.onclick = toggleBtnCardHandler;

//get client ip adress
function getClientData() {
  const request = new Request(`https://api.db-ip.com/v2/free/self`, {
    method: "GET",
    contentType: "application/json",
  });

  const response = fetch(request);
  response
    .then((response) => response.json())
    .then((data) => {
      getCurrentWheather(data.city);
    });
}
getClientData();

// get current wheather
function getCurrentWheather(location) {
  const request = new Request(`https://api.weatherapi.com/v1/current.json?key=241e16270ce941668ad100110231508&q=${location}&aqi=yes`, {
    method: "GET",
    contentType: "application/json",
  });

  const response = fetch(request);
  response
    .then((response) => response.json())
    .then((data) => {
      // show current data name region and country by ip address
      runCircle(Math.floor(data.current.air_quality.pm2_5));
      degree.textContent = `${data.current.temp_c}°C`;
      iconsWheather.src = `https://${data.current.condition.icon}`;
      conditionText.textContent = data.current.condition.text;
      uvIndex.textContent = `${data.current.wind_kph}km/h`;
      humidityInfo.value = data.current.humidity;
      cloudInfo.value = data.current.cloud;
      document.getElementById("name").textContent = data.location.name;
      document.getElementById("region").textContent = data.location.region;
      document.getElementById("country").textContent = data.location.country;
      getforecast(data.location.name, data.location.country);
    });
}

// search
let mainSearch = document.getElementById("mainSearch");
const mainSearchBtn = document.getElementById("mainSearchBtn");
let secSearch = document.getElementById("secSearch");
const secSearchBtn = document.getElementById("secSearchBtn");
let thirdSearch = document.getElementById("thirdSearch");
const thirdSearchBtn = document.getElementById("thirdSearchBtn");

// fungsi debounce untuk mengatur delay setelah klik pertama
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
const mainSearchValue = mainSearch.value;
const secSearchValue = secSearch.value;
const thirdSearchValue = thirdSearch.value;

function mainSearchHandler() {
  const mainSearchValue = mainSearch.value;
  getCurrentWheather(mainSearchValue);
  progressBarrValue = 0;
  instruction.classList.add("hidden");
  instruction.classList.remove("bg-[#02d422]");
  instruction.classList.remove("bg-[#ffc400]");
  instruction.classList.remove("bg-[#f79605]");
  instruction.classList.remove("bg-[#ff0000]");
  instruction.classList.remove("bg-[#80039c]");
}
const debouncedFunctionMainSearchHandler = debounce(mainSearchHandler, 1000);

function secSearchHandler() {
  const secSearchValue = secSearch.value;
  getCurrentWheather(secSearchValue);
  progressBarrValue = 0;
  instruction.classList.add("hidden");
  instruction.classList.remove("bg-[#02d422]");
  instruction.classList.remove("bg-[#ffc400]");
  instruction.classList.remove("bg-[#f79605]");
  instruction.classList.remove("bg-[#ff0000]");
  instruction.classList.remove("bg-[#80039c]");
}
const debouncedFunctionSecSearchHandler = debounce(secSearchHandler, 1000);

function thirdSearchHandler() {
  const thirdSearchValue = thirdSearch.value;
  getCurrentWheather(thirdSearchValue);
  progressBarrValue = 0;
  instruction.classList.add("hidden");
  instruction.classList.remove("bg-[#02d422]");
  instruction.classList.remove("bg-[#ffc400]");
  instruction.classList.remove("bg-[#f79605]");
  instruction.classList.remove("bg-[#ff0000]");
  instruction.classList.remove("bg-[#80039c]");
}

const debouncedFunctionThirdSearchHandler = debounce(thirdSearchHandler, 1000);

mainSearchBtn.onclick = debouncedFunctionMainSearchHandler;
secSearchBtn.onclick = debouncedFunctionSecSearchHandler;
thirdSearchBtn.onclick = debouncedFunctionThirdSearchHandler;

// forecast
async function getforecast(location, country) {
  const request = new Request(`https://api.weatherapi.com/v1/forecast.json?key=241e16270ce941668ad100110231508&q=${location} ${country}&days=7&aqi=yes&alerts=no`, {
    method: "GET",
    contentType: "application/json",
  });

  const response = await fetch(request);
  const data = await response.json();
  forecast(data);
  return data;
}

// show getforecast api data
function forecast(data) {
  const allDateForecast = document.querySelectorAll(".dateForecast");
  const allDegreeForecast = document.querySelectorAll(".degreeForecast");
  const allForecastLogo = document.querySelectorAll(".forecastLogo");
  const allRainForecast = document.querySelectorAll(".rainForecast");
  const allMaxWIndForecast = document.querySelectorAll(".maxWIndForecast");
  const allHumidityForecast = document.querySelectorAll(".humidityForecast");
  for (let i = 0; i < allDateForecast.length; i++) {
    allDateForecast[i].textContent = data.forecast.forecastday[i].date;
    allDegreeForecast[i].textContent = `${data.forecast.forecastday[i].day.avgtemp_c}°C`;
    const iconUrl = `https:${data.forecast.forecastday[i].day.condition.icon}`;
    allForecastLogo[i].src = iconUrl;

    const rainForecastData = data.forecast.forecastday[i].day.daily_will_it_rain;
    if (rainForecastData == 0) {
      allRainForecast[i].textContent = "No";
    } else {
      allRainForecast[i].textContent = "Yes";
    }

    allMaxWIndForecast[i].textContent = data.forecast.forecastday[i].day.maxwind_kph;
    allHumidityForecast[i].textContent = data.forecast.forecastday[i].day.avghumidity;
  }
}

const dataKotaWilayah = [
  { namaKota: "Denpasar", namaWilayah: "Bali" },
  { namaKota: "Serang", namaWilayah: "Banten" },
  { namaKota: "Semarang", namaWilayah: "Jawa Tengah" },
  { namaKota: "Jakarta", namaWilayah: "DKI Jakarta" },
  { namaKota: "Ambon", namaWilayah: "Maluku" },
  { namaKota: "Mataram", namaWilayah: "Nusa Tenggara Barat" },
  { namaKota: "Kupang", namaWilayah: "Nusa Tenggara Timur" },
  { namaKota: "Jayapura", namaWilayah: "Papua" },
  { namaKota: "Manado", namaWilayah: "Sulawesi Utara" },
  { namaKota: "Padang", namaWilayah: "Sumatera Barat" },
  { namaKota: "Pekanbaru", namaWilayah: "Riau" },
  { namaKota: "Makassar", namaWilayah: "Sulawesi Selatan" },
  { namaKota: "Yogyakarta", namaWilayah: "DI Yogyakarta" },
  { namaKota: "Medan", namaWilayah: "Sumatera Utara" },
  { namaKota: "Palembang", namaWilayah: "Sumatera Selatan" },
  { namaKota: "Banjarmasin", namaWilayah: "Kalimantan Selatan" },
  { namaKota: "Samarinda", namaWilayah: "Kalimantan Timur" },
  { namaKota: "Banda Aceh", namaWilayah: "Aceh" },
  { namaKota: "Pontianak", namaWilayah: "Kalimantan Barat" },
  { namaKota: "Ternate", namaWilayah: "Maluku Utara" },
  { namaKota: "Bengkulu", namaWilayah: "Bengkulu" },
];

function randomLocation(dataPLace) {
  const dataRandomPlace = dataPLace;
  const randomIndices = [];
  const resultDataRandomPlace = [];

  while (randomIndices.length < 5) {
    const randomIndex = Math.floor(Math.random() * dataRandomPlace.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
      resultDataRandomPlace.push(dataRandomPlace[randomIndex]);
    }
  }
  // run the function
  displayRandomLocation(resultDataRandomPlace);
}
// run the function
randomLocation(dataKotaWilayah);

// display random location function
async function displayRandomLocation(dataLocation) {
  const photoFrameRandomLocationElement = document.querySelectorAll(".randomLocationPhoto");
  const locationRandomElement = document.querySelectorAll(".locationRandom");
  const rainForecastRandom = document.querySelectorAll(".rainForecastRandom");
  const degreeRandom = document.querySelectorAll(".degreeRandom");
  const maxWIndForecastRandom = document.querySelectorAll(".maxWIndForecastRandom");
  const humidityForecastRandom = document.querySelectorAll(".humidityForecastRandom");
  const airQualityForecastRandom = document.querySelectorAll(".airQualityForecastRandom");
  const randomIonCondition = document.querySelectorAll(".randomIonCondition");
  const country = "indonesia";
  for (let i = 0; i < dataLocation.length; i++) {
    photoFrameRandomLocationElement[i].src = `./public/asset/${dataLocation[i].namaKota}.jpg`;
    locationRandomElement[i].textContent = dataLocation[i].namaKota;

    // data api
    const dataApi = await getforecast(dataLocation[i].namaKota, country);

    degreeRandom[i].textContent = `${dataApi.current.temp_c}°C`;

    const rainForecastDataTest = dataApi.forecast.forecastday[0].day.daily_will_it_rain;
    if (rainForecastDataTest == 0) {
      rainForecastRandom[i].textContent = "No";
    } else {
      rainForecastRandom[i].textContent = "Yes";
    }

    maxWIndForecastRandom[i].textContent = dataApi.current.wind_kph;
    humidityForecastRandom[i].textContent = dataApi.current.humidity;
    airQualityForecastRandom[i].textContent = dataApi.current.air_quality.pm2_5;
    randomIonCondition[i].src = `https://${dataApi.current.condition.icon}`;
  }
}
