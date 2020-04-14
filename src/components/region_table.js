import React from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from '../components/utils/table-utils';
import './table.css';

export default class CountriesTable extends React.Component {
    constructor(props){
        super();
        this.state = {
            stateData: props.data,
            columns:[],
            data:[],
            rowData :{},
        }
    }
    async fetchData() {
        const result = await fetch("https://api.covid19india.org/data.json");
        const json_data = await result.json();
        return json_data['statewise'];
    }
   async prepare_data(json_data){
       var final_data = [];
        json_data.forEach(function(state){
            final_data.push({'state':state['state'],'active':state['active'],'confirmed':state['confirmed'],'deaths':state['deaths'],'recovered':state['recovered']});
        });    
        return final_data;
   }
   async componentDidMount() {
       console.log("My name is ",this.state.stateData);
      const json_data = await this.fetchData();
      const final_data = await this.prepare_data(json_data);
      final_data.sort(function(x,y){
          return y.confirmed - x.confirmed;
      });
      console.log(final_data);
        this.fetchData();
        this.setState({
            columns:[
                { title: 'State', field: 'state' , cellStyle:{ padding: '8px'}},
                { title: 'Active', field: 'active', type: 'numeric' , cellStyle:{ padding: '8px'},backgroundColor:'#ff093c'},
                { title: 'Confirmed', field: 'confirmed', type: 'numeric' , cellStyle:{ padding: '8px'}},
                { title: 'Deaths', field: 'deaths', type: 'numeric' , cellStyle:{ padding: '8px'}},
                { title: 'Recovered', field: 'recovered', type: 'numeric' , cellStyle:{ padding: '8px'}},
              ]
        });
        this.setState({
            data: final_data
        });
    }
render(){
    return (
        <MaterialTable
          title="COVID-19 INDIA"
          columns={this.state.columns}
          data={this.state.data}
          icons={tableIcons}
          onRowClick={(event, rowData) => {
              if(rowData['state']!== 'Total'){
                this.props.data.changeName(rowData['state']);
              }
       }}
        options=
            {{
                headerStyle:{
                    backgroundColor:'#3f51b5', 
                    paddingBlock: '6px',
                    color: '#ffffff',
                   
                 }, 
                 rowStyle: { "&:hover": { backgroundColor: "#EEE" } }
            }}          
        />
      );
}
  
}
