import Token from "../token";
import ExpressionNode from "./ExpressionNode";

// Нода для + - =
export default class BinOperationNode extends ExpressionNode{
    operator: Token;
    leftNode: ExpressionNode; // Левый операнд
    rightNode: ExpressionNode; // Второй операнд

    constructor(operator: Token, leftNode: ExpressionNode, rightNode: ExpressionNode){
        super();
        this.operator = operator;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}