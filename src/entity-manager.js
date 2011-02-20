
function EntityManager() {
	this.entities = []
}

EntityManager.prototype.defineEntity = function( entityName, entity ) {
	entity.id = entityName;
	this.entities.push( entity );
}

EntityManager.prototype.addComponentToEntity = function( componentName, component, entityId ) {
	var entity = this.entities.filter( function( entity ) {
		return entity.id == entityId;
	} )[ 0 ];
	
	entity[ componentName ] = component;
}

EntityManager.prototype.componentsByType = function( componentType ) {
	var entitiesWithThisComponent = this.entities.filter( function( entity ) {
		return entity[ componentType ];
	} );
	
	var entityIds = entitiesWithThisComponent.map( function( entity ) {
		return entity.id;
	} );

	var componentsOfThisType = {};
	componentsOfThisType[ componentType ] = entitiesWithThisComponent.map( function( entity ) {
		return entity[ componentType ];
	} );
	
	return {
		entities: entityIds,
		components: componentsOfThisType
	};
}
