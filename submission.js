let start = new Date();

const { cave }          = require('./cave') ;
const { screen_mapping }= require('./maping_seed');
// const { autopilot }       = require('./autopilot');

// let cave_arr = cave.map(el => el.split(""));

let screen = screen_mapping(cave);

let player = find_player(); 
let diamands = find_diamands();

let player1;
let forced_step = [];

// console.log(diamands);
console.log(player);

let target = find_diamands(screen)[0];
let checkpoints = []; //промежуточные точки обхода препятсвий
let point; // промежуточная точка

for (i = 0; i < 68; i++) {
    console.log(cave);
    print_screen()    
    console.log('player, target', 'checkpoints'); 
    console.log(player, target, checkpoints); 
    let step;

    if (!checkpoints.length) {
        step = autopilot(player, target)
    }
    else {
        if (!point) point = checkpoints.pop()

        if( player.x == point.x && player.y == point.y) { 
            console.log("checkpoints finish")
            point = 0;
            step = autopilot(player, target);
         } 
            // throw new Error(step);
         step = (point) ? autopilot(player, point) : autopilot(player, target);
    } 
        

    console.log('step: =', step);



    // screen[player.y][player.x] = step;
    screen[player.y][player.x] = ':';

    player1 = next_step(step)

    screen[player1.y][player1.x] = 'A';

    player = player1;
    console.log('player, target', 'checkpoints'); 
    console.log(player, target, checkpoints); 

    if( player.x == target.x && player.y == target.y) {
        console.log(cave);
        print_screen()
        // screen = screen_mapping(cave)
        diamands = find_diamands();
        target = diamands[0];
        print_screen()        
        console.log(player, target);
    }
}

// console.log( autopilot(player, diamands[0]) );



function autopilot(a, b) {  
    
    

    if (forced_step.length) return forced_step.pop();


    let move ="";
    let ways = ""

   
    ways = check_ways(a);
    console.log('ways = ',ways);
    console.log('a, b')
    console.log(a, b)

    let dx, dy;
    if(a.x != b.x)    dx = (a.x < b.x) ? 'r' : 'l';
    if(a.y != b.y)    dy = (a.y < b.y) ? 'd' : 'u'; 

    console.log('dx, dy')
    console.log(dx, dy)


    let move_x = (ways.includes(dx)) ? dx : "";
    let move_y = (ways.includes(dy)) ? dy : "";
    

    if (move_y && move_x )
        move = min_distance_xy(a, b) ? move_x : move_y;

    else  move = (move_x) ? move_x : move_y;


    console.log("move ", move, "move_x ", move_x, "move_y ", move_y);

    if (move) return move 
        else console.log("Есть преграды")
   
   
    // Два желаемых направления перекрыты не пройти!
    
    if (dx && dy) {
        console.log("Тупик по двум направлениям! Выпускай крысу!!!")

        // let {x, y} = next_step(dx);

        let wall = explore_wall(dx);

        console.log('wall ', wall)

        let l = r = u = d = wall[0];

        wall.forEach(brick => {

            if (l.x >= brick.x) l = brick;
            // if (ul.x == brick.x && ul.y >= brick.y) ul = brick;

            if (r.x <= brick.x) r = brick;
            // if (ul.x == brick.x && ul.y <= brick.y) dl = brick;

            if (u.y >= brick.y) u = brick;
            // if (ul.y == brick.y && ul.x <= brick.x ) ur = brick;

            if (d.y <= brick.y) d = brick;
            // if (ul.y == brick.y && ul.x <= brick.x) dr = brick;
            
        });

        screen[l.y][l.x] = 'l';
        screen[r.y][r.x] = 'r';
        screen[u.y][u.x] = 'u';
        screen[d.y][d.x] = 'd';

        print_screen();

        wall.forEach(brick => {
            screen[brick.y][brick.x] = '+';
        })

        l = (l.x > 1) ? next_step('l', l) : {x: 100, y: 100} 
        r = (r.x < screen[0].length - 2) ? next_step('r', r) : {x: 100, y: 100}

        u = (u.y > 1 ) ? next_step('u', u) : {x: 100, y: 100};
        d = (d.y < screen.length - 2) ? next_step('d', d) : {x: 100, y: 100}

        console.log ("--- l, r, u, d");
        console.log (l, r, u, d);

        // screen[l.y][l.x] = 'l';
        // screen[r.y][r.x] = 'r';
        // screen[u.y][u.x] = 'u';
        // screen[d.y][d.x] = 'd';

        // print_screen();

        let direction = min_distance_xy(a, b) ? dx : dy;
        // let bypass_y = (distance(a, u) < distance(a, d)) ? 'u' : 'd'
        console.log('direction = ', direction);

        if (direction == 'r' || direction == 'l') {

            // if (direction == 'l' && a.y < r.y ) {
            //     console.log(" checkpoints[1] = r ")
            //     // checkpoints[1] = r;
            // }
            (distance(a, u) < distance(a, d))
                ? checkpoints[0] = u
                : checkpoints[0] = d;

            }

        if (direction == 'u' || direction == 'd') {
            (distance(a, r) < distance(a, l))
                ? checkpoints[0] = r
                : checkpoints[0] = l;
            }
        
        if (direction == 'l') {

        }

        
        console.log(checkpoints)   
        
        return checkpoints;

        throw new Error('Тупик');
    }

    //обход одиночного препятсвия
    //В данном случае мы находимся на одном уровне с преградой и прямо не пройти


    forced_step = [dx || dy]; // желаемое движение
    console.log('forced_step = ', forced_step + ', dx = ' + dx + ', dy = ' + dy);

    // dx, dy = undefined кода игрок находится на одной линии с целью 

    if (!dy) {
        console.log('--- dy = undefined');
        let ways_next = check_ways( next_step(dx) )

        if  (ways.includes('u') && ways_next.includes('u'))     forced_step.push('u');
        else if 
            (ways.includes('d') && ways_next.includes('d'))     forced_step.push('d');
    }

    if (!dx) {
        console.log('--- dx = undefined');
        let ways_next = check_ways( next_step(dy) )
        console.log(ways_next);

        if  (ways.includes('l') && ways_next.includes('l')) forced_step.push('l');
        else if 
            (ways.includes('r') && ways_next.includes('r')) forced_step.push('r');
    }
    
    console.log('forced_step = ', forced_step);

    if (forced_step.length > 1) return forced_step;

    //Мы находимся на одной оси с целью 
    //прямо не пройти  + его не обойти слева справа

    console.log( "Я в печали, пути нет" )
    throw new Error(` в печали, пути нет - тупик ${forced_step} \n `);

}



