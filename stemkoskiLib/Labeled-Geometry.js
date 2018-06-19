function SetupLabeledGeometry(){
    var geometry = new THREE.SphereGeometry( 100, 4, 3 );
    geometry.mergeVertices();
    geometry.computeCentroids();
    var material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,0,0);
    scene.add(mesh);
    groupEvent = THREE.Object3D();
/*    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();*/
//    groupEvent.add(mesh); fails when this is on
    for (var i = 0; i < geometry.vertices.length; i++)
    {
        var spritey = makeTextSprite( "Earliest Dinosours" + i + " ", { fontsize: 32, backgroundColor: {r:255, g:255, b:255, a:1} } );
//        var spritey = makeTextSprite( "Earliest Dinosours" + i + " ", { fontsize: 32, backgroundColor: {r:255, g:100, b:100, a:1} } );
        spritey.position = geometry.vertices[i].clone().multiplyScalar(1.1);
        scene.add( spritey );
//        groupEvent.add(spritey)
    }
    scene.add( groupEvent );
}

function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 1;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

	//var spriteAlignment = parameters.hasOwnProperty("alignment") ?
	//	parameters["alignment"] : THREE.SpriteAlignment.topLeft;

	var spriteAlignment = THREE.SpriteAlignment.topLeft;
//    var spriteAlignment = THREE.SpriteAlignment.bottomLeft;

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
//	context.font = "Bold " + fontsize + "px " + fontface;
    context.font = "Normal " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
//    var textSize = 12;
//    canvas.width = 500;
//    canvas.width = getPowerOfTwo(context.measureText(message).width);
//    canvas.height = getPowerOfTwo(2*fontsize);
//    var w = getPowerOfTwo(context.measureText(message).width);
//    var y = getPowerOfTwo(2*fontsize);

    context.font = "Normal " + fontsize + "px " + fontface;
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial(
    { map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
	var sprite = new THREE.Sprite( spriteMaterial );
//	sprite.scale.set(100,50,1.0);
	sprite.scale.set(100,50,1.0);
//    sprite.scale.set(1,1,1.0);
	return sprite;
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}
function getPowerOfTwo(value ){
    var pow = pow || 1;
    while(pow<value) {
        pow *= 2;
    }
    return pow;
}

