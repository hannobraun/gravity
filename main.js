
var tick = 20;

var renderSystem = null;



var projectile = {
	position: {
		x: 50,
		y: 50
	},
	
	imagePath: "projectile.png"
}
var blackHole = {
	position: {
		x: 268,
		y: 268
	},
	
	imagePath: "black-hole.png"
}

var entities = [ projectile, blackHole ]



function init() {
	renderSystem = new RenderSystem( "canvas", 600, 600 );
	
	onLoadDo( [ projectile.imagePath, blackHole.imagePath ], function( loadedImages ) {
		projectile.image = loadedImages[ 0 ];
		blackHole.image = loadedImages[ 1 ];
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
	renderSystem.render( [ projectile.position, blackHole.position ], [ projectile.image, blackHole.image ] );
	
	setTimeout( main, tick );
}
