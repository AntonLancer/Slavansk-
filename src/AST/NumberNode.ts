import Token from "../token";

// Класс для ноды чисел
export default class NumberNode{
    number: Token; // Тоен для числа

    constructor(number: Token){
        this.number = number;
    }
}