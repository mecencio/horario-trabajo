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
        this.#licencia.value = x;
    }

    setEntrada (x) {
        this.#entrada.value = x;
    }

    setTenerEnCuenta (x) {
        this.#tenerEnCuenta.value = x;
    }

    setDeberiaSalir (x) {
        this.#deberiaSalir.value = x;
    }

    setSalida (x) {
        this.#salida.value = x;
    }

    setHsTrab (x) {
        this.#hsTrab.value = x;
    }

    setDiferencia (x) {
        this.#diferencia.value = x;
    }

    setDifTexto (x) {
        this.#difTexto.value = x;
    }

    borrarDatos() {
        this.#licencia.value= "";
        this.#entrada.value = "";
        this.#tenerEnCuenta.value = "";
        this.#deberiaSalir.value = "";
        this.#salida.value = "";
        this.#hsTrab.value = "";
        this.#diferencia.value = "";
        this.#difTexto.value = "";
    };

    calcularDiferencia() {
        if (this.deberiaSalir != "" && this.salida != "") {

            let deberia = (parseFloat(this.#entrada.value.slice(0,3))*60 + parseFloat(this.#entrada.value.slice(3)) + 450);
            let salida = parseFloat(this.#salida.value.slice(0,3))*60 + parseFloat(this.#salida.value.slice(3));
            let dif;

            if (deberia > salida) {
                dif = (deberia-salida)/60;
                this.#diferencia.value = parseInt(dif).toLocaleString('es-ES', {minimumIntegerDigits: 2}) + ":" + parseInt((60 * (dif - parseInt(dif))).toFixed(2)).toLocaleString('es-ES', {minimumIntegerDigits: 2});
                this.#difTexto.value = "Faltó";
            } else if (deberia < salida) {
                dif = (salida-deberia)/60;
                this.#diferencia.value = parseInt(dif).toLocaleString('es-ES', {minimumIntegerDigits: 2}) + ":" + parseInt((60 * (dif - parseInt(dif))).toFixed(2)).toLocaleString('es-ES', {minimumIntegerDigits: 2});
                this.#difTexto.value = "Sobró";
            } else {
                this.#diferencia.value = ""
                this.#difTexto.value = "";
            }
        }
    }
}

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

function setearDeberiaSalir(obj) {
    if(!obj.getTenerEnCuenta().value) {
        let aux = (parseFloat(obj.getEntrada().value.slice(0,3))*60 + parseFloat(obj.getEntrada().value.slice(3)) + 450);
        if (aux < 930) {
            aux = 930;
        }
        aux /= 60;
        if (!isNaN(aux)) {
            let deberia = parseInt(aux) + ":" + parseInt((60 * (aux - parseInt(aux))).toFixed(2)).toLocaleString('es-ES', {minimumIntegerDigits: 2});
            obj.setDeberiaSalir(deberia);
        } else {
            obj.setDeberiaSalir("");
        }
    }
}

function reiniciar () {
    lunes.borrarDatos();
    martes.borrarDatos();
    miercoles.borrarDatos();
    jueves.borrarDatos();
    viernes.borrarDatos();
}

// Objeto para cada día
lunes = crearObjetoDia("Lunes");
martes = crearObjetoDia("Martes");
miercoles = crearObjetoDia("Miercoles");
jueves = crearObjetoDia("Jueves");
viernes = crearObjetoDia("Viernes");

// Boton reinicio
let btnReinicio = document.getElementById("reinicio");




/********** EVENTOS **********/

btnReinicio.addEventListener("click", () => {
    reiniciar();
});

// lunes.getLicencia().addEventListener("change", () => {
//     lunes.setLicencia(document.getElementById("licenciaLunes").value);
// });

lunes.getEntrada().addEventListener("change", () => {
    let aux = (parseFloat(lunes.getEntrada().value.slice(0,3))*60 + parseFloat(lunes.getEntrada().value.slice(3)))
    if (aux < 450) {
        lunes.setEntrada("07:30")
    }
    setearDeberiaSalir(lunes);
    lunes.calcularDiferencia();
});

// lunes.getTenerEnCuenta().addEventListener("change", () => {
//     lunes.setTenerEnCuenta(document.getElementById("tenerEnCuentaLunes").value);
// });

lunes.getSalida().addEventListener("change", () => {
    let aux = lunes.getSalida().value;
    if (aux.length < 5) {
        aux = "0" + aux;
    }
    lunes.calcularDiferencia();
});
