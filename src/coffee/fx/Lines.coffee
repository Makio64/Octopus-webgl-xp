class Lines 

	distance 			: 600
	amount 				: 60
	mouse_streng	 	: .7
	line_alpha 			: .6
	geometry 			: new THREE.Geometry()
	particles 			: null
	# line 				: null
	count 				: 0

	
	constructor : (@camera, @scene) ->

		material = new THREE.ParticleBasicMaterial(
			color: 0xFFFFFF
			size: 16
			opacity: 0
			map: THREE.ImageUtils.loadTexture("./img/particle.png")
			transparent: true
		)
		
		for i in [0..@amount] by 1
			vectorf = new THREE.Vector3((Math.random() * 2 - 1) * @distance, (Math.random() * 2 - 1) * @distance, (Math.random() * 2 - 1) * @distance)
			@geometry.vertices.push vectorf

		TweenLite.to(material,2.6,
			opacity	: 1
			ease 	: Quad.EaseIn
		)
		
		@particles = new THREE.ParticleSystem(@geometry, material)
		
		# materialLine = new THREE.LineBasicMaterial(
		# 	color: 0xCCCCCC
		# 	opacity: .6
		# 	transparent: true
		# )

		# @line = new THREE.Line(@geometry.clone(), materialLine)

		@scene.add @particles
		# @scene.add @line

	update :() ->
		vertices = @geometry.vertices
		for i in [0...vertices.length] by 1
			vertice = vertices[i]
			vertice.y += Math.sin((@count/100)+(i/10))*.5
		@geometry.verticesNeedUpdate = true
		@count+=1 
		@camera.lookAt(scene.position)

