var exporting = require("../index");
var fs = require('fs');


exporting({
    data : {
        xAxis: {
            categories: ['07-12', '07-13', '07-14', '07-15', '07-16',  '07-17', '07-18']
        },
        series: [{
            data: [0,0,0,0,0,0,6000]
        }]
    },

    options : {
        title : {text : "test"} ,
        "yAxis" : {"title" : {"text": "test" }}
    }




} , function (err  , data){
    if(err){
        console.log(err)
    }else {
        fs.writeFile('chart.png', new Buffer(data, 'base64'), function() {
            console.log('Written to chart.png');
            process.exit();
        });
    }


})


