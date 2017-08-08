
let { cave } = require('./log.json');

let screen = cave;
let [px, py] = find_player();
let diamands = find_diamands(screen);

let [dx, dy] = choose_daimand();

// console.log(cave); 


console.log(screen);
console.log('y = ',screen.length, 'x = ' + screen[0].length);
console.log('diamands', diamands.length);

console.log({px, py});
console.log({dx, dy});

console.log(diamands);

for(i = 0; i < diamands.length; i ++ ) {
    let d = find_diamands(screen)[0];
    marker(d.x, d.y, i)
}

// diamands.forEach((el, i) => {
//     marker(el.x, el.y, i)
// })
    


console.log(screen);



function choose_daimand () {

    let nearest = {px, py};

    // let tartegts = diamands
        

    // console.log (tartegts);

    

    return [px, py]


    
//  берем строку в которй находимся, считаем до нее расстояние,
//  потом берем строку сверху и снизу.

}

function distance(x, y, x1, y1) {
    return Math.abs(x - x1) + Math.abs(y - y1);
}





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
    all_target = [];
    
    screen.map((row, y) => {
        console.log(row);        

        for (let x = 0; x < row.length; x++) {
            if (row[x] == '*')
                all_target.push( {x, y} );
            // else screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
        }
        // return all_target
    });  
    let target_distance = all_target.map((el) =>  [distance(px, py, el.x, el.y),  el])
    console.log( 'target_distance' );
    console.log( target_distance );
    let sort_target = target_distance.sort((a, b) => a[0] - b[0])
    console.log( 'sort_target' );
    console.log( sort_target );
    return all_target.map((el) =>  [distance(px, py, el.x, el.y),  el])
                     .sort((a, b) => a[0] - b[0])
                     .map(el => el[1]);    
}


function marker(x, y, s) {

    // if ( screen[y][x] == '$*' ) {
    //     console.log("FIND! --:  " , {x, y});
    //     return true;
    // }
    // else 
    screen[y] = screen[y].substring(0, x) + s + screen[y].substring(x+1);
    // console.log({x, y})
}





function move_to(x1, y1) {
    
    directionX = (x < x1) ? directionX = 'r' : 'l';
    directionY = (y < y1) ? directionY = 'u' : 'd';

    checkway(directionX);
    checkway(directionY);

    ways = [checkway(directionX), checkway(directionY)]


    return (ways.length) ? ways[0] : find_way()
}


