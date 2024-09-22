document.addEventListener("DOMContentLoaded", () => {
    const weatherDataSection = document.getElementById('weatherData');
    const rainButton = document.getElementById('rain');
    const temperatureButton = document.getElementById('temperature');
    const windButton = document.getElementById('wind');


    const fetchWeatherData = (type) => {
        // Open-Meteo API URL for Boston(latitude: 42.3601° N, longitude: 71.0589° W)
        const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=42.3584&longitude=-71.0598&hourly=temperature_2m,rain,wind_speed_10m';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const currentWeather = data.hourly;
                if (type === 'rain') {
                    weatherDataSection.innerHTML = `
                        <h2>Current Rain Amount</h2>
                        <p>Rain : ${currentWeather.rain[0]} mm</p>
                    `;}

                else if (type === 'temperature') {
                    weatherDataSection.innerHTML = `
                        <h2>Current Temperature</h2>
                        <p>Temperature (2m): ${currentWeather.temperature_2m[0]} °C</p>
                    `;
                }
                else if (type === 'wind') {
                    weatherDataSection.innerHTML = `
                        <h2>Current Wind Speed</h2>
                        <p>Wind Speed (10m): ${currentWeather.wind_speed_10m[0]} m/s</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDataSection.innerHTML = `<p>Error loading data. Please try again later.</p>`;
            });
    };

    // Event listeners for buttons
    rainButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetchWeatherData('rain');
            });
    temperatureButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetchWeatherData('temperature');
    });

    windButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetchWeatherData('wind');
    });
});
