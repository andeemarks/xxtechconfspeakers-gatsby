import React from 'react'
var numeral = require('numeral')
import s from '../components/ConfList/ConfList.module.css'
import co from '../components/Callouts/Callouts.module.css'
import AppHelper from '../components/AppHelper'
import ConfListFormatter from '../components/ConfList/ConfListFormatter'
import CalloutsHelper from '../components/Callouts/CalloutsHelper'
import Layout from '../components/layout'
import cx from 'classnames'
import { graphql } from 'gatsby'
import {
  Sparklines,
  SparklinesBars,
  SparklinesReferenceLine,
} from 'react-sparklines'

/* eslint-disable no-undef */
export const query = graphql`
  {
    allConfsJson {
      edges {
        node {
          name
          location
          year
          totalSpeakers
          numberOfWomen
          source
          dateAdded
          confDate
        }
      }
    }
  }
`
/* eslint-enable no-undef */
/* eslint react/prop-types: 0 */

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

export default ({ data }) => {
  const augmentedConfData = new AppHelper().augmentConfData(data.allConfsJson.edges)
  const lastAdded = new CalloutsHelper().findMostRecentlyAddedConference(
    augmentedConfData
  )
  const numberOfConfs = augmentedConfData.length
  const averageDiversity = new CalloutsHelper().calculateAverageDiversity(
    augmentedConfData
  )
  const averageDiversityCurrentYear = new CalloutsHelper().calculateAverageDiversity(
    new CalloutsHelper().findConfsForCurrentYear(augmentedConfData)
  )

  const sparklineData = new CalloutsHelper().sortByConfDate(augmentedConfData)

  function genderDiversityRowStyle(conf) {
    var percentageCohort = Math.floor(conf.diversityPercentage * 10)

    return diversityStyles[percentageCohort]['row']
  }

  function genderDiversityCellStyle(conf) {
    var percentageCohort = Math.floor(conf.diversityPercentage * 10)

    return diversityStyles[percentageCohort]['cell']
  }

  return (
    <Layout>
      <div>
        <div className={cx('row', co.container)}>
          <div className="col-sm-12">
            <div className={co.title}>
              Diversity over time (dotted line = average diversity of{' '}
              {numeral(averageDiversity).format('0%')})
            </div>
            <div className={co.pop}>
              <Sparklines color="white" max={1} margin={0} data={sparklineData}>
                <SparklinesBars color="white" />
                <SparklinesReferenceLine
                  type="avg"
                  style={{ stroke: 'white', strokeDasharray: '1, 1' }}
                />
              </Sparklines>
            </div>
          </div>
        </div>
        <div>
          <div className={cx('row', co.container)}>
            <div className="col-sm-4">
              <div className={co.title}>Conferences tracked</div>
              <div className={co.pop}>{numberOfConfs}</div>
            </div>
            <div className="col-sm-4">
              <div className={co.title}>
                Average f:m% ({new Date().getFullYear()})
              </div>
              <div className={co.pop}>
                {numeral(averageDiversityCurrentYear).format('0%')}
              </div>
            </div>
            <div className="col-sm-4">
              <div className={co.title}>Last added</div>
              <div className={co.body}>
                <strong>
                  {lastAdded.node.name} ({lastAdded.node.year})
                </strong>
                <br />
                {numeral(lastAdded.node.diversityPercentage).format('0%')}
              </div>
            </div>
          </div>
        </div>

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
              {augmentedConfData.map(({ node }, index) => (
                <tr key={index} className={genderDiversityRowStyle(node)}>
                  <td className={s.numericDataColumn}> {node.index} </td>
                  <td className={genderDiversityCellStyle(node)}>
                    {new ConfListFormatter().genderDiversityFormatter(node.diversityPercentage)}{' '}
                    ({node.numberOfWomen}:{node.numberOfMen})
                  </td>
                  <td>
                    {' '}
                    <a
                      href="#"
                      data-toggle="tooltip"
                      title={
                        node.location +
                        ' (added: ' +
                        new ConfListFormatter().dateAddedFormatter(node.dateAdded) +
                        ')'
                      }
                    >
                      {node.name} ({node.year})
                    </a>
                    &nbsp;
                    <strong>{new ConfListFormatter().newConferenceFormatter(node)}</strong>{' '}
                  </td>
                  <td>{new ConfListFormatter().genderDiversityBar(node.diversityPercentage)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
