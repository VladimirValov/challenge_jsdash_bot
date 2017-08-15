'use strict'; /*jslint node:true*/


class Rat {
    constructor(src) {
        this.src = src;
        this.point = src.player;
        this.route = "";
    }
    find_exit() {
        let direction = this.src.direction,
            rat1_point = this.point,
            rat2_point = this.point,
            s1 = 'ruldruld',
            s2 = 'rdlurdlu',
            route_1 = "",
            route_2 = "",
            step = "",            
            i = s1.indexOf(direction),
            j = s2.indexOf(direction),            
            coordinate = (direction == 'r' || direction == 'l') ? 'x' : 'y',
            brick = this.src.udlr_to_xy(direction, this.point);
            brick = this.src.udlr_to_xy(direction, brick);




            if (direction == 'r' || direction == 'l') {
                
            }
        console.log("Крыса ищет выход")
        
        while( (rat1_point[coordinate] != brick[coordinate] || rat1_point == this.point) &&
               (rat2_point[coordinate] != brick[coordinate] || rat2_point == this.point) ) 
        {   
            //rat1         
            if (i == 0) i = 4
            if (i == 7) i = 3
            step = this.src.check_step(s1[i], rat1_point);
            console.log('step', step);
            if (step) {
                rat1_point = this.src.udlr_to_xy(step, rat1_point);
                route_1 +=step; 
                i--;
            }
            else i++

            //rat2
            if (j == 0) j = 4
            if (j == 7) j = 3
            step = this.src.check_step(s2[j], rat2_point);
            console.log('step', step);
            if (step) {
                rat2_point = this.src.udlr_to_xy(step, rat2_point);
                route_2 +=step; 
                j--;
            }
            else j++  
        }
        console.log(route_1); 
        console.log(route_2); 
        this.route = (rat1_point[coordinate] == this.point[coordinate]) ? route_1 : route_2; 
        console.log(this.route);

        return this.route.split("").reverse();
    }
}




