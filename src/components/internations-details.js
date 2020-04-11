import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Title from './title';
import './details.css';

export default class InternationalDetails extends Component{
    
    constructor(){
        super();
        this.state = {
            covid :{},
        };
    }
    getPreviousDate(){
      var date = new Date();
      date.setDate(date.getDate(),-1);
      var month = date.getMonth()+1;
      var day = date.getDate();
      if(day<10) day = '0'+day;
      if(month<10) month = '0'+month;
      return date.getFullYear()+'-'+month+'-'+day;
    }
    async componentDidMount(){
        await this.getData();
       // console.log("cons ",this.state.covid['result']);
    }
    numberWithCommas(x) {
      x = String(x);
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x))
          x = x.replace(pattern, "$1,$2");
      return x;
  }
    render(){
        return (
            <React.Fragment>
              <Title>GLOBALLY</Title>
              <Box p={1} bgcolor="#ffe0e6" display="flex"
                justifyContent= "space-evenly"
                flexWrap="nowrap"
                borderRadius="10px"
                p={1}
                m={1}>
                <Typography component="p" variant="h6" className="confirmed">
                {this.numberWithCommas(this.state.covid.confirmed)}  
                </Typography>
                <Typography component="p" variant="h6"  className="confirmed">
                Confirmed
                </Typography>
             </Box>
             <Box p={1} bgcolor="#f6f6f7" display="flex"
                justifyContent= "space-evenly"
                flexWrap="nowrap"
                borderRadius="10px"
                p={1}
                m={1}>
              <Typography component="p" variant="h6" className="deaths">
              {this.numberWithCommas(this.state.covid.deaths)} 
              </Typography>
              <Typography component="p" variant="h6" className="deaths">
              Deaths
              </Typography>
              </Box>
              <Box p={1} bgcolor="#e4f4e8" display="flex"
                justifyContent= "space-evenly"
                flexWrap="nowrap"
                borderRadius="10px"
                p={1}
                m={1}>
              <Typography component="p" variant="h6" className="recovered">
              {this.numberWithCommas(this.state.covid.recovered)} 
              </Typography>
              <Typography component="p" variant="h6" className="recovered">
               Recovered
              </Typography>
            </Box>
            <Box p={1} display="flex"
                justifyContent= "space-evenly"
                flexWrap="nowrap"
                borderRadius="10px"
                p={1}
                m={1}>
                  <Typography variant="subtitle2" color="primary">Last updated:</Typography>
                  <Typography variant="subtitle2" color="primary">{this.getPreviousDate()}</Typography>
                  </Box>
            </React.Fragment>
          );
    }
    async getData(){
        const response = await fetch("https://covidapi.info/api/v1/global")
        const res_data = await response.json();
        const dataset = res_data.result;
        this.setState({covid:dataset});
           // console.log("Data fetched",dataset);
       
    };
  
}