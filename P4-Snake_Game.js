pauseClick = 0;
function init(){
    sheet = document.getElementById("canvas-1id");
    pen = sheet.getContext('2d');
    W = sheet.width;
    H = sheet.height;
    food = getrandomfood();
    GameOver= false;
    score= 0;
    snake = {
        length: 5,
        cells: [],
        color: "yellow",
        direction: "right",
        GameOver: false,
        food : getrandomfood(),
        CreateSnake: function(){
            for(var i=this.length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        DrawSnake: function(){
            for(var i=0; i<this.cells.length;i++){ 
               pen.fillStyle= this.color; pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10); pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
            };
        },
        UpdateSnake: function(){
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;
            if (headx==food.x && heady==food.y){
                food = getrandomfood();
                score++
            }
            else{
                this.cells.pop();
            }
            
            if (this.direction=="right"){
                var nextx = headx+1;
                var nexty = heady;
            }
            else if (this.direction=="left"){
                var nextx = headx-1;
                var nexty = heady;
            }
            else if (this.direction=="up"){
                var nextx = headx;
                var nexty = heady-1;
            } else {
                var nextx = headx;
                var nexty = heady+1;
            }
        this.cells.unshift({x:nextx,y:nexty});
        var lastx = Math.round(W/10);
        var lasty = Math.round(H/10);
        if (this.cells[0].x <0 || this.cells[0].x>lastx || this.cells[0].y <0 || this.cells[0].y>lasty){
        alert("Game Over");
        GameOver = true;
        }
        },   
    }; 
    snake.CreateSnake();
    function Event(e){
        if (e.key=="ArrowRight"){
            snake.direction= "right";
        }
        else if (e.key=="ArrowLeft"){
            snake.direction= "left";
        }
        else if (e.key=="ArrowUp"){
            snake.direction= "up";
        } else{
            snake.direction= "down";
        }
    };
    document.addEventListener("keydown",Event);
};
function draw(){
    pen.clearRect(0,0,W,H);
    snake.DrawSnake();
    
    pen.fillStyle= food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    pen.font = "14px Roboto";
    pen.fillStyle = "white";
    pen.fillText("Score: "+score,10,10);
};
function update(){
    snake.UpdateSnake();
};
function gameloop(){
    if (GameOver == true) {
        clearInterval();
    }else {
        if (pauseClick%2!=0){
            pauseClick= pauseClick;
        } else{
            draw();
            update();
        }
    }
};
function getrandomfood(){
    var foodx= Math.round(Math.random()*(W-10)/10);
    var foody = Math.round(Math.random()*(H-10)/10);
    foodColors = ["red","green","aqua","coral","orchid"];
    var i = Math.round(Math.random()*foodColors.length);
    var food={
        x: foodx, 
        y: foody, 
        color: foodColors[i],
    };
    return food;
}
function paused() {
    pauseClick+= 1;    
}
init();
var timer= setInterval(gameloop,100);