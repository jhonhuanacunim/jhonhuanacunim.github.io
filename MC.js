var tablaProbabils;
var tablaRangos;
var contenedorTabla;
var numFilas;
var tableNumberRam; //tabla donde se genera numeros aletorios (1)
var numeroFi;
var tableNumberRamContador;

function NumAletorio(){
    let num=Math.random();
    return num;
}
const generarTabla = () => {
    //obtenemos  los datos 
    numFilas = parseInt(document.getElementById("numFilas").value);
    contenedorTabla = document.getElementById("contenedorTabla");
    const contenedorTablaRe = document.getElementById("contenedorTabla-Resul");

    //generamos el codigo html para crear la tabla
    contenedorTabla.innerHTML = "";
    let ite=1;
    let tabla = "<table id='card-table'>";
    tabla+="<thead > <th >N°</th> <th>N. Aleatorio</th> </thead>";
    // var tabla = "<table class='table'>";
    for (let k = 1; k <= numFilas; k++) {
        tabla += "<tr>";
        for (let o = 1; o <= 2; o++) {
            if(o==1){
                tabla += "<th >"+ite+"</th>";
                ite++;
            }else{
                let num_ale=NumAletorio().toFixed(5);
                tabla += "<td >"+num_ale+"</td>"; 
            }
        }
        tabla += "</tr>";
    }
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;

    //Colocamos los datos en la tabla de numeros aleatorios 2
    tableNumberRam = document.getElementById("card-table");
    contenedorTablaRe.innerHTML="";
    let tablaRe = "<table id='card-table-resul'>";
    tablaRe+="<thead > <th >N. Aleatorio</th> <th>Unidad</th> </thead>";
    for (let k = 1; k <= numFilas; k++) {
        tablaRe += "<tr>";
        for (let o = 1; o <= 2; o++) {
            if(o==1){
                tablaRe += "<td >"+(parseFloat(tableNumberRam.rows[k].cells[1].innerHTML))+"</td>";
            }else{
                tablaRe += "<td ></td>"; 
            }
        }
        tablaRe += "</tr>";
    }
    tablaRe += "</table>";
    contenedorTablaRe.innerHTML = tablaRe;
    tableNumberRamContador = document.getElementById("card-table-resul");
};

const generarTablaEntrada = () => {
     numeroFi= document.getElementById("numeroFilas").value;
    const contenedorTablaEn = document.getElementById("contenedorTabla-Entry");
    let auxID=1;
    contenedorTablaEn.innerHTML="";
    let tablaEntry= "<table id='card-table-entry'>";
    tablaEntry+="<thead > <th ><p class='enca'> Unidades</p></th> <th><p class='enca'>Frecuencia</p></th> <th><p class='enca'>Prob. Ocurrencia</p></th> <th><p class='enca'>F. Acumulada </p></th></thead>";
    for (let k = 1; k <= numeroFi; k++) {
        tablaEntry += "<tr>";
        for (let o = 1; o <= 4; o++) {
            if(o==1 || o==2){
                tablaEntry += "<td > <input class='card-date-entry' type='number' id='number"+auxID+"'  min='1' /> </td>";
                auxID++;
            }else{
                let num_ale=NumAletorio().toFixed(5);
                tablaEntry += "<td ></td>"; 
            }
        }
        tablaEntry += "</tr>";
        if(numeroFi*2+1==auxID){
            tablaEntry += "<tr>";
            tablaEntry += "<td id='inputTextResul'>    <p> Resultado</p> </td>";
            tablaEntry += "<td id='res'>  </td>";
            tablaEntry += "</tr>";
        }    
    }
    tablaEntry += "</table>";
    contenedorTablaEn.innerHTML = tablaEntry;
    tablaProbabils = document.getElementById("card-table-entry");
 
}


