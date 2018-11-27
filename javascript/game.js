window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);

// game variables
        // ***
        // Primary resource, gold
        var gold = 0;
        var createGold = function() {
                    gold++;
                    console.log(gold);
                };
        // This creates the scene.
    var createScene = function () {


        



        
        // Creates a basic Babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.Black();        

        // Create a built-in "ground" shape.
        var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:100, width:100, subdivisions: 5}, scene);
        // sets the ground lower than the default placement of objects.
        ground.position.y = -2;
        // Create a built-in "sphere" shape and sets it's positing above the ground. 
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
        sphere.position.y = 1;
        sphere.position.x = -7;
        // creates an action manager for our sphere. This will add to the gold variable. 
        sphere.actionManager = new BABYLON.ActionManager(scene);
        // listen for clicks on our sphere, later to be our shrine
        sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                                            trigger: BABYLON.ActionManager.OnLeftPickTrigger},
                                            function () {
                                                createGold();
                                            }
                                               ));
        
        // create a camera that will rotate around the sphere, which will be the  'shrine' of our clicker game
        var camera =  new BABYLON.ArcRotateCamera("arcCamera",
                BABYLON.Tools.ToRadians(45),
                BABYLON.Tools.ToRadians(45),
                10.0, sphere.position,scene);
        // attaches view controls to the camera. Left off for now since we might not want the player to look around. 
        // camera.attachControl(canvas,true);
        // Create a light, and add a color to it
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0,10,7), scene);
        light.diffuse = new BABYLON.Color3(1,1,1);



        var light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0,1,-2), scene);
        light2.diffuse = new BABYLON.Color3(0,0,0);

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



    // test test test test
    //When click event is raised
    window.addEventListener("click", function (event) {
    // We try to pick an object
        var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        
        console.log(pickResult.pickedPoint.x);
        console.log(this);
        console.log(event);

    });

    // window.addEventListener("click", function(){
    //     var pickResult = scene.pick(scene.pointerX,scene.pointerY);
    //     this.console.log(pickResult);
    // })
    // action manager for clicks
    // sphere.actionManager = new BABYLON.ActionManager(scene);
    

 
});