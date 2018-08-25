const fs = require('fs');

setInterval(()=>{
    fs.appendFileSync('1.txt', 1);
},1000)