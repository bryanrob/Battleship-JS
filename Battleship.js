class Grid{
    constructor(){
        this.xDim=10,this.yDim=10;

        //this.opponentView=[];
        //this.configureGrid(this.opponentView,x,y," ");

        this.ownerView=new Array(this.xDim);//.fill(new Array(10).fill(" "));
        for(var i=0;i<this.ownerView.length;i++){
            this.ownerView[i]=new Array(this.yDim);
            for(var j=0;j<this.ownerView[i].length;j++){
                this.ownerView[i][j]=" ";
            }
        }

        this.opponentView=new Array(this.xDim);//.fill(new Array(10).fill(" "));
        for(var i=0;i<this.opponentView.length;i++){
            this.opponentView[i]=new Array(this.yDim);
            for(var j=0;j<this.opponentView[i].length;j++){
                this.opponentView[i][j]=" ";
            }
        }

        this.boats=new Array(this.xDim);//.fill(new Array(10).fill(" "));
        for(var i=0;i<this.boats.length;i++){
            this.boats[i]=new Array(this.yDim);
            for(var j=0;j<this.boats[i].length;j++){
                this.boats[i][j]=" ";
            }
        }
    }

    getOwnerView(){
        return this.ownerView;
    }
    getOpponentView(){
        return this.opponentView;
    }
    getBoats(){
        return this.boats;
    }

    syncGrids(){
        for(var i=0;i<this.xDim;i++){
            for(var j=0;j<this.yDim;j++){
                if(this.boats[i][j]!=" "){
                    this.ownerView[i][j]=this.boats[i][j];
                }
                if(this.opponentView[i][j]!=" "){
                    this.ownerView[i][j]=this.boats[i][j];
                }
            }
        }
    }

    placeShip(x,y,len,eastToWest){
        x-=1;
        y-=1;
        var returnThis=false; //Return false if ship cannot be placed.

        //Check if the given coordinates are within the boundaries of the grid.
        var condition1=(x+len>this.xDim)&&!eastToWest;
        //console.log(x+len);
        //console.log(condition1);
        var condition2=(y+len>this.yDim)&&eastToWest;
        //console.log(y+len)
        //console.log(condition2);
        
        var shipExists=false;
        if(!condition1&&!condition2){
            //Check if a ship already exists in the designated location.
            if(eastToWest){
                for(var i=0;i<len;i++){
                    if(this.boats[x][y+i]=="s")shipExists=true;
                }
            }else{
                for(var i=0;i<len;i++){
                    if(this.boats[x+i][y]=="s")shipExists=true;
                }
            }
            //If no ship was detected...
            if(!shipExists){
                for(var i=0;i<len;i++){
                    if(eastToWest){
                        this.boats[x][y+i]="s";
                    }else{
                        this.boats[x+i][y]="s";
                    }
                }
                returnThis=true;
            }
        }
        this.syncGrids();
        return returnThis;
    }

    shootAt(x,y){
        var returnThis=false;
        if(x>0 && x<this.xDim+1 && y>0 && y<this.yDim+1){
            var i=x-1,j=y-1;
            if(this.boats[i][j]=="s"||this.boats[i][j]=="X"){
                this.opponentView[i][j]="X";
                this.boats[i][j]="X";
                this.ownerView[i][j]="X"
            }else{
                this.opponentView[i][j]="~";
                this.ownerView[i][j]="~"
            }
            returnThis=true;
        }
        return returnThis;
    }

    hasShip(){
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                if(this.boats[i][j]=="s"){
                    return true;
                }
            }
        }
        return false;
    }

    toStringOwner(){
        //console.log(this.ownerView.length);
        //console.log(this.ownerView[0].length)
        var returnThis=""

        //returnThis=this.ownerView[0][0];
        returnThis+=" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10\n-+---+---+---+---+---+---+---+---+---+---\n";
        for(var i=0;i<10;i++){
            //console.log("i = "+i);
            returnThis+=String.fromCharCode(i+65);
            
            //console.log(tmp);
            for(var j=0;j<10;j++){
                //console.log("j = "+j);
                var tmp=this.ownerView[i][j];
                returnThis+="| "+tmp+" ";
            }
            if(i<9)returnThis+="\n-+---+---+---+---+---+---+---+---+---+---\n"
        }

        //console.log(returnThis);
        return returnThis
    }

    toStringOpponent(){
        var returnThis=""

        //returnThis=this.ownerView[0][0];
        returnThis+=" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10\n-+---+---+---+---+---+---+---+---+---+---\n";
        for(var i=0;i<10;i++){
            //console.log("i = "+i);
            returnThis+=String.fromCharCode(i+65);
            
            //console.log(tmp);
            for(var j=0;j<10;j++){
                //console.log("j = "+j);
                var tmp=this.opponentView[i][j];
                returnThis+="| "+tmp+" ";
            }
            if(i<9)returnThis+="\n-+---+---+---+---+---+---+---+---+---+---\n"
        }

        //console.log(returnThis);
        return returnThis
    }
}

