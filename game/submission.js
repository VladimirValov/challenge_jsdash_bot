'use strict'; /*jslint node:true*/

class Screen {
    constructor(screen) {
        this.screen = screen.map(el => el.split(""));
        this.player = this.find('A');
        this.diamands = this.find('*', 'all')
        this.nearby_diamand = this.find_nearby_diamand();
        this.direction = this.navigate();
    }
    find(s, option) { 
        let arr = []

        for(let y = 1; y < this.screen.length - 1; y++ ) {
            let row = this.screen[y];
            for(let x = 1; x < row.length - 1; x ++) {
                if (row[x] == s) {
                    console.log(`find "${s}": x = ${x} y = ${y}`);
                    
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
    get_posible_step() {

    } 
    navigate(target = this.nearby_diamand) {

        if (!target) return " "


        let direction_x = ( this.player.x < target.x ) ? 'r' : 'l';
        let direction_y = ( this.player.y < target.y ) ? 'd' : 'u';

        if (this.player.x == target.x) direction_x = "";
        if (this.player.y == target.y) direction_y = "";  

        this.direction = (direction_x) ? direction_x : direction_y;  //добавить выбор предпочтительного препятсвия

        // let step_x = (direction_x) ? this.check_step(direction_x) : ""
        // let step_y = (direction_y) ? this.check_step(direction_y) : ""   

        // let step = (step_x) ? step_x :

        return this.direction;
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
    // let src = new Screen(screen);

    while (true){
        let src = new Screen(screen);

        // let step = pilot(screen);        
        
        yield src.direction;
    }
};










if (0) {

const { cave } = require('./../cave') ;
let screen = cave;

pilot(screen);




function pilot(screen) {
    let src = new Screen(screen);

    src.log_screen();
    src.log_player();   
    console.log( src.nearby_diamand )    
    console.log( src.direction )

    // console.log(src.get_posible_step())

    // return src.navigate();   

        // if(!step) throw new Error(" Avtopilot dont work ")

}


}
