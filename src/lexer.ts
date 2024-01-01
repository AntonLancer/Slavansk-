import Token from "./token";
import token from "./token";
import { tokenTypesList } from "./tokenType";

export default class Lexer{
    code: string;               // Сам код, который мы передаем
    pos: number = 0;            // Позиция, на которой находится лексер
    tokenList: token[] = [];    // Список токенов, добавляются в него

    constructor(code:string){
        this.code = code;
    }
    
    // Функция лексического анализа
    lexAnalysis(): token[] {
        while (this.nextToken())
        this.tokenList = this.tokenList.filter(token => token.type.name !== tokenTypesList.SPACE.name); // Возвращает список токенов без пробела
        return this.tokenList
    }   

    // Функция перебора токенов
    nextToken(): boolean {
        if(this.pos >= this.code.length){
            return false;
        }
        const tokenTypeValues = Object.values(tokenTypesList) // Получаем все значения из списка типов токенов
        for (let i = 0; i < tokenTypeValues.length; i++) {
            const tokenType = tokenTypeValues[i];   // Элемент текущей итерации
            const regex = new RegExp('^'+tokenType.regex);
            const result = this.code.substr(this.pos).match(regex); // Сдвигаем код на прочитанный токен
            if (result && result[0]){ // Если в result что-то есть, то создаем токен
                const token = new Token(tokenType, result[0], this.pos);
                this.pos += result[0].length; // Увеличиваем позицию на длину токена
                this.tokenList.push(token); // Прочитанный токен добавляем в список токенов
                return true;
            }
        }
        throw new Error(`На позиции ${this.pos} обнаружена ошибка`) // Если пользователь неправильно написал программу
    }
}