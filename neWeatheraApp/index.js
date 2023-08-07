const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timeZoneEl = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_key = "9d300b73af10084ff5151de2b104c133";
const WeatherBitApiKey = '195720a85ff3426899b150073923b583'
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hour = time.getHours();
  const hoursIn12Format = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const amPM = hour >= 12 ? 'pm' : 'am';

  timeEl.innerHTML = hoursIn12Format + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id='am-pm'>${amPM}</span>`;
  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);


getWeatherData()

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((succes) => {
        let {latitude,longitude} = succes.coords
     
        // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=mumbai&key=${WeatherBitApiKey}
        `)
        .then(res => res.json())
        .then(data => console.log(data))
    })
}