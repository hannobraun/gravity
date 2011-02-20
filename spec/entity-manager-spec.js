
describe( "EntityManager", function() {

	var componentX1 = {
		x: "x1"
	};
	var componentX2 = {
		x: "x2"
	};
	var componentY1 = {
		y: "y1"
	};
	var componentY2 = {
		y: "y2"
	};

	var entityManager = null;
	
	beforeEach( function() {
		entityManager = new EntityManager();
		
		entityManager.defineEntity( "entity1", {
			componentX: componentX1,
			componentY: componentY1
		} );
		entityManager.defineEntity( "entity2", {
			componentX: componentX2,
			componentY: componentY2
		} );
	} );

	it( "should return all components of a specific type.", function () {
		var result = entityManager.componentsByType( "componentX" );
		
		expect( result.entities ).toEqual( [ "entity1", "entity2" ] );
		expect( result.components ).toEqual( [ componentX1, componentX2 ] );
	} );
	
	it( "should return only those entities that actually have the specified component.", function() {
		entityManager.defineEntity( "entity3", {
			component2: {
				y: "y3"
			}
		} );
		
		var result = entityManager.componentsByType( "componentX" );
		
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