class Board{
    constructor(){
        this.grid1=new Grid();
        this.grid2=new Grid();

        this.turn=1;
        this.gameState=true;
        this.outputString="";
    }

    placeShip(player,x,y,length,eastToWest){
        var result=false;
        if(player==0){
            result=this.grid1.placeShip(x,y,length,eastToWest);
            if(!result){
                this.outputString="Error: Invalid ship placement.  Please choose a valid location.";
                return false;
            }else{
                this.outputString="Ship placed!";
                return true;
            }
        }else if(player==1){
            result=this.grid2.placeShip(x,y,length,eastToWest);
            if(!result){
                this.outputString="Error: Invalid ship placement.  Please choose a valid location.";
                return false;
            }else{
                this.outputString="Ship placed!";
                return true;
            }
        }else{
            this.outputString="Error: Player does not exist.";
            return false;
        }
    }

    shoot(player,x,y){
        var result=false;
        if(player==0&&(this.turn%2==1)){
            result=this.grid2.shootAt(x,y);
            if(!result){
                this.outputString="Error: Designated area does not exist.";
            }else{
                this.turn+=1;
                this.outputString="Shot taken...  ";
                if(this.grid2.getBoats()[x-1][y-1]=="X"){
                    this.outputString+="HIT!";
                }else{
                    this.outputString+="Miss."
                }
            }
        }else if(player==1&&(this.turn%2==0)){
            result=this.grid1.shootAt(x,y);
            if(!result){
                this.outputString="Error: Designated area does not exist.";
            }else{
                this.turn+=1;
                this.outputString="Shot taken...  ";
                if(this.grid1.getBoats()[x-1][y-1]=="X"){
                    this.outputString+="HIT!";
                }else{
                    this.outputString+="Miss."
                }
            }
        }else{
            this.outputString="Error: It is not the declared player's turn.";
        }

        if(!this.grid1.hasShip()){
            this.gameState=false;
            this.outputString+="\n\nGame over!  All of Player 1's ships have sunk!";
        }else if(!this.grid2.hasShip()){
            this.gameState=false;
            this.outputString+="\n\nGame over!  All of Player 2's ships have sunk!";
        }

        return result;
    }

    player1OwnedArea(){
        return this.grid1.toStringOwner();
    }
    player2OwnedArea(){
        return this.grid2.toStringOwner();
    }

    player1View(){
        return "Opponent's area:\n"+this.grid2.toStringOpponent()+"\nYour area:\n"+this.grid1.toStringOwner();
    }
    player2View(){
        return "Opponent's area:\n"+this.grid1.toStringOpponent()+"\nYour area:\n"+this.grid2.toStringOwner();
    }
}

function main(){
    console.log("Terst...\n");
    /*
    const input=require("prompt-sync")();
    var game=new Board();

    //Place your destroyer at C5...
    game.placeShip(0,3,5,2,false);

    //Place enemy ship at B2...
    game.placeShip(1,2,2,1,false);

    var prompt="";
    console.clear();
    while(game.gameState){

        console.log("Turn: "+game.turn.toString()+"\n\n"+game.player1View());

        prompt+="\nSelect a coordinate to shoot at.\n(Example: A2,E5 or J10)";
        console.log(prompt);
        var invalid=true;
        while(invalid){
            response=input();
            if(response.length>0){
                try{
                    xAndY=decodeInput(response);
                    if(xAndY[0]>0&&xAndY[0]<11&&xAndY[1]>0&&xAndY[1]<11)invalid=false;
                }catch{
                    prompt="Input error: designated coordinate is not within the grid boundaries.";
                }
            }
        }

        result=game.shoot(0,xAndY[0],xAndY[1]);
        if(result){
            game.shoot(1,randomIntFromInterval(1,10),randomIntFromInterval(1,10))
        }

        prompt=game.outputString;

        console.clear();
    }

    console.log("Turn: "+game.turn.toString()+"\n\t[GAME OVER]\n"+game.player1View()+"\n\t[GAME OVER]\n"+game.outputString)
    */

    /*
    var game=new Board();
    var ships=[5,4,3,3,2];
    for(var i=0;i<ships.length;i++){
        var placed=false;
        while(!placed){
            var eastToWest;
            if(randomIntFromInterval(0,1)==0){
                eastToWest=false;
            }else eastToWest=true;
            placed=game.placeShip(1,randomIntFromInterval(1,10),randomIntFromInterval(1,10),ships[i],eastToWest);
        }
    }
    console.log(game.player2OwnedArea());
    */

    console.log("\nTerst complete!");

    gameLoop();
}

