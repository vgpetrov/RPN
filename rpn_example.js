//var inputStr = "-2-2";
//var inputStr = "2+2*3-4";
//var inputStr = "254+2*3-4";
//var inputStr = "3+4";
//var inputStr = "2+2*2";
//var inputStr = "7-2*3";
var inputStr = "3+4*2/(-1-3)";
//var inputStr = "3^4";
//var inputStr = "(1+2)*4+3";

function isNumber(n) {
    if (n!=undefined && n!=null) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    } else {
        return false;
    }
}

var operators = {
    arrOps:["*", "/", "+", "-", "^"],
    priority:["2", "2", "1", "1", "3"],
    isOperator: function(operator) {
        for (var i=0; i<this.arrOps.length; i++) {
            if (this.arrOps[i] == operator) {
                return true;
            }
        }
        return false;
    },
    getPriority: function(operator) {
        for (var i=0; i<this.arrOps.length; i++) {
            if (this.arrOps[i] == operator) {
                return this.priority[i];
            }
        }
        return null;
    }
}

function strToArr(str) {
    var temp = str.split('');
    var result = [];
    var newStr = "";
    for (var i=0; i<temp.length; i++) {
        if (isNumber(temp[i]) || temp[i] == ".") {
            newStr = newStr + "" + temp[i];
        } else if (operators.isOperator(temp[i])) {
            if (newStr!="") {
                result.push(newStr);
            }
            result.push(temp[i]);
            newStr = "";
        } else if(temp[i] == "(" || temp[i] == ")") {
            if (newStr!="") {
                result.push(newStr);
            }
            result.push(temp[i]);
            newStr = "";
        }
    }
    if (isNumber(newStr)) {
        result.push(newStr);
    }
    return result;
}

function reversedPoland(str) {
    var stack = [];
    var output = [];
    var negative = false;
    var arr = strToArr(str);
    console.log(arr);
    for (var i=0; i<arr.length; i++) {
        if (isNumber(arr[i])) {
            if (negative) {
                output.push("-"+arr[i]);
                negative = false;
            } else {
                output.push(arr[i]);
            }
        } else if(operators.isOperator(arr[i])) {
            if (stack.length > 0) {
                while (operators.getPriority(arr[i]) <= operators.getPriority(stack[stack.length-1])) {
                    output.push(stack.pop());
                }
            }
            if (arr[i]=="-" && !isNumber(arr[i-1])) {
                negative = true;
            } else {
                stack.push(arr[i])
            }
        } else if (arr[i] == "(") {
            stack.push(arr[i]);
        } else if (arr[i] == ")") {
            while (stack[stack.length-1] != "("){
                output.push(stack.pop());
            }
            stack.pop();
        }
    }
    var stackLen = stack.length;
    for (var i=0; i<stackLen; i++) {
        output.push(stack.pop());
    }
    return output;
}

function solve(arr) {
    var temp = [];
    for (var i=0; i<arr.length; i++) {
        if (isNumber(arr[i])) {
            temp.push(arr[i]);
        } else if(operators.isOperator(arr[i])) {
            var right = temp.pop();
            var left = temp.pop();
            var a = parseFloat(right);
            var b = parseFloat(left);
            switch (arr[i]) {
                case "+": temp.push(a+b); break;
                case "*": temp.push(a*b); break;
                case "-": temp.push(b-a); break;
                case "/": temp.push(b/a); break;
                case "^": temp.push(Math.pow(b,a)); break;
            }
        }
    }
    console.log(temp);
}

var output = reversedPoland(inputStr);
console.log(output);
solve(output);