
function main() {
	var renderSystem = new RenderSystem( "canvas", 600, 600 );
	
	var position1 = {
		x: 284,
		y: 284
	};
	var position2 = {
		x: 50,
		y: 50
	};
	
	onLoadDo( [ "black-hole.png", "projectile.png" ], function( images ) {
		renderSystem.render( [ position1, position2 ], images );
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
