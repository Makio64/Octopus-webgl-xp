class GuiController

	gui 			: null
	camera 			: null
	light 			: null


	constructor:()->
		@gui = new dat.GUI()
		return


	controllScene:(scene)->
		# @gui.remember(scene)
		@scene = @gui.addFolder('Scene')
		@scene.add(scene.fog, 'far', 0, 5000)
		return


	controllCamera:(section, cameraController)->
		# @gui.remember(section)
		@camera = @gui.addFolder('Camera')
		@camera.add(cameraController, 'radius', 0, 1200)
		@camera.add(section, 'friction', 0.95, 1)
		return


	controllLight:(lightController)->
		# @gui.remember(lightController)
		@light = @gui.addFolder('Light')
		@light.add(lightController, 'lightAuto')
		@light.addColor(lightController, 'ambientLightColor')
		@light.addColor(lightController, 'cameraLightColor')
		@light.add(lightController.cameraLight, 'distance', 0, 1000)
		@light.add(lightController.cameraLight, 'intensity', 0, 2)
		return

	controlMaterial:(snake)->
		@snake = @gui.addFolder('Snake')
		@snake.add(snake, 'materialIndex', 0, 3 ).step(1)
		@snake.add(snake, 'girth', 1, 50).step(.1)
		@snake.add(snake, 'headRadius', 1, 50).step(.1)
		@snake.add(snake, 'reduction', 0, 5)
		@snake.add(snake, 'frequency', 0, .4).step(.005)
		@snake.open()
		
		# @snake.add( snake, 'materialIndex', { "Wireframe": 0, "Normal": 1, "Phong": 2, "Lambert": 3 } )
		return