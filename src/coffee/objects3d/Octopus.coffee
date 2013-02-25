class Octopus

	tentacles 			: []

	sphere 				: null

	scene 				: null

	constructor:(@scene)->
		
		for i in [0...20] by 1
			@tentacle = new Tentacle()
			@tentacle.mesh.rotation.x = Math.PI*2*Math.random()
			@tentacle.mesh.rotation.y = Math.PI*2*Math.random()
			@tentacle.mesh.rotation.z = Math.PI*2*Math.random()

			@scene.add @tentacle.mesh
			
			@tentacles[i] = @tentacle

		geometry = new THREE.SphereGeometry( 50 )
		@sphere = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:0xFFFFFF}) )
		@scene.add @sphere

		geometry = new THREE.SphereGeometry( 60 )
		@sphere = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:0xFFFFFF,opacity:.2, transparent:true}) )
		@scene.add @sphere
		return


	update:()->
		for tentacle in @tentacles
			tentacle.update()

		@sphere.scale.x = @sphere.scale.y = @sphere.scale.z = 1+.04*Math.sin(tentacle.count)
		return