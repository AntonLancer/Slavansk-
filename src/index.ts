import Lexer from "./lexer";
import Parser from "./parser";
const code = 
`зевс РАВНО 54 МИНУС 595;
ящер РАВНО 5;
ящер РАВНО 1 ПЛЮС (10 МИНУС 1 УМНОЖЪ 9);
перун РАВНО 1 УМНОЖЪ 4;
дележник РАВНО 1 ДЕЛИ 0;
святополк РАВНО ящер УМНОЖЪ 10;
ВЫВЕДИ зевс;
ВЫВЕДИ ящер;
ВЫВЕДИ перун;
ВЫВЕДИ дележник;
ВЫВЕДИ 5;
ВЫВЕДИ святополк;`

const lexer = new Lexer(code); // Создаем переменную класса Лексер и загоняем туда код программы
lexer.lexAnalysis();

console.log(lexer.tokenList); // Вывод всех лексем
 const parser = new Parser(lexer.tokenList);
 const rootNode = parser.parseCode();
 parser.run(rootNode);