import React from 'react'
var ta = require('time-ago');
var numeral = require("numeral");
// import s from '../components/ConfList/ConfList.module.css';
import AppHelper from '../components/AppHelper';

export const query = graphql`
  query ConfDataQuery 
    { allConfsJson
      { edges 
        { node 
          { name 
            location 
            year 
            totalSpeakers 
            numberOfWomen 
            source 
            dateAdded }}}}`

export default ({ data }) => {
  // console.log(data.allConfsJson.edges);
  var augmentedConfData = new AppHelper().augmentConfData(data.allConfsJson.edges);
  
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>f:m</th>
          <th>who</th>
          <th>#f</th>
          <th>#m</th>
          <th>where</th>
          <th>added</th>
        </tr>
      </thead>
      <tbody>
        {augmentedConfData.map(({ node }, index) =>
        <tr key={index}>
          <td> {numeral(index + 1).format('0')} </td>
          <td> {numeral(node.diversityPercentage).format('0%')} </td>
          <td> {node.name} ({node.year}) </td>
          <td> {node.numberOfWomen} </td>
          <td> {node.numberOfMen} </td>
          <td> {node.location} </td>
          <td> {ta.ago(node.dateAdded)} </td>
        </tr>
      )}
      </tbody>
    </table>
  )
}
