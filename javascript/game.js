window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {

        // Creates a basic Babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        
        // creates a box object
        var box = BABYLON.Mesh.CreateBox("Box",4,0,scene);


        var camera =  new BABYLON.ArcRotateCamera("arcCamera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        10.0, box.position,scene);
        camera.attachControl(canvas,true);

        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0,10,0), scene);
        light.diffuse = new BABYLON.Color3(1,0,0);

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop( function () {
        scene.render();
    });
});


// var scene = new BABYLON.Scene(engine);

// Creates and positions a free camera
// var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

// targets the camera to scene origin

// attaches the camera to the canvas
// camera.attachControl(canvas, true);

// Creates a light
// var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,1,0), scene);

