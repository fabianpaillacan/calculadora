const apiKey = 'e1006b9e3d1546cb9d4231b7b91dfe3c';
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            obtenerCiudad(lat, lon);
            obtenerTiempo(lat, lon);
        },
        function(error) {
            console.error("Error al obtener la ubicación: " + error.message);
        }
    );
} else {
    console.log("La geolocalización no es soportada por este navegador.");
}
function obtenerCiudad(lat, lon) {
    var url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=es&pretty=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                var ciudad = data.results[0].components.city || data.results[0].components.town || "Ciudad no encontrada";
                var pais = data.results[0].components.country;

                document.getElementById("ubicacion").textContent = 
                  ciudad + ", " + pais;
            } else {
                document.getElementById("ubicacion").textContent = 
                    "No se pudo obtener la ubicación.";
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            document.getElementById("ubicacion").textContent = 
                "Error al obtener los datos de la ciudad.";
        });
    
}
function obtenerTiempo(lat, lon){
    API_KEY="f1f3698a0801091bb5990506664534df";
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=1&appid=${API_KEY}&units=metric&lang=es`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data && data.list && data.list.length > 0) {
            const temp = data.list[0].main.temp; // Temperatura actual
            const weatherDescription = data.list[0].weather[0].description; // Descripción del clima
            const humedad = data.list[0].main.humidity; // Humedad
            const viento = data.list[0].wind.speed; // Velocidad del viento
            const tempMinima = data.list[0].main.temp_min; // Temperatura mínima
            const tempMaxima = data.list[0].main.temp_max; 

            document.getElementById('clima').innerHTML =  temp +'°C'; 
            document.getElementById('humedad').innerHTML =  humedad + '%';
            document.getElementById('velocidad-viento').textContent = viento + ' Km/h';
            //document.getElementById('temp_min').innerHTML = 'temperatura minima  -> '+ tempMinima +'°C';
            document.getElementById('temp_max').innerHTML =   tempMaxima +'°C';
            document.getElementById('descripcion_cielo').innerHTML = weatherDescription;
            // Mostramos la temperatura y el clima en el DOM
            /*document.getElementById("clima").textContent =
                `Temperatura: ${temp}°C, Clima: ${weatherDescription} humedad: ${humedad} viento: ${viento};  tempMinima: ${tempMinima} tempMaxima: ${tempMaxima}`;*/
        } else {
            document.getElementById("clima").textContent = "No se pudo obtener el clima.";
        }
    })
    .catch(error => {
        console.error("Error al obtener los datos del clima:", error);
        document.getElementById("clima").textContent = "Error al obtener los datos del clima.";
    });
}

function myFunc()  {
    var now = new Date();
    var time_hr= now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var dia = now.getDate();         
    var mes = now.getMonth() + 1;     
    var año = now.getFullYear();      


    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;

    var fechaFormateada = dia + '/' + mes + '/' + año;
    document.getElementById('hora').innerHTML =  time_hr;
    document.getElementById('fecha').innerHTML = fechaFormateada;
}
setInterval(myFunc, 1000);



