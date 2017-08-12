'use strict'; /*jslint node:true*/

let screen; 

let px, py,
    px_0, py_0,
    dx, dy;
let player;
let goal=[];


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



function autopilot(a, b) {  

   
    if (goal.length) return goal.pop();

    let move ="";
    let ways = ""

   
    ways = check_ways(a);
    console.log('ways = ',ways);

    let dx, dy;
    if(a.x!=b.x)    dx = (a.x < b.x) ? 'r' : 'l';
    if(a.y!= b.y)   dy = (a.y < b.y) ? 'd' : 'u'; 

    console.log(dx, dy)

    let move_x = (ways.includes(dx)) ? dx : "";
    let move_y = (ways.includes(dy)) ? dy : "";
    

    if (move_y && move_x )
        move = min_distance_xy(a.x, b.x, a.y, b.y) ? move_x : move_y;

    else  move = (move_x) ? move_x : move_y;

    if (move) return move 
        else console.log("тупик")
   
   
    // Два желаемых направления перекрыты не пройти!
    
    if (dx && dy) {
        console.log("Тупик по двум направлениям! Выпускай крысу!!!")
        throw new Error('Тупик');
    }

    //обход одиночного препятсвия
    //В данном случае мы находимся на одном уровне с преградой
    //либо одно из направлений перекрыто

    goal = [dx || dy]; // желаемое движение
    console.log('goal = ', goal + ', dx = ' + dx + ', dy = ' + dy);

    // dx, dy = undefined кода игрок находится на одной линии с целью 

    if (!dy) {
        let ways_next = check_ways( next_step(dx) )

        if  (ways.includes('u') && ways_next.includes('u'))     goal.push('u');
        else if 
            (ways.includes('d') && ways_next.includes('d'))     goal.push('d');
    }

    if (!dx) {
        let ways_next = check_ways( next_step(dy) )

        if  (ways.includes('l') && ways_next.includes('l')) goal.push('l');
        else if 
            (ways.includes('r') && ways_next.includes('r'))     goal.push('r');
    }
    
    console.log('goal = ', goal);

    if (goal.length > 1) return goal;

    //Мы находимся на одной оси с целью 
    //прямо не пройти  + его не обойти слева справа

    console.log( "Я в печали, пути нет" )
    throw new Error(` в печали, пути нет - тупик ${goal} \n `);
}



function min_distance_xy(x, x1, y, y1) {
    return Math.abs(x - x1) > Math.abs(y - y1);
}






function check_ways(cell) {

    console.log('cell', cell);

    let {x, y} = cell;
    
        let moves = '';

         if (' :*'.includes(screen[y][x-1])
            || screen[y][x-1]=='O' && screen[y][x-2]==' ')
        {
            moves += 'l';
        }

        if (' :*'.includes(screen[y-1][x]) && !'O*'.includes(screen[y-2][x]) )
            moves += 'u';       

        if (' :*'.includes(screen[y][x+1])
            || screen[y][x+1]=='O' && screen[y][x+2]==' ')
        {
            moves += 'r';
        }

        if (' :*'.includes(screen[y+1][x]))
        moves += 'd';       

        return moves;
}

function next_step(step) {
    let {x, y} = player;

    switch(step) {
        case 'r' : x++; break;
        case 'l' : x--; break;
        case 'd' : y++; break;
        case 'u' : y--; break;
    }
    return {x, y}
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
        player = {x: px, y: py};

        d=find_diamands(screen)[0];

                 
    //    if (d && d.x == px && d.y == py) {
    //         // let diamands = find_diamands(screen); 
    //         d = find_diamands(screen)[0];
    //     }

        // [ px_0, py_0] = [px, py];

     
        // if (d) move = ( labirint ) ? move_labirint (px, py, d.x, d.y) : move_autopilot(px, py, d.x, d.y);
        let move = autopilot({x:px, y: py}, d);

        if(!move) throw new Error(" Avtopilot dont work ")

        yield move;
    }
};