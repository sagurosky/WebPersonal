const kelvin=273.15;

const obtenerClima=()=>{
    let ciudad=document.querySelector("#ciudad").value;
    let pais=document.querySelector("#pais").value;
    console.log("ciudad: "+ciudad + "pais: "+pais);

    if(ciudad.trim()===""|| pais.trim()===""){
        console.log("error");
        mostrarError("#msj-error","falta completar campos");
        return;
    }
    consultarApi(ciudad,pais);
}

const consultarApi= async(ciudad,pais)=>{

    const apiKey="aad08e9990426a0dc3cf32cd0a7939bd";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
const respuesta=await fetch(url);
const resultado=await respuesta.json();
console.log(resultado);

if (resultado.cod=="404"){
    mostrarError("#msj-error","no hay resultados");
    return;
}
const {name,main}=resultado;
if(!name) return null;
let divResultado=document.querySelector("#divResultado");

divResultado.innerHTML=`
<div class="card-panel white col 12">
<div class="black-text">
<h3>El clima de ${name} es:
${parseFloat(main.temp-kelvin,10).toFixed(2)}<span> &#x2103;
</h3>
<p > Temperatura máxima
${parseFloat(main.temp_max-kelvin,10).toFixed(2)}<span> &#x2103;</span>
</p>
<p >Temperatura mínima
${parseFloat(main.temp_min-kelvin,10).toFixed(2)}<span> &#x2103;</span>
</p>
<p > Humedad
${parseFloat(main.humidity,10).toFixed(2)}<span> %</span>
</p>
</div>
</div>
`
}

const mostrarError=(elemento,mensaje)=>{
divError=document.querySelector(elemento);
divError.innerHTML=`<p class="red darken-4 error"> ${mensaje}<p>;`
setTimeout(()=>{divError.innerHTML='';},2000);

}