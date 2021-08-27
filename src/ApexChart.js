import React from "react";
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import './ApexChart.css'


class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        data: []
      }],
      minDate:'',
      maxDate:'',
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true
          }
        },
        annotations: {
          yaxis: [{
            y: 30,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Count',
              style: {
                color: "#fff",
                background: '#00E396'
              }
            }
          }],
          xaxis: [{
            x: new Date('14 Nov 2012').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Date',
              style: {
                color: "#fff",
                background: '#775DD0'
              }
            }
          }]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Mar 2012').getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },


      selection: 'one_year',

    };
  }
  componentDidMount(){
    let data =  {
      "1129995000000": 30,
      "1230446000000": 31,
      "1331532400000": 32,
      "1432618800000": 34,
      "1533878000000": 36
  }

  let finalData = [];
  for(let key in data){
    finalData.push([Number(key), data[key]])
  }
    this.setState({
      series: [{
        data: finalData
      }],
      minDate: finalData[0],
      maxDate: finalData[finalData.length-1]
    })
  }

  updateData(timeline) {
    this.setState({
      selection: timeline
    })

    switch (timeline) {
      case 'one_month':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          //makeDate.setMonth(makeDate.getMonth() - 1);

          new Date(new Date().setMonth(new Date().getMonth()-1)).getTime(),
          new Date().getTime()
        )
        break
      case 'six_months':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date(new Date().setMonth(new Date().getMonth()-6)).getTime(),
          new Date().getTime()
        )
        break
      case 'one_year':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date(new Date().setMonth(new Date().getMonth()-12)).getTime(),
          new Date().getTime()
        )
        break
      case 'ytd':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date(new Date().setDate(new Date().getDate()-1)).getTime(),
          new Date().getTime()
        )
        break
      case 'all':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date(this.state.minDate[0]).getTime(),
          new Date(this.state.maxDate[0]).getTime()
        )
        break
      default:
    }
  }


  render() {
    return (


      <div id="chart">
        <div class="toolbar">
          <button id="one_month"

            onClick={() => this.updateData('one_month')} className={(this.state.selection === 'one_month' ? 'active' : '')}>
            1M
          </button>
          &nbsp;
          <button id="six_months"

            onClick={() => this.updateData('six_months')} className={(this.state.selection === 'six_months' ? 'active' : '')}>
            6M
          </button>
          &nbsp;
          <button id="one_year"


            onClick={() => this.updateData('one_year')} className={(this.state.selection === 'one_year' ? 'active' : '')}>
            1Y
          </button>
          &nbsp;
          <button id="ytd"

            onClick={() => this.updateData('ytd')} className={(this.state.selection === 'ytd' ? 'active' : '')}>
            YTD
          </button>
          &nbsp;
          <button id="all"

            onClick={() => this.updateData('all')} className={(this.state.selection === 'all' ? 'active' : '')}>
            ALL
          </button>
        </div>

        <div id="chart-timeline">
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={420} />
        </div>
      </div>
    )
  }
}

export default ApexChart;