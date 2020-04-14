import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Title from './title';
import { Typography } from '@material-ui/core';
 
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
   // const dates = await this.getDates(new Date("2020-03-02"), new Date());  
   const response = await fetch("https://covidapi.info/api/v1/global/count");
    const res_data = await response.json();   
    return res_data.result;
};
async prepare_actual_data(api_data){
  var final_format = [];
    for(var key in api_data){
      var attr_confirmed = api_data[key].confirmed;
      var attr_deaths = api_data[key].deaths;
      var attr_recovered = api_data[key].recovered;
     final_format.push(this.create_chart_obj(key,attr_confirmed,attr_deaths,attr_recovered));
    }
   return final_format;
}
 async componentDidMount() {
    var api_data = await this.fetchData();
    //console.log(api_data)
    var actual_format = await this.prepare_actual_data(api_data);
    //console.log(actual_format)
    this.setState(
        {
            data: actual_format
        }
    );   
}


render(){
return (
    <React.Fragment>
      <Title>GLOBAL COVID-19 chart from Jan 22</Title>
      <ResponsiveContainer width="100%">
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
      <Typography variant="subtitle2" color="primary">
          Data gets updated everyday once.
      </Typography>
    </React.Fragment>
  );
} 
}