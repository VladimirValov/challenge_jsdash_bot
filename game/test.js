
let { cave } = require('./log.json');

let screen = cave;

console.log(cave); 


let {x, y} = find_player();

console.log( {x, y} );

// findRadiusOf(1);

let dx ,dy;


let step = 4;
console.log({step})
console.log( [x, y] );


function find(target) {


    target_xy = explore_top_right(i);
    if (target_xy) return target_xy;
    
    target_xy = explore_top_left(i);
    if (target_xy) return target_xy;

    target_xy = explore_bottom_right(i);
    if (target_xy) return target_xy;

    target_xy = explore_bottom_left(i);
    if (target_xy) return target_xy;
}



function explore_top_right(step) {
    // [0, 0] -> [-1, -1]

    for(let n = 1; n <=step; n++) {
        [dx, dy] = [x - n, y - n]
        if ( marker(dx, dy) );

        for (i = 0; i < n; i++ ) {

            [dx, dy] = [x - i, y - n]
            marker(dx, dy);    

            [dx, dy] = [x - n, y - i];
            marker(dx, dy);     
        }
    }
}
function explore_top_left(step) {
// [0, 0] -> [-1, 1]

    for(let n = 1; n <=step; n++) {
        [dx, dy] = [x + n, y - n]
        marker(dx, dy);

        for (i = 0; i < n; i++ ) {

            [dx, dy] = [x + i, y - n]
            marker(dx, dy);    

            [dx, dy] = [x + n, y - i];
            marker(dx, dy);     
        }
    }
}


function explore_bottom_right(step) {
    // [0, 0] -> [1, 1]

    for(let n = 1; n <=step; n++) {
        [dx, dy] = [x + n, y + n]
        marker(dx, dy);

        for (i = 0; i < n; i ++ ) {

            [dx, dy] = [x + i, y + n]
            marker(dx, dy);    

            [dx, dy] = [x + n, y + i];
            marker(dx, dy);     
        }
    }
}

function explore_bottom_left(step) {

    for(let n = 1; n <=step; n++) {
        [dx, dy] = [x - n, y + n]
        marker(dx, dy);

        for (i = 0; i < n; i++ ) {

            [dx, dy] = [x - i, y + n]
            marker(dx, dy);    

            [dx, dy] = [x - n, y + i];
            marker(dx, dy);     
        }
    }
}











// [0, 0] -> [-1, -1]



// [-2, -2]
// [ 0, -1]
// [-1,  0]
// [ 0, -2]
// [-2,  0]



console.log(screen);
            




// //n
// [dx, dy] = [ n,  n];
// [dx, dy] = [ 0,  n];
// [dx, dy] = [ n,  0];


function marker(x, y) {

    if ( screen[y][x] == '*' ) {
        console.log("FIND! --:  " , {x, y});
        return true;
    }
    else 
    screen[y] = screen[y].substring(0, x) + ' ' + screen[y].substring(x+1);
    // console.log({x, y})
}







// console.log(screen); 



function find_player(){
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


function find_diamand (target, x, y) {
    // let {dx, dy}  = {x, y};

    const max_radius = Math.min(x, y, screen.length, screen[0].length);

    for (let radius = 1; radius < max_radius; radius ++ ) {
       findRadiusOf(radius, x, y);
    }}

function findRadiusOf(radius) {
    
    dx = x - radius;
    dy = y - radius;

    let length = radius + 2; // length = 3

    //horizontal
    for(let i = 0; i < length; i++) {

        if ( screen[dx + i][dy] == target || screen[dx + i][dy + length] == target )
            return {dx, dy}
    }

    //vertical
      for(let i = 1; i < length - 1; i++) {

        if ( screen[dx][dy + i] == target || screen[dx + length][dy + i] == target )
            return {dx, dy}
    }
}


// change()





