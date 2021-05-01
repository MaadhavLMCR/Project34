var dog , happyDog,dogImg;
var database;
var foodS , foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",function(data){
    foodS = data.val();
  });

}


function draw() {  
  background("green");
  //add styles here
  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(happyDog);

  }

  drawSprites();

  textSize(20)
  fill("white");
  text("Food: "+foodS,180,100);

  textSize(20);
  fill("white");
  text("Feed Me !!",150,400);

  text("To Feed Press Up_Arrow !!",70,450);
}

function writeStock(x){
  if (x<=0){
    x=0;
  }else{
    x--;
  }
  database.ref('/').update({
    Food : x
  })
}

