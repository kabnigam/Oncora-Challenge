const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');
const PatientIndexItem = require('./patient_index_item.jsx');
const Store = require('./../store/store.js');
const Actions = require('./../actions/actions.js');




class PatientList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      patientData: []
    };
  }

  componentWillMount() {

    Store.subscribe(() => {
      var stateObject = Store.getState();
      var stateArray = [];
      Object.keys(stateObject.patients.items).forEach(mrn => {
        stateArray.push(stateObject.patients.items.mrn);
      });
      this.setState({
        patientData: stateArray
      });
    });
  }

  componentDidMount() {
    Store.dispatch(Actions.fetchData());
  }

  // componentDidMount() {
  //   this._getData();
  // }

  // _getData() {
  //   d3.json("patients.json", data => {
  //     this.setState({patientData: data});
  //   });
  // }



  render() {
    console.log(Actions.fetchData());
    let rows = [[<tr><th>Name</th><th>MRN</th><th>DOB</th><th>Sex</th><th>Treatment Site</th></tr>]];
    if (this.state.patientData.length > 0) {
      let ordered = this.state.patientData.sort(function(x,y) {
        return x.name.last > y.name.last;
      });
      ordered.forEach(patient => {
        rows.push([<PatientIndexItem key={patient.mrn} patient={patient} />]);
      });
    }
    return (
      <div className='patient-table'>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = PatientList;
