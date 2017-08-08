'use strict'; /*jslint node:true*/

let screen; 

let px, py,
    px_0, py_0,
    dx, dy;


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
                return [x, y];

            // console.log(screen);
            // screen[y] = screen[y].substring(0, x) + '@' + screen[y].substring(x+1);
        }
    }
}
let way_x = true, way_y = true;

function move_labirint (x, y, x1, y1) {
    let move_x = true,
        move_y = true,
        move;

    let ways = check_ways(x, y);

    // if (! way_x) 

        // if (!way_x)
        

    // if (x=x1) move_x = false;
    // if (y=y1) move_y = false;

    // if (move_x && move_y ) 
    min_distance_xy(x, x1, y, y1) ? move_x = false : move_y = false;
   

    

    if(!move_x) {
        move = ways.includes('d') ? 'd' : 'u';
        way_x = true;
    }

    if(!move_y) {
        move = ways.includes('d') ? 'd' : 'u';
        way_y = true; 
    }

    // if (!move) move = no_way;

    // if(!move) labirint = "";

    return move || " " ;
    // return move || move_autopilot(x, y, x1, y1) ;
}



function autopilot(x, y, x1, y1) {  

    let move ="";
    let ways = ""
   
    ways = check_ways(x, y);
    let dx, dy;
    if(x!=x1) 
         dx = (x < x1) ? 'r' : 'l';
    if(y != y1)
        dy = (y < y1) ? 'd' : 'u'; 

    let move_x = (ways.includes(dx)) ? dx : "";
    let move_y = (ways.includes(dy)) ? dy : "";

    if (move_y && move_x )
        move = min_distance_xy(x, x1, y, y1) ? move_x : move_y;

    else  move = (move_x) ? move_x : move_y;

    if (move) return move

    labirint = true; 

    return move_labirint (x, y, x1, y1)
}

function min_distance_xy(x, x1, y, y1) {
    return Math.abs(x - x1) > Math.abs(y - y1);
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
   let all_target = [];
    
    screen.map((row, y) => {
        // console.log(row);       

        for (let x = 0; x < row.length; x++) {
            if (row[x] == '*')
                all_target.push( {x, y} );
            // else screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
        }    
    });  
    return all_target
    .map((el) =>  [distance(px, py, el.x, el.y),  el]).sort((a, b) => a[0] - b[0]).map(el => el[1]);    
}

function distance(x, y, x1, y1) {
    return Math.abs(x - x1) + Math.abs(y - y1);
}



exports.play = function*(cave){
    screen = cave; 

    let d, move;

    while (true){
        [px, py] = find_player(screen); //вынести за цикл хранить новые координаты
        if (!d) d=find_diamands(screen)[0];

                 
       if (d && d.x == px && d.y == py) {
            // let diamands = find_diamands(screen); 
            d = find_diamands(screen)[0];
        }

        // [ px_0, py_0] = [px, py];

     
        // if (d) move = ( labirint ) ? move_labirint (px, py, d.x, d.y) : move_autopilot(px, py, d.x, d.y);
        let move = (d) ? autopilot(px, py, d.x, d.y) : " ";

        yield move;
    }
};