function factorial(x){
    if(x<= 1){
        return 1;
    }
    return factorial(x-1) *x;
}

function SolucionG1(){

    //Capturamos los datos del formulario 
    var tiempo_llegada =  parseFloat(document.getElementById("tiempo_llegada").value);
    var tiempo_servicio = parseFloat(document.getElementById("tiempo_servicio").value);
    var poblacion = parseFloat(document.getElementById("poblacion").value);
    var n_servicios = parseFloat(document.getElementById("n_servidores").value);
    var c_tecnico = parseFloat(document.getElementById("c_tecnico").value);
    var c_inactividad = parseFloat(document.getElementById("c_inactividad").value);
    
    //--------------------------------------------------------------------------------------------
    //Realizamos las formula para obtener la tasa de llegada y de servicio   
    var tasa_llegada_cliente = 1 / tiempo_llegada;
    var tasa_servicio = 1 / tiempo_servicio;

    //--------------------------------------------------------------------------------------------
    // Realizamos la formula de probabilidad de que no hay unidades en el sistema
    var sum_Po = 0;    //inicializamos en 0 la variable que contendra la suma
    for(let i=0;i<=poblacion;i++){
        sum_Po=sum_Po+((factorial(poblacion)/factorial(poblacion-i)) *Math.pow((tasa_llegada_cliente/tasa_servicio ),i))
    }
    var Po = (1 / sum_Po);

    //--------------------------------------------------------------------------------------------
    // Calculamos el numero promedio de unidades en la linea de espera
    var Lq = (poblacion - (((tasa_llegada_cliente + tasa_servicio)/tasa_llegada_cliente)*(1- Po)));

    //--------------------------------------------------------------------------------------------
    // Calculamos el numero promedio de unidades en el sistema
    var l = (Lq + (1 - Po));
    
    //--------------------------------------------------------------------------------------------        
    // Calculamos el tiempo promedio que una unidad pasa en la linea de espera
    var Wq = (Lq / ((poblacion - l) * tasa_llegada_cliente));
    
    //--------------------------------------------------------------------------------------------            
    //Calculamos el costo total por hora de la operacion de servicio
    var costo_total = (c_inactividad * l) + (c_tecnico * n_servicios);

    //--------------------------------------------------------------------------------------------            
    //Enviamos los valores al formulario 
    document.getElementById("Po").value= Po.toFixed(3); //probabilidad de que no hay unidades en el sistema
    document.getElementById("Lq").value= Lq.toFixed(3); //numero promedio de unidades en la linea de espera
    document.getElementById("l").value= l.toFixed(3);   //numero promedio de unidades en el sistema
    document.getElementById("Wq").value= Wq.toFixed(3); //tiempo promedio que una unidad pasa en la linea de espera
    document.getElementById("ct").value= costo_total.toFixed(2);  //costo total por hora de la operacion de servicio

    //ejemplo: 50 2.5 10 1 80 100
}

function solucionG2(){
    //Capturamos los datos del formulario 
    var tiempo_llegada =  parseFloat(document.getElementById("tiempo_llegada").value);
    var tiempo_servicio = parseFloat(document.getElementById("tiempo_servicio").value);
    var poblacion = parseFloat(document.getElementById("poblacion").value);
    var n = parseFloat(document.getElementById("n").value);

    //--------------------------------------------------------------------------------------------            
    // Calculamos la tasa de llegada
    var tasa_llegada_cliente = 1 / tiempo_llegada;
    var tasa_servicio = 1 / tiempo_servicio;

    //--------------------------------------------------------------------------------------------                
    // Calculamos la probabilidad de que no hay unidades en el sistema 
    var sum_Po = 0;
    for(let i=0; i<poblacion; i++){
        sum_Po = sum_Po + ((factorial(poblacion) / factorial(poblacion - i)) * Math.pow(tasa_llegada_cliente / tasa_servicio ,i))
    }
    var Po = (1 / sum_Po);

    //--------------------------------------------------------------------------------------------            
    // Calculamos lel numero promedio de unidades en la linea de espera 
    var Lq = (poblacion - (((tasa_llegada_cliente + tasa_servicio) / tasa_llegada_cliente) * (1 - Po)));
    
    //--------------------------------------------------------------------------------------------            
    // Calculamos el numero promedio de unidades en el sistema 
    var ls = (Lq + (1 - Po));
    
    //--------------------------------------------------------------------------------------------            
    // Calculamos el tiempo promedio que una unidad pasa en la linea de espera 
    var Wq = (Lq / ((poblacion - ls) * tasa_llegada_cliente));
    
    //--------------------------------------------------------------------------------------------            
    // Calculamos el tiempo promedio que la unidad ocupa en el sistema
    var ws = Wq + (1 / tasa_servicio);
    
    //--------------------------------------------------------------------------------------------            
    // Calculamos la probabilidad de que una unidad que llega tenga que esperar para que la atiendan
    var pw = 1 - Po;
    
    //--------------------------------------------------------------------------------------------            
    // Calculamos la probabilidad de n unidades en el sistema
    var pn = (factorial(poblacion) / factorial(poblacion - n)) * Math.pow(tasa_llegada_cliente / tasa_servicio,n) * Po;

    //--------------------------------------------------------------------------------------------            
    // Enviamos los valores al formulario 
    document.getElementById("Po").value = Po.toFixed(3);
    document.getElementById("Lq").value = Lq.toFixed(3);
    document.getElementById("ls").value = ls.toFixed(3);
    document.getElementById("Wq").value = Wq.toFixed(3);
    document.getElementById("ws").value = ws.toFixed(3);
    document.getElementById("pw").value = pw.toFixed(3);
    document.getElementById("pn").value = pn.toFixed(3);

    // ejem: 40 5 5 3
}

