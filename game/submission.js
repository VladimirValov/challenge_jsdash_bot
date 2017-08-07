'use strict'; /*jslint node:true*/

let screen; 
let old_x, old_y; 

let dx1, dy1;

let labirint = false;

function find_player(screen){
    for (let y = 0; y<screen.length; y++)
    {  
        let row = screen[y];
        //  console.log(row);
        for (let x = 0; x < row.length; x++) {
        // {   console.log(row[x]);
            
            if (row[x]=='A')
                return {x, y};

            // console.log(screen);
            // screen[y] = screen[y].substring(0, x) + '@' + screen[y].substring(x+1);
        }
    }
}

function move_labirint (x, y, x1, x2) {

}

function move_autopilot(x, y, x1, y1, screen) {  

    let move ="";
    let ways = ""
   
    // ways = check_ways(x, y);

    let dx = (x < x1) ? 'r' : 'l';
    let dy = (y < y1) ? 'd' : 'u'; 

    // move = (ways.includes(dx)) ? dx : "";

    // move = (ways.includes(dy)) ? dy : ""

    // if (!move)  move = ways[Math.floor(Math.random()*ways.length)];   

   

    // let move_x = (ways.includes(dx)) ? dx : "";
    // let move_y = (ways.includes(dx)) ? dy : "";   
    // move = ( Math.abs(x - x1) > Math.abs(y - y1)  ) ?  dx : dy;

    return dx
    
}






function check_ways(x, y) {
    
        let moves = '';
        if (' :*'.includes(screen[y-1][x]))
            moves += 'u';
        if (' :*'.includes(screen[y+1][x]))
            moves += 'd';
        if (' :*'.includes(screen[y][x+1])
            || screen[y][x+1]=='O' && screen[y][x+2]==' ')
        {
            moves += 'r';
        }
        if (' :*'.includes(screen[y][x-1])
            || screen[y][x-1]=='O' && screen[y][x-2]==' ')
        {
            moves += 'l';
        }

        return moves;
}



function find_diamands (screen) {

    return screen.map((row, y) => {
        // console.log(row);
        let all_target = [];

        for (let x = 0; x < row.length; x++) {
            if (row[x] == '*')
                all_target.push( {x, y} );
            else screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
        }

        return all_target
    });  
    
}



exports.play = function*(cave){
    screen = cave;
   
    
    // let all_diamands = find_diamands(screen); 

    while (true){
         let {x, y} = find_player(screen); //вынести за цикл хранить новые координаты

        if (!dx1) {
            //выбор точки назначения            
        }





     
        let move = ( labirint ) ? move_labirint (x, y, 5, 5) : move_autopilot(x, y, 1, 1);

        yield move;
    }
};