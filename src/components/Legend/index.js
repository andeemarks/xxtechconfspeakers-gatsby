import s from './Legend.module.css'
import React from 'react'

const Legend = () => (
  <div>
    <div>
      <div className="col-sm-2">
        <div className={s.percentageCohortFTrans}>
          0% &gt;= diversity &lt; 10%
        </div>
      </div>
      <div className="col-sm-2">
        <div className={s.percentageCohortETrans}>
          10% &gt;= diversity &lt; 20%
        </div>
      </div>
      <div className="col-sm-2">
        <div className={s.percentageCohortDTrans}>
          20% &gt;= diversity &lt; 30%
        </div>
      </div>
      <div className="col-sm-2">
        <div className={s.percentageCohortCTrans}>
          30% &gt;= diversity &lt; 40%
        </div>
      </div>
      <div className="col-sm-2">
        <div className={s.percentageCohortBTrans}>
          40% &gt;= diversity &lt; 50%
        </div>
      </div>
      <div className="col-sm-2">
        <div className={s.percentageCohortATrans}>
          &gt;= 50% diversity &le; 100%
        </div>
      </div>
    </div>
  </div>
)

export default Legend
