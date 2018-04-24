import React from 'react'
var ta = require('time-ago');
var numeral = require("numeral");
import s from '../components/ConfList/ConfList.module.css';
import co from '../components/Callouts/Callouts.module.css';
import AppHelper from '../components/AppHelper';
import ConfListHelper from '../components/ConfList/ConfListHelper';
import CalloutsHelper from '../components/Callouts/CalloutsHelper';

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
  const confData = data.allConfsJson.edges;
  const augmentedConfData = new AppHelper().augmentConfData(confData);
  const helper = new ConfListHelper();
  const lastAdded = new CalloutsHelper().findMostRecentlyAddedConference(confData);
  const numberOfConfs = confData.length;
  const averageDiversity = new CalloutsHelper().calculateAverageDiversity(confData);
  const averageDiversityCurrentYear = new CalloutsHelper().calculateAverageDiversity(new CalloutsHelper().findConfsForCurrentYear(confData));

  function genderDiversityRowStyle(conf) {
    var percentage = conf.diversityPercentage;
    if (percentage < .10) {
      return s.percentageCohortFTrans;
    } else if (percentage < .20) {
      return s.percentageCohortETrans;
    } else if (percentage < .30) {
      return s.percentageCohortDTrans;
    } else if (percentage < .40) {
      return s.percentageCohortCTrans;
    } else if (percentage < .50) {
      return s.percentageCohortBTrans;
    } else {
      return s.percentageCohortATrans;
    }
  }

  function genderDiversityCellStyle(conf) {
    var percentage = conf.diversityPercentage;
    if (percentage < .10) {
      return s.percentageCohortF;
    } else if (percentage < .20) {
      return  s.percentageCohortE;
    } else if (percentage < .30) {
      return  s.percentageCohortD;
    } else if (percentage < .40) {
      return s.percentageCohortC;
    } else if (percentage < .50) {
      return s.percentageCohortB;
    } else {
      return s.percentageCohortA;
    }

  }

  return (
    <div>
    <div className={co.container}>
      <div className="row">
        <div className="col-sm-2">
          <div className={co.title}>Conferences tracked</div>
            <div className={co.pop}>{numberOfConfs}</div>
        </div>
        <div className="col-sm-2">
            <div className={co.title}>Biggest recent improver</div>
            <div className={co.body}><strong>1st Conf</strong><br />{"+36%"}<br />{"2016 -> 2017"}</div>
        </div>
        <div className="col-sm-2">
            <div className={co.title}>Average f:m%</div>
            <div className={co.pop}>{numeral(averageDiversity).format('0%')}</div>
        </div>
        <div className="col-sm-2">
            <div className={co.title}>Average f:m% ({(new Date()).getFullYear()})</div>
            <div className={co.pop}>{numeral(averageDiversityCurrentYear).format('0%')}</div>
        </div>
        <div className="col-sm-2">
            <div className={co.title}>Last added</div>
            <div className={co.body}><strong>{lastAdded.node.name} ({lastAdded.node.year})</strong><br />{numeral(lastAdded.node.diversityPercentage).format('0%')}</div>
        </div>
      </div>
    </div>

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
          <tr key={index} className={genderDiversityRowStyle(node)}>
            <td className={s.numericDataColumn}> {node.index} </td>
            <td className={genderDiversityCellStyle(node)}> {helper.genderDiversityFormatter(node.diversityPercentage)} </td>
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
    </div>
  )
}
