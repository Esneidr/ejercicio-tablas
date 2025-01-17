import { person } from "../interfaces/person";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class dataPerson {

  private static readonly base_identity = 1000000000; // base para general número de CC aleatorios
  private static readonly base_phone = 3000000000; // base para general número de telefono aleatorio
  private static readonly base_dateStart = new Date ('2024-01-01');
  private static readonly base_dateEnd = new Date ('2024-12-31')

  // Arreglos para obtener nombres, apellidos, cuidades y transporte
  private static readonly names = [
    "Alejandro", "Beatriz", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Hilda", "Ignacio", "Julia",
    "Kevin", "Laura", "Mario", "Natalia", "Oscar", "Patricia", "Quintín", "Rafael", "Sofía", "Tomás",
    "Ulises", "Valeria", "Wilson", "Ximena", "Yolanda", "Zacarías", "Andrea", "Bruno", "Cecilia", "Daniel",
    "Elena", "Fabián", "Gloria", "Hugo", "Isabel", "Javier", "Karen", "Leonardo", "Miguel", "Noelia",
    "Olivia", "Pedro", "Ramona", "Samuel", "Teresa", "Uriel", "Verónica", "Walter", "Xavier", "Yohana",
    "Zoila", "Arturo", "Bárbara", "Camilo", "Débora", "Esteban", "Florencia", "Guillermo", "Héctor", "Inés",
    "Joaquín", "Karla", "Lorenzo", "Matías", "Nora", "Orlando", "Paola", "Renato", "Sara", "Tobías",
    "Ulma", "Victoria", "Wendy", "Xenia", "Yair", "Zulema", "Alberto", "Blanca", "Cristian", "Domingo",
    "Emilia", "Fabio", "Gabriela", "Hernán", "Irma", "Jesús", "Katherine", "Luis", "Manuela", "Nicolás"
  ];

  private static readonly lastName = [
    "González", "Rodríguez", "López", "Pérez", "Gómez", "Martínez", "Sánchez", "Díaz", "Fernández", "Moreno",
    "Jiménez", "Ruiz", "Hernández", "Muñoz", "Álvarez", "Romero", "Ortiz", "Gutiérrez", "Chávez", "Ramos",
    "Torres", "Flores", "Castro", "Vargas", "Ramírez", "Acosta", "Vega", "Silva", "Mendoza", "Molina",
    "Reyes", "Herrera", "Aguilar", "Medina", "Cruz", "Morales", "Navarro", "Delgado", "Rojas", "Guerrero",
    "Ortega", "Núñez", "Soto", "Cortés", "Ibarra", "Peña", "Carrillo", "Valencia", "Cuevas", "Maldonado",
    "Arrieta", "Esquivel", "Lara", "Campos", "Figueroa", "Montoya", "Pacheco", "Santana", "Cabrera", "Villanueva",
    "Fuentes", "Salazar", "Benítez", "Rosales", "Escobar", "Cordero", "Bravo", "Paredes", "Domínguez", "Correa",
    "Ríos", "Gálvez", "Escalante", "Palacios", "Valdez", "Olivares", "Cardona", "Carrasco", "Mejía", "Solís",
    "Quintero", "Serrano", "Arellano", "Beltrán", "Galindo", "Saavedra", "Velasco", "Robles", "Quiroz", "Barrios",
    "Alvarado", "Bustamante", "Arévalo", "Venegas", "Zamora", "Villalobos", "Valle", "Barboza", "Padilla", "Tamayo"
  ];

  public static readonly citys = ["Medellín", "Envigado", "Itagui", "Caldas", "Estrella", "Sabaneta", "Bello",
    "Copacabana", "Girardota", "Barbosa"
  ];

  private static readonly transport = [
    "Metro", "Bus", "Bicicleta", "Carro", "Moto", "Taxi", "Monopatin", "A Pie"
  ];

  // Funcion para obtener un numero aleatorio
  public static getRamdonNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static getRamdonDate(min: Date, max: Date): Date {
    const minTime = min.getTime();
    const maxTime = max.getTime();
    const randomTime = Math.random() * (maxTime - minTime) + minTime;
    const randomDate = new Date(randomTime);
    return new Date(randomDate.getFullYear(), randomDate.getMonth(), randomDate.getDate());
  }

  // Metodo para obtener datos aleatorios
  public static getData(amount: number): person[] {
    const persons: person[] = [];

    for (let i = 1; i <= amount; i++) {
      const user: person = {
        identity: dataPerson.base_identity + dataPerson.getRamdonNumber(0, 120000000),
        userName: dataPerson.names[dataPerson.getRamdonNumber(0, dataPerson.names.length - 1)],
        lastName: dataPerson.lastName[dataPerson.getRamdonNumber(0, dataPerson.lastName.length - 1)],
        age: dataPerson.getRamdonNumber(18, 35),
        phone: dataPerson.base_phone + dataPerson.getRamdonNumber(0, 240000000),
        city: dataPerson.citys[dataPerson.getRamdonNumber(0, dataPerson.citys.length - 1)],
        transport: dataPerson.transport[dataPerson.getRamdonNumber(0, dataPerson.transport.length - 1)],
        dateStart: dataPerson.getRamdonDate(this.base_dateStart, this.base_dateEnd)
      };
      persons.push(user);
    }
    return persons;
  }
}
