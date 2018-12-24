import React from 'react'
import s from './ConfList.module.css'
import ConfListFormatter from './ConfListFormatter'

const diversityStyles = {
  0: { row: s.percentageCohortFTrans, cell: s.percentageCohortF },
  1: { row: s.percentageCohortETrans, cell: s.percentageCohortE },
  2: { row: s.percentageCohortDTrans, cell: s.percentageCohortD },
  3: { row: s.percentageCohortCTrans, cell: s.percentageCohortC },
  4: { row: s.percentageCohortBTrans, cell: s.percentageCohortB },
  5: { row: s.percentageCohortATrans, cell: s.percentageCohortA },
  6: { row: s.percentageCohortATrans, cell: s.percentageCohortA },
  7: { row: s.percentageCohortATrans, cell: s.percentageCohortA },
  8: { row: s.percentageCohortATrans, cell: s.percentageCohortA },
  9: { row: s.percentageCohortATrans, cell: s.percentageCohortA },
}

const ConfList = ({ confData }) => {
  const sortedConfs = confData

  function genderDiversityRowStyle(conf) {
    var percentageCohort = Math.floor(conf.diversityPercentage * 10)

    return diversityStyles[percentageCohort]['row']
  }

  function genderDiversityCellStyle(conf) {
    var percentageCohort = Math.floor(conf.diversityPercentage * 10)

    return diversityStyles[percentageCohort]['cell']
  }

  return (
    <div className={s.confTable}>
      <table>
        <thead>
          <tr>
            <th className={s.numericDataColumn} width="30">
              rank
            </th>
            <th width="30" className={s.numericDataColumn}>
              %<br />
              (#f:#m)
            </th>
            <th>conf</th>
          </tr>
        </thead>
        <tbody>
          {sortedConfs.map(({ node }, index) => (
            <tr key={index} className={genderDiversityRowStyle(node)}>
              <td className={s.numericDataColumn}>
                <a name={node.diversityPercentage}> {node.index} </a>
              </td>
              <td className={genderDiversityCellStyle(node)}>
                {new ConfListFormatter().genderDiversityFormatter(
                  node.diversityPercentage
                )}{' '}
                ({node.numberOfWomen}:{node.numberOfMen})
              </td>
              <td>
                {' '}
                {node.name} {node.year}
                &nbsp;
                <strong>
                  {new ConfListFormatter().unconfirmedConferenceFormatter(node)}
                </strong>{' '}
                <strong>
                  {new ConfListFormatter().newConferenceFormatter(node)}
                </strong>{' '}
                <div className={s.confLocation}>{node.location}</div>
              </td>
              <td>
                {new ConfListFormatter().genderDiversityBar(
                  node.diversityPercentage
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ConfList
