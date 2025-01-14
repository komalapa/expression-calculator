function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    const bracketRegExp = /\(([^)^()]+)\)/;
    const spacerExp = /\S[\+|\-|\*|\/]\S/g;
    function spacer(char) {
        return `${char[0]} ${char[1]} ${char[2]}`;//replace by split('').join(' ')??
      }
    expr = expr.replace(spacerExp, spacer)
    if (bracketRegExp.test(expr)){//replace brackets by their result or start calculate
        while (bracketRegExp.test(expr)){
            expr = expr.replace(bracketRegExp, expressionCalculator(expr.match(bracketRegExp)[1]))
            console.log("replaced brackets", expr)
        }
    } 
        if (expr.indexOf('(')>=0 || expr.indexOf(')')>=0) throw new Error('ExpressionError: Brackets must be paired');//there should be no brackets. All was replaced before
    
       
        const exprArr = expr.trim().split(' ');
        
        //all mults and divs
        let mult = exprArr.indexOf('*')
        let div = exprArr.indexOf('/')
        while (mult >= 0 || div >= 0) {
            if (mult >= 0){
                if(div>=0 && div < mult){
                    if (exprArr[div+1] == 0) throw new Error('TypeError: Division by zero.');
                   exprArr.splice(div-1, 3, +exprArr[div-1] / +exprArr[div+1])
                } else {
                    exprArr.splice(mult-1, 3, +exprArr[mult-1] * +exprArr[mult+1])        
                } 

            } else {
                if (exprArr[div+1] == 0) throw new Error('TypeError: Division by zero.');
                    exprArr.splice(div-1, 3, +exprArr[div-1] / +exprArr[div+1])
            }
            mult = exprArr.indexOf('*')
            div = exprArr.indexOf('/')
        }
        //all sums and subs
        let sum = exprArr.indexOf('+')
        let sub = exprArr.indexOf('-')
        while (sum >= 0 || sub >= 0) {
            if (sum >= 0){
                if(sub>=0 && sub < sum){
                   exprArr.splice(sub-1, 3, +exprArr[sub-1] - +exprArr[sub+1])
                } else {
                    exprArr.splice(sum-1, 3, +exprArr[sum-1] + +exprArr[sum+1])        
                } 

            } else {
                    exprArr.splice(sub-1, 3, +exprArr[sub-1] - +exprArr[sub+1])
            }
            sum = exprArr.indexOf('+')
            sub = exprArr.indexOf('-')
        }

        return exprArr[0]
    
    

}

const expr = "((1 + 2) * 3 ";
const result = -10.0227;
//console.log(expressionCalculator(expr))
module.exports = {
    expressionCalculator
}