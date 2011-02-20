
function PhysicsSystem( tick ) {
	this.tick = tick;
}

PhysicsSystem.prototype.integratePosition = function( positions, speeds ) {
	for ( var i = 0; i < positions.length; i++ ) {
		positions[ i ].x += speeds[ i ].x * this.tick / 1000;
		positions[ i ].y += speeds[ i ].y * this.tick / 1000;
	}
}
