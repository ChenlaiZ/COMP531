document.getElementById("restart").onclick = function(){
    window.location.reload();
}

document.getElementById("start").onclick = function(){
    if(difficulty==0) init();
    else if(difficulty>3 || isGameOver==true) alert("Please restart the game!") 
    else alert("Please play the game!") 
}
document.getElementById("shownext").onclick = function(){
    if(difficulty>3 || isGameOver==true) alert("Please restart the game!") 
    else{
        show = true;
        aiTurn();
        show = false;
    }
}
//declare and initialize the parameter
var scoreCount = 0;
var show = false;
var chessBoard = [];//chessborad
var isGameOver;
var isMyTurn; 
var pieceCount;
var difficulty = 0;
var chess = document.getElementById("chess");
var context = chess.getContext('2d');
var bgd = new Image();
bgd.src = 'chessbackground.jpg';
//weight initialization
var userWeightDelta = [[100, 200, 1000, 5000], [100, 200, 1100, 10000], [200,400, 2000, 10000]];
var aiWeightDelta = [[210, 1100, 2000, 20000], [200, 500, 1000, 5000], [220, 420, 2100, 20000]];

//fill the canvas text
var g=context.createLinearGradient(0,0,chess.width,chess.height);
context.font="30px Georgia";
g.addColorStop("0","magenta");
g.addColorStop("0.5","blue");
g.addColorStop("1.0","red");
context.fillStyle=g;
context.fillText("Please start the game",100,240,300);

//draw the chessboard
var drawChessBoard = function(){
    for(var i = 0; i < 15; i++){
        context.beginPath();
        context.moveTo(16 + i * 32 , 16);
        context.lineTo(16 + i * 32 , 464);
        context.stroke();
        context.moveTo(16 , 16 + i * 32);
        context.lineTo(464 , 16 + i * 32);
        context.stroke();
        context.closePath();
    }
}

//initialize the win method
var userPiece = [];
var aiPiece = [];
var winMethods = [];
for(var i = 0; i < 15; i++){
    winMethods[i] = [];
    for(var j = 0; j < 15; j++){
        winMethods[i][j] = [];
    }
}

var winMethodCount = 0; //num of win method
//win in horizental lines
for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            winMethods[i][j+k][winMethodCount] = true;
        }
        winMethodCount++;
    }
}

//win in vertical lines
for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            winMethods[j+k][i][winMethodCount] = true;
        }
        winMethodCount++;
    }
}

//win in (x,x lines
for(var i = 0; i < 11; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            winMethods[i+k][j+k][winMethodCount] = true;
        }
        winMethodCount++;
    }
}

//win in (x, x) lines
for(var i = 0; i < 11; i++){ 
    for(var j = 14; j > 3; j--){
        for(var k = 0; k < 5; k++){
            winMethods[i+k][j-k][winMethodCount] = true;
        }
        winMethodCount++;
    }
}

var init = function(){
    //initialize the parameters
    isGameOver = false;
    isMyTurn = true; 
    pieceCount = 0;
    difficulty++;
    document.getElementById("level").innerHTML = difficulty;
    //redraw the chess board
    context.clearRect(0, 0, chess.width, chess.height);
    context.strokeStyle = '#696969'; //color of box
    context.drawImage(bgd,0,0,480,480);
    drawChessBoard();
    //initialize the chess board
    for(var i = 0; i < 15; i++){
        chessBoard[i] = [];
        for(var j = 0; j < 15; j++){
            chessBoard[i][j] = 0;
        }
    }
    //initialize the number of pieces in each win method
    for(var i = 0; i < winMethodCount; i++){
        userPiece[i] = 0;
        aiPiece[i] = 0;
    }
}


