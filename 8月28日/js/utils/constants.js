export const CHART_OPTIONS = (containerWidth, containerHeight) => ({
    chart: {
        backgroundColor: 'transparent',
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'Flow Analysis',
    },
    labels: {
        items: [{
            html: 'Buy',
            style: {
                left: `${containerWidth - 90}px`,
                top: `${containerHeight / 2 - 70}px`,
                color: 'white'
            }
        }, {
            html: 'Sell',
            style: {
                left: `${containerWidth - 90}px`,
                top: `${containerHeight / 2 + 6}px`,
                color: 'white'
            }
        }]
    },
    xAxis: {
        opposite:true,
        gridLineWidth: 1,
        gridLineColor: '#46637F',
        lineColor:'#46637F'
    },
    yAxis: {
        title:{
            text:undefined
        },
        gridLineColor: '#46637F',
    },
    tooltip: {
        shared: true,
        followPointer:true,
        pointFormatter:function(){
            var symbol='',
                symbolName;
            function setSymbol(symbolName){
                /*完善项目符号 */
                switch(symbolName){
                    case 'circle':
                        symbol='●';
                        break;
                    case 'diamond':
                        symbol='◆';
                        break;
                    case 'square':
                        symbol='■';
                        break;
                    case 'triangle':
                        symbol='▲';
                        
                        break;
                    case 'triangle-down':
                        symbol='▼';
                        break;
                }
            }
            if(this.graphic&&this.graphic.symbolName){
                setSymbol(this.graphic.symbolName)
            }else if(this.marker&&this.marker.symbol){
                var url=this.marker.symbol.replace(/^url\(|\)$/g,'');
                symbol='<img src="'+url+'"alt="Marker"/>';
            }else if(this.series.symbol){
                setSymbol(this.series.symbol);
            }else{
                setSymbol('circle');
            }
            return '<span style="color:'+this.series.color+'">'+symbol+'</span>'+' '+this.series.name+':'+this.y+'<br/>';
        },
        useHTML:true
    },
    legend: {
        layout:'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y:50,
        itemStyle: {
            color: "#FFFFFF",
            fontSize:"12px"
        },
        itemHoverStyle: {
            color: "#FFFFFF",
        },
        floating:true,
        backgroundColor:'transparent'
    },
    plotOptions: {
        column: {
            showInLegend:false,
            stacking: 'normal',
            color:'#00B0B9',
            borderColor:'#00B0B9',
            states:{
                hover:{
                    brigntness:0.3
                }
            }
        }
    },
    series: [
        {
            type:'column',
            name: 'Buy',
            data: []
        },
        {
            type:'column',
            name: 'Sell',
            data: [],
            color:'rgba(0,176,185,0.7)',
        },
        {
            type:'spline',
            name: 'Cumulative Net',
            data: [],
            color: '#ED08B00',
            marker:{
                symbol:'square',
                lineWidth:1,
                lineColor:'#ED8B00',
                fillColor:'#87A2BD'
            }
        }
    ]
})

export const FREQUENCIES=['1D','1W','2W','1M','3M','6M','1Y','YTD']