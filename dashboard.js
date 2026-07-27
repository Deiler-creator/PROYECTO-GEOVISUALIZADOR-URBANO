/* ==========================================================
   DASHBOARD - GEOVISUALIZADOR
   ========================================================== */


/* ==========================================================
   DATOS
   ========================================================== */

const dashboard = {

    general:{

        nombre:"Área de estudio",

        area:"134.87 ha",

        poblacion:15025,

        manzanas:130,

        densidad:(15025/134.87).toFixed(1)

    },


    usoSuelo:{

        labels:[

            "Residencial",

            "Comercial",

            "Equipamientos",

            "Áreas verdes",

            "Suelo vacante"

        ],

        valores:[

            53.9,

            1.3,

            8.2,

            34.7,

            2.0

        ],

        colores:[

            "#F4D03F",

            "#E74C3C",

            "#3498DB",

            "#27AE60",

            "#D5D8DC"

        ]

    },


    educacion:{

        radio:"300 m",

        cobertura:46.15,

        manzanas:60

    },


    salud:{

        radio:"600 m",

        cobertura:32.31,

        manzanas:42

    },


    areasVerdes:{

        area:"1573.39 m²",

        indice:"0.12",

        deficit:"115420 m² (11.5 ha)"

    },


    riesgo:{

        manzanas:10,

        area:"57277.01 m²",

        poblacion:334

    }

};



/* ==========================================================
   CARGAR INDICADORES
   ========================================================== */

function cargarIndicadores(){

    document.getElementById("txtArea").innerHTML =
        dashboard.general.area;

    document.getElementById("txtPoblacion").innerHTML =
        dashboard.general.poblacion.toLocaleString("es-ES");

    document.getElementById("txtManzanas").innerHTML =
        dashboard.general.manzanas;

    document.getElementById("txtDensidad").innerHTML =
        dashboard.general.densidad + " hab/ha";


    document.getElementById("eduRadio").innerHTML =
        dashboard.educacion.radio;

    document.getElementById("eduCobertura").innerHTML =
        dashboard.educacion.cobertura + "%";

    document.getElementById("eduManzanas").innerHTML =
        dashboard.educacion.manzanas;


    document.getElementById("salRadio").innerHTML =
        dashboard.salud.radio;

    document.getElementById("salCobertura").innerHTML =
        dashboard.salud.cobertura + "%";

    document.getElementById("salManzanas").innerHTML =
        dashboard.salud.manzanas;


    document.getElementById("greenArea").innerHTML =
        dashboard.areasVerdes.area;

    document.getElementById("greenValue").innerHTML =
        dashboard.areasVerdes.indice;

    document.getElementById("greenDeficit").innerHTML =
        dashboard.areasVerdes.deficit;


    document.getElementById("riskM").innerHTML =
        dashboard.riesgo.manzanas;

    document.getElementById("riskA").innerHTML =
        dashboard.riesgo.area;

    document.getElementById("riskH").innerHTML =
        dashboard.riesgo.poblacion;

}
/* ==========================================================
   GRÁFICO DE USO DEL SUELO
========================================================== */

let graficoUsoSuelo;

function crearGrafico() {

    const canvas = document.getElementById("usoSueloChart");

    if (!canvas) return;

    if (typeof Chart === "undefined") {
        console.error("Chart.js no está cargado.");
        return;
    }

    if (graficoUsoSuelo) {
        graficoUsoSuelo.destroy();
    }

    graficoUsoSuelo = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: dashboard.usoSuelo.labels,

            datasets: [{

                data: dashboard.usoSuelo.valores,

                backgroundColor: dashboard.usoSuelo.colores,

                borderColor: "#ffffff",

                borderWidth: 3,

                hoverOffset: 12

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "58%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        usePointStyle: true,

                        pointStyle: "circle",

                        padding: 15,

                        font: {

                            size: 12

                        }

                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context){

                            return context.label + ": " + context.raw + "%";

                        }

                    }

                }

            }

        }

    });

}


/* ==========================================================
   BARRAS DE COBERTURA
========================================================== */

function animarBarras(){

    const edu=document.querySelector(".educacion");

    if(edu){

        edu.style.width=dashboard.educacion.cobertura+"%";

        edu.innerHTML=dashboard.educacion.cobertura+" %";

    }

    const salud=document.querySelector(".salud");

    if(salud){

        salud.style.width=dashboard.salud.cobertura+"%";

        salud.innerHTML=dashboard.salud.cobertura+" %";

    }

}


/* ==========================================================
   ABRIR / CERRAR PANEL
========================================================== */

function toggleDashboard(){

    const panel=document.getElementById("dashboard");

    if(panel.style.right==="-430px" || panel.style.right===""){

        panel.style.right="10px";

    }

    else{

        panel.style.right="-430px";

    }

}


/* ==========================================================
   INICIAR
========================================================== */

function iniciarDashboard(){

    cargarIndicadores();

    crearGrafico();

    animarBarras();

}


document.addEventListener("DOMContentLoaded",function(){

    iniciarDashboard();

});
