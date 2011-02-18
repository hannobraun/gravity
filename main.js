
function main() {
	var renderSystem = new RenderSystem( "canvas", 600, 600 );
	
	var position = {
		x: 284,
		y: 284
	}

	var image = new Image();	
	image.onload = function() {
		renderSystem.render( [ position ], [ image ] );
	}
	image.src = "black.png";
}
