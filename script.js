const myApiKey = "1a5dd4b9100a54bbe63877ff3c7ff85c";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myApiKey}`;

/*
    Data response from open weather app...relevant properties:
        Data.name: "California"
        Data.weather[0].main: "Clear"
        Data.weather[0].icon: "01d"    - This looks to be the image that we can use to surround the temperature
        Data.main.temp: 293.11         - This is the temperature in Kelvin. Need to subtract 273.15 degrees to get the degrees in Celsius
*/

/*
    User flow:
        -User types location into the input box into the input box of the form
        -User presses enter after typing in the location
        -When enter is clicked (event listener), the icons need to populate, the temperature needs to populate, and the description of the weather needs to populate
*/

// Target elements
const temperatureIconContainer = document.getElementById("temperature_icon");
const temperatureIconContainer2 = document.getElementById("temperature_icon2");
const temperatureDegrees = document.getElementById("temperature_degrees");
const temperatureDescription = document.getElementById(
	"temperature_description"
);

// Functions

// HandleFormSubmission
/*
        Target the value submitted in the input box of the form and assign it to a variable 'location'
        Pass the location variable as an argument to getLocationData
    */
function handleFormSubmission(e) {
	e.preventDefault();

	const location = e.target.location.value;

	getLocationData(location);
}

// FormatWeatherUrl String
function formatWeatherUrl(location) {
	return (currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myApiKey}`);
}

// async GetLocationData(location)
/*
        use await fetch and pass in the location to the weatherUrl string, also pass in myApiKey
    */
async function getLocationData(location) {
	const currentWeatherUrl = formatWeatherUrl(location);

	const weatherResponse = await fetch(currentWeatherUrl);
	const currentWeather = await weatherResponse.json();
	const currentWeatherResponse = currentWeather;

	const weatherIcon = currentWeatherResponse.weather[0].icon;
	const weatherDescription = currentWeatherResponse.weather[0].main;
	const weatherTemperature = currentWeatherResponse.main.temp;

	displayWeatherIcons(weatherIcon);
	displayWeatherDescription(weatherDescription);
	displayWeatherTemperature(weatherTemperature);
}

// Display the weather icons
function displayWeatherIcons(weatherIcon) {
	let imageSrc = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

	temperatureIconContainer.innerHTML = 
    `<div>
        <img src="${imageSrc}" alt="weather_icon">
    </div>`;

	temperatureIconContainer2.innerHTML = 
    `<div>
        <img src="${imageSrc}" alt="weather_icon">
    </div>`;
}

// Display the temperature
function displayWeatherTemperature(weatherTemperature) {
	const celsiusTemperature = Math.round(weatherTemperature - 273.15);

	temperatureDegrees.innerText = `${celsiusTemperature}°C`;
}

// Display the description
function displayWeatherDescription(weatherDescription) {
	temperatureDescription.innerText = weatherDescription;
}

/*
    Pass the currentWeatherResponse property values into functions to display on the DOM
        displayWeatherIcons(weatherIcon)

*/

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=california&appid=${myApiKey}`)
//     .then(res => res.json())
//     .then(data => console.log(data))

// Add Event Listeners
/*
    When enter is pressed on the form, need to to do the below:
        handleFormSubmission()
*/

form.addEventListener("submit", handleFormSubmission);
