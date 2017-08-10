const cave = [
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
    ]
    console.log('cave');
    console.log(cave);


    brick = '+'
    let screen = [];

    for( y = 0; y < cave.length; y++) {
        let row = cave[y].split("");
        let map_row = [];
        for (x = 0; x < row.length; x++) {
            let cell = row[x];   
            if (cell == ":" || cell == " " )
                cell = 1;       

            if (cell == brick)
                cell= '0';            

            map_row.push(cell);
        }

        screen.push(map_row);
    }


//исключение тупиков
console.log("after mapping")
    for (y = 1; y <screen.length-1; y++) {
        let row = screen[y];

        for(x = 1; x < row.length-1; x++) {
            if (row[x] == 1) {
                if ((row[x+1] + row[x-1] + screen[y+1][x] + screen[y-1][x]) <2 ) 
                    // console.log("Тупик" )
                        row[x] = 0;
            }
        }
        console.log(row.join(""));     
        
    }

// console.log("after mapping")
//   for( y = 0; y < screen.length; y++) {
//         let row = screen[y].join("");
//         console.log(row);
//     }
    console.log('screen');

    for( y = 0; y < screen.length; y++) {
        let row = screen[y];

        for (x = 0; x < row.length; x++) {
            if (row[x] == 1) row[x] = " ";
        }
        row = screen[y].join("");
        console.log(row);
    }


console.log(cave);