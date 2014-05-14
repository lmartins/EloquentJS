'use strict'

# class Rabbit
#
#   constructor: (@adjective) ->
#
#   speak: (line) ->
#     console.log "The #{@adjective} rabbit says '#{line}'"


Rabbit = (adjective) ->
  @adjective = adjective
  return @

Rabbit::speak = (line) ->
  console.log "The #{@adjective} rabbit says #{line}"

killerRabbit = new Rabbit('killer')
killerRabbit.speak 'GRAAAAAA!'




forEachIn = (object, action) ->
  for property of object
    action(property, object[property])

chimera =
  head: 'lion'
  body: 'goat'
  tail: 'snake'

forEachIn chimera, (name, value) ->
  console.log "The #{name} of a #{value}."


# High order functions or Callbacks ------------------
# genericPoemMaker = (name, gender) ->
#   console.log "#{name} is finer than fine wine"
#   console.log "Altruistic and noble for the modern time"
#   console.log "Always admirably adorned with tje latest style"
#   console.log "A #{gender} of unfortunate tragedies who still manages a perpetual smile"
#
#
# greetUser = (customerName, gender) ->
#   salutation = (if gender and gender is "male" then "Mr." else "Ms.")
#   console.log "Hello #{salutation} #{customerName}"
#
#
#
# getUserInput = (firstName, lastName, gender, callback) ->
#   fullName = firstName + ' ' + lastName
#   if typeof callback is 'function'
#     callback fullName, gender
#
#
# getUserInput "John", "Doe", "male", genericPoemMaker
# getUserInput "John", "Doe", "male", greetUser


###*
 * Interface para criação de novos objectos com métodos
 * auxiliares de interacçao e consulta do objecto
 * @param {[object]} startValues [objecto inicial passado ao constructor]
###
Dictionary = (startValues) ->
  @values = startValues or {}
  return this

###*
 * Store a new object property
 * @param  {string} name  nome do parametro
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
###
Dictionary::store = (name, value) ->
  @values[name] = value

Dictionary::lookup = (name) ->
  @values[name]

Dictionary::contains = (name) ->
  Object::hasOwnProperty.call(@values, name) and Object::propertyIsEnumerable.call(@values, name)

Dictionary::each = (action) ->
  forEachIn @values, action

colours = new Dictionary(
  Grover: 'blue'
  Elmo: 'orange'
  Bert: 'yellow'
)

console.log colours.store "Zippy", "White"
console.log colours.contains 'Grover'
console.log colours
colours.each (name, colour) ->
  console.log "#{name} is #{colour}"


thePlan =
  ["############################",
   "#      #    #      o      ##",
   "#                          #",
   "#          #####           #",
   "##         #   #    ##     #",
   "###           ##     #     #",
   "#           ###      #     #",
   "#   ####                   #",
   "#   ##       o             #",
   "# o  #         o       ### #",
   "#    #                     #",
   "############################"]

Point = (x, y) ->
  @x = x
  @y = y

Point::add = (other) ->
  new Point @x + other.x, @y + other.y

Point::isEqualTo = (other) ->
  @x is other.x and @y is other.y

console.log new Point(3, 1).add(new Point(2, 4))

Grid = (width, height) ->
  @width = width
  @height = height
  @cells = new Array width * height

Grid::valueAt = (point) ->
  @cells[point.y * @width + point.x]

Grid::setValueAt = (point, value) ->
  @cells[point.y * @width + point.x] = value

Grid::isInside = (point) ->
  point.x >= 0 and point.y >= 0 and point.x < @width and point.y < @height

Grid::moveValue = (from, to) ->
  @setValueAt to, @valueAt(from)
  @setValueAt from, undefined



# Measuring Performance
factorial = (num) ->
  if num < 0
    throw new Error "Number cannot be negative."

  if num % 1 isnt 0
    throw new Error "Number must be an integer."

  if num is 0 or num is 1
    return 1

  num * factorial( num - 1 )


console.time 'factorial test'
i = 1
while i < 100000
  factorial 20
  i++
console.timeEnd 'factorial test'
