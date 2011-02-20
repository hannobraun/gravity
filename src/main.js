
var tick = 20;

var entityManager = null;

var physicsSystem = null;
var renderSystem = null;



function init() {
	entityManager = new EntityManager();
	
	physicsSystem = new PhysicsSystem( tick );
	renderSystem = new RenderSystem( "canvas", 600, 600 );
	
	entityManager.defineEntity( "projectile", {
		position: new Vector( 200, 200 ),
		speed: new Vector( 50, -50 ),
		
		affectedByGravity: {
			mass: 10000000000000000000000000000
		},
	
		imagePath: "gfx/projectile.png"
	} );
	entityManager.defineEntity( "projectile2", {
		position: new Vector( 150, 150 ),
		speed: new Vector( 50, -50 ),
		
		affectedByGravity: {
			mass: 10000000000000000000000000000
		},
	
		imagePath: "gfx/projectile.png"
	} );
	entityManager.defineEntity( "projectile3", {
		position: new Vector( 240, 240 ),
		speed: new Vector( -60, 60 ),
		
		affectedByGravity: {
			mass: 10000000000000000000000000000
		},
	
		imagePath: "gfx/projectile.png"
	} );
	entityManager.defineEntity( "blackHole", {
		position: new Vector( 268, 268 ),
		
		gravitySource: {
			//mass: 1000000
			mass: 10000000000000000
		},
		
		imagePath: "gfx/black-hole.png"
	} );
	/*entityManager.defineEntity( "blackHole2", {
		position: new Vector( 500, 250 ),
		
		gravitySource: {
			//mass: 1000000
			mass: 10000000000000000
		},
		
		imagePath: "gfx/black-hole.png"
	} );*/
	
	var imagePaths = entityManager.componentsByType( [ "imagePath" ] );
	loadImagesAndDo( imagePaths.components[ "imagePath" ], function( loadedImages ) {
		for ( var i = 0; i < imagePaths.entities.length; i++ ) {
			entityManager.addComponentToEntity( "image", loadedImages[ i ], imagePaths.entities[ i ] );
		}
		main();
	} );
}

function main() {
	var positionAndGravitySource = entityManager.componentsByType( [ "position", "gravitySource" ] );
	var positionAndSpeedAndAffectedByGravity = entityManager.componentsByType( [ "position", "speed", "affectedByGravity" ] );
	physicsSystem.integrateSpeed(
		positionAndGravitySource.components[ "position" ],
		positionAndGravitySource.components[ "gravitySource" ],
		positionAndSpeedAndAffectedByGravity.components[ "position" ],
		positionAndSpeedAndAffectedByGravity.components[ "speed" ],
		positionAndSpeedAndAffectedByGravity.components[ "affectedByGravity" ]
	);

	var positionsAndSpeeds = entityManager.componentsByType( [ "position", "speed" ] );
	physicsSystem.integratePosition( positionsAndSpeeds.components[ "position" ], positionsAndSpeeds.components[ "speed" ] );
	
	var positionsAndImages = entityManager.componentsByType( [ "position", "image" ] );
	renderSystem.render( positionsAndImages.components[ "position" ], positionsAndImages.components[ "image" ] );
	
	setTimeout( main, tick );
}
