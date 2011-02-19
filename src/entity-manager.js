
function EntityManager() {
	this.entities = []
}

EntityManager.prototype.defineEntity = function( entityName, entity ) {
	this.entities.push( entity );
}

EntityManager.prototype.componentsByType = function( componentType ) {
	return this.entities.map( function( entity ) {
		return entity[ componentType ];
	} );
}
