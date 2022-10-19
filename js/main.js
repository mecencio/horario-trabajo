class Datos {
    #dia;
    #licencia;
    #entrada;
    #tenerEnCuenta;
    #deberiaSalir;
    #salida;
    #hsTrab;
    #diferencia;
    #difTexto;

    constructor(dia, licencia, entrada, enCuentaResto, deberiaSalir, salida, hsTrab, diferencia, difTexto) {
        this.#dia = dia;
        this.#licencia = licencia;
        this.#entrada = entrada;
        this.#tenerEnCuenta = enCuentaResto;
        this.#deberiaSalir = deberiaSalir;
        this.#salida = salida;
        this.#hsTrab = hsTrab;
        this.#diferencia = diferencia;
        this.#difTexto = difTexto;
    }

    getDia () {
        return this.#dia
    }

    getLicencia () {
        return this.#licencia
    }

    getEntrada () {
        return this.#entrada
    }

    getTenerEnCuenta () {
        return this.#tenerEnCuenta
    }

    getDeberiaSalir () {
        return this.#deberiaSalir
    }

    getSalida () {
        return this.#salida
    }

    getHsTrab () {
        return this.#hsTrab
    }

    getDiferencia () {
        return this.#diferencia
    }

    getDifTexto () {
        return this.#difTexto
    }

    setDia (x) {
        this.#dia = x;
    }

    setLicencia (x) {
        this.#licencia = x;
    }

    setEntrada (x) {
        this.#entrada = x;
    }

    setTenerEnCuenta (x) {
        this.#tenerEnCuenta = x;
    }

    setDeberiaSalir (x) {
        this.#deberiaSalir = x;
    }

    setSalida (x) {
        this.#salida = x;
    }

    setHsTrab (x) {
        this.#hsTrab = x;
    }

    setDiferencia (x) {
        this.#diferencia = x;
    }

    setDifTexto (x) {
        this.#difTexto = x;
    }
}

function crearObjetoDia (e) {
    let aux = [];
    aux.push(document.getElementById(`licencia${e}`).value);
    aux.push(document.getElementById(`entrada${e}`).value);
    aux.push(document.getElementById(`tenerEnCuenta${e}`).value);
    aux.push(document.getElementById(`deberiaSalir${e}`).value);
    aux.push(document.getElementById(`salida${e}`).value);
    aux.push(document.getElementById(`hsTrab${e}`).value);
    aux.push(document.getElementById(`diferencia${e}`).value);
    aux.push(document.getElementById(`difTexto${e}`).value);
    return new Datos (e, ...aux);
}

function reiniciar () {
    let aux = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
    for (e of aux) {
        document.getElementById(`licencia${e}`).value = "";
        document.getElementById(`entrada${e}`).value = "";
        document.getElementById(`tenerEnCuenta${e}`).value = "";
        document.getElementById(`deberiaSalir${e}`).value = "";
        document.getElementById(`salida${e}`).value = "";
        document.getElementById(`hsTrab${e}`).value = "";
        document.getElementById(`diferencia${e}`).value = "";
        document.getElementById(`difTexto${e}`).value = "";
    }
}

lunes = crearObjetoDia("Lunes");
martes = crearObjetoDia("Martes");
miercoles = crearObjetoDia("Miercoles");
jueves = crearObjetoDia("Jueves");
viernes = crearObjetoDia("Viernes");
let btnReinicio = document.getElementById("reinicio");


/********** EVENTOS **********/

btnReinicio.addEventListener("click", () => {
    reiniciar();
})