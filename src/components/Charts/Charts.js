import React from "react"
import s from "./Charts.css"
import ReactSvgPieChart from "react-svg-piechart"
import ChartsHelper from './ChartsHelper';

class Charts extends React.Component {

  constructor(props) {
    super(props);

    this.helper = new ChartsHelper();

    this.state = {
      data: this.helper.countConfsByDiversityCohort(props.confs)
    }
  }

  render() {
    return (
      <div className={s.container}>
        <div className="row">
          <div className="col-sm-2">    
        <ReactSvgPieChart
          data={this.state.data}
          viewBoxSize={100}
          strokeColor="black"
          // If you need expand on hover (or touch) effect
          expandOnHover
          // If you need custom behavior when sector is hovered (or touched)
          onSectorHover={(d, i, e) => {
            if (d) {
              console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
            } else {
              console.log("Mouse leave - Index:", i, "Event:", e)
            }
          }}
          ></ReactSvgPieChart>
            <span className="label label-default"># Confs by Diversity Group</span>  
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
