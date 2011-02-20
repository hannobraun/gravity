
function EntityManager() {
	this.entities = []
}

EntityManager.prototype.defineEntity = function( entityName, entity ) {
	entity.id = entityName;
	this.entities.push( entity );
}

EntityManager.prototype.componentsByType = function( componentType ) {
	var entitiesWithThisComponent = this.entities.filter( function( entity ) {
		return entity[ componentType ];
	} );
	
	var entityIds = entitiesWithThisComponent.map( function( entity ) {
		return entity.id;
	} );

	var componentsOfThisType = entitiesWithThisComponent.map( function( entity ) {
		return entity[ componentType ];
	} );
	
	return {
		entities: entityIds,
		components: componentsOfThisType
	};
}
