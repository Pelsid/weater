var latitude;
var longitude;
var targ;
var info;

const success = (position) => {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getAutoInfo();
};

const error = (error) => {
    getInfo();
};

onload = function getCoord(){
    navigator.geolocation.getCurrentPosition(success, error);
}

function getCity(){
    console.log(targ);
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=d59bd920c9492838db1dae2be37a21e4`)
        .then( res => res.json())
        .then(response => {
            targ = response;
            console.log(targ);
        })
        .catch(status => {
          console.log('Request failed.  Returned status of', status)
        })
}

function getAutoInfo(){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&limit=4&appid=d59bd920c9492838db1dae2be37a21e4&units=metric`)
        .then( res => res.json())
        .then(response => {
            info = response;
            console.log(info);
            document.getElementById("sC").value = info.city.name;
            output();
        })
        .catch(status => {
            console.log('Request failed.  Returned status of', status);
        })
}

function getInfo(){
    var el = document.getElementById("sC").value;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${el}&limit=4&appid=d59bd920c9492838db1dae2be37a21e4&units=metric`)
    .then( res => res.json())
    .then(response => {
        info = response;
        console.log(info);
        output();
    })
    .catch(status => {
        console.log('Request failed.  Returned status of', status);
    })
}

function output(){
    document.getElementById("btn-t").style.color = "darkcyan";
    document.getElementById("btn-ds").style.color = "white";
    document.getElementById("date").innerText = info.list[0].dt_txt;
    document.getElementById("now").innerHTML = `
    <div class="bl">
        <img class="image" src="http://openweathermap.org/img/wn/${info.list[0].weather[0].icon}.png"/>
        <p>${info.list[0].weather[0].main}</p>
    </div>
    <div class="bl">
        <p class="r-temp">${parseInt(info.list[0].main.temp)}&#176;C</p>
        <span class="f-temp">Real feel ${parseInt(info.list[0].main.feels_like)}&#176;C</span>
    </div>
    <div>
        <p class="dop-info">Скорость ветра: ${info.list[0].wind.speed} km/h</p>
        <p class="dop-info">Порыв ветра: ${info.list[0].wind.gust} m/sec</p>
    </div>
    `;
    document.getElementById("more-info").innerHTML = `
    <tr class="cur2">
        <td><span class="cur2 txt-cur">Погода на день</span></td>
        <td><span>${cutter(info.list[1].dt_txt)}</span></td>
        <td><span>${cutter(info.list[2].dt_txt)}</span></td>
        <td><span>${cutter(info.list[3].dt_txt)}</span></td>
        <td><span>${cutter(info.list[4].dt_txt)}</span></td>
        <td><span>${cutter(info.list[5].dt_txt)}</span></td>
        <td><span>${cutter(info.list[6].dt_txt)}</span></td>
    </tr>
    <tr>
        <td></td>
        <td><img class="image2" src="http://openweathermap.org/img/wn/${info.list[1].weather[0].icon}.png"/></td>
        <td><img class="image2" src="http://openweathermap.org/img/wn/${info.list[2].weather[0].icon}.png"/></td>
        <td><img class="image2" src="http://openweathermap.org/img/wn/${info.list[3].weather[0].icon}.png"/></td>
        <td><img class="image2" src="http://openweathermap.org/img/wn/${info.list[4].weather[0].icon}.png"/></td>
        <td><img class="image2" src="http://openweathermap.org/img/wn/${info.list[5].weather[0].icon}.png"/></td>
        <td><img class="image2" src="http://openweathermap.org/img/wn/${info.list[6].weather[0].icon}.png"/></td>
    </tr>
    <tr>
        <td class="bordered cur2"><span>Forecast</span></td>
        <td class="bordered"><span>${info.list[1].weather[0].main}</span></td>
        <td class="bordered"><span>${info.list[2].weather[0].main}</span></td>
        <td class="bordered"><span>${info.list[3].weather[0].main}</span></td>
        <td class="bordered"><span>${info.list[4].weather[0].main}</span></td>
        <td class="bordered"><span>${info.list[5].weather[0].main}</span></td>
        <td class="bordered"><span>${info.list[6].weather[0].main}</span></td>
    </tr>
    <tr>
        <td class="bordered cur2"><span>Temp(&#176;C)</span></td>
        <td class="bordered"><span>${parseInt(info.list[1].main.temp)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[2].main.temp)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[3].main.temp)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[4].main.temp)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[5].main.temp)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[6].main.temp)}</span></td>
    </tr>
    <tr>
        <td class="bordered cur2"><span>Realfeel</span></td>
        <td class="bordered"><span>${parseInt(info.list[1].main.feels_like)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[2].main.feels_like)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[3].main.feels_like)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[4].main.feels_like)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[5].main.feels_like)}</span></td>
        <td class="bordered"><span>${parseInt(info.list[6].main.feels_like)}</span></td>
    </tr>
    <tr>
        <td class="bordered cur2"><span>Wind(km/h)</span></td>
        <td class="bordered"><span>${info.list[1].wind.speed}</span></td>
        <td class="bordered"><span>${info.list[2].wind.speed}</span></td>
        <td class="bordered"><span>${info.list[3].wind.speed}</span></td>
        <td class="bordered"><span>${info.list[4].wind.speed}</span></td>
        <td class="bordered"><span>${info.list[5].wind.speed}</span></td>
        <td class="bordered"><span>${info.list[6].wind.speed}</span></td>
    </tr>
    `;
}




function cutter(text){
    return text[11] + text[12] + text[13] + text[14] + text[15];
}

function output2(){
    document.getElementById("btn-ds").style.color = "darkcyan";
    document.getElementById("btn-t").style.color = "white";

}