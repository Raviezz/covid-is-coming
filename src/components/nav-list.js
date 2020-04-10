import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LocalHospital from '@material-ui/icons/LocalHospital';
import Home from '@material-ui/icons/Home';
import BugReport from '@material-ui/icons/BugReport';
import Description from '@material-ui/icons/Description';
import Mood from '@material-ui/icons/Mood';
import GitHub from '@material-ui/icons/GitHub';
import { Link } from '@material-ui/core';

export const topListItems = (
  <div>
    <ListItem button>
        <a href="https://www.worldometers.info/coronavirus/?" target="_blank">
        <ListItemIcon>
        <LocalHospital />
      </ListItemIcon>
      </a>
      <ListItemText primary="WHO" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="StayHome" />
    </ListItem>
    <ListItem button>
      <a href="https://www.covid19india.org/" target="_blank">
      <ListItemIcon>
        <BugReport />
      </ListItemIcon>
      </a>
      <ListItemText primary="covid19india" />
    </ListItem>
    
    
  </div>
);

export const bottomListItems = (
  <div>
    <ListSubheader inset></ListSubheader>
    <ListItem button>
      <a href="https://www.linkedin.com/in/raviteja-boddupalli" target="_blank">
      <ListItemIcon>
        <Mood />
      </ListItemIcon>
      </a>
      <ListItemText primary="About Me" />
    </ListItem>
    <ListItem button>
      <a href="https://documenter.getpostman.com/view/2568274/SzS8rjbe?version=latest#149a7702-2774-4328-815d-ab66afc0351c" target="_blank">
      <ListItemIcon>
        <Description />
      </ListItemIcon>
      </a>
      <ListItemText primary="API reference" />
    </ListItem>
    <ListItem button > 
        <a href="https://www.github.com/Raviezz" target="_blank">
        <ListItemIcon>
        <GitHub />
        </ListItemIcon>
        </a>
        <ListItemText primary="Source Code" />
    </ListItem>
  </div>
);
