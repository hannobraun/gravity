
describe( "EntityManager", function() {

	it( "should return all components of a specific type.", function () {
		var entityManager = new EntityManager();
		
		entityManager.defineEntity( "entity1", {
			component1: {
				x: "x1"
			},
			component2: {
				y: "y1"
			}
		} );
		entityManager.defineEntity( "entity2", {
			component1: {
				x: "x2"
			},
			component2: {
				y: "y2"
			}
		} );
		
		var components = entityManager.componentsByType( "component1" );
		
		expect( components ).toEqual( [ { x: "x1" }, { x: "x2" } ] );
	} );
} );
