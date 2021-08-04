function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    const bracketRegExp = /\(([^)]+)\)/;
    const spacerExp = /\S[\+|\-|\*|\/]\S/g;
    function spacer(char) {
        return `${char[0]} ${char[1]} ${char[2]}`;
      }
    console.log(spacerExp.test(expr))
    expr = expr.replace(spacerExp, spacer)
    console.log('spaced', expr)
    if (bracketRegExp.test(expr)){
        expr.replace(bracketRegExp, expressionCalculator(expr.match(bracketRegExp)))
    } else {
        const exprArr = expr.split(' ');
        let mult = exprArr.indexOf('*')
        while (mult >= 0) {
            exprArr.splice(mult-1, 3, exprArr[mult-1] * exprArr[mult+1])
            mult = exprArr.indexOf('*')
        }
        let div = exprArr.indexOf('/')
        while (div >= 0) {
            if (exprArr[div+1] == 0) throw new Error('TypeError: Division by zero.');
            exprArr.splice(div-1, 3, exprArr[div-1] / exprArr[div+1])
            div = exprArr.indexOf('/')
        }
        let sum = exprArr.indexOf('+')
        while (sum >= 0) {
            console.log(exprArr[sum])
            exprArr.splice(sum-1, 3, +exprArr[sum-1] + +exprArr[sum+1])
            sum = exprArr.indexOf('+')
        }
        let sub = exprArr.indexOf('-')
        while (sub>= 0) {
            exprArr.splice(sub-1, 3, +exprArr[sub-1] - +exprArr[sub+1])
            sub = exprArr.indexOf('-')
        }
        //console.log ('===================',exprArr)
        return exprArr[0]
    }
    //console.log ('===================',exprArr)
    

}

const expr = "2+2";
const result = 4;
console.log(expressionCalculator(expr))
module.exports = {
    expressionCalculator
}