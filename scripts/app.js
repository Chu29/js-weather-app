'use strict'

const search = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const city = document.querySelector('.cname').firstElementChild
const currentTemp = document.querySelector('.ctemp')
const weatherImg = document.querySelector('.city').lastElementChild
const weatherCondition = document.querySelector('.cname').lastElementChild
const airData = [
  document.querySelector('.actemp'),
  document.querySelector('.acrain'),
  document.querySelector('.acwind'),
  document.querySelector('.uvindex')
]

// get user location
const getLocation = () => {
  const getCoordinates = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    // fetch the location based on coordinates
    const fetchLocation = async (lat, long) => {
      const geolocation = `https://api-bdc.io/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
      const response = await fetch(geolocation)
      const data = await response.json()
      const city = data.city
      getCurrentWeather(city)
      getAirCondition(city)
      getDailyForecastData(city)
      getHourlyForecastData(city)
    }

    return fetchLocation(latitude, longitude)
  }

  const error = () => {
    alert('Unable to retrieve your location')
  }

  navigator.geolocation.getCurrentPosition(getCoordinates, error)
  return getCoordinates
}

getLocation()

// Fetch the current weather
const getCurrentWeather = async (location) => {
  const apiCurrentURL = `https://api.weatherapi.com/v1/current.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()
  city.innerHTML = data.location.name
  weatherCondition.innerHTML = `${data.current.condition.text} : ${data.location.localtime}`
  currentTemp.innerHTML = `${data.current.temp_c} &deg;C`
  weatherImg.src = data.current.condition.icon
  weatherImg.style.width = '224px'
}

// fetch current air conditions
const getAirCondition = async (location) => {
  const apiCurrentURL = `https://api.weatherapi.com/v1/current.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()
  airData[0].innerHTML = `${data.current.temp_c}&deg;C`
  airData[1].innerHTML = `${data.current.humidity}%`
  airData[2].innerHTML = `${data.current.wind_kph} km/h`
  airData[3].innerHTML = `${data.current.uv}`
}

// fetch forecast data for next 7 days
const getDailyForecastData = async (location) => {
  const apiCurrentURL = `https://api.weatherapi.com/v1/forecast.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}&days=7`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()

  const days = document.querySelectorAll('.day')

  const forecastTemperature = document.querySelectorAll('.fctemp')
  const fcweatherImg = document.querySelectorAll('.fc-condition > img')
  const fcweatherCondition = document.querySelectorAll('.fc-condition > span')

  data.forecast.forecastday.forEach((day, index) => {
    let dayName = new Date(day.date).toLocaleDateString('en-US', {
      weekday: 'short'
    })
    const maxTemp = data.forecast.forecastday[index].day.maxtemp_c
    const minTemp = data.forecast.forecastday[index].day.mintemp_c
    const img = data.forecast.forecastday[index].day.condition.icon
    const condition = data.forecast.forecastday[index].day.condition.text

    if (index === 0) {
      dayName = 'Today'
    } else {
      days[index].textContent = dayName
    }
    forecastTemperature[index].innerHTML = `${maxTemp}&deg;/${minTemp}&deg;`
    fcweatherImg[index].src = img
    fcweatherCondition[index].innerHTML = condition
  })
}

// fetch hourly forecast data in 3 hours interval
const getHourlyForecastData = async (location) => {
  const hourlyCondition = [...document.querySelectorAll('.card > img')]
  const hourlyTemp = [...document.querySelectorAll('.ttemp')]

  const apiCurrentURL = `https://api.weatherapi.com/v1/forecast.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}&days=1`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()

  const hourData = [...data.forecast.forecastday[0].hour]
  for (let i = 0; i < hourData.length; i++) {
    const temp = hourData[i].temp_c
    hourlyTemp[i].innerHTML = `${temp}&deg;`
    hourlyCondition[i].src = hourData[i].condition.icon
  }
}

searchBtn.addEventListener('click', () => {
  const query = search.value
  getCurrentWeather(query)
  getAirCondition(query)
  getDailyForecastData(query)
  getHourlyForecastData(query)
})
