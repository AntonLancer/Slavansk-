import Token from "../token";
import ExpressionNode from "./ExpressionNode";

// Узел для переменной 
export default class VariableNode extends ExpressionNode{
    variable: Token; // Содердит значения токена

    constructor(variable: Token){
        super();
        this.variable = variable;
    }
}