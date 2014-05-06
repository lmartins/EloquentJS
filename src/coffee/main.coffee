'use strict'

# Start with a set of cat names that has only "spot" in it
# Go over every email on our archive, in chronological order
# Look for paragraphs that start with "born" or "died"
# Add the names from paragraphs that start with "born"
# Remove the names from paragraphs that start with "died" from our set


findLivingCats = ->
  mailArchive = [
    "died 27/04/2006: Black Leclère"
    "born 05/04/2006 (mother Lady Penelope): Red Lion, Doctor Hobbles the 3rd, Little Iroquois"
  ]
  livingCats =
    "Spot": true

  handleParagraph = (paragraph) ->
    if startsWith(paragraph, 'born')
      addToSet(livingCats, catNames(paragraph))
    else if startsWith(paragraph, 'died')
      removeFromSet(livingCats, catNames(paragraph))


  for mail in mailArchive
    paragraphs = mail.split '\n'
    for paragraph in paragraphs
      handleParagraph(paragraph)

  livingCats


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

console.log extractDate "died 27-04-2006: Black Leclère"

extractMother = (paragraph) ->
  start = paragraph.indexOf("(mother ") + "(mother ".length
  end = paragraph.indexOf(")")
  paragraph.slice(start,end)

# console.log extractMother("born 15/11/2003 (mother Spot): White Fang")

between = (string, start, end) ->
  startAt = string.indexOf(start) + start.length
  endAt = string.indexOf(end, startAt)
  string.slice startAt, endAt

# console.log between("bu ] boo [ bah ] gzz", "[ ", " ]")



addToSet = (set, values) ->
  for value in values
    set[value] = true

removeFromSet = (set, values) ->
  for value in values
    delete set[value]

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






howMany = 0
for cat, value of findLivingCats()
  if value
    howMany++

console.log "There are #{howMany} living cats"
