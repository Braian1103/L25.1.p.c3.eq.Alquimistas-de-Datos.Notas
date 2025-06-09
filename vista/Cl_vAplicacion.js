import Cl_vEstudiante from "./Cl_vEstudiante.js";
import Cl_vEvaluacion from "./Cl_vEvaluacion.js";
import Cl_vExamen from "./Cl_vExamen.js";
import Cl_vEstudiantes from "./Cl_vEstudiantes.js";
import Cl_vEvaluaciones from "./Cl_vEvaluaciones.js";
import vistas from "../data/vistas.js";
import rolesFichas from "../data/rolesFichas.js";
export default class Cl_vAplicacion {
  constructor() {
    this.controlador = null;
    this.vista = document.getElementById("appForm");

    this.vEstudiante = new Cl_vEstudiante();
    this.vEstudiantes = new Cl_vEstudiantes();

    this.vEvaluacion = new Cl_vEvaluacion();
    this.vEvaluaciones = new Cl_vEvaluaciones();

    this.vExamen = new Cl_vExamen();

    this.lblLapso = document.getElementById("appForm_lblLapso");

    this.btCambiarLapso = document.getElementById("appForm_btCambiarLapso");
    this.btCambiarLapso.onclick = () => this.controlador.cambiarLapso();

    this.btEstudiantes = document.getElementById("appForm_btEstudiantes");
    this.btEstudiantes.onclick = () =>
      this.controlador.activarVista({ vista: vistas.estudiantes });

    this.btEvaluaciones = document.getElementById("appForm_btEvaluaciones");
    this.btEvaluaciones.onclick = () =>
      this.controlador.activarVista({ vista: vistas.evaluaciones });

    this.btRegistrarExamen = document.getElementById(
      "appForm_btRegistrarExamen"
    );
    this.btRegistrarExamen.onclick = () =>
      this.controlador.activarVista({
        vista: vistas.examen,
        rol: rolesFichas.agregar,
      });

    this.tabla = document.getElementById("appForm_tabla");

    this.reportesVarios();
  }
  set controlador(controlador) {
    this._controlador = controlador;
    if (controlador) {
      this.vEstudiante.iniciar(controlador);
      this.vEstudiantes.iniciar(controlador);
      this.vEvaluacion.iniciar(controlador);
      this.vEvaluaciones.iniciar(controlador);
      this.vExamen.iniciar(controlador);
    }
  }
  get controlador() {
    return this._controlador;
  }
  activarVista({ vista }) {
    this.vista.hidden = vista !== vistas.app;
    if (vista === vistas.app) {
      this.reportarNotas({
        info: this.controlador.mSemestre.notas.listado(
          this.controlador.mSemestre.estudiantes.listado()
        ),
      });
      this.lblLapso.innerHTML = this.controlador.mSemestre.nombre;
    }
  }
  reportarNotas({ info }) {
    this.tabla.innerHTML = "";
    info.map((Examen) => {
      this.tabla.innerHTML += `<tr>
      <td>${Examen.cedula}</td>
      <td>${Examen.nombre}</td>
      <td>${Examen.cntExamenes}</td>
      <td><button id="appForm_tabla_ver${Examen.cedula}">Ver</button></td>
    </tr>`;
    });
  }
  reportesVarios() {
    this.btEstudiantesCedulaEntre = document.getElementById(
      "appForm_btEstudiantesCedulaEntre"
    );
    this.btEstudiantesCedulaEntre.onclick = () => {
      let cedulaMin = +prompt("Indique la cedula minima: "),
        cedulaMax = +prompt("Indique la cedula maxima: "),
        reporte = `Los estudiantes con cedula entre ${cedulaMin} y ${cedulaMax} son: \n`;
      this.controlador.mSemestre.estudiantes
        .cedulaEntre({ cedulaMin, cedulaMax })
        .forEach((element) => {
          reporte += `${element.apellidos} ${element.nombres}\n`;
        });
      alert(reporte);
    };
    this.btEvaluacionesConValor = document.getElementById(
      "appForm_btEvaluacionesConValor"
    );
    this.btEvaluacionesConValor.onclick = () => {
      let valor = +prompt("Indique el valor: "),
        reporte = `Las evaluaciones con valor ${valor} son: \n`;
      this.controlador.mSemestre.evaluaciones
        .conValor(valor)
        .forEach((evaluacion) => {
          reporte += `${evaluacion.codigo}: ${evaluacion.nombre}\n`;
        });
      alert(reporte);
    };
    this.btEvaluacionesDeCedula = document.getElementById(
      "appForm_btEvaluacionesDeCedula"
    );
    this.btEvaluacionesDeCedula.onclick = () => {
      let cedula = +prompt("Indique la cedula: "),
        reporte = `Las evaluaciones de la cedula ${cedula} son: \n`;
      this.controlador.mSemestre.notas
        .evaluacionesDe({
          evaluaciones: this.controlador.mSemestre.evaluaciones.listado(),
          cedula,
        })
        .forEach((evaluacion) => {
          reporte += `${evaluacion.codigo}: ${evaluacion.nombre} (${evaluacion.valor})\n`;
        });
      alert(reporte);
    };
    this.btEstudiantesCantidadCedulaEntre = document.getElementById(
      "appForm_btEstudiantesCantidadCedulaEntre"
    );
    this.btEstudiantesCantidadCedulaEntre.onclick = () => {
      let cedulaMin = +prompt("Indique la cedula minima: "),
        cedulaMax = +prompt("Indique la cedula maxima: "),
        reporte = `La cantidad de estudiantes con cedula entre ${cedulaMin} y ${cedulaMax} es: \n
        ${this.controlador.mSemestre.estudiantes.cantidadConCedulaEntre({
          cedulaMin,
          cedulaMax,
        })}`;
      alert(reporte);
    };
    this.btEvaluacionesCantidad = document.getElementById(
      "appForm_btEvaluacionesCantidad"
    );
    this.btEvaluacionesCantidad.onclick = () => {
      let valor = +prompt("Indique el valor: "),
        reporte = `La cantidad de evaluaciones con valor ${valor} es: \n
      ${this.controlador.mSemestre.evaluaciones.conValor(valor)}`;
      alert(reporte);
    };
  }
}
