'use strict';
var Dictionary, Grid, Point, Rabbit, chimera, colours, forEachIn, killerRabbit, thePlan;

Rabbit = function(adjective) {
  this.adjective = adjective;
  return this;
};

Rabbit.prototype.speak = function(line) {
  return console.log("The " + this.adjective + " rabbit says " + line);
};

killerRabbit = new Rabbit('killer');

killerRabbit.speak('GRAAAAAA!');

forEachIn = function(object, action) {
  var property, _results;
  _results = [];
  for (property in object) {
    _results.push(action(property, object[property]));
  }
  return _results;
};

chimera = {
  head: 'lion',
  body: 'goat',
  tail: 'snake'
};

forEachIn(chimera, function(name, value) {
  return console.log("The " + name + " of a " + value + ".");
});


/**
 * Interface para criação de novos objectos com métodos
 * auxiliares de interacçao e consulta do objecto
 * @param {[object]} startValues [objecto inicial passado ao constructor]
 */

Dictionary = function(startValues) {
  this.values = startValues || {};
  return this;
};


/**
 * Store a new object property
 * @param  {string} name  nome do parametro
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */

Dictionary.prototype.store = function(name, value) {
  return this.values[name] = value;
};

Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};

Dictionary.prototype.contains = function(name) {
  return Object.prototype.hasOwnProperty.call(this.values, name) && Object.prototype.propertyIsEnumerable.call(this.values, name);
};

Dictionary.prototype.each = function(action) {
  return forEachIn(this.values, action);
};

colours = new Dictionary({
  Grover: 'blue',
  Elmo: 'orange',
  Bert: 'yellow'
});

console.log(colours.store("Zippy", "White"));

console.log(colours.contains('Grover'));

console.log(colours);

colours.each(function(name, colour) {
  return console.log("" + name + " is " + colour);
});

thePlan = ["############################", "#      #    #      o      ##", "#                          #", "#          #####           #", "##         #   #    ##     #", "###           ##     #     #", "#           ###      #     #", "#   ####                   #", "#   ##       o             #", "# o  #         o       ### #", "#    #                     #", "############################"];

Point = function(x, y) {
  this.x = x;
  return this.y = y;
};

Point.prototype.add = function(other) {
  return new Point(this.x + other.x, this.y + other.y);
};

Point.prototype.isEqualTo = function(other) {
  return this.x === other.x && this.y === other.y;
};

console.log(new Point(3, 1).add(new Point(2, 4)));

Grid = function(width, height) {
  this.width = width;
  this.height = height;
  return this.cells = new Array(width * height);
};

Grid.prototype.valueAt = function(point) {
  return this.cells[point.y * this.width + point.x];
};

Grid.prototype.setValueAt = function(point, value) {
  return this.cells[point.y * this.width + point.x] = value;
};

Grid.prototype.isInside = function(point) {
  return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
};

Grid.prototype.moveValue = function(from, to) {
  this.setValueAt(to, this.valueAt(from));
  return this.setValueAt(from, void 0);
};

/*
//# sourceMappingURL=main.js.map
*/
