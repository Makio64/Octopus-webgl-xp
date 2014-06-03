###
MAIN
###

# --------------------------------------------- GLOBAL VARIABLE

mouseX 	= 0
mouseY 	= 0
sw 		= window.innerWidth
sh 		= window.innerHeight

tanFOV 	= undefined

sceneController  	= undefined

stats 				= undefined

camera 		= undefined
scene 		= undefined
renderer 	= undefined
composer 	= undefined

particles	= undefined

# --------------------------------------------- ENTRY POINT

$(document).ready ->

	preload()

	$(window).resize ->
		w = $(window).width()
		h = $(window).height()

		camera.aspect = w / h
		camera.updateProjectionMatrix();
		renderer.setSize w, h
	
	return

# --------------------------------------------- PRELOAD ASSETS

preload = =>
	objImage = new Image()
	objImage.onLoad = imagesLoaded()
	objImage.src = "img/particle.png"
	return

# --------------------------------------------- CREATING STUFF

imagesLoaded = =>

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000)
	camera.position.z = 100
	scene = new THREE.Scene()
	scene.fog = new THREE.Fog(0xFFFFFF, 0.0005)
	scene.add camera

	if Detector.webgl
		renderer = new THREE.WebGLRenderer(
			alpha					: true
			antialias 				: true			# antialiasing
			precision 				: "mediump" 		# shaders precision : highp mediump lowp
			maxLights 				: 0 			# number of light max ( 1 ambient, 1 camera , 2 others )
			stencil 				: true			# ? :D
			preserveDrawingBuffer 	: true 			# ? :D
		)
	else if Modernizr.canvas
		renderer = new THREE.CanvasRenderer()

	renderer.setSize window.innerWidth, window.innerHeight


	document.body.appendChild renderer.domElement
	
	particles = new Particles(camera, scene, renderer)
	
	sceneController = new SceneController(camera, scene, renderer)
	
	addStat()
	addListener()
	mainLoop()
	return


addStat = =>
	stats = new Stats()
	stats.domElement.style.position = "absolute"
	stats.domElement.style.top = "0px"
	document.body.appendChild stats.domElement
	return


addListener = =>
	document.addEventListener "touchstart", onDocumentTouchStart, false
	document.addEventListener "touchmove", onDocumentTouchMove, false
	document.addEventListener "mousemove", onDocumentMouseMove, false
	return


onDocumentMouseMove = (event) =>
	mouseX = event.clientX - sw/2
	mouseY = event.clientY - sh/2
	return


onDocumentTouchStart = (event) =>
	if event.touches.length > 1
		event.preventDefault()
		mouseX = event.touches[0].pageX - sw/2
		mouseY = event.touches[0].pageY - sh/2
	return


onDocumentTouchMove = (event) =>
	if event.touches.length is 1
		event.preventDefault()
		mouseX = event.touches[0].pageX - sw/2
		mouseY = event.touches[0].pageY - sh/2
	return


mainLoop = ->
	requestAnimationFrame mainLoop
	stats.update()
	if sceneController
		sceneController.update()
		particles.update()
	return