class Screen {
    constructor() {
        this.direction = "";
        this.steps_bypass = "";
    }
    update(screen) {
        this.screen = screen.map(el => el.split(""));
        this.player = this.find('A');
        this.diamands = this.find('*', 'all')
        this.nearby_diamand = this.find_nearby_diamand();
        this.step = this.navigate()
    }
    find(s, option) { 
        let arr = []

        for(let y = 1; y < this.screen.length - 1; y++ ) {
            let row = this.screen[y];
            for(let x = 1; x < row.length - 1; x ++) {
                if (row[x] == s) {
                    // console.log(`find "${s}": x = ${x} y = ${y}`);
                    
                    if (option != 'all') return {x, y}
                    arr.push({x, y});
                }
            }            
        }
        return arr;
    }
    find_nearby_diamand() {
        if (this.diamands.length)
            this.diamands.sort((a, b) => this.distance(this.player, a) - this.distance(this.player, b) );
        return this.diamands[0];
    } 
    distance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    } 
    distance_x(a, b) {
        return Math.abs(a.x - b.x);
    }
    distance_y(a, b){
        return Math.abs(a.y - b.y);
    }
    get_posible_step() {

    } 
    navigate(target = this.nearby_diamand) {
        if (!target) return "";
        
        if(Array.isArray(this.steps_bypass) && this.steps_bypass.length) {    
           
            return this.steps_bypass.pop();
        }
            
        let max_distance_xy = this.distance_x(this.player, target) > this.distance_y(this.player, target);

        let direction_x = ( this.player.x < target.x ) ? 'r' : 'l';
        let direction_y = ( this.player.y < target.y ) ? 'd' : 'u';

        //one line
        if (this.player.x == target.x) direction_x = "";
        if (this.player.y == target.y) direction_y = "";  
        
        //желаемое направление
        this.direction = (max_distance_xy) ? direction_x : direction_y; 

        let step_x = (direction_x) ? this.check_step(direction_x) : ""
        let step_y = (direction_y) ? this.check_step(direction_y) : ""  
        console.log( `step_x = ${step_x}  step_y = ${step_y}`);
           
        if (step_x && step_y)
            return (max_distance_xy) ? step_x : step_y;
        
        if (step_x || step_y)
            return (step_x) ? step_x : step_y;
        console.log( `step_x = ${step_x}  step_y = ${step_y}`);
        console.log( `direction_x = ${direction_x}  direction_y = ${direction_y} direction = ${this.direction}`);

        // if you hier => dead end

    //    попытка обхода одиночного блока       
       this.steps_bypass =  this.single_bypass(this.direction)
        console.log('this.single_bypass(this.direction)', this.steps_bypass );
        
       if (this.steps_bypass) return this.steps_bypass.pop();

       
       console.log("ТУПИК!!! Выпускай крысу!!!");

       this.steps_bypass = this.rat_run();

       if (this.steps_bypass) return this.steps_bypass.pop();


    //    throw new Error ("ТУПИК!!! Выпускай крысу!!!");

       return " "
        
    }
    check_step(direction, point = this.player) {
        let {x, y} = this.udlr_to_xy(direction, point),
            step = (' :*'.includes(this.screen[y][x]) &&
                !(y > 0 && this.screen[y-1][x] == 'O' && this.screen[y][x] == ' ') ) ? direction : "";   
            
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(y > 0 && '/|\\-'.includes(this.screen[y+i][x+j]))
                        step = "";
                }
            }
        
        return step;
    } 
    rat_run() {
        console.log("Крыса на старте!!!")            
        let rat = new Rat(this);  
        return rat.find_exit(); 
    }
    single_bypass(direction) {

        let brick           = this.udlr_to_xy(direction),
            left_bypass     = this.check_step('ul', brick),
            right_bypass    = this.check_step('dr', brick);

        //точки слева и справа от препятсвия    
        if(!left_bypass && !right_bypass) {
            console.log( "This is not single brick");
            return "";
        }            

        //проеверям две соседние точки у препятсвия
        if (direction == 'd' || direction == 'u') {
            left_bypass  += this.check_step('l', brick) + this.check_step('dl', brick);
            right_bypass += this.check_step('r', brick) + this.check_step('ur', brick) ;
            //  console.log('left_bypass', left_bypass, 'right_bypass', right_bypass)

            left_bypass = (left_bypass == 'ulldl') 
                ? (direction == 'd') ? ['d', 'd', 'l'] : ['u', 'u', 'l'] 
                : "";
            right_bypass = (right_bypass == 'drrur')
                ? right_bypass = (direction == 'd') ? ['d', 'd', 'r'] : ['u', 'u', 'r'] 
                : "";
        }

         if (direction == 'l' || direction == 'r') {
            left_bypass  += this.check_step('u', brick) + this.check_step('ur', brick);
            right_bypass += this.check_step('d', brick) + this.check_step('dl', brick) ;
            //  console.log('left_bypass', left_bypass, 'right_bypass', right_bypass)

            left_bypass = (left_bypass == 'uluur') 
                ? (direction == 'r') ? ['r', 'r', 'u'] : ['l', 'l', 'u']
                : "";
            right_bypass = (right_bypass == 'drddl')
                ? (direction == 'r') ? ['r', 'r', 'd'] : ['l', 'l', 'd']
                : "";
        }

        // console.log('left_bypass', left_bypass, 'right_bypass', right_bypass)
        if (left_bypass)    return left_bypass;
        if (right_bypass)   return right_bypass
    }
    udlr_to_xy(direction, point = this.player){
        let {x, y} = point;
        // console.log(point);
        // console.log('udlr_to_xy direction =', direction)

         switch(direction) {
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
    log_screen() {
        this.screen.forEach(el => console.log(el.join("")));
    }
    log_player() {
        console.log(`Player: x = ${this.player.x} y = ${this.player.y}`);
    }
    log_diamands() {
        this.diamands.forEach((el, i) =>
            console.log(`${i} Diamands: x = ${el.x} y = ${el.y}`))
    }

}




exports.play = function*(screen){
    let src = new Screen();

    while (true){       
        src.update(screen); 
        // let step = pilot(screen);        
        
        yield src.step;
    }
};







//for test


if (0) {

    const { cave } = require('./../cave') ;
    let screen = cave;

    let src = new Screen(screen);

    for(let i = 0; i < 1; i++) {
        src.update(screen);
        src.log_screen();
        src.log_player();   
        console.log( "src.nearby_diamand", src.nearby_diamand )    
        console.log( src.direction )
        console.log( 'src.step =' + src.step )
        console.log( 'src.steps_bypass =' + src.steps_bypass )
    }

// if(!step) throw new Error(" Avtopilot dont work ")
}