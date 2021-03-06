import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Title from './title';
import './details.css';
import {getPreviousDate,numberWithCommas} from './utils/common-functions';

export default class NationDetails extends Component{
    constructor(){
        super();
        this.state = {
            covid :{},
        };
    }
    async getData(){
      const response = await fetch("https://covidapi.info/api/v1/country/IND/latest");
      const data = await response.json();
      const dataset = data.result[Object.keys(data.result)[0]]
      this.setState({covid:dataset});    
  };
    async componentDidMount(){
       await this.getData();
    }
    render(){
        return (
            <React.Fragment>
              <Title>INDIA</Title>
              <Box p={1} bgcolor="#ffe0e6" display="flex"
                justifyContent= "space-evenly"
                flexWrap="nowrap"
                borderRadius="10px"
                p={1}
                m={1}>
                <Typography component="p" variant="h6" className="confirmed">
                {numberWithCommas(this.state.covid.confirmed)}  
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
              {numberWithCommas(this.state.covid.deaths)} 
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
              {numberWithCommas(this.state.covid.recovered)} 
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
                  <Typography variant="subtitle2" color="primary">{getPreviousDate}</Typography>
                  </Box>
            </React.Fragment>
          );
    }
    
}