function gameLoop(){
    console.clear();

    const input=require("prompt-sync")();

    var game=new Board();
    var ships=[5,4,3,3,2];
    var shipNames=["Carrier","Battleship","Cruiser","Submarine","Destroyer"];

    console.log("Game start!\n\n\tWELCOME TO BATTLESHIP!\n\t{JavaScript Edition}\n\n");
    var positioningShips=true;
    var response="";
    var index=0;
    //var ship=""
    var prompt="Place your "+shipNames[index]+" (Length: "+ships[index].toString()+")";
    while(positioningShips){
        console.log("Position your ships.\n"+game.player1OwnedArea()+"\nDesignate your ships' locations on the grid above\nstarting with the letter and ending with the number.\n(Examples: A2, E5 or J10)\n\nPlacing a Cruiser on B5 will use coordinates B5-D5.\nHowever, if it's facing East/West, then it will use\ncoordinates B5-B7.\n")

        var xAndY=[0,0];
        var invalid=true;
        while(invalid){
            console.log(prompt);
            response=input();
            if(response.length>0){
                var tmp="Input error: designated coordinate is not within the grid boundaries.";
                try{
                    xAndY=decodeInput(response);
                    if(xAndY[0]>0&&xAndY[0]<11&&xAndY[1]>0&&xAndY[1]<11)invalid=false;
                }catch(error){
                    tmp="Input error: designated coordinate is not within the grid boundaries.";
                }
                prompt=tmp;
            }
            else prompt="Input error: cannot enter empty line.";
        }
        
        invalid=true;
        var eastToWest=false;
        var ynPrompt="Will the ship be facing East/West?(y/n)";
        while(invalid){
            console.log(ynPrompt);
            response=input().toLowerCase();
    
            if(response=="y"){
                eastToWest=true;
                invalid=false;
            }else if(response=="n"){
                invalid=false;
            }else{
                ynPrompt="Input error: enter only [Y] or [N]."
            }
        }

        var validation=game.placeShip(0,xAndY[0],xAndY[1],ships[index],eastToWest);

        if(validation){
            index+=1;
            if(index==5)positioningShips=false;
            else prompt="Ship placed!\n\nPlace your "+shipNames[index]+" (Length: "+ships[index].toString()+")";
        }else{
            prompt="Place your "+shipNames[index]+" (Length: "+ships[index].toString()+")\n"+game.outputString;
        }
        console.clear();
    }

    //Computer opponent places ships:
    for(var i=0;i<ships.length;i++){
        var placed=false;
        while(!placed){
            var eastToWest;
            if(randomIntFromInterval(0,1)==0){
                eastToWest=false;
            }else eastToWest=true;
            placed=game.placeShip(1,randomIntFromInterval(1,10),randomIntFromInterval(1,10),ships[i],eastToWest);
        }
    }

    var prompt="";
    console.clear();
    while(game.gameState){
        console.log("Turn: "+game.turn.toString()+"\n\n"+game.player1View());

        prompt+="\nSelect a coordinate to shoot at.\n(Example: A2,E5 or J10)";
        var invalid=true;
        while(invalid){
            console.log(prompt);
            response=input();
            if(response.length>0){
                var tmp="Input error: designated coordinate is not within the grid boundaries.";
                try{
                    xAndY=decodeInput(response);
                    if(xAndY[0]>0&&xAndY[0]<11&&xAndY[1]>0&&xAndY[1]<11)invalid=false;
                }catch(error){
                    //prompt="Input error: designated coordinate is not within the grid boundaries.";
                }
                prompt=tmp;
            }
        }

        result=game.shoot(0,xAndY[0],xAndY[1]);
        prompt="Player: "+game.outputString;
        if(result&&game.gameState){
            game.shoot(1,randomIntFromInterval(1,10),randomIntFromInterval(1,10))
        }
        prompt+="\nComputer: "+game.outputString;
        

        console.clear();
    }

    console.log("Turn: "+game.turn.toString()+"\n\t[GAME OVER]\n"+game.player1View()+"\n\t[GAME OVER]\n"+game.outputString);
}

function decodeInput(input){
    var x=input.toUpperCase().charCodeAt(0)-64;
    var y=parseInt(input.substring(1,input.length));

    return [x,y];
}

//Function below published by Francisc on Stack Overflow (https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript)
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

main();