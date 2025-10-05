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
  document.querySelector('.uvindex'),
]

console.log(airData)

// Fetch the current weather
const getCurrentWeather = async (location) => {
  const apiCurrentURL = `https://api.weatherapi.com/v1/current.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()
  console.table(data)
  city.innerHTML = data.location.name
  weatherCondition.innerHTML = `${data.current.condition.text} : ${data.location.localtime}`
  currentTemp.innerHTML = `${data.current.temp_c} &deg;C`
  weatherImg.src = data.current.condition.icon
  weatherImg.style.width = '224px'
}

const getAirCondition = async (location) => {
  const apiCurrentURL = `https://api.weatherapi.com/v1/current.json?key=26f067e98b7e4aa7b3f152800252609&q=${location}`
  const response = await fetch(apiCurrentURL)
  const data = await response.json()
  airData[0].innerHTML = `${data.current.temp_c}&deg;C`
  airData[1].innerHTML = `${data.current.humidity}%`
  airData[2].innerHTML = `${data.current.wind_kph} km/h`
  airData[3].innerHTML = `${data.current.uv}`
}

searchBtn.addEventListener('click', () => {
  getCurrentWeather(search.value)
  getAirCondition(search.value)
})
