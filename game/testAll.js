
let { cave } = require('./log.json');

let screen = cave;
let [px, py] = find_player();
let diamands = find_diamands(screen);

let {dx, dy} = choose_daimand();

// console.log(cave); 




console.log(screen);
console.log(screen.length, screen[0].length);

console.log({px, py});
console.log({dx, dy});


function find_player(){
    for (let y = 0; y<screen.length; y++)
    {  
        let row = screen[y];
        for (let x = 0; x < row.length; x++) {            
            if (row[x]=='A')
                return [x, y];
        }
    }
}


function find_diamands (screen) {
    return screen.map((row, y) => {
        console.log(row);
        all_target = [];

        for (let x = 0; x < row.length; x++) {
            if (row[x] == '*')
                all_target.push( {x, y} );
            // else screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
        }
        return all_target
    });  
    
}


function marker(x, y) {

    // if ( screen[y][x] == '$*' ) {
    //     console.log("FIND! --:  " , {x, y});
    //     return true;
    // }
    // else 
    screen[y] = screen[y].substring(0, x) + '$' + screen[y].substring(x+1);
    // console.log({x, y})
}


function choose_daimand () {

    return {px, py}
    
//  берем строку в которй находимся, считаем до нее расстояние,
//  потом берем строку сверху и снизу.

}
5, 5 - 10, 15

function move_to(x1, y1) {
    
    directionX = (x < x1) ? directionX = 'r' : 'l';
    directionY = (y < y1) ? directionY = 'u' : 'd';

    checkway(directionX);
    checkway(directionY);

    ways = [checkway(directionX), checkway(directionY)]


    return (ways.length) ? ways[0] : find_way()
}


