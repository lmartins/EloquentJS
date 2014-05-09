'use strict';
var Rabbit, killerRabbit;

Rabbit = (function() {
  function Rabbit(adjective) {
    this.adjective = adjective;
  }

  Rabbit.prototype.speak = function(line) {
    return console.log("The " + this.adjective + " rabbit says '" + line + "'");
  };

  return Rabbit;

})();

killerRabbit = new Rabbit('killer');

killerRabbit.speak('GRAAAAAA!');

/*
//# sourceMappingURL=main.js.map
*/
