var fechaActual = new Date();
const LUNES = 0, MARTES = 1, MIERCOLES = 2, JUEVES = 3, VIERNES = 4, SABADO = 5, DOMINGO = 6;
const ENERO = 0, FEBRERO = 1, MARZO = 2, ABRIL = 3, MAYO = 4, JUNIO = 5, JULIO = 6, AGOSTO = 7, SEPTIEMBRE = 8, OCTUBRE = 9, NOVIEMBRE = 10, DICIEMBRE =11;
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let lista = "";
let listaDeDias = "";
let semana = "";
const diasSemana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
let primerDia = new Date();
primerDia.setDate(1);
fechaActual.setDate(1);

var btnSiguienteMes = document.getElementById("btnSiguienteMes");
var btnAnteriorMes = document.getElementById("btnAnteriorMes");
var calendarioLista = document.getElementById("calendario-lista");
var calendarioMes = document.getElementById("mes");
var semanaDiv = document.getElementById("dias-semana");
var diasDiv = document.getElementById("dias-mes");
calendarioMes.innerHTML = fechaActual.getMonth();

btnAnteriorMes.addEventListener('click', () => {
    retrocederMes();
}, false);

btnSiguienteMes.addEventListener('click', () => {
    avanzarMes();
}, false);

escribirDiasDeSemana();
actualizarDias();


function escribirDiasDeSemana() {
    var semana = "";
    for(let i=0; i<7;i++){
        semana += "<li class='day-name'>"+diasSemana[i]+"</li>"
    }
    semanaDiv.innerHTML = semana;
}

function actualizarDias() {
    let dias = getNumeroDias();
    listaDeDias = "";
    for(let i=1;i<=dias;i++){
        if(i==1){
            // listaDeDias += "<li id='primer-dia' class='first-day day'>"+i+"</li>";
            listaDeDias += `<li id='primer-dia' class='first-day day'>${i}</li>`;
            
            i++;
        }
        // listaDeDias += "<li class='day'>"+i+"</li>";
        listaDeDias += `<li id='dia-${i}' class='day'>${i}</li>`;
    }
    diasDiv.innerHTML = listaDeDias;
    actualizarPrimerDia();
}

function actualizarPrimerDia() {
    let mes = fechaActual.getMonth();
    primerDia.setMonth(mes);
    var primerDiaDiv = document.getElementById("primer-dia");
    console.log(diasSemana[fechaActual.getDay() +1]);
    console.log(`Primer Año ${fechaActual.getFullYear()}  dia=${fechaActual.getDay()}`);
    primerDiaDiv.style.gridColumnStart = fechaActual.getDay() + 1;
}

function getNumeroDias() {
    var mes = fechaActual.getMonth();
    let dias = 0;
    switch(mes){
        case ABRIL:
        case JUNIO:
        case SEPTIEMBRE:
        case NOVIEMBRE:
            dias = 30;
            break;
        case ENERO:
        case MARZO:
        case MAYO: 
        case JULIO: 
        case AGOSTO: 
        case OCTUBRE:
        case DICIEMBRE:
            dias = 31;
            break
        case FEBRERO:
            dias = esBisiesto() ? 29:28;
            break;
    }
    return dias;
}

function esBisiesto(){
    var año = fechaActual.getFullYear();
    if(año % 4 == 0 && ( año % 100 != 0 || año % 400 == 0 ) ) {
        return true;
    } else {
        return false;
    }
}

function avanzarMes() {
    let mes = fechaActual.getMonth();
    fechaActual.setMonth(mes + 1);
    // if(fechaActual.getMonth() == 0){
    //     var año = fechaActual.getFullYear();
    //     fechaActual.setFullYear(año +1);
    // }
    let nombreMes = meses[fechaActual.getMonth()];
    calendarioMes.innerHTML = nombreMes + " " + fechaActual.getFullYear();
    actualizarDias();
    // actualizarPrimerDia();
}

function retrocederMes() {
    let mes = fechaActual.getMonth();
    fechaActual.setMonth(mes - 1);
    let nombreMes = meses[fechaActual.getMonth()];
    calendarioMes.innerHTML = nombreMes + " " + fechaActual.getFullYear();
    actualizarDias();
    // actualizarPrimerDia();
}