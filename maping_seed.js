const cave_default = [
        "########################################",
        "#:: : :::/ + :+::+::: :+++ +:  +++:: :+#",
        "# :*+:* :  +::: ::: :: : ::+:+ :++::: :#",
        "#::+:::+   :+: :+ : *** +++::+::::: :+*#",
        "#+::::+:: :: :+: :*: +:+ +:: ::: :  + :#",
        "#:: +::++ +  ::::: +  +: : :  :: ::::+ #",
        "#  :::::   + ::: *:*+:::+:++:+::: ::+: #",
        "#+:: +:::+: :+:: :+ +: ::::*:::::+:+:: #",
        "#:: :++ :+::*::: +:::+ *::: :*+::  : +:#",
        "#::* +:+ +    :*  : : +:+ : :*:: :: :::#",
        "#:  ++* +*+:+  +:::: :::+: :+ : :++:+: #",
        "#:++:*+::: +:**: :::+:: :+ :::+: ::  * #",
        "# +:  ::+ :: +++ :+: :+:  +:: ::* :*:::#",
        "#++:: :: :: ::::  + + :+ :::: ::: :::: #",
        "#+:*+  ++:+:::: *+::+ +:++: :+ / : ++  #",
        "#::   + : *+: * ::::+:: +: :+:    :::*+#",
        "#*::+ : +:: ::*::+*: *::: :  ::::::+:+:#",
        "# ::: :: :++ ::+*  :+:: : ::+::: / :: +#",
        "#: :+:++::: * :+  +:::+:::  ::: +  :   #",
        "# ::* *: ::+: +  : +  :+ :+:+  + ++:   #",
        "#::++: :+:: ::: :*::::::*:A:  ::: :+:* #",
        "########################################"
    ];
    // console.log('cave');
    // console.log(cave);

//  screen_mapping(cave);




module.exports.screen_mapping = function (cave = cave_default)  {

    let screen = [];    
    let bflys = [];     //array buterfly  

    console.log(cave);


    //convert cave to array screen
    // replace " " to "1"
    // find butterfly
    for( y = 0; y < cave.length; y++) {
        let row = cave[y].split("");
        let map_row = [];
        for (x = 0; x < row.length; x++) {
            let cell = row[x];   
            // if (cell == " " )
            //     cell = 1;     
            if (cell == '/') {
                bflys.push({x, y}                
            );} 
            map_row.push(cell);
        }
        screen.push(map_row);
    }



    //исключение тупиков
    let count = 0;    
    console.log("after mapping")
    for (y = 1; y < screen.length -1; y++) {
        let row = screen[y];

        for(x = 1; x < row.length - 1; x++) {
 
            if(row[x] == ' ' || row[x] == '*' || row[x] == ":") {
                let tupik = 0;
                if ( row[x+1] == '+' || row[x+1] == '#' ) tupik ++;
                if ( row[x-1] == '+' || row[x-1] == '#' ) tupik ++;
                if ( screen[y+1][x] == '+' || screen[y+1][x] == '#') tupik ++;
                if ( screen[y-1][x] == '+' || screen[y-1][x] == '#') tupik ++;
                
                if (tupik > 2) {
                    row[x] = 8;
                    count ++;
                }                
            }          
            
        }
        // console.log(row.join(""));   //преобразованное начальное состояние 
    }
    console.log("Исключено тупиков: " + count);



    ///// Mapping baterfly
    console.log('Mapping baterfly');  

    for(i = 0; i < bflys.length; i++) {
        b = bflys[i];

        if ( screen[b.y][b.x+1] == ' ')    {
            bflys.push({x : b.x + 1, y: b.y})
            screen[b.y][b.x+1] = '/'
        }
        if ( screen[b.y][b.x-1]   == ' ')    {
            bflys.push({x : b.x - 1, y: b.y})
            screen[b.y][b.x-1] = '/'
        }
        if ( screen[b.y+1][b.x] == ' ' )    {
            bflys.push({x : b.x, y: b.y + 1})
            screen[b.y+1][b.x] = '/'
        }
        if ( screen[b.y-1][b.x] == ' ')    {
            bflys.push({x : b.x, y: b.y - 1})
            screen[b.y-1][b.x] == '/';
        } 

    }     
    console.log("Найдено клеток с бабочками: " + bflys.length);

    

    //делаем изгородь вокруг бабочки 
    console.log("Building a fence around butterflies");
    bflys.forEach(b => {
        screen[b.y][b.x+1] = '/'
        screen[b.y][b.x-1] = '/'
        screen[b.y+1][b.x] = '/'
        screen[b.y-1][b.x] = '/'
    })

    
    
    // console.log('screen');

    // for( y = 0; y < screen.length; y++) {
    //     let row = screen[y];

    //     for (x = 0; x < row.length; x++) {
    //         if (row[x] == 1) row[x] = " ";
    //         // if (row[x] == -5) row[x] = "*";
    //     }
    //     row = screen[y].join("");
    //     console.log(row);
    // }

    console.log('screen aafter mapping');

    for( y = 0; y < screen.length; y++) {
        let row = screen[y];

        for (x = 0; x < row.length; x++) {
            if (row[x] == ':') row[x] = " ";
        }
        row = screen[y].join("");
        console.log(row);
    }


    return screen;



}





    


// console.log("after mapping")
//   for( y = 0; y < screen.length; y++) {
//         let row = screen[y].join("");
//         console.log(row);
//     }



// console.log(cave);






// exports { }





    // 1 пройтись по массиву и пометить все точки вокруг бабочек В
    // 2.1 получить массив координат препятсвия
    // 2.2  получить 4 координаты найти координаты у котрых будет проход лево вверх/ право вверх / низ и тд.

    //идея натравливания бабочек подхожу в правый вверний угол выпускаю и бегу в правый верхний угол, потом бегу ко втрой бабочке