function explore_wall( step ) {
    let wall = [ next_step(step) ];

    for (i = 0; i < wall.length; i++) {
        let point = wall[i];
        let brick = point;

        console.log(i, brick);
        screen[brick.y][brick.x] = '#';

        brick = next_step('u', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }

        brick = next_step('d', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }

        brick = next_step('l', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }

        brick = next_step('r', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }

        brick = next_step('ul', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }    

        brick = next_step('ur', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }

        brick = next_step('dl', point) 
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        } 

        brick = next_step('dr', point)
        // console.log(brick);
        if (screen[brick.y][brick.x] == "+") {
            wall.push(brick)
            screen[brick.y][brick.x] = '#';
        }        
    
    }

    return wall;
}
       











function next_step(step, point = player ) {
    let {x, y} = point;

    switch(step) {
        case 'r' : x++; break;
        case 'l' : x--; break;
        case 'd' : y++; break;
        case 'u' : y--; break;

        case 'ul' : x--; y--; break;
        case 'ur' : x++; y--; break;
        case 'dl' : x--; y++; break;
        case 'dr' : x++; y++; break;
    }
    return {x, y}
}






function find_diamands () {
   let all_target = [];
    
    screen.map((row, y) => {       

        for (let x = 0; x < row.length; x++) {
            if (row[x] == '*')
                all_target.push( {x, y} );
        }    
    });  
    return all_target
    .map((el) =>  [distance(player, el),  el]).sort((a, b) => a[0] - b[0]).map(el => el[1]);    
}

function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function min_distance_xy(a, b) {
    return Math.abs(a.x - b.x) > Math.abs(a.y - b.y);
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

        if (' :*'.includes(screen[y-1][x]) )
        // if (' :*'.includes(screen[y-1][x]) && !'O*'.includes(screen[y-2][x]) )
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




function find_player() {
    for (let y = 0; y<screen.length; y++)
    {  
        let row = screen[y];
        for (let x = 0; x < row.length; x++) {            
            if (row[x]=='A')
                return {x, y};
        }
    }
}


function print_screen() {
    for (let y = 0; y < screen.length; y++) {
        let row = screen[y];
        row[0] = (y < 10) ? '0' + y + " " : y + " ";
        console.log(row.join(""));
    }
}


function cave_to_array (cave) {
    return cave.map(el => el.split(""));
}