const probOcurrenciaFreAcumulada = () => {


    let cantFilas= document.getElementById("numeroFilas").value;
    let dateTable=[];
    for (let k = 0; k < cantFilas*2; k++) {
        dateTable[k] = parseInt(document.getElementById("number"+(k+1)+"").value) ; 
    }

    let sumaTotal=0;
     for(let x=1;x<=cantFilas*2;x+=2){
        sumaTotal += dateTable[x]; 
    }
    //Agregando la suma de la frencuencia
    console.log(sumaTotal);
    document.getElementById("res").innerHTML=sumaTotal;

    /* Probabilidad de ocurrencia */
    for(let x=1;x<=cantFilas;x++){
        //Calculamos la prob. de ocurrencia dividiendo el valor entre el total
        tablaProbabils.rows[x].cells[2].innerHTML=((dateTable[x+(x-1)])/sumaTotal).toFixed(3);    
    }
    let sumaFrecuencia=0;
    for(let x=1;x<=cantFilas;x++){
        //calculamos la frecuencia acumulada sumando la prob. de ocurrencia
        sumaFrecuencia+=parseFloat(tablaProbabils.rows[x].cells[2].innerHTML);
        tablaProbabils.rows[x].cells[3].innerHTML=sumaFrecuencia.toFixed(3);    
    } 
    //Generando la tabla de los rangos 


    const conTableExit = document.getElementById("contenedorTabla-exit");
    conTableExit.innerHTML="";
    let tablaExit= "<table id='card-table-exit-resul'>";
    tablaExit+="<thead > <th ><p class='enca'> Intervalo Min</p></th> <th><p class='enca'>Intervalo Max</p></th> <th><p class='enca'>Unidades</p></th> </thead>";
    for (let k = 1; k <= cantFilas; k++) {
        tablaExit += "<tr>";
        for (let o = 1; o <= 3; o++) {
            tablaExit += "<td >  </td>";
        }
        tablaExit += "</tr>";  
    }
    tablaExit += "</table>";
    conTableExit.innerHTML = tablaExit;

    //Calculando los datos de la tabla de rangos
    tablaRangos = document.getElementById("card-table-exit-resul");
    let auxFrecuencia=0;
    for(let x=1;x<=cantFilas;x++){
        for( let i=0;i<2;i++){
            tablaRangos.rows[x].cells[i].innerHTML=auxFrecuencia;
            auxFrecuencia= parseFloat(tablaProbabils.rows[x].cells[3].innerHTML).toFixed(3) ;
        }
        
    }
    let iteUni=1;
    for(let i=1;i<=cantFilas*2;i+=2){
        tablaRangos.rows[iteUni].cells[2].innerHTML=parseInt(document.getElementById("number"+i+"").value)
        iteUni++;
    }
    procFinal();
}
//parseInt(document.getElementById("number"+(k+1)+"").value)

var contadorNumeros=[];

const procFinal = () => {

    for(let x=0;x<numeroFi;x++){
        contadorNumeros[x]=0;
    }
    let nAle;
    for(let x=1;x<=numFilas;x++){
        for(let y=1;y<=numeroFi;y++){
            nAle=parseFloat((tableNumberRam.rows[x].cells[1]).innerHTML);
            if(nAle>(parseFloat((tablaRangos.rows[y].cells[0]).innerHTML)) && nAle<=(parseFloat((tablaRangos.rows[y].cells[1]).innerHTML))){
                tableNumberRamContador.rows[x].cells[1].innerHTML=parseInt(tablaRangos.rows[y].cells[2].innerHTML);;
                contadorNumeros[y-1]+=1;
            }
        }
    }
    //Creando la tabla final con la cantidad de veces que se repite la unidad
    let tableAccountant = document.getElementById("contenedorTabla-Resul-con");
    tableAccountant.innerHTML = "";
    let tableAcc = "<table id='tableEnd'>";
    tableAcc+="<thead > <th >Unidades</th> <th>Cantidad</th> </thead>";
    let aux=0;
    for (let k = 1; k <= numeroFi; k++) {
        tableAcc += "<tr>";
        for (let o = 1; o <= 2; o++) {
            if(o==1){
                tableAcc += "<th >"+(parseInt(tablaRangos.rows[k].cells[2].innerHTML))+"</th>";
            }else{
                tableAcc += "<td ></td>"; 
            }
            aux++;
        }
        tableAcc += "</tr>";
        if(numeroFi*2==aux){
            tableAcc += "<tr>";
            tableAcc += "<td id='inputTextResul'>    <p> Prom.</p> </td>";
            tableAcc += "<td id='prom'>  </td>";
            tableAcc += "</tr>";
        }   
    }
    tableAcc += "</table>";
    tableAccountant.innerHTML = tableAcc;
    let sumaCantidad=0;
    let tableEnd = document.getElementById("tableEnd");
    for(let x=1;x<=numeroFi;x++){
        tableEnd.rows[x].cells[1].innerHTML=contadorNumeros[x-1];
        sumaCantidad+=contadorNumeros[x-1];
    }
    document.getElementById("prom").innerHTML=(sumaCantidad/numeroFi).toFixed(3);
    //tableEnd.rows[numeroFi+1].cells[1].innerHTML=(sumaCantidad/numeroFi);
}

window.addEventListener('load', function () {
    document.getElementById('botonGenerarTablaAle').addEventListener('click', function () {
        generarTabla();
    });
}); 

window.addEventListener('load', function () {
    document.getElementById('botonGenerarTableEntry').addEventListener('click', function () {
        generarTablaEntrada();
    });
}); 
 

window.addEventListener('load', function () {
    document.getElementById('botonCalcularTableEntry').addEventListener('click', function () {
        probOcurrenciaFreAcumulada();
    });
}); 