function solucionG3(){
    //Capturamos los datos del formulario 
    var tasa_llegada_cliente =  parseFloat(document.getElementById("tasa_llegada_cliente").value);
    var tasa_servicio = parseFloat(document.getElementById("tasa_servicio").value);
    var lineas_ocupadas = parseFloat(document.getElementById("n").value);

    //--------------------------------------------------------------------------------------------              
    // Calculamos la probabilidad de que no hay unidades en el sistema
    var sum_Po_Deno = 0, sum_Po_Nume = 0;
    for(let i=0; i<=lineas_ocupadas; i++){
        sum_Po_Deno = sum_Po_Deno + (Math.pow(tasa_llegada_cliente / tasa_servicio, i) / factorial(i));
    }
    sum_Po_Nume = (Math.pow(tasa_llegada_cliente / tasa_servicio, lineas_ocupadas) / factorial(lineas_ocupadas));
    var Po = ( sum_Po_Nume/ sum_Po_Deno);
    var l = (tasa_llegada_cliente / tasa_servicio) * (1 - Po);

    //--------------------------------------------------------------------------------------------              
    // Enviamos los valores al formulario 
    document.getElementById("Px").value = Po.toFixed(3);
    document.getElementById("L").value = l.toFixed(3);
    document.getElementById("n_o").value = lineas_ocupadas;

    //ejem: 12 6 4
}

function solucionG4(){
    //Capturamos los datos del formulario 
    var tasa_llegada_cliente =  parseFloat(document.getElementById("tasa_llegada_cliente").value);
    var tasa_servicio = parseFloat(document.getElementById("tasa_servicio").value);
    var desviacion = parseFloat(document.getElementById("desviacion").value);

    //--------------------------------------------------------------------------------------------  
    // Calculamos la probabilidad de que no hay unidades en el sistema
    var Po = 1 - ( tasa_llegada_cliente / tasa_servicio );

    //--------------------------------------------------------------------------------------------  
    // Calculamos el numero promedio de unidades en la linea de espera 
    var Lq = ( (Math.pow(tasa_llegada_cliente, 2) * Math.pow(desviacion, 2)) + (Math.pow(tasa_llegada_cliente / tasa_servicio, 2)) ) / (2 * (1 - (tasa_llegada_cliente / tasa_servicio)));

    //--------------------------------------------------------------------------------------------  
    // Calculamosumero promedio de unidades en el sistema 
    var l = Lq + (tasa_llegada_cliente / tasa_servicio);

    //--------------------------------------------------------------------------------------------  
    // Calculamos el tiempo promedio que una unidad pasa en la linea de espera
    var Wq = Lq / tasa_llegada_cliente;

    //--------------------------------------------------------------------------------------------  
    // Calculamos el tiempo promedio que una unidad pasa en el sistema 
    var w = Wq + (1 / tasa_servicio);

    //--------------------------------------------------------------------------------------------  
    // Calculamos la probabilidad de que una unidad que llega tenga que esperar a que la atiendan 
    var pw = tasa_llegada_cliente / tasa_servicio;

    //--------------------------------------------------------------------------------------------  
    // Enviamos los valores al formulario 
    document.getElementById("Po").value = Po.toFixed(3);
    document.getElementById("Lq").value = Lq.toFixed(3);
    document.getElementById("l").value = l.toFixed(3);
    document.getElementById("Wq").value = Wq.toFixed(3);
    document.getElementById("w").value = w.toFixed(3);
    document.getElementById("pw").value = pw.toFixed(3);
}

function SolucionG5(){
    //Capturamos los datos del formulario 
    var tasa_llegada_cliente =  parseFloat(document.getElementById("tasa_llegada_cliente").value);
    var tasa_servicio = parseFloat(document.getElementById("tasa_servicio").value);
    var n_servicios = parseFloat(document.getElementById("numberC").value);
    var c_tecnico = parseFloat(document.getElementById("costoS").value);
    var costo_cliente = parseFloat(document.getElementById("costoC").value);

    //--------------------------------------------------------------------------------------------  
    // Calculamos el numero de promedio de unidades en la linea de espera
    var Lq = Math.pow(tasa_llegada_cliente, 2) / (tasa_servicio * (tasa_servicio - tasa_llegada_cliente));

    //--------------------------------------------------------------------------------------------  
    // Caculamos el numero promedio de unidades en el sistema 
    var l = Lq + (tasa_llegada_cliente / tasa_servicio);

    //--------------------------------------------------------------------------------------------  
    // Calculamos el costo total
    var ct = (costo_cliente * l) + (c_tecnico * n_servicios);

    //--------------------------------------------------------------------------------------------  
    //Enviamos los valores al formulario 
    document.getElementById("Lq").value = Lq.toFixed(3);
    document.getElementById("l").value = l.toFixed(3);
    document.getElementById("ct").value = ct.toFixed(2);

    //ejem: 2.5 10 1 15 25
}

