class CameraController

	camera 					: null

	rotation 					: 0
	y 							: 0

	radius						: 320
	radiusOffset 				: 0

	maxY 						: 100
	minY						: -100

	radiusfriction 				: 0.95


	constructor:(@camera)->

		return


	update:(vx, vy)->

		@rotation					+= vx
		@y 							+= vy
		@y 							= Math.max( Math.min( @y, @maxY ), @minY )
		
		if @y < @maxY-120
			@radiusOffset			+= (Math.abs(vy*10) - @radiusOffset)*.5
		else @radiusOffset			*= .95

		x 							= Math.cos(@rotation)*(@radius+@radiusOffset)
		y 							= @y
		z 							= Math.sin(@rotation)*(@radius+@radiusOffset)

		@camera.position.set( x,y,z )
		@camera.lookAt( new THREE.Vector3( 0,@y+vy*10,0) )
		return
