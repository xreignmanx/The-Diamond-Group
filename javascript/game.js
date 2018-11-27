// game variables
        // ***
        // Primary resource, gold
        var gold = 0;
        //  These are createFunctions which will be called by the mesh.action managers for each object.
        // Handles the main gold distribution
        var createGold = function() {
                    gold++;
                    console.log(gold);
                };

        var createSoldier = function() {
            console.log("soldier");
        };
        var createKnight = function() {
            console.log("knight");
        };
        var createArcher = function() {
            console.log("archer");
        };



window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);





        // This creates the scene.
    var createScene = function () {


        



        
        // Creates a basic Babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.ambientColor = new BABYLON.Color3(1, 1, 1);
        scene.clearColor = new BABYLON.Color3.Black();        

        // Create a ground for our game.

        // ground texture
        var grassTexture = new BABYLON.StandardMaterial('grassTexture', scene);
        grassTexture.diffuseTexture = new BABYLON.Texture("http://www.kkgaa.com/wp-content/uploads/2016/06/3-lawn-seamless-grass-texture.jpg", scene);

        // Ground variables
        var xmin = -20;
        var zmin = -10;
        var xmax =  10;
        var zmax =  10;
        var precision = {
            "w" : 2,
            "h" : 2
        };
        var subdivisions = {
            'h' : 30,
            'w' : 10
        };
        var tiledGround = new BABYLON.Mesh.CreateTiledGround('ground1', xmin, zmin, xmax, zmax, subdivisions, precision, scene);

        // apply the grass texture
        tiledGround.material = grassTexture;

        // sets the ground lower than the default placement of objects.
        tiledGround.position.y = -2;


        // ****Shrine****

        // Create a built-in "sphere" shape and sets it's positing above the ground. 
        var shrine = BABYLON.MeshBuilder.CreateSphere('shrine', {segments:8, diameter:1}, scene);
        // shrine position should be in the middle of the lower portion of the screen. Positive values corelate to lower on the screen here.
        shrine.position.y = 0;
        shrine.position.x = 6;
        // creates an action manager for our shrine. This will add to the gold variable. 
        shrine.actionManager = new BABYLON.ActionManager(scene);
        // listen for clicks on our shrine, later to be our shrine
        shrine.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                                            trigger: BABYLON.ActionManager.OnLeftPickTrigger},
                                            function () {
                                                createGold();
                                            }
                                            ));



        //                       ****barracks****

        // barracks placeholder. 
        var barracks = BABYLON.MeshBuilder.CreateBox('barracks', {segments:8, diameter:1}, scene);
        
        // barracks position should be top left of the camp.
        barracks.position.x = 2;
        barracks.position.y = -1;
        barracks.position.z = 5;


        // placeholder barracks action manager
        barracks.actionManager = new BABYLON.ActionManager(scene);

        barracks.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnLeftPickTrigger}, 
                function () {
                    createSoldier();
                }
                ));


        //                               ****Stables****

        // stables placeholder. 
        var stables = BABYLON.MeshBuilder.CreateBox('stables', {segments:8, diameter:1}, scene);
        
        // stables position should be in the lower right part of the camp
        stables.position.x = 7;
        stables.position.y = -1;
        stables.position.z = 5;


        // placeholder stables action manager
        stables.actionManager = new BABYLON.ActionManager(scene);

        stables.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnLeftPickTrigger}, 
                function () {
                    createKnight();
                }
                ));


        //                      ****Fletcher****

        // fletcher placeholder. 
        var fletcher = BABYLON.MeshBuilder.CreateBox('fletcher', {segments:8, diameter:1}, scene);
        // fletcher position should be in the top right of the lower portion of the screen.
        fletcher.position.y = -1;
        fletcher.position.x = 2;
        fletcher.position.z = -3;

        // placeholder fletcher action manager
        fletcher.actionManager = new BABYLON.ActionManager(scene);

        fletcher.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnLeftPickTrigger}, 
                function () {
                    createArcher();
                }
                ));
                
                
        //                   ****Shaman****

        // shaman placeholder
        var shaman = BABYLON.MeshBuilder.CreateCylinder("shaman", {height: 1,diameter: 0, tessellation: 8}, scene);
        // shaman position should be close to the shrine
        shaman.position.x = 6.8;
        shaman.position.y = 1;
        shaman.position.z = 0.7;

        
        // create a camera that will rotate around the shrine, which will be the  'shrine' of our clicker game
        var camera =  new BABYLON.ArcRotateCamera("arcCamera",
                BABYLON.Tools.ToRadians(0),
                BABYLON.Tools.ToRadians(45),
                25.0, tiledGround.position,scene);
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



    // ************************test area***************************
    //When click event is raised    e try to pick an object

    window.addEventListener("click", function (event) {
    
        var pickResult = scene.pick(scene.pointerX, scene.pointerY, scene.pointerZ);
        

        console.log(pickResult.pickedPoint.x);
        console.log(pickResult.pickedPoint.y);
        console.log(pickResult.pickedPoint.z);
        console.log(pickResult);
   
    });

    // **************************************************************

 
});