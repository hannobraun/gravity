
describe( "EntityManager", function() {

	var entityManager = null;
	
	beforeEach( function() {
		entityManager = new EntityManager();
		
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
	} );

	it( "should return all components of a specific type.", function () {
		var result = entityManager.componentsByType( "component1" );
		
		expect( result.entities ).toEqual( [ "entity1", "entity2" ] );
		expect( result.components ).toEqual( [ { x: "x1" }, { x: "x2" } ] );
	} );
	
	it( "should return only those entities that actually have the specified component.", function() {
		entityManager.defineEntity( "entity3", {
			component2: {
				y: "y3"
			}
		} );
		
		var result = entityManager.componentsByType( "component1" );
		
		expect( result.entities ).toEqual( [ "entity1", "entity2" ] );
		expect( result.components ).toEqual( [ { x: "x1" }, { x: "x2" } ] );
	} );
	
	it( "should allow for adding a component to an entity.", function() {
		var newComponent = {
			z: "z1"
		}
		entityManager.addComponentToEntity( "component3", newComponent, "entity1" );
		
		var result = entityManager.componentsByType( "component3" );
		
		expect( result.entities ).toEqual( [ "entity1" ] );
		expect( result.components ).toEqual( [ newComponent ] );
	} );
} );
