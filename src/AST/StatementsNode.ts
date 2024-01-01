import ExpressionNode from "./ExpressionNode";

// Корневой элемент дерева, хранит все строки кода
export default class StatementsNode extends ExpressionNode {
    codeStrings: ExpressionNode[] = []; // Массив узлов (нод)

    addNode(node: ExpressionNode){
        this.codeStrings.push(node);
    }
}