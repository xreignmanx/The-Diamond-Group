window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        var camera =  new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0,5,-10));
        camera.setTarget(BABYLON.Vector3.Zero());
        var box = BABYLON.Mesh.CreateBox("Box",4,0,scene);
        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop( function () {
        scene.render();
    });
});


// Creates a basic Babylon scene object
var scene = new BABYLON.Scene(engine);

// Creates and positions a free camera
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

// targets the camera to scene origin

// attaches the camera to the canvas
camera.attachControl(canvas, true);

// Creates a light
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,1,0), scene);

