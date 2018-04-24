import React from 'react'
var ta = require('time-ago');
var numeral = require("numeral");
import s from '../components/ConfList/ConfList.module.css';
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
    <div className={s.confTable}>
    <table>
      <thead>
        <tr>
          <th className={s.numericDataColumn}>rank</th>
          <th className={s.numericDataColumn}>f:m</th>
          <th>who</th>
          <th className={s.numericDataColumn}>#f</th>
          <th className={s.numericDataColumn}>#m</th>
          <th>where</th>
          <th>added</th>
        </tr>
      </thead>
      <tbody>
        {augmentedConfData.map(({ node }, index) =>
        <tr key={index} className={s.confTableRow}>
          <td className={s.numericDataColumn}> {node.index} </td>
          <td className={s.numericDataColumn}> {helper.genderDiversityFormatter(node.diversityPercentage)} </td>
          <td> {node.name} ({node.year}) </td>
          <td className={s.numericDataColumn}> {node.numberOfWomen} </td>
          <td className={s.numericDataColumn}> {node.numberOfMen} </td>
          <td> {node.location} </td>
          <td> {helper.dateAddedFormatter(node.dateAdded)} </td>
        </tr>
      )}
      </tbody>
    </table>
    </div>
  )
}
