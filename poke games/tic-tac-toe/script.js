$(document).ready(()=>{
    // let clone = $("#bg").clone();
    let player1score = 0;
    let player2score = 0;
    let x = '<img src="Pachirisu.png" width="80px">';
    let o = '<img src="seel.png" width="110px">';
    let compPeice = "";
    let playerPeice = "";
    let pos = [];
    let isComputer = false;
    let turnCount = 0;
    let paintCount = 0;
    let row = $('.col-xs-4');
    let isGameOn = false;
    let timeouts1 = [];
    let timeouts2 = [];
    let isComputerTurn = false;
    let b = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    let r00 = $("#r11");
    let r01 = $("#r12");
    let r02 = $("#r13");

    let r10 = $("#r21");
    let r11 = $("#r22");
    let r12 = $("#r23");

    let r20 = $("#r31");
    let r21 = $("#r32");
    let r22 = $("#r33");

    /**One Player is choosen**/
    $("#one-player").click(()=>{
        $("#green,#blue").hide();
        $("#two-player").hide();
        $("#one-player").hide();
        $("#page1").fadeOut(700,()=>{
            $("#page2").fadeIn(700);
        });
    });

    /**Two players is choosen**/
    $("#two-player").click(()=>{
        $("#green,#blue").hide();
        $("#two-player").hide();
        $("#one-player").hide();
        $("#page1").fadeOut(700,()=>{
            $("#page3").fadeIn(700);
        });
    });

    /**Back button**/
    $("#back2, #back3").click(()=>{
        reset();
    });

    /**Player VS Player**/
    $("#x3").click(()=>{ //Player1 takes X
        initializeBoard(x,o,false);
    });
    $("#o3").click(()=>{ //Player1 takes O
        initializeBoard(o,x,false);

    });

    $("#reset").click(()=>{
        $("#back2").click();
    });

    /**Player VS Computer**/
    $("#o2").click(()=>{ //Player takes O
        initializeBoard(x,o,true);
    });

    $("#x2").click(()=>{ //Player take X
        initializeBoard(o,x,true);
    });


    let initializeBoard = (user1peice,user2peice,bol) => {
        isGameOn = true;
        isComputer = bol
        compPeice = user1peice;
        playerPeice = user2peice;
        turnCount = 0;
        paintCount = 0;
        $("#turn-info").show();

        let compMsg = "Player 1's Turn";
        let playerMsg = "Player 2's Turn";
        let fadePage = $("#page3");
        let peiceX = $("#x3");
        let peiceO = $("#o3");
        let back = $("#back3");

        if(isComputer){
            compMsg = "Computer's Turn";
            playerMsg = "Your Turn";
            fadePage = $("#page2");
            peiceX = $("#x2");
            peiceO = $("#o2");
            back = $("#back2");
            $("#player1-info").text("PLAYER");
            $("#player2-info").text("COMPUTER");
            row.off("click",doTwoPlayers);
        }else{
            $("#player1-info").text("PLAYER 2");
            $("#player2-info").text("PLAYER 1");
            row.off("click",doPlayWithComp);
        }

        $(peiceX).hide();
        $(peiceO).hide();
        $(back).hide();

        fadePage.fadeOut(700,()=>{
            $("#green").html("<h5 class = 'text-center'>"+compMsg+"</h5>");
            $("#blue").html("<h5 class = 'text-center'>"+playerMsg+"</h5>");
            $("#page4").fadeIn(700);
            $(".info").show();
            var randomStart = Math.floor(Math.random()*2);

            // alert(isComputerTurn);
            if(isComputer){
                if(randomStart){  //computer to play
                    isComputerTurn = true;
                    $("#green").slideToggle(()=>{
                        attack(compPeice);
                        $("#green").slideToggle(()=>{
                            $("#blue").slideToggle(()=>{
                                isComputerTurn = false;
                                row.on("click",doPlayWithComp);
                            });
                        });
                    });
                }
                else{  //player to play
                    $("#blue").slideToggle(()=>{
                        isComputerTurn = false;
                        row.on("click",doPlayWithComp);
                    });
                }
            }else{
                $("#green").slideToggle(()=>{
                    row.on("click",doTwoPlayers);
                });

            }
        });

    }

    function doTwoPlayers(){
        let r = $(this).attr('id');
        let peice = "";

        if(!$('#green').is(':visible')) peice = playerPeice;
        else peice = compPeice;

        if(paintPos(r,peice)) return;
        if(!checkWin(compPeice)[0] && !checkWin(playerPeice)[0]){
            if(peice == compPeice)
                $("#green").slideToggle(()=>{
                    $("#blue").slideToggle();
                });
            if(peice == playerPeice) 
                $("#blue").slideToggle(()=>{
                    $("#green").slideToggle();
                });
        }
    }

    let checkGameStatus = ()=>{

        if(checkWin(compPeice)[0]){ //if computer wins
            player1score++;
            doWinner(compPeice,true,player1score,"Player 1 Wins!");
        }
        else if(checkWin(playerPeice)[0]){ //if player wins
            player2score++;
            doWinner(playerPeice,false,player2score,"Player 2 Wins");
        }
        else if(paintCount>8){
            paintCount = 0;
            timeouts1.push(setTimeout(()=>{
                $("#page5").fadeIn(()=>{
                    $("#message").html("Draw").show();
                    $("#page4").addClass("disable");
                    $("#green,#blue").hide();
                });
                timeouts2.push(setTimeout(()=>{
                    $("#page5").fadeOut(()=>{
                        $("#message").hide();
                        $("#page4").removeClass("disable");

                        for(let i = 0; i < b.length; i++){
                            for(let j = 0; j < b[i].length; j++){
                                b[i][j] = '';
                                $("#r"+(i+1)+""+(j+1)).html("");
                            }
                        }

                        if(isComputer){
                            if(playerPeice == x) $("#x2").click();
                            else $("#o2").click();
                        }else{
                            if(playerPeice == o) $("#x3").click();
                            else $("#o3").click();
                        }
                    });
                },2000));
            },100));
        }

    }

    let doWinner = (peice,isGreen,score,msg)=>{

        let r = checkWin(peice)[1];
        for(let i = 0; i <r.length; i++){
            r[i].addClass("win"); //adding this class color's it black background and red
        }

        timeouts1.push(setTimeout(()=>{
            $("#page5").fadeIn(()=>{

                let winMsg = msg;
                if(isComputer && isGreen) winMsg = "You lose :(";
                if(isComputer && !isGreen) winMsg = "You Win!!!";

                $("#message").html(winMsg).show();
                if(isGreen) $("#player2-score").html(score);
                else $("#player1-score").html(score);
                
                $("#page4").addClass("disable");
                if(isGreen) $("#green").slideToggle();
                else $("#blue").slideToggle();

            });
            timeouts2.push(setTimeout(()=>{
                $("#page5").fadeOut(()=>{
                    $("#message").hide();
                    $("#page4").removeClass("disable");

                    for(let i = 0; i < b.length; i++){
                        for(let j = 0; j < b[i].length; j++){
                            b[i][j] = '';
                            $("#r"+(i+1)+""+(j+1)).removeClass("win").html(""); //clean board
                        }
                    }
                    for(let i = 0; i <r.length; i++){
                        r[i].removeClass("win"); //adding this class color's it black background and red
                    }

                    if(isComputer){
                        if(playerPeice == x) $("#x2").click();
                        else $("#o2").click();
                    }else{
                        if(playerPeice == o) $("#x3").click();
                        else $("#o3").click();
                    }
                });
            },3000));
        },2000));

    }

    function autoCompMove(){
        turnCount++;
        if(paintCount>8 || turnCount>4 || !isGameOn) return;
        isComputerTurn = true;
        $("#blue").slideToggle(()=>{
            $("#green").slideToggle(()=>{

                if(turnCount>1) defence(playerPeice,compPeice);
                else attack(compPeice);

                if(isGameOn) $("#green").slideToggle(()=>{
                    $("#blue").slideToggle(() =>{
                        isComputerTurn = false;
                    });
                });
            });
        });
    }
    let defence = (yourPeice,compPeice) =>{
        if(paintCount>8) return;
        let isWin =  checkPeicesPos(compPeice,compPeice); //check winning move as 1st priority

        if(!isWin){
            let isDefence = checkPeicesPos(yourPeice,compPeice); //check defending move as 2nd priority
            if(!isDefence) attack(compPeice); //if not then attack smartly
        }else{ //if there is a winning move
            isGameOn = false;
        }
        paint();
    }

    let attack = (c) => {
        let smartPositions = [[0,0],[0,2],[1,1],[2,0],[2,2]];
        let smartRandPos = 0;
        let count = 0;
        if(paintCount === 3 && b[1][1] == compPeice){
            if(b[0][0] == playerPeice && b[2][2] == playerPeice)
                smartPositions = [[2,0],[0,2]];
            else if(b[2][0] == playerPeice && b[0][2] == playerPeice)
                smartPositions = [[0,0],[2,2]];
        }
        else if(paintCount>2&&b[1][1]==compPeice&&paintCount<8){
            if(b[0][1]==''&&b[1][2]==''&&b[0][2]=='') smartPositions = [[0,2]];
            else if(b[1][2]==''&&b[2][1]==''&&b[2][2]=='') smartPositions = [[2,2]];
            else if(b[2][1]==''&&b[1][0]==''&&b[2][0]=='') smartPositions = [[2,0]];
            else if(b[1][0]==''&&b[0][1]==''&&b[0][0] == '') smartPositions = [[0,0]];
            else{
                smartPositions = [[0,1],[1,2],[2,1],[1,0]];
            }
        }
        else if(turnCount<2&&b[1][1]==compPeice){
            smartPositions = [];
            if(b[0][1]==''&&b[1][2]=='') smartPositions.push([0,2]);
            if(b[1][2]==''&&b[2][1]=='') smartPositions.push([2,2]);
            if(b[2][1]==''&&b[1][0]=='') smartPositions.push([2,0]);
            if(b[1][0]==''&&b[0][1]=='') smartPositions.push([0,0]);
        }
        else if(b[0][0] !== '' && b[0][2]!=='' && b[1][1]!==''&&b[2][0]!==''&&b[2][2]!==''){
            smartPositions = [[0,1],[1,2],[2,1],[1,0]];
        }



        do{
            let rand = Math.floor(Math.random()*(smartPositions.length));
            smartRandPos = smartPositions[rand];
            if(b[smartRandPos[0]][smartRandPos[1]]==''&&b[1][1] ==''&&turnCount>0){
                smartRandPos = [1,1];
            }
        }while(b[smartRandPos[0]][smartRandPos[1]]!=='');

        b[smartRandPos[0]][smartRandPos[1]] = c;
        if(turnCount < 2) paint();
    }

    let paint = () => {
        for(let i = 0; i < b.length; i++){
            for(let j = 0; j < b[i].length; j++){
                if(b[i][j] !== ''){
                    let p = [i,j];
                    let c = b[i][j];

                    if(_.isEqual(p, [0,0])) r00.html(c);
                    else if (_.isEqual(p, [0,1])) r01.html(c);
                    else if (_.isEqual(p, [0,2])) r02.html(c);

                    else if (_.isEqual(p, [1,0])) r10.html(c);
                    else if (_.isEqual(p, [1,1])) r11.html(c);
                    else if (_.isEqual(p, [1,2])) r12.html(c);

                    else if (_.isEqual(p, [2,0])) r20.html(c);
                    else if (_.isEqual(p, [2,1])) r21.html(c);
                    else if (_.isEqual(p, [2,2])) r22.html(c);
                }
            }
        }

        paintCount++;
        checkGameStatus();
    }
    function doPlayWithComp(){
        if(isComputerTurn) return;
        let r = $(this).attr('id');
        if(paintPos(r,playerPeice)) return;
        autoCompMove();
    }
    let paintPos = (position,peice) => {
        switch(position){
            case 'r11': pos = [0,0]; break;
            case 'r12': pos = [0,1]; break;
            case 'r13': pos = [0,2]; break;

            case 'r21': pos = [1,0]; break;
            case 'r22': pos = [1,1]; break;
            case 'r23': pos = [1,2]; break;

            case 'r31': pos = [2,0]; break;
            case 'r32': pos = [2,1]; break;
            case 'r33': pos = [2,2]; break;
                       }
        if(b[pos[0]][pos[1]] !== '') return true;
        b[pos[0]][pos[1]] = peice;
        paint();
    }
    let checkPeicesPos = (i,j) => {

        if(b[0][0] == i && b[0][2] == i && b[0][1] == ''){ b[0][1] = j;return true;} // ->
        else if(b[0][0] == i && b[2][2] == i && b[1][1] == ''){ b[1][1] = j; return true;} // ->
        else if(b[0][0] == i && b[2][0] == i && b[1][0] == ''){ b[1][0] = j; return true;} // ->

        else if(b[0][1] == i && b[0][2] == i && b[0][0] == ''){ b[0][0] = j; return true;}// ->
        else if(b[1][1] == i && b[2][2] == i && b[0][0] == ''){ b[0][0] = j; return true;}// ->
        else if(b[1][0] == i && b[2][0] == i && b[0][0] == ''){ b[0][0] = j; return true;}// ->


        else if(b[0][2] == i && b[2][0] == i && b[1][1] == '') {b[1][1] = j; return true;}// ->
        else if(b[0][2] == i && b[2][2] == i && b[1][2] == '') {b[1][2] = j;return true;} // ->

        else if(b[0][0] == i && b[0][1] == i && b[0][2] == '') {b[0][2] = j;return true;} // ->
        else if(b[2][0] == i && b[1][1] == i && b[0][2] == '') {b[0][2] = j;return true;} // ->
        else if(b[2][2] == i && b[1][2] == i && b[0][2] == '') {b[0][2] = j;return true;} // ->
        else if(b[2][2] == i && b[2][0] == i && b[2][1] == ''){ b[2][1] = j;return true;} // ->

        else if(b[0][0] == i && b[1][1] == i && b[2][2] == ''){ b[2][2] = j;return true;} // ->
        else if(b[2][0] == i && b[2][1] == i && b[2][2] == '') {b[2][2] = j; return true;} // ->
        else if(b[0][2] == i && b[1][2] == i && b[2][2] == ''){ b[2][2] = j; return true;} // ->

        else if(b[0][0] == i && b[1][0] == i && b[2][0] == ''){ b[2][0] = j;return true;} // ->
        else if(b[0][2] == i && b[1][1] == i && b[2][0] == '') {b[2][0] = j; return true;}// ->
        else if(b[2][2] == i && b[2][1] == i && b[2][0] == '') {b[2][0] = j; return true;} // ->

        else if(b[0][1] == i && b[2][1] == i && b[1][1] == ''){ b[1][1] = j; return true;} // ->
        else if(b[2][1] == i && b[1][1] == i && b[0][1] == '') {b[0][1] = j; return true;} // ->

        else if(b[1][2] == i && b[1][0] == i && b[1][1] == ''){ b[1][1] = j;return true;} // ->
        else if(b[1][0] == i && b[1][1] == i && b[1][2] == ''){ b[1][2] = j; return true;} // ->

        else if(b[0][1] == i && b[1][1] == i && b[2][1] == ''){ b[2][1] = j; return true;}// ->

        else if(b[1][2] == i && b[1][1] == i && b[1][0] == '') {b[1][0] = j; return true;}// ->
        return false;
    }
    let checkWin = (c) => {
        if(b[0][0] == c && b[0][1] == c && b[0][2] == c){return [true,[$("#r11"),$("#r12"),$("#r13")]];}
        if(b[1][0] == c && b[1][1] == c && b[1][2] == c){return [true,[$("#r21"),$("#r22"),$("#r23")]];}
        if(b[2][0] == c && b[2][1] == c && b[2][2] == c){return [true,[$("#r31"),$("#r32"),$("#r33")]];}

        if(b[0][0] == c && b[1][0] == c && b[2][0] == c){return [true,[$("#r11"),$("#r21"),$("#r31")]];}
        if(b[0][1] == c && b[1][1] == c && b[2][1] == c){return [true,[$("#r12"),$("#r22"),$("#r32")]];}
        if(b[0][2] == c && b[1][2] == c && b[2][2] == c){return [true,[$("#r13"),$("#r23"),$("#r33")]];}

        if(b[0][0] == c && b[1][1] == c && b[2][2] == c){return [true,[$("#r11"),$("#r22"),$("#r33")]];}
        if(b[0][2] == c && b[1][1] == c && b[2][0] == c){return [true,[$("#r13"),$("#r22"),$("#r31")]];}

        return false;
    }
    let reset = () =>{

        b = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        player1score = 0;
        player2score = 0;

        for(let i = 0; i < timeouts1.length; i++) clearTimeout(timeouts1[i]);
        for(let i = 0; i < timeouts2.length; i++) clearTimeout(timeouts2[i]);

        for(let i = 1; i <= 3; i++){
            for(let j = 1; j <= 3; j++){
                $("#r"+i+""+j).removeClass("win").html("");
            }
        }

        $("#page2,#page3,#page4,#page5,#turn-info,#message,.info").hide(); 
        $("#page1").fadeIn();
        $("#page4").removeClass("disable");

        $("#x2,#o2").show();
        $("#x3,#o3").show();
        $("#back2,#back3").show();
        $("#one-player,#two-player").show();
        $("#player1-score,#player2-score").html(0);
    }
    });