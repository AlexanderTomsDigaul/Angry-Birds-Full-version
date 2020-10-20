var hypnoticball,database,position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    hypnoticball = createSprite(250,250,10,10);
    hypnoticball.shapeColor = "red"
    //.ref() is used to reffer to the location of the database value we care about 
    var hypnoticballposition = database.ref('ball/position');
    //.on is used to create a listner which keeps listning to the database
    hypnoticballposition.on("value",readPosition,showerror);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':hypnoticball.position.x+x,
        'y' : hypnoticball.position.y+y
    })
}
function readPosition(data){
    position = data.val();
    hypnoticball.x = position.x;
    hyptonicball.y = position.y;
}
function showerror(){
    console.log("errorinwritingtothedatabase");
}