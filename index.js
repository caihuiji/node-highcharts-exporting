/**
 * Created by ji on 2015/7/16.
 */


var http = require('http'),
    childProcess = require('child_process'),
    path = require("path"),
    phantomjs = require('phantomjs');

var binPath = phantomjs.path;

var childArgs = [
    path.join('lib' ,'highcharts-convert.js'),
    '-host', '127.0.0.1' ,'-port', '8787'
]


childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    if(err){
        throw err;
    }
    console.log(stdout)
});


var postData = JSON.stringify({"infile":"{xAxis: {categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']},series: [{data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]}]};","callback":"function(chart) {chart.renderer.arc(200, 150, 100, 50, -Math.PI, 0).attr({fill : '#FCFFC5',stroke : 'black','stroke-width' : 1}).add();}","constr":"Chart"});

var post = http.request({
    hostname: '127.0.0.1',
    port: 8787,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
} , function (res){

    var data = '';
    res.on('data' , function (chunk){
        data +=chunk.toString();
    })

    res.on('end' , function (){

        console.log(data);
    })

    res.on('error' , function (){
        console.log('problem with request: ' + e.message);
    })
});


post.write(postData);
post.end();

/**
 * obj
 *   data       - Highcharts configuration object.
 *   scale      - A scaling factor for a higher image resolution. Maximum scaling is set to 4x. Remember that the width parameter has a higher precedence over scaling. default is 1
 *   width      - The exact pixel width of the exported image. Defaults to chart.width or 600px. Maximum width is 2000px.
 *   type       - Image format , The type can be of jpg, png, pfd or svg for , default is png
 *   constr     -  Can be one of Chart or StockChart. This depends on whether you want to generate Highstock or basic Highcharts
 *   executed   - The executed is a function which will be called in the constructor of Highcharts to be executed
 *
 * callback
 *          - when file generated and will be called
 * @param obj
 * @param callback
 */
module.exports = function (obj , callback){


}

