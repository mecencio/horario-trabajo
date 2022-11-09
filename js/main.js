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
