class Tentacle

	PI180				: Math.PI/180

	materials 			: []
	materialIndex 		: 1

	nodes 				: []
	numNodes 			: 30

	mesh 				: null

	# dimension
	headRadius 			: 18.0	
	girth	 			: 6.4 
	reduction 			: 1.0

	# locomotion efficiency (0 - 1)
	speed			 	: 0.1
	
	# the viscosity
	friction 			: 0.95

	# muscular range
	muscleRange 		: 30*Math.PI/180

	# muscular frequency  influence the update of count, less is faster
	frequency	  		: 0.08

	vector				: 0
	angle				: 0

	# update each frame += frequency
	count				: 0
	forceAngle 			: 0*Math.PI/180

	segmentsX 			: 11


	constructor:()->
		@createNodes()
		@createMesh()
		return
		

	createMesh:()->
		@materials.push new THREE.MeshBasicMaterial({wireframe:true, color:0xBBBBBB})
		@materials.push new THREE.MeshNormalMaterial()
		@materials.push new THREE.MeshPhongMaterial(color:0x333333)
		@materials.push new THREE.MeshLambertMaterial(color:0x333333)

		# THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
		geometry = new THREE.CylinderGeometry( @headRadius, 0, @numNodes*10, @segmentsX-1, @numNodes-1, true )

		@mesh = new THREE.Mesh(geometry, @materials[2])
		return


	createNodes:()->
		for i in [0...@numNodes] by 1
			@nodes.push( {x:0, y:0, vx:0, vy:0} )
		return


	#Not based on the nodes, test only
	updateMesh:()->
		vertices = @mesh.geometry.vertices
		for i in [0...@numNodes] by 1
			for j in [0...@segmentsX] by 1
			 	vertice = vertices[i*@segmentsX+j]
			 	vertice.y = i*@girth
			 	
			 	ondulationX = Math.cos(i/(@numNodes-1)*Math.PI*2+@count)*10
			 	ondulationZ = Math.cos(i/(@numNodes-1)*Math.PI*2+@count)*10

			 	radius = @headRadius - @headRadius*(i/@numNodes)*@reduction
			 	# console.log (i/11*@reduction)

			 	vertice.x = Math.cos(j/10*Math.PI*2+@count/10)*radius + ondulationX
			 	vertice.z = Math.sin(j/10*Math.PI*2+@count/10)*radius + ondulationZ


		@mesh.geometry.verticesNeedUpdate = true	# need for update the geometry
		@mesh.geometry.computeBoundingSphere() 		# need to know if it's inside the viewport
		@mesh.geometry.normalsNeedUpdate = true		# need for correct lighting
		@mesh.geometry.computeVertexNormals()		# need for correct lighting 
		# @mesh.geometry.computeFaceNormals()			# need for correct lighting 

		@mesh.material = @materials[@materialIndex] # todo : for test material only, remove later
		return


	#based on the nodes
	updateMesh2:()->
		vertices = @mesh.geometry.vertices
		for i in [0...@numNodes] by 1
			node = @nodes[i]
			for j in [0...@segmentsX] by 1
			 	vertice = vertices[i*@segmentsX+j]
			 	vertice.y = i*@girth #node.y

			 	ondulationX = node.x
			 	ondulationZ = node.y

			 	radius = @headRadius - @headRadius*(i/@numNodes)*@reduction

			 	vertice.x = Math.cos(j/10*Math.PI*2)*radius+node.x
			 	vertice.z = Math.sin(j/10*Math.PI*2)*radius+node.x


		@mesh.geometry.verticesNeedUpdate = true	# need for update the geometry
		@mesh.geometry.computeBoundingSphere() 		# need to know if it's inside the viewport
		@mesh.geometry.normalsNeedUpdate = true		# need for correct lighting
		@mesh.geometry.computeVertexNormals()		# need for correct lighting 
		@mesh.geometry.computeFaceNormals()			# need for correct lighting 

		@mesh.material = @materials[@materialIndex] # todo : for test material only, remove later
		return

	
	update:()->

		# @vector += 0.5 - Math.random()
		# @angle 	+= @vector
		# @vector	*= @friction
		@count 	+= @frequency	

		#work in progress
		# angleRadian = @angle*@PI180
		
		# @nodes[0].x = @headRadius*Math.cos(angleRadian)
		# @nodes[0].y = @headRadius*Math.sin(angleRadian)

		# angle = 0
		# @forceAngle = Math.sin(@count/6)*720-360
		# ax = 0
		
		# prevNode = @nodes[0]


		# Cinetic effect : multiply the forces down through the nodes
		# for i in [1...@numNodes] by 1
			
		# 	ax 	  += (@forceAngle*@PI180-ax)*.5
		# 	angle += (ax-angle)*.05

		# 	node = @nodes[i]

		# 	node.x = prevNode.x + Math.cos(angle)*5
		# 	node.y = prevNode.y + Math.sin(angle)*5

		# 	prevNode = node

		@updateMesh()

		return

