// Здесь описаны типы токенов
export default class TokenType {
    name: string;   // Имя типа токена
    regex: string;  // Регулярка, по которой определяется токен

    constructor(name:string, regex:string) {
        this.name = name;
        this.regex = regex;
    }
}
// Описываются все типы токенов
export const tokenTypesList = {
 'NUMBER': new TokenType('NUMBER', '[0-9]*'),
 'VARIABLE': new TokenType('VARIABLE', '[а-я]*'),
 'SEMICOLON': new TokenType('SEMICOLON', ';'),
 'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
 'ASSIGN': new TokenType('ASSIGN', 'РАВНО'),
 'LOG': new TokenType('LOG', 'ВЫВЕДИ'),
 'PLUS': new TokenType('PLUS', 'ПЛЮС'),
 'MINUS': new TokenType('MINUS', 'МИНУС'),
 'UMNOJ': new TokenType('UMNOJ', 'УМНОЖЪ'),
 'DELEN': new TokenType('DELEN', 'ДЕЛИ'),
 'LPAR': new TokenType('LPAR', '\\('),
 'RPAR': new TokenType('RPAR', '\\)'),

}