
var tick = 20;

var entityManager = null;

var renderSystem = null;



function init() {
	renderSystem = new RenderSystem( "canvas", 600, 600 );
	entityManager = new EntityManager();
	
	entityManager.defineEntity( "projectile", {
		position: {
			x: 50,
			y: 50
		},
	
		speed: {
			x: 50,
			y: 50
		},
	
		imagePath: "projectile.png"
	} );
	entityManager.defineEntity( "blackHole", {
		position: {
			x: 268,
			y: 268
		},
		
		imagePath: "black-hole.png"
	} );
	
	var imagePaths = entityManager.componentsByType( [ "imagePath" ] );
	onLoadDo( imagePaths.components[ "imagePath" ], function( loadedImages ) {
		for ( var i = 0; i < imagePaths.entities.length; i++ ) {
			entityManager.addComponentToEntity( "image", loadedImages[ i ], imagePaths.entities[ i ] );
		}
		main();
	} );
}

function onLoadDo( imagePaths, fn ) {
	
	var waitingForImages = 0;
	var images = [];
	
	for ( var i = 0; i < imagePaths.length; i++ ) {
		waitingForImages++;
		
		var image = new Image();
		images.push( image );
		
		image.onload = function() {
			waitingForImages--;
			if ( waitingForImages == 0 ) {
				fn( images );
			}
		}
		
		image.src = imagePaths[ i ];
	}
}

function main() {
	var positionsAndSpeeds = entityManager.componentsByType( [ "position", "speed" ] );
	integratePosition( positionsAndSpeeds.components[ "position" ], positionsAndSpeeds.components[ "speed" ] );
	
	var positionsAndImages = entityManager.componentsByType( [ "position", "image" ] );
	renderSystem.render( positionsAndImages.components[ "position" ], positionsAndImages.components[ "image" ] );
	
	setTimeout( main, tick );
}

function integratePosition( positions, speeds ) {
	for ( var i = 0; i < positions.length; i++ ) {
		positions[ i ].x += speeds[ i ].x * tick / 1000;
		positions[ i ].y += speeds[ i ].y * tick / 1000;
	}
}
