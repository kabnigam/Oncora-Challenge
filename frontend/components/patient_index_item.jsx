const React = require('react');
const ReactDOM = require('react-dom');
const hashHistory = require('react-router').hashHistory;


class PatientIndexItem extends React.Component {

  _redirectToPatient(mrn) {
    hashHistory.push(`/patient/${mrn}`);
  }

  render() {
    return (
        <tr className='all-patient-data' onClick={this._redirectToPatient.bind(null, this.props.patient.mrn)}>
          <td>{this.props.patient.name.last}, {this.props.patient.name.first}</td>
          <td>{this.props.patient.mrn}</td>
          <td>{this.props.patient.dob}</td>
          <td>{this.props.patient.sex}</td>
          <td>{this.props.patient.treatment_site}</td>
        </tr>

    );
  }
}

module.exports = PatientIndexItem;
