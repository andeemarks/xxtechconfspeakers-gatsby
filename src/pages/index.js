import React from 'react'
var ta = require('time-ago');
var numeral = require("numeral");
// import s from '../components/ConfList/ConfList.module.css';
import AppHelper from '../components/AppHelper';
import ConfListHelper from '../components/ConfList/ConfListHelper';

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
  var augmentedConfData = new AppHelper().augmentConfData(data.allConfsJson.edges);
  var helper = new ConfListHelper();

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
          <td> {helper.rowIndexFormatter(index)} </td>
          <td> {helper.genderDiversityFormatter(node.diversityPercentage)} </td>
          <td> {node.name} ({node.year}) </td>
          <td> {node.numberOfWomen} </td>
          <td> {node.numberOfMen} </td>
          <td> {node.location} </td>
          <td> {helper.dateAddedFormatter(node.dateAdded)} </td>
        </tr>
      )}
      </tbody>
    </table>
  )
}
