
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



function RenderSystem( canvasId, width, height ) {
	this.canvas = document.getElementById( canvasId );
	this.context = this.canvas.getContext( "2d" );
	
	this.canvas.width = width;
	this.canvas.height = height;
}

RenderSystem.prototype.render = function( positions, images ) {
	for ( var i = 0; i < positions.length; i++ ) {
		var pos = positions[ i ];
		var image = images[ i ];
		
		this.context.drawImage( image, pos.x, pos.y );		
	}
}
