import BinOperationNode from "./AST/BinOperationNode";
import ExpressionNode from "./AST/ExpressionNode";
import NumberNode from "./AST/NumberNode";
import StatementsNode from "./AST/StatementsNode";
import UnarOperationNode from "./AST/UnarOperationNode";
import VariableNode from "./AST/VariableNode";
import Token from "./token";
import TokenType, { tokenTypesList } from "./tokenType";

export default class Parser {
    
    tokens: Token[]; // Список токенов
    pos: number = 0; // Позиция
    scope: any = {}; // Сохраняем значение переменной

    constructor(tokens: Token[]){
        this.tokens = tokens;
    }
    // Передаем по expected тип токена
    match(...expected: TokenType[]): Token | null {
        if(this.pos < this.tokens.length){ // Достаем токен
            const currentToken = this.tokens[this.pos];
            if(expected.find(type => type.name === currentToken.type.name)){ // Ищем тип токена
                this.pos += 1;
                return currentToken; // Нашли и вернули токен, увеличив текущую позицию
            }
        } 
        return null;

    }
    // Используется для ; ( )
    require(...expected: TokenType[]): Token {
        const token = this.match(...expected);
        if(!token){
            throw new Error(`На позиции ${this.pos} одидается ${expected[0].name}`)
        }
        return token;
    }

    // Парсинг переменных и чисел
    parseVariableOrNumber(): ExpressionNode{
        const number = this.match(tokenTypesList.NUMBER);
        if(number != null) {
            return new NumberNode(number);
        }
        const variable = this.match(tokenTypesList.VARIABLE);
        if(variable != null) {
            return new VariableNode(variable);
        }
        throw new Error(`Ожидается переменная или число на ${this.pos} позиции`)
    }

    // Парсинг скобок
    parseParentheses(): ExpressionNode{
        if (this.match(tokenTypesList.LPAR) != null){ // Если скобка не пуста, значит внутри формула
            const node = this.parseFormula();
            this.require(tokenTypesList.RPAR); // Ожидаем закрывающуюся скобку
            return node;
        } else {
            return this.parseVariableOrNumber(); // Если скобки нет, то там переменная либо число
        }
    }


    parseFormula(): ExpressionNode{
        let leftNode = this.parseParentheses(); // Эта нода как переменная, так и число
        let operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS, tokenTypesList.DELEN, tokenTypesList.UMNOJ); // Нода либо с + либо с -
        while (operator != null) {
            const rightNode = this.parseParentheses();
            leftNode = new BinOperationNode(operator, leftNode, rightNode); // Перезаписываем левую ноду
            operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS, tokenTypesList.DELEN, tokenTypesList.UMNOJ);
        }
        return leftNode;
    }

    // Функция парсинга для принта
    parsePrint(): ExpressionNode{
        const operatorLog = this.match(tokenTypesList.LOG);
        if(operatorLog != null) {
            return new UnarOperationNode(operatorLog, this.parseFormula())
        }
        throw new Error(`Ожидается унарный оператор КОНСОЛЬ на ${this.pos} позиции`)
    }


    // Функция парсит отдельно взятуб строку, возвращает либо принт ноду либо бинари ноду
    parseExpression(): ExpressionNode{
        if(this.match(tokenTypesList.VARIABLE) == null){ // Если в ноде не переменная
            const printNode = this.parsePrint();
            return printNode;
        }
        this.pos -= 1
        let VariableNode = this.parseVariableOrNumber();
        const assignOperator = this.match(tokenTypesList.ASSIGN); // Если нода равна =
        if(assignOperator!=null){
            const rightFormulaNode = this.parseFormula();
            const binatyNode = new BinOperationNode(assignOperator, VariableNode, rightFormulaNode);
            return binatyNode;
        }
        throw new Error(`После переменной ожидается оператор присвоения на позиции ${this.pos}`);
    }

    // Функция будет возвращать какую-то ноду
    parseCode(): ExpressionNode{
        const root = new StatementsNode();
        while (this.pos < this.tokens.length){
            // Отдельно взятая строка кода, нода
            const codeStringNode = this.parseExpression();
            this.require(tokenTypesList.SEMICOLON); // Проверка есть ли ;
            root.addNode(codeStringNode); // Добавляем ноду в список
        }
        return root;
    }

    run(node: ExpressionNode): any {
        if (node instanceof NumberNode) {
            return parseInt(node.number.text);
        }
        if (node instanceof UnarOperationNode){
            switch (node.operator.type.name){
                case tokenTypesList.LOG.name:
                    console.log(this.run(node.operand))
                    return;
            }
        }
        if (node instanceof BinOperationNode){
            switch (node.operator.type.name){
                case tokenTypesList.PLUS.name:
                    return this.run(node.leftNode) + this.run(node.rightNode);
                case tokenTypesList.MINUS.name:
                    return this.run(node.leftNode) - this.run(node.rightNode);
                case tokenTypesList.DELEN.name:
                    return this.run(node.leftNode) / this.run(node.rightNode);
                case tokenTypesList.UMNOJ.name:
                        return this.run(node.leftNode) * this.run(node.rightNode);
                case tokenTypesList.ASSIGN.name:
                    const result = this.run(node.rightNode);
                    const variableNode = <VariableNode>node.leftNode;
                    this.scope[variableNode.variable.text] = result;
                    return result;
            }
        }
        if(node instanceof VariableNode){
            if(this.scope[node.variable.text]){
                return this.scope[node.variable.text]
            }else{
                throw new Error(`Переменная с названием ${node.variable.text} не обнаружена`)
            }
        }
        if(node instanceof StatementsNode){
            node.codeStrings.forEach(codeString => {
                this.run(codeString);
            })
            return;
        }
        throw new Error('Ошибка')
    }
}