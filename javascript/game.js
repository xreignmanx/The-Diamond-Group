window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {

        // Creates a basic Babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        
        // creates a box object
        var box = BABYLON.Mesh.CreateBox("Box",4,0,scene);

        // creates a camera and attaches it to the scene. an "arc" camera will rotate around a target in an arc
        var camera =  new BABYLON.ArcRotateCamera("arcCamera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        10.0, box.position,scene);
        // attaches the camera to the canvas
        camera.attachControl(canvas,true);
        // Create a light, and add a color to it
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0,10,7), scene);
        light.diffuse = new BABYLON.Color3(1,0,0);
        // Create a built-in "sphere" shape. 
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
        sphere.position.y = 1;
        sphere.position.x = -7;
        // Create a built-in "ground" shape.
        var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:6, width:6, subdivisions: 2}, scene);
        ground.position.y = -2;

        var light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0,1,-2), scene);
        light.diffuse = new BABYLON.Color3(.8,0,.8);

        return scene;
    }
    // This is calling the scene we created
    var scene = createScene();
    // will run code in here once per refresh, as fast as computer can go
    engine.runRenderLoop( function () {
        scene.render();
    });
    // this will handle resizing the canvas/window
    window.addEventListener('resize', function() {
        engine.resize();
    });
    
});