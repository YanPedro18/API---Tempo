const apiKey = "f5e671243f494c0046a26a37824c4b88";
const apiCountryURL = "https://countryflagsapi.com/png/";
const inputElement = document.querySelector("input");
const searchBtn = document.querySelector(".buttons");


//selecionei os elementos HTML que será usados
const cityElement = document.querySelector(".cidade");
const tempElement = document.querySelector(".temperatura span");
const descElement = document.getElementById("descricao");
const weatherIconEl = document.getElementById("weather-icon");
const countryElement = document.getElementById("country");
const umidadeElement = document.querySelector("#umidade span");
const windElement = document.querySelector("#wind span");
const weatherCont = document.querySelector("#Weather-data");

 //ele vai jogar o valor do input nessa função, a funçãoAPI vai requisitar os dados que o usuario pediu, e vai retornar isso no meu jsonData(variavel jsonAPI) objeto final.
async function getAgua (cidade) {
 //requisitei a API, ela me retornou a resposta,json, aonde posso fazer as requisições
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(url);
    const jsonData = await response.json();

    console.log(jsonData);
    return jsonData;
}

async function climashow(cidade = "Belo Horizonte") {
    const jsonData = await getAgua(cidade);

    cityElement.insertAdjacentHTML("beforeend", `<p>${jsonData.name}</p>`);
    tempElement.insertAdjacentHTML("beforeend", parseInt(jsonData.main.temp));
    descElement.insertAdjacentHTML("beforeend", `${jsonData.weather[0].description}`);

    //aqui estou setando o atributo SRC na imagem, usando ${}.png, para a API trazer deste link as imagens
    weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${jsonData.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + jsonData.sys.country);
    umidadeElement.insertAdjacentHTML("beforeend", `${jsonData.main.humidity}%`);
    windElement.insertAdjacentHTML("beforeend", `${jsonData.wind.speed}km/h`);
    weatherCont.classList.remove("hide");
}


searchBtn.addEventListener('click', function seila(e) {
  e.preventDefault();

  const inputnewEl = document.querySelector("input").value;

  if(inputnewEl == '') {
  //  climashow();
   alert("Campo vazio, digite algo!");
  }else {
    const cidade = inputElement.value;
    climashow(cidade);
    inputnewEl == ''
  }
searchBtn.removeEventListener('click', seila)
})




   

    // weatherIconEl.insertAdjacentHTML("beforeend", `<img src="${jsonData.weather[0].icon}"></img>`); maneira errada..
    // countryElement.setAttribute("src", ``);