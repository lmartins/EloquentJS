'use strict';
var addCats, between, catData, catInfo, catNames, catRecord, deadCats, extractDate, extractMother, findCats, formatDate, oldestCat, range, startsWith, sum,
  __slice = [].slice;

findCats = function() {
  var cats, handleParagraph, mail, mailArchive, paragraph, paragraphs, _i, _j, _len, _len1;
  mailArchive = ["born 12/01/2002: Black Leclère", "born 05/04/2006 (mother Lady Penelope): Red Lion, Doctor Hobbles the 3rd, Little Iroquois", "died 27/04/2006: Black Leclère"];
  cats = {
    "Spot": catRecord("Spot", new Date(1997, 2, 5), "unknown")
  };
  handleParagraph = function(paragraph) {
    if (startsWith(paragraph, 'born')) {
      return addCats(cats, catNames(paragraph), extractDate(paragraph), extractMother(paragraph));
    } else if (startsWith(paragraph, 'died')) {
      return deadCats(cats, catNames(paragraph), extractDate(paragraph));
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
  return cats;
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

between = function(string, start, end) {
  var endAt, startAt;
  startAt = string.indexOf(start) + start.length;
  endAt = string.indexOf(end, startAt);
  return string.slice(startAt, endAt);
};

extractMother = function(paragraph) {
  return between(paragraph, "(mother ", ")");
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

catData = findCats();

formatDate = function(date) {
  var pad;
  pad = function(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };
  return pad(date.getDate) + "/" + pad(date.getMonth() + 1) + "/" + date.getFullYear();
};

catInfo = function(data, name) {
  var cat, message;
  if (name in data) {
    "No cat by the name of " + name + " is known";
  }
  cat = data[name];
  message = "" + name + ", born " + (formatDate(cat.birth)) + " from mother " + cat.mother;
  if ("death" in cat) {
    message += ", died " + (formatDate(cat.death));
  }
  return message;
};

oldestCat = function(data) {
  var cat, name, oldest;
  oldest = null;
  for (name in data) {
    cat = data[name];
    if ((!("death" in cat)) && ((oldest == null) || oldest.birth > cat.birth)) {
      oldest = cat;
    }
  }
  if (oldest == null) {
    return null;
  } else {
    return oldest.name;
  }
};

catInfo(catData, "Red Lion");

sum = function() {
  var number, numbers, total, _i, _len;
  numbers = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  total = 0;
  for (_i = 0, _len = numbers.length; _i < _len; _i++) {
    number = numbers[_i];
    total += number;
  }
  return total;
};

console.log(sum(5, 10, 25));

range = function(start, end) {
  var result, value, _i, _results;
  if (arguments.length < 2) {
    end = start;
    start = 0;
  }
  result = [];
  _results = [];
  for (value = _i = start; start <= end ? _i <= end : _i >= end; value = start <= end ? ++_i : --_i) {
    _results.push(result.push(value));
  }
  return _results;
};

console.log(range(5, 10));

/*
//# sourceMappingURL=chapter04.js.map
*/
