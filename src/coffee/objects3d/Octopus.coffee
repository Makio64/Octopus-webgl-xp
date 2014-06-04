class Octopus

	tentacles 			: []

	sphere 				: null

	scene 				: null

	constructor:(@scene)->

		for i in [0...16] by 1
			tentacle = new Tentacle()
			tentacle.mesh.position = @orbit(Math.PI*2*Math.random(),Math.PI*2*Math.random(),100)
			tentacle.mesh.lookAt(new THREE.Vector3(0,0,0))
			@scene.add tentacle.mesh
			
			@tentacles[i] = tentacle

		geometry = new THREE.SphereGeometry( 64 )
		@sphere = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:0,opacity:.9, transparent:true}) )
		@scene.add @sphere
		return

	orbit:(phi, theta, diameter)->
		p = new THREE.Vector3();
		p.x = diameter * Math.sin(phi) * Math.cos(theta)
		p.z = diameter * Math.sin(phi) * Math.sin(theta)
		p.y = diameter * Math.cos(phi)
		return p

	update:()->
		for tentacle in @tentacles
			tentacle.update()

		@sphere.scale.x = @sphere.scale.y = @sphere.scale.z = 1+.04*Math.sin(tentacle.count)
		return