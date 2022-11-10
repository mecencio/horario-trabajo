// Dado un número convierte y devuelve un string de formato "hh:mm"
function convertirEnHora (x) {
    return parseInt(x/60).toLocaleString('es-ES', {minimumIntegerDigits: 2}) + ":" + parseInt((60 * (x/60 - parseInt(x/60))).toFixed(2)).toLocaleString('es-ES', {minimumIntegerDigits: 2});
}

// Dado un String de formato "hh:mm" devuelve un entero
function convertirEnInt (hora) {
    if (hora == "")
        return 0
    else
        return parseFloat(hora.slice(0,3))*60 + parseFloat(hora.slice(3));
}

// Crea un objeto tomando todos los ID del día pasado por parámetro.
function crearObjetoDia (e) {
    let aux = [];
    aux.push(document.getElementById(`licencia${e}`));
    aux.push(document.getElementById(`entrada${e}`));
    aux.push(document.getElementById(`tenerEnCuenta${e}`));
    aux.push(document.getElementById(`deberiaSalir${e}`));
    aux.push(document.getElementById(`salida${e}`));
    aux.push(document.getElementById(`hsTrab${e}`));
    aux.push(document.getElementById(`diferencia${e}`));
    aux.push(document.getElementById(`difTexto${e}`));
    return new Datos (e, ...aux);
}

// Función para sumar/restar la diferencia total al debería del día pasado por parámetro.
function tenerEnCuentaElTotal (obj, total) {
    if (obj.getDia() != "Lunes" && obj.getEntrada().value != "") {
        let auxDeb = convertirEnInt(obj.getDeberiaSalir().value);
        let auxDif = total.getIntDiferenciaTotal();
        if(obj.getTenerEnCuenta().value == "true" && (auxDeb - auxDif) < 930)
            auxDeb = 930;

        let dif = auxDeb - auxDif;
        if (dif < 930) {
            obj.setDeberiaSalir(convertirEnHora(930));
            auxDif += (auxDeb - (convertirEnInt(obj.getEntrada().value)+450));
            total.trabajarDiferencia(auxDif, convertirEnInt(total.getHsTrabTotal().value));
        } else {
            obj.setDeberiaSalir(convertirEnHora(dif));
            total.trabajarDiferencia(0, convertirEnInt(total.getHsTrabTotal().value));
        }
    }
}

// Setea días, total y storage en ""
function reiniciar () {
    lunes.borrarDatos();
    martes.borrarDatos();
    miercoles.borrarDatos();
    jueves.borrarDatos();
    viernes.borrarDatos();
    total.borrarDatos();
    total.trabajarDiferencia(0, 0);
    localStorage.clear();
}

// Agrupa los EventListener. Como el código se repite para cada día la idea es que simplificarlo en una función.
function eventosDia (obj, total) {
    // Mira si hay cambios en el campo Licencia
    obj.getLicencia().addEventListener("change", () => {
        // Si puse que en el día tuve licencia
        if (obj.getLicencia().value == "true") {
            // Borro todos los datos de la celda
            obj.borrarDatos();
            // Como borre todos los datos, vuelvo a setear en true Licencia
            obj.setLicencia("true");
            // Desactivo todos los campos restantes
            obj.getEntrada().setAttribute("disabled", "");
            obj.getTenerEnCuenta().setAttribute("disabled", "");
            obj.getSalida().setAttribute("disabled", "");
        } else { // Si Licencia cambia a false
            // Quito todos los disabled de los campos que se deben poder editar
            obj.getEntrada().removeAttribute("disabled");
            obj.getTenerEnCuenta().removeAttribute("disabled");
            obj.getSalida().removeAttribute("disabled");
        }
        // Seteo el total
        total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        // Guardo los cambios en el Local Storage
        obj.guardar()
        total.guardar();
    });

    // Mira si hay cambios en el horario de entrada
    obj.getEntrada().addEventListener("change", () => {
        // Traigo el div que contiene el mensaje de error
        let divError = document.getElementById(`errorEntrada${obj.getDia()}`);
        // Si hay un cambio no sé si va a haber error con el nuevo cambio
        // Por lo tanto borro el contenido
        divError.innerHTML = "";
        // Me fijo si hay error (puse que entré antes de las 7:30)
        if (convertirEnInt(obj.getEntrada().value) < 450) {
            // Creo un elemento <p></p> que va a contener el error
            let error = document.createElement("p");
            // Le agrego la clase
            error.className = "my-1";
            // Defino el mensaje de error
            error.innerText = " * La entrada debe ser a partir de las 07:30";
            // Lo agrego al div
            divError.appendChild(error);
        }
        obj.setearDeberiaSalir();
        if (obj.getTenerEnCuenta().value == "true") {
            obj.limpiar();
            tenerEnCuentaElTotal(obj, total);
        } else {
            obj.calcularDiferencia();
            total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        }
        obj.guardar()
        total.guardar();
    });

    // Mira si hay cambios en el campo de "tener en cuenta el total"
    obj.getTenerEnCuenta().addEventListener("change", () => {
        if (obj.getTenerEnCuenta().value == "true") {
            obj.limpiar();
            tenerEnCuentaElTotal(obj, total);
            if (total.getDifTextoTotal().value == "Sobró")
                total.trabajarDiferencia(convertirEnInt(total.getDiferenciaTotal().value), convertirEnInt(total.getHsTrabTotal().value));
            else if (total.getDifTextoTotal().value == "Faltó")
                total.trabajarDiferencia(-convertirEnInt(total.getDiferenciaTotal().value), convertirEnInt(total.getHsTrabTotal().value));
            else
                total.trabajarDiferencia(0, convertirEnInt(total.getHsTrabTotal().value));
        } else {
            obj.setearDeberiaSalir();
            obj.calcularDiferencia();
            total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        }
        obj.guardar()
        total.guardar();
    });

    // Mira si hay cambios en el horario de salida
    obj.getSalida().addEventListener("change", () => {
        let divError = document.getElementById(`errorSalida${obj.getDia()}`);
        divError.innerHTML = "";
        if (convertirEnInt(obj.getSalida().value) < 930) {
            let error = document.createElement("p");
            error.className = "my-1";
            error.innerText = " * La salida debe ser a partir de las 15:30";
            divError.appendChild(error);
        }
        if (obj.getSalida().value == "") {
            obj.limpiar();
        }
        obj.calcularDiferencia();
        if (obj.getTenerEnCuenta().value != "true" || obj.getSalida().value != "")
            total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        obj.guardar()
        total.guardar();
    });
}
