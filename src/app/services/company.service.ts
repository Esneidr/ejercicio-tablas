import { Injectable } from '@angular/core';
import { companyProject } from '../interfaces/companyProject';
import { dataPerson } from './person-service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private generatedFullName: string = '';
  private generatedState: string = '';
  private ageEmployee: number = 18;

  private readonly nameWomen = [
    'María',
    'Ana',
    'Isabella',
    'Camila',
    'Sofía',
    'Lucía',
    'Valentina',
    'Gabriela',
    'Daniela',
    'Carolina',
    'Alejandra',
    'Mónica',
    'Patricia',
    'Andrea',
    'Fernanda',
    'Laura',
    'Claudia',
    'Susana',
    'Rosa',
    'Paula',
    'Julia',
    'Antonia',
    'Victoria',
    'Verónica',
    'Elena',
    'Diana',
    'Carmen',
    'Sandra',
    'Silvia',
    'Angela',
    'Lorena',
    'Cristina',
    'Mariana',
    'Natalia',
    'Adriana',
    'Alicia',
    'Luisa',
    'Inés',
    'Teresa',
    'Beatriz',
    'Marta',
    'Clara',
    'Pilar',
    'Vanessa',
    'Esther',
    'Florencia',
    'Amelia',
    'Irene',
    'Gloria',
    'Eva',
  ];

  private readonly nameMen = [
    'Juan',
    'Carlos',
    'José',
    'Luis',
    'Pedro',
    'Miguel',
    'Daniel',
    'Alejandro',
    'David',
    'Fernando',
    'Javier',
    'Ricardo',
    'Eduardo',
    'Andrés',
    'Sergio',
    'Manuel',
    'Francisco',
    'Roberto',
    'Diego',
    'Adrián',
    'Antonio',
    'Martín',
    'Cristian',
    'Felipe',
    'Héctor',
    'Gabriel',
    'Alberto',
    'Ángel',
    'Lucas',
    'Simón',
    'Enrique',
    'Raúl',
    'Mario',
    'Gonzalo',
    'Rafael',
    'Sebastián',
    'Esteban',
    'Emilio',
    'Víctor',
    'Jorge',
    'Marcos',
    'Hugo',
    'Tomás',
    'Matías',
    'Agustín',
    'Pablo',
    'Iván',
    'Ignacio',
    'Nicolás',
    'Oscar',
  ];

  private readonly lastname = [
    'García',
    'Martínez',
    'López',
    'Hernández',
    'González',
    'Pérez',
    'Rodríguez',
    'Sánchez',
    'Ramírez',
    'Torres',
    'Flores',
    'Rivera',
    'Gómez',
    'Vásquez',
    'Morales',
    'Jiménez',
    'Rojas',
    'Ortiz',
    'Díaz',
    'Ruiz',
    'Álvarez',
    'Castro',
    'Romero',
    'Mendoza',
    'Silva',
    'Guerrero',
    'Núñez',
    'Cruz',
    'Reyes',
    'Chávez',
    'Ramos',
    'Medina',
    'Vega',
    'Carrillo',
    'Castillo',
    'Soto',
    'Delgado',
    'Fuentes',
    'Mejía',
    'Campos',
    'Aguilar',
    'Navarro',
    'Domínguez',
    'Correa',
    'Valencia',
    'Acosta',
    'Bautista',
    'Cabrera',
    'Maldonado',
    'Salazar',
  ];

  private readonly departments = [
    'Recursos Humanos',
    'Finanzas y Contabilidad',
    'Marketing',
    'Ventas',
    'TIC',
    'Producción',
    'Logística y Operaciones',
    'Atención al Cliente',
    'Investigación',
    'Legal',
    'Compras',
    'Comunicación Corporativa',
    'Administración',
    'Salud Ocupacional',
    'Sostenibilidad',
  ];

  private readonly states = [
    'Activo',
    'Vacaciones',
    'Licencia',
    'Renuncia',
    'Despedido',
  ];

  private readonly reason = [
    'Nuevo trabajo',
    'Cambio de vivienda',
    'Bajo rendimiento',
  ];

  private readonly traineds = ['Si', 'No'];

  private readonly areas = ['Administración', 'Servicios', 'Financiera'];

  public getFullName(): string {
    const nameEmployees = [...this.nameWomen, ...this.nameMen];
    const lastnameEmployess = this.lastname[dataPerson.getRamdonNumber(0, this.lastname.length - 1)];
    const randomNames = Math.floor(Math.random() * nameEmployees.length);

    this.generatedFullName = nameEmployees[randomNames] + ' ' + lastnameEmployess;
    return this.generatedFullName;
  }

  public getGender(): string {
    const name = this.generatedFullName.split(' ')[0];

    if (this.nameWomen.includes(name)) {
      return 'Femenino';
    } else if (this.nameMen.includes(name)) {
      return 'Masculino';
    } else {
      return 'LGTB';
    }
  }

  public getState(): string {
    const statesRandom = this.states[dataPerson.getRamdonNumber(0, this.states.length - 1)];
    this.generatedState = statesRandom;

    return this.generatedState;
  }

  public getReason(): string {
    const state = this.generatedState;

    if (state === 'Renuncia') {
      const reason = this.reason[dataPerson.getRamdonNumber(0, this.reason.length - 1)];
      return reason;
    } else {
      return 'N/A';
    }
  }

  private generatedDataEmployee(): { age: number; study: string; position: string} {
    const age  = dataPerson.getRamdonNumber(18, 60);
    const study = this.getStudy(age);
    const position = this.getPosition(study);
    return { age, study, position}
  }

  public getData(number: number): companyProject[] {
    const companys: companyProject[] = [];

    for (let i = 1; i <= number; i++) {
      const { age, study, position } = this.generatedDataEmployee();
      const model: companyProject = {
        employee: this.getFullName(),
        gender: this.getGender(),
        department: this.departments[dataPerson.getRamdonNumber(0, this.departments.length - 1)],
        position: position,
        study: study,
        age: age,
        state: this.getState(),
        reason: this.getReason(),
        trained: this.traineds[dataPerson.getRamdonNumber(0, this.traineds.length - 1)],
        city: dataPerson.citys[dataPerson.getRamdonNumber(0, dataPerson.citys.length - 1)],
        area: this.areas[dataPerson.getRamdonNumber(0, this.areas.length - 1)],
      };
      companys.push(model);
    }
    return companys;
  }


  //#region Metodos publicos
  public getStudy(age: number): string {
    let study: string

    if (age <= 20) {
      study = 'Bachiller';
    } else if (age <= 23) {
      study = 'Técnico';
    } else if (age <= 26) {
      study = 'Técnologo';
    } else if (age <= 35) {
      study = 'Ingeniero';
    } else {
      study = 'Especialista';
    }
      return study;
  }

  public getPosition(study: string): string {

    // Separo por listas los traboajos según el nivel Educatico
    const positionsMap: { [key: string]: string[] } = {
      'Bachiller': ['Call Center', 'Operario', 'Seguridad'],
      'Técnico': ['Operario', 'Asesor', 'Consultor', 'Gestor', 'Logístico'],
      'Técnologo': ['Logístico', 'Desarrollador', 'Supervisor', 'Auxiliar', 'Contador', 'Diseñador', 'Community Manager'],
      'Ingeniero': ['Reclutador', 'Ejecutivo', 'Auditor', 'Administrador', 'Abogado'],
      'Especialista': ['Director', 'Analista', 'Coordinador'],
    };

    // Escoger el lista de trabajos según el estudio
    const possibleJobs = positionsMap[study];

    // Selecciona un trabajo aleatorio de la lista
    const randomIndex = dataPerson.getRamdonNumber(0, possibleJobs.length - 1);
    return possibleJobs[randomIndex];

  }
  //#endregion
}
