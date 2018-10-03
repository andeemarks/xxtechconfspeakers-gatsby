import React from 'react'
import cx from 'classnames'
import co from './Callouts.module.css'
var numeral = require('numeral')

const Callouts = ({numberOfConfs}) => (
    <div>
        <div className={cx('row', co.container)}>
            <div className="col-sm-4">
                <div className={co.title}>Conferences tracked</div>
                <div className={co.pop}>{numberOfConfs}</div>
            </div>
            {/* <div className="col-sm-4">
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
            </div> */}
        </div>
    </div>
)

export default Callouts