let start = new Date();

const screen = [
'1111111111',
'111A111111',
'1111111111',
'1111111111',
'1111111111',
'1110000111',
'1111111111',
'1110001111',
'11111*1111',
]
console.log('Initial screen');
console_screen(screen);


// let x = 5,
//     y = 5;

//координаты игрока
let player = find_player(screen);
console.log('player');
console.log(player);

//целевой брильянт
let diamand = find_diamands(screen)[0];
console.log('diamand');
console.log(diamand);


//Расстояние до ближайшего брильянта;
console.log('distance');
console.log(distance(player.x, player.y, diamand.x, diamand.y));


//координаты тупиковой ситуации
let dead_end =[];

//массив координат текущей преграды
// let wall  = explore_wall(x, y);
// console.log(wall);
//  let left = wall[0]

 //------navigate map-----------


let dist = distance(player.x, player.y, diamand.x, diamand.y);

for (let i = 0; i < dist; i ++) {
    let next={};
    // console.log ('player', player);

    let step = move_autopilot(player.x, player.y, diamand.x, diamand.y, screen);

    // console.log( step );
    [next.x, next.y] = next_step(step, player.x, player.y);

    if (!+screen[next.y][next.x])
        dead_end.push(next);
    else 
        marker(next.x, next.y);

    player = next;    
}




// console.log(dist);

//конечное состояние карты
console.log('Finish screen');
console_screen(screen);
console.log( new Date() - start, "ms");




function next_step(step, x, y) {
    switch(step) {
        case 'r' : x++; break;
        case 'l' : x--; break;
        case 'd' : y++; break;
        case 'u' : y--; break;
    }
    return [x, y]
}



function move_autopilot(x, y, x1, y1, screen) {  
    let move ="";
    // let ways = possible_ways(x, y)
    // console.log('ways', ways);

    let dx = (x < x1) ? 'r' : 'l';
    let dy = (y < y1) ? 'd' : 'u'; 

    move = ( Math.abs(x - x1) > Math.abs(y - y1)  ) ?  dx : dy;   

    return move   
}


function possible_ways(x, y) {
      let ways = '';

      if (screen [y-1][x] == 1)  ways += 'u';
      if (screen [y+1][x] == 1)  ways += 'd';
      if (screen [y][x-1] == 1)  ways += 'l';
      if (screen [y][x+1] == 1)  ways += 'r';

      return ways  
}




//выводит в консоль карту в форматрированном виде  
function console_screen(screen){
    for (let y = 0; y < screen.length; y++)
    {  
        let row = screen[y];
        let row_space = "";
        for (let x = 0; x < row.length; x++) {
            row_space += " " + row[x]
        }
        console.log(row_space);
    }
}





// let left = wall[0];


function explore_wall(x, y) {
    const wall = [];
    let row = screen[y];
    console.log(row);

    for (let cell = 0, i = x; cell == 0 && i < row.length; i++ ) {
        cell = row [i];
        // console.log('cell: ' + cell);
        if (cell == 0)
            wall.push([i, { x: i, y }])
    }

    for( let cell = 0, i = x; cell == 0 && i > 0; i-- ) {
        cell = row [i];
        // console.log('cell: ' + cell);
        if (cell == 0)
            wall.push([i, { x: i, y }])
    }

    return wall.sort((a, b) => a[0] - b[0])
}

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

function find_diamands (screen) {

    let all_target = [];
    
    for(let y = 0; y < screen.length; y++ ) {
        let row = screen[y];

        for (let x = 0; x < row.length; x++) {
            if (row[x] == '*') 
                all_target.push( {x, y} );
                // console.log('row [x]', row[x])
        }      
    }
    return all_target   
}

// function find_diamands (screen) {
//    let all_target = [];
    
//     screen.map((row, y) => {
//         // console.log(row);       

//         for (let x = 0; x < row.length; x++) {
//             if (row[x] == '*')
//                 all_target.push( {x, y} );
//             // else screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
//         }    
//     });  
//     return all_target
//     .map((el) =>  [distance(px, py, el.x, el.y),  el]).sort((a, b) => a[0] - b[0]).map(el => el[1]);    
// }

function distance(x, y, x1, y1) {
    return Math.abs(x - x1) + Math.abs(y - y1);
}





function marker(x ,y, s = '.') {
    screen[y] = screen[y].substring(0, x) + s + screen[y].substring(x+1);
}

