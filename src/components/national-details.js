import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Title from './title';
import './details.css';




export default class NationDetails extends Component{
     classes = {};
    constructor(){
        super();
        this.state = {
            covid :{},
        };
    }
    
    componentDidMount(){
        this.classes = makeStyles({
            depositContext: {
                flex: 1,
              },
        });
        this.getData();
       // console.log("cons ",this.state.covid['result']);
    }
     get_me_date() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        var month = date.getMonth();
        var day = date.getDate();
        if(month <10) month = '0'+month;
        if(day<10) day = '0'+day;
        return date.getFullYear()+'-'+month+'-'+day;

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
                {this.state.covid.confirmed}    
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
              {this.state.covid.deaths} 
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
              {this.state.covid.recovered} 
              </Typography>
              <Typography component="p" variant="h6" className="recovered">
               Recovered
              </Typography>
            </Box>
            </React.Fragment>
          );
    }
    getData(){
        fetch("https://covidapi.info/api/v1/country/IND/latest")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
           console.log(this.get_me_date())
            const dataset = data.result[Object.keys(data.result)[0]]
            this.setState({covid:dataset});
            console.log("Data fetched",dataset);
        });
    };
  
}