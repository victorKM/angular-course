var minhaVar = 'minha variavel';
function minhaFunc(x, y) {
    return x + y;
}
// ES 6 ou ES 2015
var num = 2;
var PI = 3.14;

var numeros = [1, 2, 3];
numeros.map(function (x) { return x * 2; });

var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.soma = function (x, y) {
        return x + y;
    };
    return Matematica;
}());
