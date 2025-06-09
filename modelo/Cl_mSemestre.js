import Cl_mEstudiantes from "./Cl_mEstudiantes.js";
import Cl_mEvaluaciones from "./Cl_mEvaluaciones.js";
import Cl_mNotas from "./Cl_mNotas.js";

export default class Cl_mSemestre{
    constructor({nombre}){
        this.nombre = nombre;
        this.evaluaciones = new Cl_mEvaluaciones();
        this.estudiantes = new Cl_mEstudiantes();
        this.notas = new Cl_mNotas();
    }  
    set nombre(nombre){
        this._nombre = nombre;
    }
    get nombre(){
        return this._nombre;
    }
     agregarEstudiante(estudiante){
        return this.estudiantes.agregar(estudiante);
       
    }
    modificarEstudiante(estudiante){
        return this.estudiantes.modificar(estudiante);
    }
    eliminarEstudiante(cedula){
        return this.estudiantes.eliminar(cedula);
    }
    agregarEvaluacion(evaluacion){
        return this.evaluaciones.agregar(evaluacion);
    }
    modificarEvaluacion(evaluacion){
        return this.evaluaciones.modificar(evaluacion);
    }
    registrarExamen(examen){
        return this.notas.registrarExamen(examen);
    }
    cantidadConCedulaEntre({cedulaMin, cedulaMax}){
        return this.estudiantes.cantidadConCedulaEntre({cedulaMin, cedulaMax});
    }
    conValor(valor){
        return this.evaluaciones.conValor(valor);
    }
}