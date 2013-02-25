class TestSection

	previousX					: 0
	previousY 					: 0

	cameraVector				: 0

	vx 							: 0
	vy 							: 0

	friction 					: 0.97

	lightController 			: null
	cameraController			: null

	gui 						: null

	snakes 						: []


	constructor:( @camera, @scene, @render )->

		@addEvents()

		@gui = new GuiController(@)

		@cameraController = new CameraController( camera )
		@gui.controllCamera(@, @cameraController)

		# @lightController = new LightController(scene, camera, @cameraController.radius)
		# @gui.controllLight( @lightController )

		$("body").get(0).style.cursor = "url(./img/cursor_open.png),auto"

		@camera.lookAt( scene.position )

		@octopus = new Octopus(scene)

		return

	addEvents:()->
		window.addEventListener("mousedown", @onTouch, false)
		return


	onTouch:(e)=>
		e.preventDefault()

		@previousX = e.pageX
		@previousY = e.pageY
		window.addEventListener("mouseup", @onRelease, false)
		window.addEventListener("mousemove", @onMove, false)
		window.addEventListener("mouseleave", @onRelease, false)
		$("body").get(0).style.cursor = "url(./img/cursor_close.png),auto"
		return


	onMove:(e)=>
		e.preventDefault()

		distX			= e.pageX - @previousX
		distY 			= e.pageY - @previousY
		@previousX 		= e.pageX
		@previousY 		= e.pageY
		@vx 			+= distX / 1000
		@vy 			+=  distY / 20

		return


	onRelease:(e)=>
		e.preventDefault()

		window.removeEventListener("mouseup", @onRelease, false)
		window.removeEventListener("mousemove", @onMove, false)
		window.removeEventListener("mouseleave", @onRelease, false)
		$("body").get(0).style.cursor = "url(./img/cursor_open.png),auto"
		return


	update : () ->

		@cameraController.update(@vx, @vy)

		@octopus.update()

		@vy *= @friction
		@vx *= @friction
		renderer.render scene, camera 
		return

	
	close : ( callback ) ->
		@state = "closing"
		$("#contact").fadeOut 400, callback
		return

