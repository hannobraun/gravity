
describe( "PhysicsSystem", function() {
	
	it( "should integrate the speed according to the given tick.", function() {
		var tick = 20;
		var physicsSystem = new PhysicsSystem( tick );
		
		var position = {
			x: 0,
			y: 0
		};
		var speed = {
			x: 1000,
			y: 1000
		};
		
		physicsSystem.integratePosition( [ position ], [ speed ] );
		
		expect( position ).toEqual( { x: 20, y: 20 } );
	} );
} );
