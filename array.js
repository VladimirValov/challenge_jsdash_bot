let start = new Date();

const screen = [
'11111111111111111111',
'111A1111111111111111',
'11111111111111111111',
'11111111111111111111',
'11111111111111111111',
'11100001111111111111',
'11111111111111111111',
'11111111111111111111',
'11111*11111111111111',
'11111111111111111111',
]
console.log('Initial screen');
console_screen(screen);
max_x = screen[0].length -1;
max_y = screen.length -1;


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



 //------navigate map-----------


let dist = distance(player.x, player.y, diamand.x, diamand.y);

let route = [];

for (let i = 0; i < dist; i ++) {
    
    let next={};
    // console.log ('player', player);

    let step = move_autopilot(player.x, player.y, diamand.x, diamand.y);

    // console.log( step );
    [next.x, next.y] = next_step(step, player.x, player.y);

    if (screen[next.y][next.x] == 0){
        route.push(player);
        dead_end.push(next);
        console.log('player', player);        
        console.log("next", next);

        // console.log("-------------------");
        //массив координат текущей преграды
        let wall  = explore_wall(next.x, next.y); //пердавать две координаты для определния направления
        console.log(wall);

        // let left  = wall[0] [1],
        //     right = wall[wall.length - 1] ;             

        // if (screen[left.y + 1][left.x - 1] == 1 ) {

        //  }   

    }
    else 
        marker(next.x, next.y);
    player = next;    
}


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
    let ways = possible_ways(x, y)
    // console.log(y + '| ways', ways);

    let move_x = (x < x1) ? 'r' : 'l';
    let move_y = (y < y1) ? 'd' : 'u'; 

    move = ( Math.abs(x - x1) > Math.abs(y - y1)  ) ?  move_x : move_y;

    // console.log('move', move);  

    return move   
}


function possible_ways(x, y) {
      let ways = '';
    //   console.log(x, y);

      if (y > 0 && !+screen [y-1][x]      == 1)  ways += 'u';
      if (y < max_y && screen [y+1][x]  == 1)  ways += 'd';
      if (x > 0 && screen [y][x-1]      == 1)  ways += 'l';
      if (x < max_x && screen [y][x+1]  == 1)  ways += 'r';

      return ways  
}

//определяет габариты препятсвия
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



    for (let i = 0; i < wall.length; i++ ) {
        
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


//выводит в консоль карту в форматрированном виде  
function console_screen(screen){
    for (let y = 0; y < screen.length; y++)
    {  
        let row = screen[y];
        let row_space = y +"|";
        for (let x = 0; x < row.length; x++) {
            row_space += " " + row[x]
        }
        console.log(row_space);
    }
}
// { x: 3, y: 5 }
 explore_block(3, 5);

//выводит в консоль карту в форматрированном виде  
function console_screen(screen){
    for (let y = 0; y < screen.length; y++)
    {  
        let row = screen[y];
        let row_space = y +"|";
        for (let x = 0; x < row.length; x++) {
            row_space += " " + row[x]
        }
        console.log(row_space);
    }
}


//определяет габариты препятсвия
function explore_block(x, y) {
   ///// Mapping baterfly
    console.log('Mapping baterfly');  

    let wall = [{x, y}];
    

    for (i = 0; i < wall.length; i++) {
        let b = wall[i];
        console.log(b);        
        console.log(screen[b.y][b.x]);
        screen[b.y][b.x] = 8;

        // if ( screen[b.y][b.x+1] == 0)    {
        //     wall.push({x : b.x + 1, y: b.y})
        //     // screen[b.y][b.x+1] = '+'
        // }
        // if ( screen[b.y][b.x-1]   == 0)    {

        //     wall.push({x : b.x - 1, y: b.y})
        //     // screen[b.y][b.x-1] = '+'
        // }
        // if ( screen[b.y+1][b.x] == 0 )    {
        //     wall.push({x : b.x, y: b.y + 1})
        //     // screen[b.y+1][b.x] = '+'
        // }
        // if ( screen[b.y-1][b.x] == 0)    {
        //     wall.push({x : b.x, y: b.y - 1})
        //     // screen[b.y-1][b.x] == '+';
        // } 

    }     
    console.log("Найдено клеток с бабочками: " + wall.length);
}


console_screen(screen);
