import { Injectable } from '@angular/core';
import { companyProject } from '../interfaces/companyProject';
import { dataPerson } from './person-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private static generatedFullName: string = '';
  private static generatedState: string = '';

  private static readonly nameWomen = [
    "María", "Ana", "Isabella", "Camila", "Sofía", "Lucía", "Valentina", "Gabriela", "Daniela", "Carolina",
    "Alejandra", "Mónica", "Patricia", "Andrea", "Fernanda", "Laura", "Claudia", "Susana", "Rosa", "Paula",
    "Julia", "Antonia", "Victoria", "Verónica", "Elena", "Diana", "Carmen", "Sandra", "Silvia", "Angela",
    "Lorena", "Cristina", "Mariana", "Natalia", "Adriana", "Alicia", "Luisa", "Inés", "Teresa", "Beatriz",
    "Marta", "Clara", "Pilar", "Vanessa", "Esther", "Florencia", "Amelia", "Irene", "Gloria", "Eva"
  ]

  private static readonly nameMen = [
    "Juan", "Carlos", "José", "Luis", "Pedro", "Miguel", "Daniel", "Alejandro", "David", "Fernando",
    "Javier", "Ricardo", "Eduardo", "Andrés", "Sergio", "Manuel", "Francisco", "Roberto", "Diego", "Adrián",
    "Antonio", "Martín", "Cristian", "Felipe", "Héctor", "Gabriel", "Alberto", "Ángel", "Lucas", "Simón",
    "Enrique", "Raúl", "Mario", "Gonzalo", "Rafael", "Sebastián", "Esteban", "Emilio", "Víctor", "Jorge",
    "Marcos", "Hugo", "Tomás", "Matías", "Agustín", "Pablo", "Iván", "Ignacio", "Nicolás", "Oscar"
  ]

  private static readonly lastname = [
    "García", "Martínez", "López", "Hernández", "González", "Pérez", "Rodríguez", "Sánchez", "Ramírez", "Torres",
    "Flores", "Rivera", "Gómez", "Vásquez", "Morales", "Jiménez", "Rojas", "Ortiz", "Díaz", "Ruiz",
    "Álvarez", "Castro", "Romero", "Mendoza", "Silva", "Guerrero", "Núñez", "Cruz", "Reyes", "Chávez",
    "Ramos", "Medina", "Vega", "Carrillo", "Castillo", "Soto", "Delgado", "Fuentes", "Mejía", "Campos",
    "Aguilar", "Navarro", "Domínguez", "Correa", "Valencia", "Acosta", "Bautista", "Cabrera", "Maldonado", "Salazar"
  ]

  private static readonly departments = [
    "Recursos Humanos", "Finanzas y Contabilidad", "Marketing", "Ventas", "Tecnologías de la Información (TIC)",
    "Producción", "Logística y Operaciones", "Atención al Cliente", "Investigación y Desarrollo (I+D)", "Legal y Compliance",
    "Compras", "Comunicación Corporativa", "Administración", "Seguridad y Salud Ocupacional", "Sostenibilidad y Responsabilidad Social"
  ]

  private static readonly positions = [
    "Gerente", "Director", "Analista", "Reclutador", "Diseñador", "Community Manager", "Ejecutivo",
    "Coordinador", "Auxiliar", "Contador", "Auditor", "Desarrollador", "Administrador", "Supervisor",
    "Operario", "Logístico", "Abogado", "Asesor", "Consultor", "Call Center", "Gestor"
  ]

  private static readonly studys = [
    "Especialista", "Ingeniero", "Técnologo", "Técnico", "Bachiller"
  ]

  private static readonly states = [
    "Activo", "Vacaciones", "Licencia", "Renuncia", "Despedido",
  ]

  private static readonly reason = [
    "Nuevo trabajo", "Cambio de vivienda", "Bajo rendimiento"
  ]

  private static readonly traineds = [
    "Si", "No"
  ]

  private static readonly areas = [
    "Administración", "Servicios", "Financiera"
  ]

  public static getFullName(): string {
    const nameEmployees = [...this.nameWomen, ...this.nameMen ];
    const lastnameEmployess = CompanyService.lastname[dataPerson.getRamdonNumber(0, CompanyService.lastname.length - 1)];
    const randomNames = Math.floor(Math.random() * nameEmployees.length);

    this.generatedFullName = nameEmployees[randomNames] + ' ' + lastnameEmployess;
    return this.generatedFullName;
  }

  public static getGender(): string {
    const name = this.generatedFullName.split(' ')[0];

    if (this.nameWomen.includes(name)) {
      return 'Femenino';
    } else if (this.nameMen.includes(name)) {
      return 'Masculino';
    } else {
      return 'LGTB'
    }
  }

  public static getState(): string {
    const statesRandom = CompanyService.states[dataPerson.getRamdonNumber(0, CompanyService.states.length - 1)];
    this.generatedState = statesRandom;

    return this.generatedState;
  }

  public static getReason(): string {
    const state = this.generatedState;

    if (state === "Renuncia" ) {
      const reason = CompanyService.reason[dataPerson.getRamdonNumber(0, CompanyService.reason.length - 1)];
      return reason;
    } else {
      return '';
    }
  }

  public getData(number: number): companyProject[] {
    const companys: companyProject[] = []

    for (let i= 1; i <= number; i++ ) {
      const model: companyProject = {
        employee: CompanyService.getFullName(),
        gender: CompanyService.getGender(),
        department: CompanyService.departments[dataPerson.getRamdonNumber(0, CompanyService.departments.length - 1)],
        position: CompanyService.positions[dataPerson.getRamdonNumber(0, CompanyService.positions.length - 1)],
        study: CompanyService.studys[dataPerson.getRamdonNumber(0, CompanyService.studys.length - 1)],
        age: dataPerson.getRamdonNumber(20, 60),
        state: CompanyService.getState(),
        reason: CompanyService.getReason(),
        trained: CompanyService.traineds[dataPerson.getRamdonNumber(0, CompanyService.traineds.length -1)],
        city: dataPerson.citys[dataPerson.getRamdonNumber(0, dataPerson.citys.length -1)],
        area: CompanyService.areas[dataPerson.getRamdonNumber(0, CompanyService.areas.length -1)],
      };
      companys.push(model)
    }
    return companys;
  }


}
