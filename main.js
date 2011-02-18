
var tick = 20;

var renderSystem = null;

var position1 = null;
var position2 = null;

var images = null;

function init() {
	renderSystem = new RenderSystem( "canvas", 600, 600 );
	
	position1 = {
		x: 268,
		y: 268
	};
	position2 = {
		x: 50,
		y: 50
	};
	
	onLoadDo( [ "black-hole.png", "projectile.png" ], function( loadedImages ) {
		images = loadedImages;
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
	position2.x += 50 * tick / 1000;
	position2.y += 50 * tick / 1000;
	renderSystem.render( [ position1, position2 ], images );
	
	setTimeout( main, tick );
}
