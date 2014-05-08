'use strict'

forEach = (array, action) ->
  for item in array
    action(item)

myArray = ['Lisbon', "London", "New York"]

forEach myArray, console.log.bind(console)


sum = (numbers) ->
  total = 0
  forEach(numbers, (number) ->
    total += number
    )
  total

console.log sum([1, 10, 100])


negate = (func) ->
  (x) ->
    not func.apply(null, arguments)

isNotNaN = negate(isNaN)
console.log isNotNaN(NaN)


reduce = (iterator, base, array) ->
  forEach(array, (element) ->
    base = iterator(base, element)
    )
  return base

add = (a, b) ->
  a + b

sum = (numbers) ->
  reduce(add, 0, numbers)


myNumbersArray = [0, 23, 72, 0, 0, 18]
console.log sum(myNumbersArray)


countZeros = (array) ->
  counter = (total, element) ->
    total + (if element is 0 then 1 else 0)

  reduce(counter, 0, array)

console.log countZeros(myNumbersArray)

console.log [0.01, 2, 9.89, Math.PI].map Math.round

docString = """
% The Book of Programming

%% The Two Aspects

Below the surface of the machine, the program moves. Without effort, it expands and contracts. In great harmony, electrons scatter and regroup. The forms on the monitor are but ripples on the water. The essence stays invisibly below.

When the creators built the machine, they put in the processor and the memory. From these arise the two aspects of the program.

The aspect of the processor is the active substance. It is called Control. The aspect of the memory is the passive substance. It is called Data.
"""

splitParagraph = (text) ->
  indexOrEnd = (character) ->
    index = text.indexOf character
    if index is -1 then text.length else index

  takeNormal = () ->
    end = reduce(Math.min, text.length, ["*","{"].map(indexOrEnd))
    part = text.slice(0, end)
    text = text.slice(end)
    part

  takeUpTo = (character) ->
    end = text.indexOf character, 1
    if end is -1
      throw new Error "Missing closing '#{character}'"
    part = text.slice(1, end)
    text = text.slice(end + 1)
    part

  fragments = []

  while text not ""
    if text.charAt(0) is "*"
      fragments.push(
        type: "emphasised"
        content: takeUpTo('*')
      )
    else if text.charAt(0) is "{"
      fragments.push(
        type: "footnote"
        content: takeUpTo('}')
      )
    else
      fragments.push(
        type: "normal"
        content: takeNormal()
      )
  return fragments



processParagraph = (paragraph) ->
  header = 0
  while paragraph.charAt(0) is '%'
    paragraph = paragraph.slice(1)
    header++

  type: (if header is 0 then "p" else "h" + header)
  content: paragraph

paragraphs = docString.split('\n\n').map processParagraph
console.log paragraphs





# reduce = (combine, base, array) ->
#   for element in array
#     base = combine(base, element)
#   base
#
# add = (a, b) ->
#   a + b
#
# sum = (numbers) ->
#   reduce add, 0, numbers
#
#
# count = (test, array) ->
#   reduce ((total, element) ->
#     total + ((if test(element) then 1 else 0))
#   ), 0, array
#
# equals = (x) ->
#   (element) ->
#     x is element
#
# countZeros = (array) ->
#   count(equals(0), array)
#   # counter = (total, element) ->
#   #   total + (if element is 0 then 1 else 0)
#   # reduce(counter, 0, array)
#
#
# myArray = [0, 10, 12, 0, 0, 20]
# # console.log countZeros myArray
#
#
# plusOne = (value) ->
#   value + 1
#
# # console.log myArray.map plusOne
#
#

#
#

#
#
#
#
#
#
# paragraphs = docString.split('\n\n').map(processParagraph)
#
#
#
# console.log "Found #{paragraphs.length} paragraphs"
