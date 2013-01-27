###jshint plusplus:false, forin:false ###
###global Class ###

'use strict'

rnd = (num) ->
	Math.random() * num

canvas = document.createElement 'canvas'
context = canvas.getContext '2d'

document.body.appendChild canvas

canvas.width = document.width
canvas.height = document.height

particlesOrigin =
	x: canvas.width / 2
	y: canvas.height / 2

updateParticlesOrigin = (event) ->
	event.preventDefault()

	particlesOrigin.x = event.pageX
	particlesOrigin.y = event.pageY

	return

document.addEventListener 'mousemove', updateParticlesOrigin
document.addEventListener 'touchmove', updateParticlesOrigin

Particle = Class.extend
	init: ->
		self = this

		this.color = '#' + Math.floor(Math.random() * 16777215).toString(16)

		this.size = Math.round(rnd 50)
		this.half = Math.round(this.size / 2)

		this.position =
			x: particlesOrigin.x - this.half
			y: particlesOrigin.y - this.half

		this.velocity =
			x: rnd(10) - 5
			y: rnd(10) - 5

		return

	updateValues: ->
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		return

	draw: ->
		if this.withinCanvasBounds()

			context.fillStyle = this.color

			context.beginPath()
			context.arc(this.position.x, this.position.y, this.half, 0, Math.PI * 2, true)
			context.closePath()
			context.fill()

		return

	withinCanvasBounds: ->
		result = true;

		if this.position.x < -(this.size)
			result = false;
		else if this.position.x > canvas.width + this.size
			result = false;

		if this.position.y < -(this.size)
			result = false;
		else if this.position.y > canvas.height + this.size
			result = false;

		result

particlesArray = []
maxParticles = 1000

animationLoop = ->

	window.requestAnimationFrame animationLoop

	context.clearRect 0, 0, canvas.width, canvas.height

	newParticle = new Particle()

	particlesArray.unshift newParticle

	if particlesArray.length > maxParticles
		particlesArray.length = maxParticles

	for particle in particlesArray
		particle.updateValues()
		particle.draw()

	return

animationLoop()
