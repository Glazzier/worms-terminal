export default async function weather(args) {
  if (args.length !== 1) {
    return "Uso: weather <ciudad>";
  }
  const apiKey = "137cb4788ed70e790c49c3e929613f3a"; // Debes reemplazar esto con tu propia API key de OpenWeatherMap
  const city = args[0];
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=es`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    return `El tiempo en ${city} es ${description} con una temperatura de ${temperature}°C.`;
  } catch (error) {
    return "Error al obtener el pronóstico del tiempo.";
  }
}
