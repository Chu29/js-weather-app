'use strict'
const search = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const city = document.querySelector('.city-name')
const condition = document.querySelector('.condition')
const currentTemp = document.querySelector('.current-temp')
const state = document.querySelector('.state')
const humidity = document.querySelector('.humidity-det')
const windSpeed = document.querySelector('.wind-speed-det')

// Fetch the current weather
const getCurrentWeather = async (location) => {
  const apiCurrentURL = `http://api.weatherapi.com/v1/current.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()
  console.table(data)
  city.innerHTML = data.location.name
  condition.innerHTML = data.current.condition.text
  currentTemp.innerHTML = `Feels like ${data.current.temp_c} &deg;C`
  state.src = data.current.condition.icon
}

const getAirCondition = async (location) => {
  const apiCurrentURL = `http://api.weatherapi.com/v1/current.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()
  humidity.textContent = `${data.current.humidity}%`
  windSpeed.innerHTML = `${data.current.wind_kph} Km/h`
}

searchBtn.addEventListener('click', () => {
  getCurrentWeather(search.value)
  getAirCondition(search.value)
})

searchBtn.addEventListener('touchend', () => {
  getCurrentWeather(search.value)
  getAirCondition(search.value)
})
