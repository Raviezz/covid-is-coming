import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Title from './title';
 
var global_data = [];

export default class GolbalChart extends React.Component{

    constructor(){
        super();
        this.state = {
            data : [],
        }
    }
    async getDates(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
        while (currentDate <= endDate) {
          dates.push(currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate());
          currentDate = addDays.call(currentDate,10);
        }
        return dates;
      };
      
      create_chart_obj(date,confirmed,deaths,recovered){
          return {date,confirmed,deaths,recovered};
      }

      async fetchData(){
        const dates = await this.getDates(new Date("2020-02-01"), new Date());  
        var tot_data = [];
        var url = "";
        for(var x=0;x<dates.length;x++){

            if(x===dates.length-1){
                var newDate = new Date();
                newDate = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();
                 url = "https://covidapi.info/api/v1/global/"+dates[x]+"/"+newDate;
                const response = await fetch(url);
                const res_data = await response.json();
                tot_data.push(res_data.result);
                global_data.push(newDate);
            }else{
                 url = "https://covidapi.info/api/v1/global/"+dates[x]+"/"+dates[x+1];
                const response = await fetch(url);
                const res_data = await response.json();
                tot_data.push(res_data.result);
                global_data.push(dates[x+1]);
            }
            
        }
        
        return tot_data;
    };
    async prepare_actual_data(api_data){
        var final_format = [];
         api_data.forEach((ele,index)=>{
          final_format.push(this.create_chart_obj(global_data[index],ele.confirmed,ele.deaths,ele.recovered));
        });
        return final_format;
    }
     async componentDidMount() {
        var api_data = await this.fetchData();
        var actual_format = await this.prepare_actual_data(api_data);
       
        this.setState(
            {
                data: actual_format
            }
        );   
    }
  

  render(){
    return (
        <React.Fragment>
          <Title>Global COVID-19 chart (interval-{10} days)</Title>
          <ResponsiveContainer  width="100%">
            <LineChart
              data={this.state.data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey="date" stroke='rgba(0, 0, 0, 0.54)'>
             
              </XAxis>
              <YAxis  type="number" interval={0} stroke='rgba(0, 0, 0, 0.54)'>
                <Label
                  angle={270}
                  position="left"
                  style={{ textAnchor: 'middle', fill: 'rgba(0, 0, 0, 0.87)' }}
                >
                  people
                </Label>
              </YAxis>
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line name="confirmed" type="monotone" dataKey="confirmed" stroke="#1976d2" dot={false} />
              <Line name="deaths" type="monotone" dataKey="deaths" stroke="#dc004e" dot={false} />
              <Line name="recovered" type="monotone" dataKey="recovered" stroke="#388e3c" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
      );
  } 
}