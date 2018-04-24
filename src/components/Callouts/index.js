import s from './Callouts.css';
import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import CalloutsHelper from './CalloutsHelper';

// export const query = graphql`
//   query ConfDataQuery 
//     { allConfsJson
//       { edges 
//         { node 
//           { name 
//             location 
//             year 
//             totalSpeakers 
//             numberOfWomen 
//             source 
//             dateAdded }}}}`
            
const Callouts = ({data}) => {

  console.log(data);
  const helper = new CalloutsHelper();

  const state = {
    lastAdded: helper.findMostRecentlyAddedConference(data.allConfsJson.edges),
    numberOfConfs: data.allConfsJson.edges.length,
    averageDiversity: helper.calculateAverageDiversity(data.allConfsJson.edges),
    averageDiversityCurrentYear: helper.calculateAverageDiversity(helper.findConfsForCurrentYear(data.allConfsJson.edges))
    };
  
  return (
      <div className={s.container}>
        <div className="row">
          <div className="col-sm-2">
            <div className={s.title}>Conferences tracked</div>
            <div className={s.pop}>{this.state.numberOfConfs}</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Biggest recent improver</div>
            <div className={s.body}><strong>1st Conf</strong><br/>{"+36%"}<br/>{"2016 -> 2017"}</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Average f:m%</div>
            <div className={s.pop}>{numeral(this.state.averageDiversity).format('0%')}</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Average f:m% ({(new Date()).getFullYear()})</div>
            <div className={s.pop}>{numeral(this.state.averageDiversityCurrentYear).format('0%')}</div>
          </div>
          <div className="col-sm-2">
            <div className={s.title}>Last added</div>
            <div className={s.body}><strong>{this.state.lastAdded.name} ({this.state.lastAdded.year})</strong><br />{numeral(this.state.lastAdded.diversityPercentage).format('0%')}</div>
          </div>
        </div>
      </div>
)}


Callouts.propTypes = {
  confs: PropTypes.array
};

export default Callouts;
