//create variables.
var canvas;
var background_img, gameOverImage;
var boy, boy_img;
var diamond, diamond_img, purplediamond, violetdiamond, diamond2, bluediamond, diamondGroup;
var life, life_img, livesGroup, bomb, bomb_img;
var ground, bombGroup, invisiblegr;
var life1 = 5;
var gameState = "wait";
var score = 0;
var reset, play;
var bg;
var thief, thief_img;
var flag = true;
function preload() {
  //load images.
  bluediamond = loadImage("images/blue_diamond.png");
  purplediamond = loadImage("images/purple_diamond.png");
  violetdiamond = loadImage("images/violetdiamond.png");
  boy_img = loadAnimation("images/kid1.png", "images/kid2.png", "images/kid3.png");
  diamond2 = loadImage("images/diamond.png");
  background_img = loadImage("images/bg3.png");
  bomb_img = loadImage("images/bomb.png");
  life_img = loadImage("images/life.png");
  gameOverImage = loadImage("images/gmeoer.jpg");
  thief_img = loadImage("images/theif.png");
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight - 200);
  //create boy sprite.
  boy = createSprite(50, displayHeight - 150, 50, 50);
  boy.addAnimation("car", boy_img);
  boy.scale = 0.5;
  //create invisible ground.
  invisiblegr = createSprite(displayWidth * 4, displayHeight - 150, displayWidth * 11, 20);
  invisiblegr.visible = false;
  //create theif.
  thief = createSprite(displayWidth * 10 - 200, 450, 50, 50);
  thief.addImage("the", thief_img);
  thief.scale = 0.5;

  //https://via.placeholder.com/300
  bombGroup = new Group();
  diamondGroup = new Group();
  livesGroup = new Group();
  //spawn Diamonds & Bombs.
  spawnDiamonds();
  spawnBombs();
  for (var i = 1; i <= life1; i = i + 1) {
    life = createSprite(i * 50, 50, 50, 50);
    life.addImage("life", life_img);
    life.scale = 0.08;
    livesGroup.add(life);

  }

}

function draw() {

  //background(background_img);
  console.log(life1);
  //set gamestate to wait.
  if (gameState === "wait") {
    //change canvas size
    resizeCanvas(600, 600);
    //change background
    background("#ff0066");
    //add instruction for player
    //text command
    fill("yellow");
    textSize(25);
    text("Hey Welcome🤚!Let's see some instruction👇", 50, 100);
    fill("White");
    text("👉 A thief has stolen diamonds from the jewellery shop.", 5, 180);
    text("👉 The Forest officer has to go find the thief.", 5, 230);
    text("👉 Forest Officer needs to collects all the diamonds", 5, 280);
    text("dropped by the thief.", 5, 330);
    text("👉 You have 5 lives.", 5, 380);
    text("👉 You can move right side and jump.", 5, 430);
    text("👉 So Are you ready to play the game??", 5, 480);
    text("👉 If you are ready So please press S Key", 5, 530);
    text("👉 Let's Play the Game.", 5, 580);
    //play the game.
    if (keyDown("S")) {
      gameState = "play";
    }
  }
  //change gameState to play.
  if (gameState === "play") {
    //change canvas size 
    if (flag) {
      resizeCanvas(displayWidth, displayHeight - 20);
      flag = false;
    }
    image(background_img, -width / 2, 0, width * 12, height);
    //set camera on the boy.
    camera.position.x = boy.x;
    camera.position.y = displayHeight / 2;
    console.log("camer position " + camera.position.x);
    console.log("boy position " + boy.x);
    //show score.
    fill("black");
    textSize(30);
    text("Collect Diamonds : " + score, boy.x + 200, 50);
    //use right arrow to move the boy
    if (keyIsDown(RIGHT_ARROW)) {
      boy.x = boy.x + 20;
    }
    //use up arrow to move the boy
    if (keyIsDown(UP_ARROW)) {
      boy.velocityY = -10;

    }
    boy.velocityY = boy.velocityY + 0.3;
    for (var i = 0; i < livesGroup.length; i++) {
      livesGroup.get(i).x = boy.x - i * 50;

    }


    //when boy collide with diamonds increase score and score as well
    for (var i = 0; i < diamondGroup.length; i++) {
      if (diamondGroup.get(i).isTouching(boy)) {
        diamondGroup.get(i).destroy();
        score = score + 1;
      }
    }
    //when boy collide withbomb decrease lives andlives as well
    bombGroup.collide(boy, decLife);
    boy.collide(invisiblegr);

    //if life is equal to 0 chang gameState to end.
    if (life1 === 0) {
      gameState = "end";
    }
  }
  //create end gamestate.
  if (gameState === "end") {
    //change the canvas size.
    resizeCanvas(700, 700);
    //change bg img.
    background(gameOverImage);
  }
  //show sprites when gameState is not equal to wait & end.
  if (gameState != "wait" && gameState != "end") {

    drawSprites();
  }
}
//create spawndiamonds function.
function spawnDiamonds() {
  for (var i = 500; i < displayWidth * 10; i = i + 700) {
    diamond = createSprite(i, random(50, 400), 50, 40);
    diamond.scale = 0.2;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: diamond.addImage("diamond", diamond2);
        diamond.scale = 0.2;
        break;
      case 2: diamond.addImage("diamond", bluediamond);
        diamond.scale = 0.1;
        break;
      case 3: diamond.addImage("diamond", purplediamond);
        diamond.scale = 0.2;
        break;
      case 4: diamond.addImage("diamond", violetdiamond);
        diamond.scale = 0.2;
        break;
    }
    diamondGroup.add(diamond);
  }
}
//create spawnbombs function.
function spawnBombs() {
  for (var i = 700; i < displayWidth * 10; i = i + 1000) {
    bomb = createSprite(i, random(100, 500), 50, 50);
    bomb.addImage("bomb", bomb_img);
    bomb.scale = 0.2;
    bombGroup.add(bomb);
  }
}
//create declife function.
function decLife(bomb, car) {
  life1 = life1 - 1;

  livesGroup.get(0).destroy();




  if (life1 > 0) {
    //change gameState to play.
    gameState = "play";
  }
  else {
    gameState = 'end';
  }
  bomb.remove();

}

//https://pinetools.com/merge-images