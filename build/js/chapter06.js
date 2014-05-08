'use strict';
var add, countZeros, docString, forEach, isNotNaN, myArray, myNumbersArray, negate, paragraphs, processParagraph, reduce, splitParagraph, sum;

forEach = function(array, action) {
  var item, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = array.length; _i < _len; _i++) {
    item = array[_i];
    _results.push(action(item));
  }
  return _results;
};

myArray = ['Lisbon', "London", "New York"];

forEach(myArray, console.log.bind(console));

sum = function(numbers) {
  var total;
  total = 0;
  forEach(numbers, function(number) {
    return total += number;
  });
  return total;
};

console.log(sum([1, 10, 100]));

negate = function(func) {
  return function(x) {
    return !func.apply(null, arguments);
  };
};

isNotNaN = negate(isNaN);

console.log(isNotNaN(NaN));

reduce = function(iterator, base, array) {
  forEach(array, function(element) {
    return base = iterator(base, element);
  });
  return base;
};

add = function(a, b) {
  return a + b;
};

sum = function(numbers) {
  return reduce(add, 0, numbers);
};

myNumbersArray = [0, 23, 72, 0, 0, 18];

console.log(sum(myNumbersArray));

countZeros = function(array) {
  var counter;
  counter = function(total, element) {
    return total + (element === 0 ? 1 : 0);
  };
  return reduce(counter, 0, array);
};

console.log(countZeros(myNumbersArray));

console.log([0.01, 2, 9.89, Math.PI].map(Math.round));

docString = "% The Book of Programming\n\n%% The Two Aspects\n\nBelow the surface of the machine, the program moves. Without effort, it expands and contracts. In great harmony, electrons scatter and regroup. The forms on the monitor are but ripples on the water. The essence stays invisibly below.\n\nWhen the creators built the machine, they put in the processor and the memory. From these arise the two aspects of the program.\n\nThe aspect of the processor is the active substance. It is called Control. The aspect of the memory is the passive substance. It is called Data.";

splitParagraph = function(text) {
  var fragments, indexOrEnd, takeNormal, takeUpTo;
  indexOrEnd = function(character) {
    var index;
    index = text.indexOf(character);
    if (index === -1) {
      return text.length;
    } else {
      return index;
    }
  };
  takeNormal = function() {
    var end, part;
    end = reduce(Math.min, text.length, ["*", "{"].map(indexOrEnd));
    part = text.slice(0, end);
    text = text.slice(end);
    return part;
  };
  takeUpTo = function(character) {
    var end, part;
    end = text.indexOf(character, 1);
    if (end === -1) {
      throw new Error("Missing closing '" + character + "'");
    }
    part = text.slice(1, end);
    text = text.slice(end + 1);
    return part;
  };
  fragments = [];
  while (text(!"")) {
    if (text.charAt(0) === "*") {
      fragments.push({
        type: "emphasised",
        content: takeUpTo('*')
      });
    } else if (text.charAt(0) === "{") {
      fragments.push({
        type: "footnote",
        content: takeUpTo('}')
      });
    } else {
      fragments.push({
        type: "normal",
        content: takeNormal()
      });
    }
  }
  return fragments;
};

processParagraph = function(paragraph) {
  var header;
  header = 0;
  while (paragraph.charAt(0) === '%') {
    paragraph = paragraph.slice(1);
    header++;
  }
  return {
    type: (header === 0 ? "p" : "h" + header),
    content: paragraph
  };
};

paragraphs = docString.split('\n\n').map(processParagraph);

console.log(paragraphs);

/*
//# sourceMappingURL=chapter06.js.map
*/
