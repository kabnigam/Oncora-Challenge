const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');
const PatientIndexItem = require('./patient_index_item.jsx');




class PatientList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      patientData: []
    };
  }

  componentDidMount() {
    this._getData();
  }

  _getData() {
    d3.json("patients.json", data => {
      this.setState({patientData: data});
    });
  }



  render() {

    let rows = [[
      <tr>
        <th>Name <img src='http://downloadicons.net/sites/default/files/sort-icon-84281.png'></img></th>
        <th>MRN <img src='http://downloadicons.net/sites/default/files/sort-icon-84281.png'></img></th>
        <th>DOB <img src='http://downloadicons.net/sites/default/files/sort-icon-84281.png'></img></th>
        <th>Sex <img src='http://downloadicons.net/sites/default/files/sort-icon-84281.png'></img></th>
        <th>Treatment Site <img src='http://downloadicons.net/sites/default/files/sort-icon-84281.png'></img></th>
      </tr>
    ]];

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
