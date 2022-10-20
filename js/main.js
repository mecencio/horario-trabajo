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

    constructor(dia, licencia, entrada, enCuentaTotal, deberiaSalir, salida, hsTrab, diferencia, difTexto) {
        this.#dia = dia;
        this.#licencia = licencia;
        this.#entrada = entrada;
        this.#tenerEnCuenta = enCuentaTotal;
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

    getIntDiferencia () {
        let aux = 0

        if (this.#difTexto.value == "Sobró") {
            aux = convertirEnInt (this.#diferencia.value);
        } else if (this.#difTexto.value == "Faltó") {
            aux = - convertirEnInt (this.#diferencia.value);
        }

        return aux;
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
        if (this.#deberiaSalir.value != "" && this.#salida.value != "") {

            let entrada = convertirEnInt(this.#entrada.value);
            let deberia = (entrada + 450);
            let salida = convertirEnInt(this.#salida.value);
            let dif;

            if (salida >= entrada) {
                if (deberia > salida) {
                    dif = (salida-entrada);
                    this.#hsTrab.value = convertirEnHora(dif);
                    dif = (deberia-salida);
                    this.#diferencia.value = convertirEnHora(dif);
                    this.#difTexto.value = "Faltó";
                } else if (deberia < salida) {
                    dif = (salida-entrada);
                    this.#hsTrab.value = convertirEnHora(dif);
                    dif = (salida-deberia);
                    this.#diferencia.value = convertirEnHora(dif);
                    this.#difTexto.value = "Sobró";
                } else {
                    dif = (salida-entrada);
                    this.#hsTrab.value = convertirEnHora(dif);
                    this.#diferencia.value = ""
                    this.#difTexto.value = "";
                }
            }
        }
    }
}

class Total {
    #hsTrab;
    #diferencia;
    #difTexto;

    constructor() {
        this.#hsTrab = document.getElementById("hsTrabTotal");
        this.#diferencia = document.getElementById("diferenciaTotal");
        this.#difTexto = document.getElementById("difTextoTotal");
    }

    getHsTrabTotal () {
        return this.#hsTrab
    }

    getDiferenciaTotal () {
        return this.#diferencia
    }

    getDifTextoTotal () {
        return this.#difTexto
    }

    setHsTrabTotal (x) {
        this.#hsTrab.value = x;
    }

    setDiferenciaTotal (x) {
        this.#diferencia.value = x;
    }

    setDifTextoTotal (x) {
        this.#difTexto.value = x;
    }

    #devolerDiferenciaTotal(l, ma, mi, j, v) {
        let aux = 0;
        if (l.getDiferencia().value != "") {
            aux += l.getIntDiferencia();
        }

        if (ma.getDiferencia().value != "") {
            if (ma.getTenerEnCuenta().value = "true") {
                aux = ma.getIntDiferencia();
            } else {
                aux += ma.getIntDiferencia();
            }
        }

        if (mi.getDiferencia().value != "") {
            if (mi.getTenerEnCuenta().value = "true") {
                aux = mi.getIntDiferencia();
            } else {
                aux += mi.getIntDiferencia();
            }
        }

        if (j.getDiferencia().value != "") {
            if (j.getTenerEnCuenta().value = "true") {
                aux = j.getIntDiferencia();
            } else {
                aux += j.getIntDiferencia();
            }
        }

        if (v.getDiferencia().value != "") {
            if (v.getTenerEnCuenta().value = "true") {
                aux = v.getIntDiferencia();
            } else {
                aux += v.getIntDiferencia();
            }
        }

        return aux;
    }

    #devolerHsTrabajadas(l, ma, mi, j, v) {
        let aux = 0;
        if (l.getHsTrab().value != "") {
            aux += convertirEnInt(l.getHsTrab().value);
        }

        if (ma.getHsTrab().value != "") {
            aux += convertirEnInt(ma.getHsTrab().value);
        }

        if (mi.getHsTrab().value != "") {
            aux += convertirEnInt(mi.getHsTrab().value);
        }

        if (j.getHsTrab().value != "") {
            aux += convertirEnInt(j.getHsTrab().value);
        }

        if (v.getHsTrab().value != "") {
            aux += convertirEnInt(v.getHsTrab().value);
        }

        if (aux == 0) aux = "";

        return aux;
    };

    setearTotal(l, ma, mi, j, v) {

        let diferenciaTotal = this.#devolerDiferenciaTotal(l, ma, mi, j, v);
        let totalTrabajado = this.#devolerHsTrabajadas(l, ma, mi, j, v);

        if (diferenciaTotal < 0) {
            this.setDifTextoTotal("Faltó");
            this.setDiferenciaTotal(convertirEnHora(Math.abs(diferenciaTotal)));
            this.setHsTrabTotal(convertirEnHora(totalTrabajado));
        } else if (diferenciaTotal > 0) {
            this.setDifTextoTotal("Sobró");
            this.setDiferenciaTotal(convertirEnHora(diferenciaTotal));
            this.setHsTrabTotal(convertirEnHora(totalTrabajado));
        } else {
            this.setDifTextoTotal("");
            this.setDiferenciaTotal("");
            this.setHsTrabTotal(convertirEnHora(totalTrabajado));
        }
    }

    borrarDatos() {
        this.setDifTextoTotal("");
        this.setDiferenciaTotal("");
        this.setHsTrabTotal("");
    }
}


/********** FUNCIONES **********/

function convertirEnHora (x) {
    return parseInt(x/60).toLocaleString('es-ES', {minimumIntegerDigits: 2}) + ":" + parseInt((60 * (x/60 - parseInt(x/60))).toFixed(2)).toLocaleString('es-ES', {minimumIntegerDigits: 2});
}

function convertirEnInt (hora) {
    return parseFloat(hora.slice(0,3))*60 + parseFloat(hora.slice(3));
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
        let aux = convertirEnInt(obj.getEntrada().value) + 450;
        if (aux < 930) {
            aux = 930;
        }
        if (!isNaN(aux)) {
            obj.setDeberiaSalir(convertirEnHora(aux));
        } else {
            obj.setDeberiaSalir("");
        }
    }
}

function tenerEnCuentaElTotal (obj, total) {
    if (obj.getDia() != "Lunes" && obj.getEntrada().value != "" && !isNaN(obj.getEntrada().value) && obj.getDeberiaSalir().value != "15:30") {
        let auxDeb = convertirEnInt(obj.getDeberiaSalir().value);
        let auxDif = 0;
        if (total.getDifTextoTotal().value == "Sobró") {
            auxDif = convertirEnInt (total.getDiferenciaTotal().value);
        } else if (total.getDifTextoTotal().value == "Faltó") {
            auxDif = - convertirEnInt (total.getDiferenciaTotal().value);
        }

        let dif = auxDeb - auxDif;
        if (dif < 930) {
            obj.setDeberiaSalir(convertirEnHora(930));
            auxDif -= (auxDeb - obj.getDeberiaSalir().value);
            total.setDiferenciaTotal(convertirEnHora(auxDif));
        } else {
            obj.setDeberiaSalir(convertirEnHora(dif));
            total.setDiferenciaTotal("");
            total.setDifTextoTotal("");
        }
    }
}

function reiniciar () {
    lunes.borrarDatos();
    martes.borrarDatos();
    miercoles.borrarDatos();
    jueves.borrarDatos();
    viernes.borrarDatos();
    total.borrarDatos();
}


/********** VARIABLES **********/

// Objeto para cada día
lunes = crearObjetoDia("Lunes");
martes = crearObjetoDia("Martes");
miercoles = crearObjetoDia("Miercoles");
jueves = crearObjetoDia("Jueves");
viernes = crearObjetoDia("Viernes");
total = new Total ();

// Boton reinicio
let btnReinicio = document.getElementById("reinicio");




/********** EVENTOS **********/

btnReinicio.addEventListener("click", () => {
    reiniciar();
});

// Lunes
lunes.getLicencia().addEventListener("change", () => {
    if (lunes.getLicencia().value == "true") {
        lunes.borrarDatos();
        lunes.setLicencia("true");
        lunes.getEntrada().setAttribute("disabled", "");
        lunes.getTenerEnCuenta().setAttribute("disabled", "");
        lunes.getSalida().setAttribute("disabled", "");
    } else {
        lunes.getEntrada().removeAttribute("disabled");
        lunes.getTenerEnCuenta().removeAttribute("disabled");
        lunes.getSalida().removeAttribute("disabled");
    }
    total.setearTotal(lunes,martes,miercoles,jueves,viernes);
});

lunes.getEntrada().addEventListener("change", () => {
    if (convertirEnInt(lunes.getEntrada().value) < 450) {
        lunes.setEntrada("07:30")
    }
    setearDeberiaSalir(lunes);
    lunes.calcularDiferencia();
    total.setearTotal(lunes,martes,miercoles,jueves,viernes);
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
    total.setearTotal(lunes,martes,miercoles,jueves,viernes);
});

// Martes
martes.getLicencia().addEventListener("change", () => {
    if (martes.getLicencia().value == "true") {
        martes.borrarDatos();
        martes.setLicencia("true");
        martes.getEntrada().setAttribute("disabled", "");
        martes.getTenerEnCuenta().setAttribute("disabled", "");
        martes.getSalida().setAttribute("disabled", "");
    } else {
        martes.getEntrada().removeAttribute("disabled");
        martes.getTenerEnCuenta().removeAttribute("disabled");
        martes.getSalida().removeAttribute("disabled");
    }
    total.setearTotal(lunes,martes,miercoles,jueves,viernes);
});

martes.getEntrada().addEventListener("change", () => {
    if (convertirEnInt(martes.getEntrada().value) < 450) {
        martes.setEntrada("07:30")
    }
    setearDeberiaSalir(martes);
    martes.calcularDiferencia();
    total.setearTotal(lunes,martes,miercoles,jueves,viernes);
});

// martes.getTenerEnCuenta().addEventListener("change", () => {
//     if (martes.getLicencia().value == "true") {
//         martes.borrarDatos();
//         martes.setLicencia("true");
//         martes.getEntrada().setAttribute("disabled", "");
//         martes.getTenerEnCuenta().setAttribute("disabled", "");
//         martes.getSalida().setAttribute("disabled", "");
//     } else {
//         martes.getEntrada().removeAttribute("disabled");
//         martes.getTenerEnCuenta().removeAttribute("disabled");
//         martes.getSalida().removeAttribute("disabled");
//     }
//     total.setearTotal(lunes,martes,miercoles,jueves,viernes);
// });

martes.getSalida().addEventListener("change", () => {
    let aux = martes.getSalida().value;
    if (aux.length < 5) {
        aux = "0" + aux;
    }
    martes.calcularDiferencia();
    total.setearTotal(lunes,martes,miercoles,jueves,viernes);
});
