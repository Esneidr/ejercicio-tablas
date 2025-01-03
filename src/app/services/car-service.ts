import { car } from "../interfaces/car";
import { dataPerson } from "./person-service";

export class dataCars {
  private static readonly base_price = 24000000
  private static readonly base_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private static readonly base_numbers = '0123456789'

  private static readonly makes = [
    'Ford', 'Mazda', 'Toyota', 'Kia', 'Renault', 'Chevrolet'
  ];

  private static readonly color = [
    'Negro', 'Gris', 'Blanco', 'Rojo', 'Azul', 'Verde'
  ];

  public static getPlaca(): string {
    // Generar tres letras aleatorias
    let randomLetters = '';
    for (let i = 0; i < 3; i++) {
      randomLetters += dataCars.base_letters.charAt(Math.floor(Math.random() * dataCars.base_letters.length));
    }

    // Generar tres números aleatorios
    let randomNumbers = '';
    for (let i = 0; i < 3; i++) {
      randomNumbers += dataCars.base_numbers.charAt(Math.floor(Math.random() * dataCars.base_numbers.length));
    }
    return randomLetters + randomNumbers;
  }

  // Metodo para obtener datos aleatorios
  public static getData(amount: number): car[] {
    const cars: car[] = [];

    for (let i = 1; i <= amount; i++) {
      const movil: car = {
        plate: dataCars.getPlaca(),
        make: dataCars.makes[dataPerson.getRamdonNumber(0, dataCars.makes.length - 1)],
        age: dataPerson.getRamdonNumber(2019, 2025),
        color: dataCars.color[dataPerson.getRamdonNumber(0, dataCars.color.length - 1)],
        price: dataCars.base_price + dataPerson.getRamdonNumber(0, 10000000)
      };
      cars.push(movil);
    }
    return cars;
  }
}
