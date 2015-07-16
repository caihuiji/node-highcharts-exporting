# node-highcharts-exporting
Easy to use [exporting-server](https://github.com/highslide-software/highcharts.com/tree/master/exporting-server/phantomjs) by [HighCharts](http://www.highcharts.com/component/content/article/2-news/52-serverside-generated-charts)

##Install
> $ npm install node-highcharts-exporting

##Usage
``` javascript
var exporting = require("../index");
var fs = require('fs');

exporting({
    data : {
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0,
                135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    }

} , function (data){
    fs.writeFile('chart.png', data, function() {
            console.log('Written to chart.png');
        });
})
```

##how it work
The API is used:
> exporting(options , callback)

**options**
- data [object]       - Highcharts configuration object.
- scale [num]      - A scaling factor for a higher image resolution. Maximum scaling is set to 4x. Remember that the width parameter has a higher precedence over scaling. default is 1
- width [num]       - The exact pixel width of the exported image. Defaults to chart.width or 600px. Maximum width is 2000px.
- type [string]       - Image format , the type can be of jpg, png, pfd or svg for , default is png.
- constr [string]      - Can be one of Chart or StockChart. This depends on whether you want to generate Highstock or basic Highcharts
- executed [function]   - The executed is a function which will be called in the constructor of Highcharts to be executed , the highchart object should  as parameter pass into the function and named chart

**callback**
-  when file generated and will be called


