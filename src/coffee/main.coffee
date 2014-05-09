'use strict'

class Rabbit

  constructor: (@adjective) ->

  speak: (line) ->
    console.log "The #{@adjective} rabbit says '#{line}'"

killerRabbit = new Rabbit('killer')
killerRabbit.speak 'GRAAAAAA!'


# Rabbit = (adjective) ->
#   @adjective = adjective
#   @speak = (line) ->
#     console.log "The #{@adjective} rabbit says '#{line}'"
#
#
#
# killerRabbit = new Rabbit('killer')
# console.log killerRabbit
# killerRabbit.speak 'GRAAAAAA!'
