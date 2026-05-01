const API_key = "fa325bae75a4cd5061968a46d19c0d40";

const showBtn = document.querySelector(".show-btn");
const cityInput = document.querySelector(".city-name");
const resultDiv = document.querySelector(".result");
let weatherDetail = [];
let countryCode = [];
let rStatus = [];

const getWeahter = async () =>{    
    try{
        
        let city = document.querySelector(".city-name").value;
        const safeCity = encodeURIComponent(city);
        console.log(safeCity);
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${safeCity}&appid=${API_key}`;
        const response = await fetch(URL);
        console.log(response);

        if(response.ok){
            const data = await response.json();
            console.log(data);
            weatherDetail = (data.main);
            countryCode = (data.sys);
            rStatus = data.weather;
            console.log(rStatus);
            resultDiv.innerHTML = "";
            const div = document.createElement("div");
            div.className = "content";
            div.innerHTML = `
            <p>Country Code : ${countryCode.country}</p>
            <p>Status :🌤 ${rStatus[0].main} / ${rStatus[0].description} </p>
            <p>Feels Like :🤒 ${(weatherDetail.feels_like-273.15).toFixed(2)} °C</p>
            <p>Maximum Temp :🔥 ${(weatherDetail.temp_max-273.15).toFixed(2)}  °C</p>
            <p>Minimum Temp : ${(weatherDetail.temp_min-273.15).toFixed(2)}  °C</p><br>
            `;

            resultDiv.appendChild(div);

        }else
            {
            alert("Must Enter Correct City Name");
            }
    }catch(error)
    {
        console.log(error);   
    }
}

showBtn.addEventListener("click" , getWeahter);
cityInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        getWeahter();
    }
});

