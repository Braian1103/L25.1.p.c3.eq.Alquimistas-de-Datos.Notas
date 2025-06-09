import vistas from "../data/vistas.js";
import rolesFichas from "../data/rolesFichas.js";
import evaluacionNueva from "../data/evaluacionNueva.js";

export default class Cl_vEvaluacion {
  constructor() {
    this.controlador = null;
    this.vista = document.getElementById("evaluacionForm");
    this.vista.hidden = true;

    this.lblRol = document.getElementById("evaluacionForm_lblRol");

    this.inCodigo = document.getElementById("evaluacionForm_inCodigo");
    this.inValor = document.getElementById("evaluacionForm_inValor");
    this.inNombre = document.getElementById("evaluacionForm_inNombre");

    this.btAceptar = document.getElementById("evaluacionForm_btAceptar");
    this.btAceptar.onclick = () => {
      if (confirm(`Seguro que desea ${this.rol} la evaluacion?`)) {
        let result = this.controlador.procesarEvaluacion({
          rol: this.rol,
          codigo: this.codigo,
        });
        if (result === true)
          this.controlador.activarVista({ vista: vistas.evaluaciones });
        else alert(result);
      }
    };

    this.btCancelar = document.getElementById("evaluacionForm_btCancelar");
    this.btCancelar.onclick = () => {
      this.controlador.activarVista({ vista: vistas.evaluaciones });
    };

    this.rol = rolesFichas.agregar;
  }
  set rol(rol) {
    this._rol = rol;
    this.lblRol.innerHTML = rol.toUpperCase();
    this.inCodigo.disabled = rol !== rolesFichas.agregar;
    this.inValor.disabled = rol === rolesFichas.eliminar;
    this.inNombre.disabled = rol === rolesFichas.eliminar;
  }
  get rol() {
    return this._rol;
  }
  get codigo() {
    return this.inCodigo.value.toUpperCase();
  }
  get nombre() {
    return this.inNombre.value.toUpperCase();
  }
  get valor() {
    return this.inValor.value;
  }
  iniciar(controlador) {
    this.controlador = controlador;
  }
  dataEvaluacion() {
    return {
      codigo: this.codigo,
      nombre: this.nombre,
      valor: this.valor,
    };
  }
  activarVista({ vista, rol, evaluacion = evaluacionNueva }) {
    this.vista.hidden = vista !== vistas.evaluacion;
    if (vista === vistas.evaluacion) {
      this.rol = rol;
      this.inCodigo.value = evaluacion.codigo;
      this.inNombre.value = evaluacion.nombre;
      this.inValor.value = evaluacion.valor;
    }
  }
}
