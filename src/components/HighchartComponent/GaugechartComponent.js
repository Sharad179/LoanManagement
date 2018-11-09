
import React from 'react';

export class GaugechartComponent extends React.Component{
constructor(props){
    super(props)
}
componentDidMount(){
    var _this = this;
    console.log(this.props.scoreval);
    var options = {
        title:{
            text:''
        },
        chart: {
            type: 'gauge',
            backgroundColor: "#F0F0F0",
            height:"300px",
            color:"white",
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: []
        },
       
        // the value axis
        
        yAxis: {
            min: 0,
            max: 1000,
    
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'points'
            },
            plotBands: [{
                from: 0,
                to: 600,
                color: '#55BF3B' // green
            }, {
                from: 600,
                to: 800,
                color: '#DDDF0D' // yellow
            }, {
                from: 800,
                to: 1000,
                color: '#DF5353' // red
            }]
        },
        series: [{
            name: _this.props.titleval,
            data: [{y:parseInt(_this.props.scoreval)}],
            tooltip: {
                valueSuffix: ' points'
            }}]
        }
        Highcharts.chart(this.props.container, options)
}
componentWillUnmount() {
}
render() {
    return <div id = {this.props.container}></div>
}

}
// Add some life

