import React from "react"

export default ({ data }) => {
    console.log(data)
    return <div>Hello world</div>
}

export const query = graphql`
  query ConfDataQuery { allConfsJson { edges {node { name location year totalSpeakers numberOfWomen source dateAdded }}}}`
