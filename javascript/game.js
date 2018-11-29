// firebase database
    var database = firebase.database();


// game variables
        // ***
        // Primary resource, gold
        var gold = 0;
        // total gold acumulated
        var totalGold = 0;
        // Number of times the shaman has been upgraded
        var shamanLevel = 1;
        // Player units
        var playerUnits = [];
        // Healths
        var gateHealth = 150;
        var shrineHealth = 50;
        


        // Upgradables levels
        var carpenterLevel = 1;
        var blacksmithLevel = 1;

        var gateOpen = false;
        //  These are createFunctions which will be called by the mesh.action managers for each object.
        // Handles the main gold distribution
        var createGold = function() {
                    gold = gold + shamanLevel;
                    totalGold = gold + shamanLevel;
                    console.log(gold);
                };
        var upgradeBuildings = function() {
            var upgradeCost = (carpenterLevel * carpenterLevel * 175);
            if (gold >= upgradeCost){
                gold = gold - upgradeCost;
                carpenterLevel++
                console.log("Buildings Upgraded. Gold: "+ gold);
            } else {
                console.log("Not enough gold. You have: "+ gold);
                console.log("You need: "+ upgradeCost);

            }
        }

        
        var createKnight = function() {
            console.log("knight");
        };
        var createArcher = function() {
            console.log("archer");
        };
        var shamanUpgrade = function() {
            var upgradeCost = ((shamanLevel * shamanLevel) * 25);
            // This will give the player an extra gold per click at an ever increasing cost
            if (gold >= upgradeCost) {
                gold = gold - upgradeCost;
                shamanLevel++;
                console.log("You have upgraded your shaman. Shaman level: " +shamanLevel);

            } else { 
                console.log('not enough gold, you have: ' + gold);
                console.log('Gold Needed: ' + upgradeCost);
            }

        };


// On load event to construct the game sceen on our canvas element
window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);


    // config firebase for pushing high scores





        // This creates the scene.
    var createScene = function () {


        var createSoldier = function() {

            console.log("soldier");
            var soldier = new BABYLON.MeshBuilder.CreateBox('soldier', {height:.3,width:.3},scene);
            soldier.position = new BABYLON.Vector3(0,0,2);
            animateChar();
            




        };
        var animateChar = function() {

                        // animation to move soldier up the game field
                        var animationSoldier = new BABYLON.Animation("soldieranimate", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

                        // An array with all animation keys
                        var keys = [];
                        //At the animation key 0, the value of x is -20
                        keys.push({
                            frame: 0,
                            value: -20
                        });
                    
                        //At the animation key 20, the value of x is 0
                        keys.push({
                            frame: 20,
                            value: 0
                        });
                    
                        //At the animation key 100, the value of x is 10
                        keys.push({
                            frame: 100,
                            value: 10
                        });
                        
                        animationSoldier.setKeys(keys);
                        soldier.animations = [];
                        soldier.animations.push(animationSoldier);
                        scene.beginAnimation(soldier, 0, 100, true);
                        
            
        }
        var spawnEnemies = function() {

            setInterval(function(){

                var enemyMesh = new BABYLON.MeshBuilder.CreateBox('', {height: .25,width:.25}, scene);
                enemyMesh.position.x = -20;
                enemyMesh.position.y = -2;




        }, 2500);
    };



        
        // Creates a basic Babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.ambientColor = new BABYLON.Color3(1, 1, 1);
        scene.clearColor = new BABYLON.Color3.Black();        

        // giving our scene gravity
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

        // Enable Collisions on scene
        scene.collisionsEnabled = true;
        
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
        // Give the ground collisions
        tiledGround.checkCollisions = true;



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
                
        //                      ****carpenter****

        // carpenter placeholder. 
        var carpenter = BABYLON.MeshBuilder.CreateBox('carpenter', {segments:8, diameter:1}, scene);
        // carpenter position should be in the top right of the lower portion of the screen.
        carpenter.position.x = 7;
        carpenter.position.y = -1;
        carpenter.position.z = -3;

        // placeholder carpenter action manager
        carpenter.actionManager = new BABYLON.ActionManager(scene);

        carpenter.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnLeftPickTrigger}, 
                function () {
                    upgradeBuildings();
                }
                ));
                
                
        //                   ****Shaman****

        // shaman placeholder
        var shaman = BABYLON.MeshBuilder.CreateCylinder("shaman", {height: 1,diameter: 0, tessellation: 8}, scene);
        // Shaman action manager which will increase the gold given by clicks at the cost of an ever increasing amount of gold.
        shaman.actionManager = new BABYLON.ActionManager(scene);
        shaman.actionManager.registerAction( new BABYLON.ExecuteCodeAction({
            trigger: BABYLON.ActionManager.OnLeftPickTrigger},
            function () { 
                shamanUpgrade();
            }
        ));

        // shaman position should be close to the shrine
        shaman.position.x = 7;
        shaman.position.y = 1;
        shaman.position.z = 1;

        // ************ Gate ******************        
        var gate = BABYLON.MeshBuilder.CreateBox("gate", {height: 3,width: 2,diameter: 1, tessellation: 8}, scene);


        // gate action manager which will handle toggling the gate open and closed
        gate.actionManager = new BABYLON.ActionManager(scene);
        gate.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
            trigger: BABYLON.ActionManager.OnLeftPickTrigger},
            function() {
                if (gateOpen === false) {
                    gate.rotation.y += 1.3;
                    gateOpen = true;
                } else {
                    gate.rotation.y -= -1.3;
                    gateOpen = false;
    
                };
            }

       ));

        // gate position should be in the center of the farthest wall. 
        gate.position.x = 0;
        gate.position.y = -1;
        gate.rotation.y = 1.5;
        gate.position.z = 0;
        var eastWall = BABYLON.MeshBuilder.CreateBox("eastWall", {height: 1.5,width: 10,diameter: 1, tessellation: 8}, scene);
        //east wall position should line the right of the camp. 
        eastWall.position.x = 5;
        eastWall.position.y = -2;
        eastWall.position.z = 9;
        var westWall = BABYLON.MeshBuilder.CreateBox("westWall", {height: 1.5,width: 10,diameter: 1, tessellation: 8}, scene);
        //west wall position should line the left of the camp. 
        westWall.position.x = 5;
        westWall.position.y = -2;
        westWall.position.z = -9;
        var northEastWall = BABYLON.MeshBuilder.CreateBox("northEastWall", {height: 1.5,width: 10,diameter: 1, tessellation: 8}, scene);
        //north wall position should line the top of the camp intersected by the gate. 
        northEastWall.position.x = -0.5;
        northEastWall.position.y = -2;
        northEastWall.position.z = 5;
        northEastWall.rotation.x = .2;
        northEastWall.rotation.y = 1.5;
        var northWestWall = BABYLON.MeshBuilder.CreateBox("northWestWall", {height: 1.5,width: 10,diameter: 1, tessellation: 8}, scene);
        //north wall position should line the top of the camp intersected by the gate. 
        northWestWall.position.x = -0.5;
        northWestWall.position.y = -2;
        northWestWall.position.z = -5;
        northWestWall.rotation.x = .2;
        northWestWall.rotation.y = 1.5;

        
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

        // move unit up


        spawnEnemies();
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
    //When click event is raised try to pick an object

    window.addEventListener("click", function (event) {
    
        var pickResult = scene.pick(scene.pointerX, scene.pointerY, scene.pointerZ);
        

        console.log(pickResult.pickedPoint.x);
        console.log(pickResult.pickedPoint.y);
        console.log(pickResult.pickedPoint.z);
        console.log(pickResult);
   
    });

    // **************************************************************

 
});