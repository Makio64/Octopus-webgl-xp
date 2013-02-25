class LightController

	ambientLight 				: null
	ambientLightColor 			: [0x0F,0x0F,0x0F]

	cameraLight 				: null
	cameraLightColor 			: [0xFF,0xFF,0xFF]
	
	lightAuto					: false

	scene 						: null
	camera 						: null

	constructor:(@scene, @camera, @radius)->
		# very soft white light 
		@ambientLight = new THREE.AmbientLight( 0xffffff )
		@scene.add @ambientLight

		# hard white light
		@cameraLight = new THREE.PointLight( 0xffffff, 1, @radius*2 )
		@scene.add @cameraLight 

		return

	update:()->
		if !@lightAuto
			@ambientLight.color.setRGB( @ambientLightColor[0]/0xFF, @ambientLightColor[1]/0xFF, @ambientLightColor[2]/0xFF )
			@cameraLight.color.setRGB( @cameraLightColor[0]/0xFF, @cameraLightColor[1]/0xFF, @cameraLightColor[2]/0xFF )

		@cameraLight.position.x = @camera.position.x
		@cameraLight.position.y = @camera.position.y
		@cameraLight.position.z = @camera.position.z