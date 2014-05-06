'use strict';
var addCats, addToSet, between, cat, catNames, catRecord, deadCats, extractDate, extractMother, findLivingCats, howMany, removeFromSet, startsWith, value, _ref;

findLivingCats = function() {
  var handleParagraph, livingCats, mail, mailArchive, paragraph, paragraphs, _i, _j, _len, _len1;
  mailArchive = ["died 27/04/2006: Black Leclère", "born 05/04/2006 (mother Lady Penelope): Red Lion, Doctor Hobbles the 3rd, Little Iroquois"];
  livingCats = {
    "Spot": true
  };
  handleParagraph = function(paragraph) {
    if (startsWith(paragraph, 'born')) {
      return addToSet(livingCats, catNames(paragraph));
    } else if (startsWith(paragraph, 'died')) {
      return removeFromSet(livingCats, catNames(paragraph));
    }
  };
  for (_i = 0, _len = mailArchive.length; _i < _len; _i++) {
    mail = mailArchive[_i];
    paragraphs = mail.split('\n');
    for (_j = 0, _len1 = paragraphs.length; _j < _len1; _j++) {
      paragraph = paragraphs[_j];
      handleParagraph(paragraph);
    }
  }
  return livingCats;
};

startsWith = function(string, pattern) {
  return string.slice(0, pattern.length) === pattern;
};

catNames = function(paragraph) {
  var colon;
  colon = paragraph.indexOf(':');
  return paragraph.slice(colon + 2).split(", ");
};

extractDate = function(paragraph) {
  var numberAt;
  numberAt = function(start, length) {
    return Number(paragraph.slice(start, start + length));
  };
  return new Date(numberAt(11, 4), numberAt(8, 2) - 1, numberAt(5, 2));
};

console.log(extractDate("died 27-04-2006: Black Leclère"));

extractMother = function(paragraph) {
  var end, start;
  start = paragraph.indexOf("(mother ") + "(mother ".length;
  end = paragraph.indexOf(")");
  return paragraph.slice(start, end);
};

between = function(string, start, end) {
  var endAt, startAt;
  startAt = string.indexOf(start) + start.length;
  endAt = string.indexOf(end, startAt);
  return string.slice(startAt, endAt);
};

addToSet = function(set, values) {
  var value, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = values.length; _i < _len; _i++) {
    value = values[_i];
    _results.push(set[value] = true);
  }
  return _results;
};

removeFromSet = function(set, values) {
  var value, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = values.length; _i < _len; _i++) {
    value = values[_i];
    _results.push(delete set[value]);
  }
  return _results;
};

catRecord = function(name, birthdate, mother) {
  return {
    name: name,
    birth: birthdate,
    mother: mother
  };
};

addCats = function(set, names, birthdate, mother) {
  var name, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = names.length; _i < _len; _i++) {
    name = names[_i];
    _results.push(set[name] = catRecord(name, birthdate, mother));
  }
  return _results;
};

deadCats = function(set, names, deathdate) {
  var name, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = names.length; _i < _len; _i++) {
    name = names[_i];
    _results.push(set[name].death = deathdate);
  }
  return _results;
};

howMany = 0;

_ref = findLivingCats();
for (cat in _ref) {
  value = _ref[cat];
  if (value) {
    howMany++;
  }
}

console.log("There are " + howMany + " living cats");

/*
//# sourceMappingURL=main.js.map
*/
