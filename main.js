
var tick = 20;

var renderSystem = null;

var position1 = null;

var images = null;

var projectile = {
	position: {
		x: 50,
		y: 50
	},
	
	imagePath: "projectile.png"
}

function init() {
	renderSystem = new RenderSystem( "canvas", 600, 600 );
	
	position1 = {
		x: 268,
		y: 268
	};
	
	onLoadDo( [ "black-hole.png", projectile.imagePath ], function( loadedImages ) {
		images = loadedImages;
		projectile.image = loadedImages[ 1 ];
		setTimeout( main, tick );
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
	projectile.position.x += 50 * tick / 1000;
	projectile.position.y += 50 * tick / 1000;
	renderSystem.render( [ position1, projectile.position ], [ images[0], projectile.image ] );
	
	setTimeout( main, tick );
}
