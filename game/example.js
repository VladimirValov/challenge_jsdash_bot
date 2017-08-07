'use strict'; /*jslint node:true*/

function find_player(screen){
    for (let y = 0; y < screen.length; y++) {
        let row = screen[y];

        for (let x = 0; x < row.length; x++) {
            
            if (row[x]=='A')  return {x, y};
        }
    }
}

// function find_diamands (screen) {

//     return screen.map((row, y) => {
//         console.log(row);
//         all_target = [];

//         for (let x = 0; x < row.length; x++) {
//             if (row[x] == '*')
//                 all_target.push( {x, y} );
//             else screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
//         }

//         return all_target
//     });  
    
// }



exports.play = function*(screen){
    let {x, y} = find_player(screen);
    while (true){
        
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
        yield moves[Math.floor(Math.random()*moves.length)];
    }
};
