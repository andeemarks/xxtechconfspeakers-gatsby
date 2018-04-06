import React from 'react'
import s from '../components/ConfList/ConfList.module.css';

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
  
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>who</th>
          <th>#f</th>
          <th>where</th>
          <th>added</th>
        </tr>
      </thead>
      <tbody>
      {data.allConfsJson.edges.map(({ node }, index) =>
        <tr key={index}>
          <td> {index + 1} </td>
          <td> {node.name} </td>
          <td> {node.numberOfWomen} </td>
          <td> {node.location} </td>
          <td> {node.dateAdded} </td>
        </tr>
      )}
      </tbody>
    </table>
  )
}
