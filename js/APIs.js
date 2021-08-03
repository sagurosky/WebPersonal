const kelvin = 273.15;

const obtenerClima = () => {
  let ciudad = document.querySelector("#ciudad").value;
  let pais = document.querySelector("#pais").value;
  console.log("ciudad: " + ciudad + "pais: " + pais);

  if (ciudad.trim() === "" || pais.trim() === "") {
    console.log("error");
    mostrarError("#msj-error", "falta completar campos");
    return;
  }
  consultarApi(ciudad, pais);
};

const consultarApi = async (ciudad, pais) => {
  const apiKey = "aad08e9990426a0dc3cf32cd0a7939bd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  console.log(resultado);

  if (resultado.cod == "404") {
    mostrarError("#msj-error", "no hay resultados");
    return;
  }
  const { name, main } = resultado;

  if (!name) return null;
  let divResultado = document.querySelector("#divResultado");

  divResultado.innerHTML = `
<div >

<h3>El clima de ${name} es:
${parseFloat(main.temp - kelvin, 10).toFixed(2)}<span> &#x2103;
</h3>
<p > Sensacion térmica
${parseFloat(main.feels_like - kelvin, 10).toFixed(2)}<span> &#x2103;</span>
</p>
<p > Temperatura máxima
${parseFloat(main.temp_max - kelvin, 10).toFixed(2)}<span> &#x2103;</span>
</p>
<p >Temperatura mínima
${parseFloat(main.temp_min - kelvin, 10).toFixed(2)}<span> &#x2103;</span>
</p>
<p > Humedad
${parseFloat(main.humidity, 10).toFixed(2)}<span> %</span>
</p>
<p > Presión
${parseFloat(main.pressure, 10).toFixed(2)}<span> Hp</span>
</p>
</div>

`;
};

const mostrarError = (elemento, mensaje) => {
  divError = document.querySelector(elemento);
  divError.innerHTML = `<p class="error"> ${mensaje}</p>`;
  setTimeout(() => {
    divError.innerHTML = "";
  }, 2000);
};
//----------------------------------------------------------------------------------

// const obtenerNoticias = async () => {
async function obtenerNoticias() {
  let categoria = document.querySelector("#categoria").value;
  const apikey = "4c2d5f6252f846af8ba95eac24b9a9d8";
  const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&apikey=${apikey}`;
  //console.log(url);
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  console.log(resultado);

  let noticias = resultado.articles;
  let estado = resultado.status;

  let listadoNoticiasHTML = "";

  if (estado == "ok") {
    noticias.map((noticias) => {
      const { urlToImage, url, title, description, source } = noticias;

      let imagen = urlToImage
        ? `<div > <img src="${urlToImage}"alt=${title} style="width:430px; margin:30px"></br>
                                <span>${source.name}</span></div>`
        : "";

      listadoNoticiasHTML += `<div style="width:500px; border: solid; padding:20px">${imagen}<h3>${title}</h3><p>${description}</p>
                            <div><a href="${url}">Ver noticia completa</a>
                            </div></div>`;
    });
  } else if (estado == "error") {
    listadoNoticiasHTML = `<h3>${estado}: ${resultado.message}</h3>`;
  }

  let divListadoNoticias = document.querySelector("#divListadoNoticias");
  divListadoNoticias.innerHTML = `<div style="text-align: center">Cargando...</div>`;
  setTimeout(() => {
    divListadoNoticias.innerHTML = listadoNoticiasHTML;
  }, 3000);
}
function limpiarNoticias() {
  let divListadoNoticias = document.querySelector("#divListadoNoticias");
  divListadoNoticias.innerHTML = "";
}

//-----------------------------------------------------------------------------------------------------------------------
 async function apiCovid() {
  
  let url = `https://api.covid19api.com/live/country/argentina`;
  let respuesta = await fetch(url);
  let resultado = await respuesta.json();


  let {Active,Confirmed,Deaths,Recovered}=resultado[resultado.length-1];
  // let activos=resultado[resultado.length-1].Active;
  // let confirmados=resultado[resultado.length-1].Confirmed;
  // let muertos=resultado[resultado.length-1].Deaths;
  // let recuperados=resultado[resultado.length-1].Recovered;

  // console.log(resultado[resultado.length-1]);

  let divCovid=document.querySelector("#divCovid");
  divCovid.innerHTML=`
  <p>Casos activos: ${Active}</p></br>
  <p>Total confirmados: ${Confirmed}</p></br>
  <p>Cantidad de muertos: ${Deaths}</p></br>
  <p>Cantidad de recuperados: ${Recovered}</p></br> 
  
  `

}
//-------------------------------------------------------------------------------------------------
async function apiFrases(){
let url="https://quotes.rest/qod?language=en"
let respuesta=await fetch(url);
let resultado=await respuesta.json();
console.log(resultado);

let divFrases=document.querySelector("#divFrase");
divFrases.innerHTML=`
<p>Frase del día:</p></br>
 <p >${resultado.contents.quotes[resultado.contents.quotes.length-1].quote}</p></br>
<p>Autor: ${resultado.contents.quotes[resultado.contents.quotes.length-1].author}</p>

`

}
