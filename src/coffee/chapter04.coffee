'use strict'

# Start with a set of cat names that has only "spot" in it
# Go over every email on our archive, in chronological order
# Look for paragraphs that start with "born" or "died"
# Add the names from paragraphs that start with "born"
# Remove the names from paragraphs that start with "died" from our set


findCats = ->
  mailArchive = [
    "born 12/01/2002: Black Leclère"
    "born 05/04/2006 (mother Lady Penelope): Red Lion, Doctor Hobbles the 3rd, Little Iroquois"
    "died 27/04/2006: Black Leclère"
  ]
  cats =
    "Spot": catRecord("Spot", new Date(1997, 2, 5), "unknown")

  handleParagraph = (paragraph) ->
    if startsWith(paragraph, 'born')
      addCats cats, catNames(paragraph), extractDate(paragraph), extractMother(paragraph)
    else if startsWith(paragraph, 'died')
      deadCats cats, catNames(paragraph), extractDate(paragraph)


  for mail in mailArchive
    paragraphs = mail.split '\n'
    for paragraph in paragraphs
      handleParagraph(paragraph)

  cats


startsWith = (string, pattern) ->
  string.slice(0, pattern.length) is pattern

catNames = (paragraph) ->
  colon = paragraph.indexOf ':'
  paragraph.slice(colon + 2).split(", ")

# console.log catNames("born 20/09/2004 (mother Yellow Bess): Doctor Hobbles the 2nd, Noog")
extractDate = (paragraph) ->
  numberAt = (start, length) ->
    Number(paragraph.slice(start, start + length))

  new Date(numberAt(11, 4), numberAt(8, 2) - 1, numberAt(5, 2))

# console.log extractDate "died 27-04-2006: Black Leclère"


between = (string, start, end) ->
  startAt = string.indexOf(start) + start.length
  endAt = string.indexOf(end, startAt)
  string.slice startAt, endAt

# console.log between("bu ] boo [ bah ] gzz", "[ ", " ]")

extractMother = (paragraph) ->
  between(paragraph, "(mother ", ")")

# console.log extractMother("born 15/11/2003 (mother Spot): White Fang")

catRecord = (name, birthdate, mother) ->
  name: name
  birth: birthdate
  mother: mother

addCats = (set, names, birthdate, mother) ->
  for name in names
    set[name] = catRecord(name, birthdate, mother)

deadCats = (set, names, deathdate) ->
  for name in names
    set[name].death = deathdate

catData = findCats()


formatDate = (date) ->
  pad = (number) ->
    if number < 10
      "0" + number
    else
      number

  pad(date.getDate) + "/" + pad(date.getMonth() + 1) + "/" + date.getFullYear()


catInfo = (data, name) ->
  if name of data
    "No cat by the name of #{name} is known"

  cat = data[name]
  message = "#{name}, born #{formatDate(cat.birth)} from mother #{cat.mother}"

  if "death" of cat
    message += ", died #{formatDate(cat.death)}"

  message

oldestCat = (data) ->
  oldest = null
  for name of data
    cat = data[name]
    oldest = cat if ("death" not of cat) and (not oldest? or oldest.birth > cat.birth)
  unless oldest?
    null
  else
    oldest.name


catInfo(catData, "Red Lion")

sum = (numbers...) ->
  total = 0
  for number in numbers
    total += number
  total

console.log sum(5,10,25)

range = (start, end) ->
  if arguments.length < 2
    end = start
    start = 0
  result = []
  for value in [start..end]
    result.push value

# range(10)
# range(5,10)
console.log range 5, 10

# console.log sum(range(5,10))
