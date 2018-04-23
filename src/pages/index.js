import React from 'react'
var ta = require('time-ago');
var numeral = require("numeral");
// import s from '../components/ConfList/ConfList.module.css';

export const query = graphql`
  query ConfDataQuery 
    { allConfsJson ( sort: { fields: [numberOfWomen], order:DESC },)
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
      {data.allConfsJson.edges.map(({ node }, index) =>
        <tr key={index}>
          <td> {numeral(index + 1).format('0')} </td>
          <td> {numeral(node.numberOfWomen / node.totalSpeakers).format('0%')} </td>
          <td> {node.name} ({node.year})
          {/* <a href='{node.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a> */}
          </td>
          <td> {node.numberOfWomen} </td>
          <td> {node.totalSpeakers - node.numberOfWomen} </td>
          <td> {node.location} </td>
          <td> {ta.ago(node.dateAdded)} </td>
        </tr>
      )}
      </tbody>
    </table>
  )
}
