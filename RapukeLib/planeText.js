/**
 * Created by dwhi045 on 1/11/14.
 */
function getPowerOfTwo(value, pow) {
    var pow = pow || 1;
    while(pow<value) {
        pow *= 2;
    }
    return pow;
}

function measureText(ctx, textToMeasure) {
    return ctx.measureText(textToMeasure).width;
}

function createMultilineText(ctx, textToWrite, maxWidth, text) {
    textToWrite = textToWrite.replace("\n"," ");
    var currentText = textToWrite;
    var futureText;
    var subWidth = 0;
    var maxLineWidth = 0;

    var wordArray = textToWrite.split(" ");
    var wordsInCurrent, wordArrayLength;
    wordsInCurrent = wordArrayLength = wordArray.length;

    while (measureText(ctx, currentText) > maxWidth && wordsInCurrent > 1) {
        wordsInCurrent--;
        var linebreak = false;

        currentText = futureText = "";
        for(var i = 0; i < wordArrayLength; i++) {
            if (i < wordsInCurrent) {
                currentText += wordArray[i];
                if (i+1 < wordsInCurrent) { currentText += " "; }
            }
            else {
                futureText += wordArray[i];
                if( i+1 < wordArrayLength) { futureText += " "; }
            }
        }
    }
    text.push(currentText);
    maxLineWidth = measureText(ctx, currentText);

    if(futureText) {
        subWidth = createMultilineText(ctx, futureText, maxWidth, text);
        if (subWidth > maxLineWidth) {
            maxLineWidth = subWidth;
        }
    }

    return maxLineWidth;
}

function drawText(textToWrite, textToWriteX, textToWriteY, textToWriteZ) {
    var canvasX, canvasY;
    var textX, textY;

    var text = [];

    var maxWidth = 256;
    var squareTexture = false;

    var textHeight = 10;
    var textAlignment = "left";
    var textColour = "#333";
    var fontFamily = "optimer";

    var backgroundColour = "#FFF";

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    ctx.font = textHeight+"px "+fontFamily;
    if (maxWidth && measureText(ctx, textToWrite) > maxWidth ) {
        maxWidth = createMultilineText(ctx, textToWrite, maxWidth, text);
        canvasX = maxWidth; //getPowerOfTwo(maxWidth);
    } else {
        text.push(textToWrite);
        canvasX = ctx.measureText(textToWrite).width; //getPowerOfTwo(ctx.measureText(textToWrite).width);
    }
    canvasY = textHeight*(text.length+1); //getPowerOfTwo(textHeight*(text.length+1));
/*    if(squareTexture) {
        (canvasX > canvasY) ? canvasY = canvasX : canvasX = canvasY;
    }
    document.getElementById('calculatedWidth').value = canvasX;
    document.getElementById('calculatedHeight').value = canvasY;*/

    canvas.width = canvasX;
    canvas.height = canvasY;

    switch(textAlignment) {
        case "left":
            textX = 0;
            break;
        case "center":
            textX = canvasX/2;
            break;
        case "right":
            textX = canvasX;
            break;
    }
    textY = canvasY/2;

    ctx.fillStyle = backgroundColour;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = textColour;
    ctx.textAlign = textAlignment;

    ctx.textBaseline = 'top'; // top, middle, bottom
    ctx.font = textHeight+"px "+fontFamily;

    var offset = 0; //(canvasY - textHeight*(text.length+1)) * 0.5;

    for(var i = 0; i < text.length; i++) {
        if(text.length > 1) {
            textY = (i+1)*textHeight + offset;
        }
        ctx.fillText(text[i], textX,  textY);
    }
// Show 1
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
//    var material = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false, alignment: THREE.SpriteAlignment.topLeft });
    material.transparent = true;
    material.needsUpdate = true;
    material.transparent = true;
    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas.width, canvas.height),
        material);
//    mesh1.position.set(0,50,0);
    mesh1.position.x = textToWriteX;
    mesh1.position.y = textToWriteY;
    mesh1.position.z = textToWriteZ;
    if (camera.position.x < 0){
        mesh1.rotation.y = -Math.PI / 2;
    }
    else{
        mesh1.rotation.y = -(Math.PI * 3)/2;
    }
    mesh1.name = "TextObject";
//    artifactHeight = mesh1.height;

        mesh1.quaternion = camera.quaternion;
    scene.add( mesh1 );
    targetList.push(mesh1);
//    mesh1.add(gyro);

/*    //var textObject = new THREE.Sprite(material);
    var textObject = new THREE.Object3D();
    var sprite = new THREE.Sprite(material);
//    textObject.textHeight = textHeight;
//    textObject.textWidth = (maxWidth / textHeight) * textObject.textHeight;
    textObject.Height = textY;
    textObject.Width = textX;
//    sprite.scale.set(maxWidth / textHeight * textHeight, textHeight, 1);
    sprite.scale.set(300,150,1.0);

    textObject.add(sprite);
    textObject.position.x = textToWriteX;
    textObject.position.y = textToWriteY;
    textObject.position.z = textToWriteZ;
    textObject.name = "TextObject";
    scene.add(textObject);*/
//    targetList.push(textObject);
//    targetList.push(sprite);
    // canvas contents will be used for a texture
/*    var planeTexture = new THREE.Texture(canvas);
    planeTexture.needsUpdate = true;
    var planeMaterial = new THREE.MeshBasicMaterial( { map: planeTexture, side: THREE.DoubleSide } );
    var planeGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    var descriptionPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    descriptionPlane.position.x = textToWriteX;
    descriptionPlane.position.y = textToWriteY;
    descriptionPlane.position.z = textToWriteZ;
    descriptionPlane.rotation.y = -Math.PI / 2;
    scene.add(descriptionPlane);*/
}
