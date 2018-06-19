function SetupOnMouseClick(){
    // Mouse-Click //
    //////////////////////////////////////////////////////////////////////////////////
    // this material causes a mesh to use colors assigned to faces
/*    var faceColorMaterial = new THREE.MeshBasicMaterial(
        { color: 0xffffff, vertexColors: THREE.FaceColors } );

    var sphereGeometry = new THREE.SphereGeometry( 80, 32, 16 );
    for ( var i = 0; i < sphereGeometry.faces.length; i++ )
    {
        face = sphereGeometry.faces[ i ];
        face.color.setRGB( 0, 0, 0.8 * Math.random() + 0.2 );
    }
    var sphere = new THREE.Mesh( sphereGeometry, faceColorMaterial );
    sphere.position.set( -100, 50, 0);
    scene.add(sphere);

    targetList.push(sphere);*/

    //////////////////////////////////////////////////////////////////////

    // initialize object to perform world/screen calculations
    projector = new THREE.Projector();

    // when the mouse moves, call the given function
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
//    SetupLabeledGeometry();
/*    var geometry = new THREE.SphereGeometry( 100, 100, 3 );
    geometry.mergeVertices();
    geometry.computeCentroids();
    var material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(300,300,0);
    scene.add(mesh);*/

/*    for (var i = 0; i < geometry.vertices.length; i++)
    {
        var spritey = makeTextSprite( "Earliest Dinosours" + i + " ", { fontsize: 32, backgroundColor: {r:255, g:255, b:255, a:1} } );
//        var spritey = makeTextSprite( "Earliest Dinosours" + i + " ", { fontsize: 32, backgroundColor: {r:255, g:100, b:100, a:1} } );
        spritey.position = geometry.vertices[i].clone().multiplyScalar(1.1);
        scene.add( spritey );
    }*/
}
function onDocumentMouseDown( event )
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
    var textX=0;
	console.log("Click.");

	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( targetList );

	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		console.log("Hit @ " + toString( intersects[0].point ) );
		// change the color of the closest face.
//		intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 );
//		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
/*        var spriteArtifact = makeTextSprite( " " + intersects[ 0 ].object.name + " ", { fontsize: 32, backgroundColor: {r:98, g:224, b:122, a:1},foregroundColor: {r:0, g:0, b:0, a:1}, borderColor: {r:0, g:0, b:0, a:1} } );
*//*        spriteArtifact.position.x = intersects[ 0 ].object.position.x - 6;
        spriteArtifact.position.y = intersects[ 0 ].object.position.y - 10;
        spriteArtifact.position.z = intersects[ 0 ].object.position.z + 2;*//*
        spriteArtifact.position.x = intersects[ 0 ].object.position.x - 6;
        spriteArtifact.position.y = intersects[ 0 ].object.position.y;
        spriteArtifact.position.z = intersects[ 0 ].object.position.z ;
        scene.add( spriteArtifact );*/
        if (intersects[ 0 ].object.name == "TextObject" || intersects[ 0 ].object.name == "deleteable"){
            for ( var i = 0; i < intersects.length; i++ ){
                if (intersects[ i ].object.name == "TextObject" || intersects[ i ].object.name == "deleteable"){
                    scene.remove(intersects[ i ].object);
                    targetList.pop(intersects[ i ].object);
//                    camera.lookAt(intersects[ 0 ].object.x, intersects[ 0 ].object.y, intersects[ 0 ].object.z);
//                    intersects[ i ].object.add(gyro);
                }
            }
        }
        else if (intersects[ 0 ].object.name != "TextObject" && !isBlank(intersects[ 0 ].object.name) && !isEmpty(intersects[ 0 ].object.name) ){
            if (mouse.x > 0){
                textX = intersects[ 0 ].object.position.x - 5;
            } else{
                textX = intersects[ 0 ].object.position.x + 5;
            }
            artifactX = intersects[ 0 ].object.position.x + 10;
            artifactY = intersects[ 0 ].object.position.y -100;
            artifactZ = intersects[ 0 ].object.position.z;
            var dataToCategorize = "Yvo de Boer said he left his job as the U.N.'s top climate official in frustration 18 months ago, believing the process of negotiating a meaningful climate agreement is failing.";
            getTermsFromPingar(intersects[ 0 ].object.name, function(ex,tags){
                if (ex){
                    showModalDialog("Pingar error");
                    return;
                }
                PingarData = tags;
                drawText(intersects[ 0 ].object.name + "              " + tags, textX , intersects[ 0 ].object.position.y -40, intersects[ 0 ].object.position.z);
            });

//            drawText(intersects[ 0 ].object.name, textX , intersects[ 0 ].object.position.y -40, intersects[ 0 ].object.position.z);
             try {
                 texturePainting = THREE.ImageUtils.loadTexture( intersects[ 0 ].object.uri, THREE.UVMapping, callbackPainting );
//                 texturePainting = THREE.ImageUtils.loadTexture( intersects[ 0 ].object.uri, THREE.UVMapping, callbackPainting(300,300,300) );
//             texturePainting = THREE.ImageUtils.loadTexture( 'https://lh4.googleusercontent.com/-Bp_ZAYDvB0s/Usxk6x34WyI/AAAAAAAAABY/3Q8fzALN2a4/s800/Screenshot%2520%25282%2529.jpg', THREE.UVMapping, callbackPainting );
             materialPaintingGlobal = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting } );
             }
             catch (err){
             var x = 1;
             }
        }
	}

}
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function toString(v) { return "[ " + v.x + ", " + v.y + ", " + v.z + " ]"; }

