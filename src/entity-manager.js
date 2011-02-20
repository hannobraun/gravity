
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

EntityManager.prototype.componentsByType = function( componentTypes ) {
	var entitiesWithTheseComponents = this._findEntitiesWithTheseComponents( componentTypes );
	
	var entityIds = entitiesWithTheseComponents.map( function( entity ) {
		return entity.id;
	} );

	var components = {};
	for ( var i = 0; i < componentTypes.length; i++ ) {
		components[ componentTypes[ i ] ] = entitiesWithTheseComponents.map( function( entity ) {
			return entity[ componentTypes[ i ] ];	
		} );
	}
	
	return {
		entities: entityIds,
		components: components
	};
}

EntityManager.prototype._findEntitiesWithTheseComponents( componentTypes ) {
	return this.entities.filter( function( entity ) {
		var hasAllComponents = true;
		for ( var i = 0; i < componentTypes.length; i++ ) {
			if ( !entity[ componentTypes[ i ] ] ) {
				hasAllComponents = false;
			}
		}
		return hasAllComponents;
	} );
}
