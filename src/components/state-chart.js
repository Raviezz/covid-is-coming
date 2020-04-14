import React,{ useState,useContext}from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label,ResponsiveContainer
  } from 'recharts';
import Title from './title';

export default class StateChart extends React.Component {
    constructor(props){
        super();
        this.state = {
            state_code:props.data.name,
            global_data:[],
            chart_data:[],
        };
    }

    async fetchStateWiseDate() {
        var response = await fetch("https://api.covid19india.org/v2/state_district_wise.json");
        var states = await response.json();
        return await states[Object.keys(states).find(key => states[key]['state'] === this.props.data.name)];
    }

    async componentDidMount() { 
       var final_dataset = await this.fetchStateWiseDate();
       this.setState({chart_data:final_dataset['districtData']});
       //console.log('State data',final_dataset);
    }
    

    async componentWillUpdate(nextProps, nextState) {
       
        if(this.props!=nextProps){
            console.log("Lastest State",nextProps.data.name); //will show the new state
            var x = await this.fetchStateWiseDate()
            this.setState({chart_data:x['districtData']});
            //console.log('Updated State ',x)
        }
      }
    render(){
        let appName = this.props.data.name;
        return (
            <React.Fragment>
            <Title>State-wise Chart</Title>
            
            <BarChart
            width={500}
            height={300}
            data={this.state.chart_data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
            
            <XAxis dataKey="district" />
            <YAxis >
            <Label
                    angle={270}
                    position="left"
                    style={{ textAnchor: 'middle', fill: 'rgba(0, 0, 0, 0.87)' }}
                    >
                        {appName}
                    </Label>
                </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="confirmed" fill="#82ca9d" />
            </BarChart>
           
        </React.Fragment>
      );
    }
}





