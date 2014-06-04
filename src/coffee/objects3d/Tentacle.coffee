class Tentacle

	PI180				: Math.PI/180

	materials 			: []
	materialIndex 		: 0

	numNodes 			: 10

	mesh 				: null

	# dimension
	headRadius 			: 18.0	
	girth	 			: 6.4 
	reduction 			: 1.0

	# muscular frequency  influence the update of count, less is faster
	frequency			: 0.08
	# update each frame += frequency
	count				: 0

	segmentsX 			: 11


	constructor:()->
		@createMesh()
		return
		

	createMesh:()->
		@materials.push new THREE.MeshBasicMaterial({wireframe:true, color:0})
		@materials.push new THREE.MeshNormalMaterial()
		@materials.push new THREE.MeshPhongMaterial(color:0x333333)
		@materials.push new THREE.MeshLambertMaterial(color:0x333333)
		geometry = new THREE.CylinderGeometry( @headRadius, 0, @numNodes*10, @segmentsX-1, @numNodes-1, true )

		@mesh = new THREE.Mesh(geometry, @materials[@materialIndex])
		return

	updateMesh:()->
		vertices = @mesh.geometry.vertices
		M_2PI = Math.PI*2
		M_count_10 = @count/10;

		for i in [0...@numNodes] by 1
			for j in [0...@segmentsX] by 1
			 	vertice = vertices[i*@segmentsX+j]
			 	vertice.z = i*@girth
			 	
			 	ondulation = Math.cos(i/(@numNodes-1)*M_2PI+@count)*10

			 	radius = @headRadius - @headRadius*(1-i/(@numNodes-1))*@reduction

			 	angle = j/10*M_2PI+M_count_10

			 	vertice.y = Math.cos(angle)*radius + ondulation
			 	vertice.x = Math.sin(angle)*radius + ondulation

		@mesh.geometry.verticesNeedUpdate = true	# need for update the geometry
		@mesh.geometry.normalsNeedUpdate = true		# need for correct lighting

		@mesh.material = @materials[@materialIndex] # todo : for test material only, remove later
		return
	
	update:()->
		@count += @frequency	
		@updateMesh()


		return

