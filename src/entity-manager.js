
function EntityManager() {
	this.entities = []
}

EntityManager.prototype.defineEntity = function( entityName, entity ) {
	entity.id = entityName;
	this.entities.push( entity );
}

EntityManager.prototype.componentsByType = function( componentType ) {
	var entityIds = this.entities.map( function( entity ) {
		return entity.id;
	} );

	var componentsOfThisType = this.entities.map( function( entity ) {
		return entity[ componentType ];
	} );
	
	return {
		entities: entityIds,
		components: componentsOfThisType
	};
}