chess.onclick = function(e){
    if(isGameOver){
        return;
    }
    if(!isMyTurn){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 32);
    var j = Math.floor(y / 32);
    if(chessBoard[i][j] == 0){
        drawPiece(i,j,isMyTurn,false);
        chessBoard[i][j] = 1;//isMyTurn
        pieceCount++;
        document.getElementById("piecenum").innerHTML = pieceCount;
        for(var k = 0; k < winMethodCount; k++){
            if(winMethods[i][j][k]){
                userPiece[k]++;
                aiPiece[k] = 10;
                if(userPiece[k] == 5){
                    scoreCount = scoreCount + pieceCount*2 + 100*difficulty;
                    document.getElementById("scorenum").innerHTML = scoreCount;
                    //setInterval(function(){alert('You win!\n The next game will be harder')},3000);          
                    isGameOver = true;
                }
            }
        }
        if(!isGameOver){         
            isMyTurn = !isMyTurn;
            aiTurn();
        } else{
            if(difficulty<3){
                window.alert('You win!\n The next game will be harder');
                init();
            } else{
                window.alert('You are the winner! \n Your final score is '+scoreCount);
            }

        }
    } else{
        window.alert('You cannot put the piece here');
    }
    
}

//AI's turn
var aiTurn = function (){
    var userWeight = [];
    var aiWeight = [];
    var max = 0, u = 0, v = 0;
    for(var i = 0; i < 15; i++){
        userWeight[i] = [];
        aiWeight[i] = [];
        for(var j = 0; j < 15; j++){
            userWeight[i][j] = 0;
            aiWeight[i][j] = 0;
        }
    }

    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(chessBoard[i][j] == 0){
                for(var k = 0; k < winMethodCount; k++){
                    if(winMethods[i][j][k]){
                        if(difficulty>0&&difficulty<4&&userPiece[k]>0&&userPiece[k]<5){
                            userWeight[i][j] += userWeightDelta[difficulty-1][userPiece[k]-1];
                        }
                        if(difficulty>0&&difficulty<4&&aiPiece[k]>0&&aiPiece[k]<5){
                            aiWeight[i][j] += aiWeightDelta[difficulty-1][aiPiece[k]-1];                                   
                        }
                    }
                }       
                if(userWeight[i][j] > max){
                    max  = userWeight[i][j];
                    u = i;
                    v = j;
                } else if(userWeight[i][j] == max){
                    if(aiWeight[i][j] > aiWeight[u][v]){
                        u = i;
                        v = j;    
                    }
                }                
                if(aiWeight[i][j] > max){
                    max  = aiWeight[i][j];
                    u = i;
                    v = j;
                } else if(aiWeight[i][j] == max){
                    if(userWeight[i][j] > userWeight[u][v]){
                        u = i;
                        v = j;    
                    }
                }
            }
        }
    }
    if(show){
        drawPiece(u,v,false,true);
    }
    else{
        drawPiece(u,v,false,false);
        chessBoard[u][v] = 2;
        for(var k = 0; k < winMethodCount; k++){
            if(winMethods[u][v][k]){
                aiPiece[k]++;
                userPiece[k] = 10;
                if(aiPiece[k] == 5){
                    scoreCount = scoreCount+pieceCount*2;
                    document.getElementById("scorenum").innerHTML = scoreCount;
                    window.alert('You lose! \n Your final score is '+scoreCount);
                    isGameOver = true;
                }
            }
        }
        if(!isGameOver){
            isMyTurn = !isMyTurn;
        } else{
            scoreCount = 0;
        }       
    }
}

//draw the piece
var drawPiece = function(i,j,isMyTurn,show){
    context.beginPath();
    context.arc(16 + i * 32, 16 + j * 32, 13, 0, 2 * Math.PI);
    context.closePath();
    //change
    var gradient = context.createRadialGradient(16 + i * 32 + 2, 16 + j * 32 - 2, 13, 16 + i * 32 + 2, 16 + j * 32 - 2, 0);
    if(show){
        gradient =  '#ff0000';      
    }
    else{
        if(isMyTurn){
            gradient.addColorStop(0,'#0a0a0a');
            gradient.addColorStop(1,'#636766');
        }else{
            gradient.addColorStop(0,'#d1d1d1');
            gradient.addColorStop(1,'#f9f9f9');
        }
    }
    context.fillStyle = gradient;
    context.fill();
}