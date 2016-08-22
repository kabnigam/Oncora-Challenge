const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');
const PatientIndexItem = require('./patient_index_item.jsx');





class PatientList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      patientData: [],
      orderBy: "name"
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


  _getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
  }


  _orderBy() {
    var arr = this.state.patientData;
    var col = this.state.orderBy;

      switch (col) {
        case 'name':
          return arr.sort((x,y) => {
            return x.name.last > y.name.last;
          });
        case 'mrn':
          return arr.sort((x,y) => {
            return x.mrn > y.mrn;
          });
        case 'dob':
          return arr.sort((x,y) => {
            return new Date(x.dob).getTime() > new Date(y.dob).getTime();
          });
        case 'demographics':
          return arr.sort((x,y) => {
            return x.sex > y.sex;
          });
        case 'treatment':
          return arr.sort((x,y) => {
            return x.treatment_site > y.treatment_site;
          });
      }
  }

  _setOrder(col) {
    this.setState({orderBy: col});
  }


  render() {

    let rows =
    [[
      <tr>
        <th onClick={this._setOrder.bind(this, 'name')}>Name <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/24967-200.png'></img></th>
        <th onClick={this._setOrder.bind(this, 'mrn')}>MRN <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/24967-200.png'></img></th>
        <th onClick={this._setOrder.bind(this, 'dob')}>DOB <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/24967-200.png'></img></th>
        <th onClick={this._setOrder.bind(this, 'demographics')}>Demographics <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/24967-200.png'></img></th>
        <th onClick={this._setOrder.bind(this, 'treatment')}>Treatment Site <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/24967-200.png'></img></th>
      </tr>
    ]];



    //sort by last name

    if (this.state.patientData.length > 0) {
      let ordered = this._orderBy();
      ordered.forEach(patient => {
        rows.push([<PatientIndexItem key={patient.mrn} patient={patient} age={this._getAge(patient.dob)}/>]);
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
