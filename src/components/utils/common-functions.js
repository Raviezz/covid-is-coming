import React from 'react';

export const getPreviousDate= ()=>{
    var date = new Date();
    date.setDate(date.getDate()-1);
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(day<10) day = '0'+day;
    if(month<10) month = '0'+month;
    return date.getFullYear()+'-'+month+'-'+day;
};

export const numberWithCommas= (x)=> {
    x = String(x);
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}  