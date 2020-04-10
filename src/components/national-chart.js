import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Title from './title';
 
var global_data = [];

export default class NationalChart extends React.Component{

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
            var month = currentDate.getMonth()+1, date =currentDate.getDate();
            if(month<10){
                month = '0'+month;
            }
            if(date <10){
                date = '0'+date;
            }
          dates.push(currentDate.getFullYear()+"-"+month+"-"+date);
          currentDate = addDays.call(currentDate,1);
        }
        return dates;
      };
      
      create_chart_obj(date,confirmed,deaths,recovered){
          return {date,confirmed,deaths,recovered};
      }

      async fetchData(){
        const dates = await this.getDates(new Date("2020-03-17"), new Date());  
        //console.log(dates);
        var tot_data = [];
        var url = "";
        for(var x=0;x<dates.length;x++){
            url = "https://covidapi.info/api/v1/country/IND/"+dates[x];
            const response = await fetch(url);
            const data = await response.json();
           // console.log(data.result[dates[x]]);
            tot_data.push(data.result[dates[x]]);
            global_data.push(dates[x]);
            
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
        //console.log(actual_format);
        this.setState(
            {
                data: actual_format
            }
        );   
    }
  

  render(){
    return (
        <React.Fragment>
          <Title>INDIA COVID-19 chart from March 2020</Title>
          <ResponsiveContainer>
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