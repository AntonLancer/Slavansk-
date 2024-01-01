import Token from "../token";
import ExpressionNode from "./ExpressionNode";

// Нода для оператора вывода
export default class UnarOperationNode{
    operator: Token;
    operand: ExpressionNode;

    constructor(operator: Token, operand: ExpressionNode){
        this.operator = operator;
        this.operand = operand;
    }
}