function solucionG6(){
    //Capturamos los datos del formulario 
    var tasa_llegada_cliente =  parseFloat(document.getElementById("tasa_llegada_cliente").value);
    var numero_servicio = parseFloat(document.getElementById("numero_servicio").value);
    var clientes = parseFloat(document.getElementById("n").value);

    //--------------------------------------------------------------------------------------------
    // Calculamos el factor de utilización
    var factor_ultilizacion = tasa_llegada_cliente / numero_servicio;

    //--------------------------------------------------------------------------------------------
    //Calculamos la probabilidad de que tengamos n clientes en el sistema
    var P_o = (1 - factor_ultilizacion);    //probabilidad de 0 clientes
    var P_u = (1 - factor_ultilizacion) * Math.pow(factor_ultilizacion, clientes); //probabilidad de 1 clientes
    var P_n = 1 - (P_o + P_u);

    //--------------------------------------------------------------------------------------------
    // Calculamos la longitud de espera media en la cola
    var Lq = Math.pow(tasa_llegada_cliente, 2) / (numero_servicio * (numero_servicio - tasa_llegada_cliente));

    //--------------------------------------------------------------------------------------------
    //Calculamos el tiempo medio que un cliente espera en la cola 
    var Wq = Lq / tasa_llegada_cliente;

    //--------------------------------------------------------------------------------------------
    // Mostrar los valores en los input de resultado
    document.getElementById("Po").value = P_n.toFixed(2);
    document.getElementById("Lq").value = Lq.toFixed(2);
    document.getElementById("Wq").value = Wq.toFixed(2);
}

function solucionG7(){
    //Capturamos los datos del formulario 
    var tasa_llegada_cliente =  parseFloat(document.getElementById("tasa_llegada_cliente").value);
    var tasa_servicio = parseFloat(document.getElementById("u").value);
    var k = parseFloat(document.getElementById("k").value);

    //--------------------------------------------------------------------------------------------
    var suma_deno_Po = 0.0;
    // Calculamos la probabilidad de que no haya unidades en el sistema
    for(let n=0; n<k; n++){
        suma_deno_Po = suma_deno_Po + (Math.pow(tasa_llegada_cliente/tasa_servicio, n) / factorial(n)) + ((Math.pow(tasa_llegada_cliente/tasa_servicio, k-1) / factorial(k)) * ((k * tasa_servicio) / ((k*tasa_servicio) - tasa_llegada_cliente)));
    }
    var Po = 1 / suma_deno_Po;

    //--------------------------------------------------------------------------------------------
    // Calculamos el numero promedio de unidades en cola
    var Lq = ((Math.pow(tasa_llegada_cliente/tasa_servicio, k) * (tasa_servicio * tasa_llegada_cliente)) / (factorial(k - 1) * Math.pow((k*tasa_servicio)-tasa_llegada_cliente, 2))) * Po;

    //--------------------------------------------------------------------------------------------
    // Calculamos el numero promedio de unidades en el sistema
    var ls = Lq + (tasa_llegada_cliente / tasa_servicio);

    //--------------------------------------------------------------------------------------------
    // Calculamos el tiempo promedio que una unidad para en la cola
    var Wq = Lq / tasa_llegada_cliente;

    //--------------------------------------------------------------------------------------------
    // Calculamos el tiempo promedio que una unidad pasa en el sistema
    var Ws = Wq + (1/tasa_servicio);

    //--------------------------------------------------------------------------------------------
    // Calculamos la probabilidad de que una unidad que llega tenga que esperar por el servicio
    var pw = (Math.pow(tasa_llegada_cliente/tasa_servicio, k) / factorial(k)) * ((k * tasa_servicio) / ((k *tasa_servicio) - tasa_llegada_cliente)) * Po;

    // Mostrar los valores en los input de resultado
    document.getElementById("Po").value = Po.toFixed(2);
    document.getElementById("Lq").value = Lq.toFixed(2);
    document.getElementById("ls").value = ls.toFixed(2);
    document.getElementById("Wq").value = Wq.toFixed(2);
    document.getElementById("Ws").value = Ws.toFixed(2);
    document.getElementById("Pw").value = pw.toFixed(2);

    // Probabilidad de que haya n unidades en cola
    for(let i=0; i<=k+2; i++){
        if(i <= k){
            var pn = (Math.pow(tasa_llegada_cliente/tasa_servicio, i) / factorial(i)) * Po;
        }else{
            var pn = (Math.pow(tasa_llegada_cliente/tasa_servicio, i) / (factorial(k) * Math.pow(k, i-k))) * Po;
        }
        var cadena = "p" + (i+1);
        document.getElementById(cadena).value = pn;
    }
}
