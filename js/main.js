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
            let deberia = convertirEnInt(this.#deberiaSalir.value);
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

    guardar() {
        let aux = {};
        aux["dia"] = this.#dia;
        aux["licencia"] = this.#licencia.value;
        aux["entrada"] = this.#entrada.value;
        aux["tenerEnCuenta"] = this.#tenerEnCuenta.value;
        aux["deberiaSalir"] = this.#deberiaSalir.value;
        aux["salida"] = this.#salida.value;
        aux["hsTrab"] = this.#hsTrab.value;
        aux["diferencia"] = this.#diferencia.value;
        aux["difTexto"] = this.#difTexto.value;

        localStorage.setItem(`${this.#dia}`, JSON.stringify(aux));
    }

    cargar() {
        if (localStorage[`${this.#dia}`]) {
            let aux = JSON.parse(localStorage.getItem(`${this.#dia}`));
            this.#dia = aux["dia"];
            this.#licencia.value = aux["licencia"];
            this.#entrada.value = aux["entrada"];
            this.#tenerEnCuenta.value = aux["tenerEnCuenta"];
            this.#deberiaSalir.value = aux["deberiaSalir"];
            this.#salida.value = aux["salida"];
            this.#hsTrab.value = aux["hsTrab"];
            this.#diferencia.value = aux["diferencia"];
            this.#difTexto.value = aux["difTexto"];
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

        if (ma.getEntrada().value != "" && ma.getSalida().value != "") {
            aux += convertirEnInt(ma.getSalida().value) - (convertirEnInt(ma.getEntrada().value)+450);
        }

        if (mi.getEntrada().value != "" && mi.getSalida().value != "") {
            aux += convertirEnInt(mi.getSalida().value) - (convertirEnInt(mi.getEntrada().value)+450);
        }

        if (j.getEntrada().value != "" && j.getSalida().value != "") {
            aux += convertirEnInt(j.getSalida().value) - (convertirEnInt(j.getEntrada().value)+450);
        }

        if (v.getEntrada().value != "" && v.getSalida().value != "") {
            aux += convertirEnInt(v.getSalida().value) - (convertirEnInt(v.getEntrada().value)+450);
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

    trabajarDiferencia (diferencia, trabajado) {
        if (diferencia < 0) {
            document.getElementById("TotalContainer").className = "row mt-5 pt-2 pb-0 bg-danger text-white mx-0";
            this.setDifTextoTotal("Faltó");
            this.setDiferenciaTotal(convertirEnHora(Math.abs(diferencia)));
            this.setHsTrabTotal(convertirEnHora(trabajado));
        } else if (diferencia > 0) {
            document.getElementById("TotalContainer").className = "row mt-5 pt-2 pb-0 bg-success text-white mx-0";
            this.setDifTextoTotal("Sobró");
            this.setDiferenciaTotal(convertirEnHora(diferencia));
            this.setHsTrabTotal(convertirEnHora(trabajado));
        } else {
            document.getElementById("TotalContainer").className = "row mt-5 pt-2 pb-0 bg-dark text-white mx-0";
            this.setDifTextoTotal("");
            this.setDiferenciaTotal("");
            if (trabajado == 0) this.setHsTrabTotal("");
            else this.setHsTrabTotal(convertirEnHora(trabajado));
        }
    }

    setearTotal(l, ma, mi, j, v) {

        let diferenciaTotal = this.#devolerDiferenciaTotal(l, ma, mi, j, v);
        let totalTrabajado = this.#devolerHsTrabajadas(l, ma, mi, j, v);

        this.trabajarDiferencia(diferenciaTotal, totalTrabajado)
    }

    borrarDatos() {
        this.setDifTextoTotal("");
        this.setDiferenciaTotal("");
        this.setHsTrabTotal("");
    }

    guardar() {
        let aux = {};
        aux["hsTrab"] = this.#hsTrab.value;
        aux["diferencia"] = this.#diferencia.value;
        aux["difTexto"] = this.#difTexto.value;
    
        localStorage.setItem("Total", JSON.stringify(aux));
    }

    cargar() {
        if (localStorage["Total"]) {
            let aux = JSON.parse(localStorage.getItem("Total"));
            this.#hsTrab.value = aux["hsTrab"];
            this.#diferencia.value = aux["diferencia"];
            this.#difTexto.value = aux["difTexto"];

            this.trabajarDiferencia(convertirEnInt(this.#diferencia.value), convertirEnInt(this.#hsTrab.value));
        }
    }
}


/********** FUNCIONES **********/

// Dado un número convierte y devuelve un string de formato "hh:mm"
function convertirEnHora (x) {
    return parseInt(x/60).toLocaleString('es-ES', {minimumIntegerDigits: 2}) + ":" + parseInt((60 * (x/60 - parseInt(x/60))).toFixed(2)).toLocaleString('es-ES', {minimumIntegerDigits: 2});
}

// Dado un String de formato "hh:mm" devuelve un entero
function convertirEnInt (hora) {
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

// Modifica el valor del campo "Debería Salir" del día (objeto) pasado por parámetro.
function setearDeberiaSalir(obj) {
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

// Función recursiva que va sumando el excedente por día hasta llegar a Lunes o alguno de los días tenga en "true" contarElTotal
function diferenciasAnteriores(dia) {
    switch (dia) {
        case "Viernes":
            if(jueves.getTenerEnCuenta().value == "true") return jueves.getIntDiferencia();
            else return jueves.getIntDiferencia() + diferenciasAnteriores("Jueves");
        case "Jueves":
            if(miercoles.getTenerEnCuenta().value == "true") return miercoles.getIntDiferencia();
            else return miercoles.getIntDiferencia() + diferenciasAnteriores("Miercoles");
        case "Miercoles":
            if(martes.getTenerEnCuenta().value == "true") return martes.getIntDiferencia();
            else return martes.getIntDiferencia() + diferenciasAnteriores("Martes");
        case "Martes":
            return lunes.getIntDiferencia();
        default:
            return 0;
    }
}

// Función para sumar/restar la diferencia total al debería del día pasado por parámetro.
function tenerEnCuentaElTotal (obj, total) {
    if (obj.getDia() != "Lunes" && obj.getEntrada().value != "") {
        let auxDeb = convertirEnInt(obj.getDeberiaSalir().value);
        let auxDif = diferenciasAnteriores(obj.getDia());
        if(obj.getTenerEnCuenta().value == "true" && (auxDeb - auxDif) < 930)
            auxDeb = 930;
        // if (total.getDifTextoTotal().value == "Sobró") {
        //     auxDif = convertirEnInt (total.getDiferenciaTotal().value);
        // } else if (total.getDifTextoTotal().value == "Faltó") {
        //     auxDif = - convertirEnInt (total.getDiferenciaTotal().value);
        // }

        let dif = auxDeb - auxDif;
        if (dif < 930) {
            obj.setDeberiaSalir(convertirEnHora(930));
            auxDif += (auxDeb - (convertirEnInt(obj.getEntrada().value)+450));
            total.trabajarDiferencia(auxDif, convertirEnInt(total.getHsTrabTotal().value));
        // } else if (dif == 0) {
        } else {
            obj.setDeberiaSalir(convertirEnHora(dif));
            total.trabajarDiferencia(0, convertirEnInt(total.getHsTrabTotal().value));
        // } else {
        //     obj.setDeberiaSalir(convertirEnHora(dif));
        //     auxDif -= (auxDeb - 930);
        //     total.trabajarDiferencia(auxDif, convertirEnInt(total.getHsTrabTotal().value));
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

function limpiarObj(obj) {
    obj.setSalida("");
    obj.setHsTrab("");
    obj.setDiferencia("");
    obj.setDifTexto("");
}

function eventosDia (obj, total) {
    obj.getLicencia().addEventListener("change", () => {
        if (obj.getLicencia().value == "true") {
            obj.borrarDatos();
            obj.setLicencia("true");
            obj.getEntrada().setAttribute("disabled", "");
            obj.getTenerEnCuenta().setAttribute("disabled", "");
            obj.getSalida().setAttribute("disabled", "");
        } else {
            obj.getEntrada().removeAttribute("disabled");
            obj.getTenerEnCuenta().removeAttribute("disabled");
            obj.getSalida().removeAttribute("disabled");
        }
        total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        obj.guardar()
        total.guardar();
    });

    obj.getEntrada().addEventListener("change", () => {
        // if (convertirEnInt(obj.getEntrada().value) < 450) {
        //     obj.setEntrada("07:30")
        // }
        setearDeberiaSalir(obj);
        if (obj.getTenerEnCuenta().value == "true") {
            limpiarObj(obj);
            tenerEnCuentaElTotal(obj, total);
        } else {
            obj.calcularDiferencia();
            total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        }
        obj.guardar()
        total.guardar();
    });

    obj.getTenerEnCuenta().addEventListener("change", () => {
        if (obj.getTenerEnCuenta().value == "true") {
            limpiarObj(obj);
            tenerEnCuentaElTotal(obj, total);
            if (total.getDifTextoTotal().value == "Sobró")
                total.trabajarDiferencia(convertirEnInt(total.getDiferenciaTotal().value), convertirEnInt(total.getHsTrabTotal().value));
            else if (total.getDifTextoTotal().value == "Faltó")
                total.trabajarDiferencia(-convertirEnInt(total.getDiferenciaTotal().value), convertirEnInt(total.getHsTrabTotal().value));
            else
                total.trabajarDiferencia(0, convertirEnInt(total.getHsTrabTotal().value));
        } else {
            setearDeberiaSalir(obj);
            obj.calcularDiferencia();
            total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        }
        obj.guardar()
        total.guardar();
    });

    obj.getSalida().addEventListener("change", () => {
        if (obj.getSalida().value == "") {
            limpiarObj(obj);
        }
        obj.calcularDiferencia();
        if (obj.getTenerEnCuenta().value != "true" || obj.getSalida().value != "")
            total.setearTotal(lunes,martes,miercoles,jueves,viernes);
        obj.guardar()
        total.guardar();
    });
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

lunes.cargar();
martes.cargar();
miercoles.cargar();
jueves.cargar();
viernes.cargar();
total.cargar();

/********** EVENTOS **********/

btnReinicio.addEventListener("click", () => {
    reiniciar();
});


eventosDia(lunes, total);
eventosDia(martes, total);
eventosDia(miercoles, total);
eventosDia(jueves, total);
eventosDia(viernes, total);