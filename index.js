/**
 * Created by ji on 2015/7/16.
 */


var http = require('http'),
    childProcess = require('child_process'),
    path = require("path"),
    phantomjs = require('phantomjs');

var binPath = phantomjs.path;

var childArgs = [
    path.join( __dirname ,'lib' ,'highcharts-convert.js'),
    '-host', '127.0.0.1' ,'-port', '8787'
]

var childProcess = childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    if(err){
        throw err;
    }
    console.log(stdout)
});

var defaultExecuted = function(chart) {  chart.renderer.arc(0).add();}


process.on('exit' , function() {
    childProcess.kill();
})



/**
 * obj
 *   data       - Highcharts configuration object.
 *   scale      - A scaling factor for a higher image resolution. Maximum scaling is set to 4x. Remember that the width parameter has a higher precedence over scaling. default is 1
 *   width      - The exact pixel width of the exported image. Defaults to chart.width or 600px. Maximum width is 2000px.
 *   type       - Image format , the type can be of jpg, png, pfd or svg for , default is png.
 *   constr     - Can be one of Chart or StockChart. This depends on whether you want to generate Highstock or basic Highcharts
 *   executed   - The executed is a function which will be called in the constructor of Highcharts to be executed , the highchart object should  as parameter pass into the function and named chart
 *   options    - The options is init for Highcharts , see Highcharts.setOptions
 *
 * callback
 *          - when file generated and will be called
 * @param obj
 * @param callback
 */
module.exports = function (obj , callback){

    if(obj.executed){
        obj.executed = " function(chart) {" +obj.executed.toString(); + "}";
    }else {
        obj.executed = defaultExecuted.toString();
    }

    var globaloptions = {};

    if(obj.options){
        globaloptions = obj.options;
    }


    var postData = encodeURIComponent(JSON.stringify(
        {
            "infile":  JSON.stringify(obj.data),
            "callback":obj.executed,
            "constr": obj.constr || "Chart" ,
            "width" : obj.width || 600,
            "type"  : obj.type || "png",
            "scale" : obj.scale || "1",
            "globaloptions" :  JSON.stringify(globaloptions)
        }
    ));

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
            if(data.indexOf("Error") >=0){
                callback(new Error(data));
            }else {
                callback(null , data);
            }

        })


    });

    post.on('error' , function (e){
        callback(e);
    })

    post.write(postData);
    post.end();
};
