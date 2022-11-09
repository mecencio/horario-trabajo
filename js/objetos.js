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

    // Modifica el valor del campo "Debería Salir" del día.
    setearDeberiaSalir() {
        let aux = convertirEnInt(this.#entrada.value) + 450;
        if (aux < 930) {
            aux = 930;
        }
        if (!isNaN(aux)) {
            this.#deberiaSalir.value = convertirEnHora(aux);
        } else {
            this.#deberiaSalir.value = "";
        }
    }

    // "borra" los datos de todos los campos
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

    // "borra" los datos en la Salida, Hs trabajadas, la diferencia y si falto/sobro
    limpiar() {
        this.#salida.value = "";
        this.#hsTrab.value = "";
        this.#diferencia.value = "";
        this.#difTexto.value = "";
    }

    #setearColores(deberia, salida){
        if (deberia > salida) {
            this.#diferencia.className = "fw-bold text-danger"
            this.#difTexto.className = "w-75 text-center fw-bold text-danger"
        } else if (deberia < salida) {
            this.#diferencia.className = "fw-bold text-success"
            this.#difTexto.className = "w-75 text-center fw-bold text-success"
        } else {
            this.#diferencia.className = ""
            this.#difTexto.className = "w-75 text-center fw-bold"
        }
    }

    #setearErrores(){
        if (convertirEnInt(this.#entrada.value) < 450) {
            let errorEntrada = document.getElementById(`errorEntrada${this.#dia}`);
            let error = document.createElement("p");
            error.className = "my-1";
            error.innerText = " * La entrada debe ser a partir de las 07:30";
            errorEntrada.appendChild(error);
        }
        if (convertirEnInt(this.#salida.value) < 930) {
            let errorSalida = document.getElementById(`errorSalida${this.#dia}`);
            let error2 = document.createElement("p");
            error2.className = "my-1";
            error2.innerText = " * La salida debe ser a partir de las 15:30";
            errorSalida.appendChild(error2);
        }
    }

    calcularDiferencia() {
        if (this.#deberiaSalir.value != "" && this.#salida.value != "") {

            let entrada = convertirEnInt(this.#entrada.value);
            let deberia = entrada+450;
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
                this.#setearColores(deberia, salida);
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
            let deberia = convertirEnInt(this.#entrada.value)+450;
            let salida = convertirEnInt(this.#salida.value);
            this.#setearColores(deberia, salida);
            this.#setearErrores();
        }
    }
}

/* CLASE TOTALIZADOR */

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
        if (l.getEntrada().value != "" && l.getSalida().value != "") {
            aux += convertirEnInt(l.getSalida().value) - (convertirEnInt(l.getEntrada().value)+450);;
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
            let diferencia = 0;
            if (this.#difTexto.value=="Faltó") {
                diferencia = -convertirEnInt(this.#diferencia.value)
            } else if (this.#difTexto.value=="Sobró") {
                diferencia = convertirEnInt(this.#diferencia.value)
            }
            this.trabajarDiferencia(diferencia, convertirEnInt(this.#hsTrab.value));
        }
    }
}
