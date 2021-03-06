import React from 'react';
import MaterialTable from 'material-table';
import Countrycodes from '../resources/country_codes_3.json';
import {tableIcons} from '../components/utils/table-utils';
import './table.css';

export default class CountriesTable extends React.Component {
    constructor(){
        super();
        this.state = {
            columns:[],
            data:[]
        }
    }
    async fetchData() {
        const result = await fetch("https://covidapi.info/api/v1/global/latest");
        const json_data = await result.json();
        return json_data.result;
    }
   async prepare_data(json_data){
       var final_data = [];
      var attr_country = '';
        var attr_confirmed = 0,attr_deaths=0,attr_recov = 0;;
         for(var c in json_data){
            attr_country = Countrycodes[Object.keys(json_data[c])[0]] === undefined? Object.keys(json_data[c])[0]:Countrycodes[Object.keys(json_data[c])[0]];
            attr_confirmed = json_data[c][Object.keys(json_data[c])[0]].confirmed;
            attr_deaths =  json_data[c][Object.keys(json_data[c])[0]].deaths;
            attr_recov =  json_data[c][Object.keys(json_data[c])[0]].recovered;
           // console.log(attr_country,attr_confirmed,attr_deaths,attr_recov);
            final_data.push(this.create_chart_obj(attr_country,attr_confirmed,attr_deaths,attr_recov));
        } 
        return final_data;
   }
   create_chart_obj(country,confirmed,deaths,recovered){
    return {country,confirmed,deaths,recovered};
}
   async componentDidMount() {
      const json_data = await this.fetchData();
      const final_data = await this.prepare_data(json_data);
      final_data.sort(function(x,y){
          return y.confirmed - x.confirmed;
      });
      //console.log(final_data);
        this.fetchData();
        this.setState({
            columns:[
                { title: 'Country', field: 'country' , cellStyle:{ padding: '8px'}},
                { title: 'Confirmed', field: 'confirmed', type: 'numeric' , cellStyle:{ padding: '8px'}},
                { title: 'Deaths', field: 'deaths', type: 'numeric' , cellStyle:{ padding: '8px'}},
                { title: 'Recovered', field: 'recovered', type: 'numeric', cellStyle:{ padding: '8px'} },
              ]
        });
        this.setState({
            data: final_data
        });
    }
  
render(){
    return (
        <MaterialTable
          title="WWC"
          columns={this.state.columns}
          data={this.state.data}
          icons={tableIcons}
        options=
            {{
                headerStyle:{
                    backgroundColor:'#3f51b5', 
                    paddingBlock: '6px',
                    color: '#ffffff',
                   
                 }, 
                 
            }}          
        />
      );
}
  
}
