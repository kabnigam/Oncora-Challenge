const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');
const PatientIndexItem = require('./patient_index_item.jsx');
const Filter = require('./filter.jsx');




class PatientList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      patientData: [],
      orderBy: "name",
      ageFilter: [],
      sexFilter: [],
      siteFilter: []
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

  _triggerFilter(filter) {
    let col = filter.split(':')[0];
    let val = filter.split(':')[1];

    if (col === 'age') {
      if (this.state.ageFilter.includes(val)) {
        if (this.state.ageFilter.length === 1) {
          this.setState({ageFilter: []});
        }
        else {
          let i = this.state.ageFilter.indexOf(val);
          this.setState({ageFilter: this.state.ageFilter.splice(i, 1)});
        }
      } else {
        this.setState({ageFilter: this.state.ageFilter.concat([val]) });
      }
    } else if (col === 'sex') {

      if (this.state.sexFilter.includes(val)) {
        if (this.state.sexFilter.length === 1) {
          this.setState({sexFilter: []});
        }
        else {
          let i = this.state.sexFilter.indexOf(val);
          this.setState({sexFilter: this.state.sexFilter.splice(i, 1)});
        }
      } else {
        this.setState({sexFilter: this.state.sexFilter.concat([val]) });
      }
    }
    else if (col === 'site') {
    
      if (this.state.siteFilter.includes(val)) {

        if (this.state.siteFilter.length === 1) {
          this.setState({siteFilter: []});
        }
        else {
          let i = this.state.siteFilter.indexOf(val);
          this.setState({siteFilter: this.state.siteFilter.splice(i, 1)});
        }
      } else {

        this.setState({siteFilter: this.state.siteFilter.concat([val]) });
      }
    }
  }

  _filter() {
    let arr = this.state.patientData;
    let filtered = [];

    this.state.ageFilter.forEach(filter => {
      if (filter === '70+') {
        filter = [70,150];
      } else {
        filter = filter.split('-').map(i => {return parseInt(i);});
      }

      arr.forEach(patient => {
        let age = this._getAge(patient.dob);
        if (age >= filter[0] && age <= filter[1]) {
          if (!filtered.includes(patient)){
            filtered.push(patient);
          }
        }
      });
    });

    this.state.sexFilter.forEach(filter => {
      arr.forEach(patient => {
        if (patient.sex === filter) {
          if (!filtered.includes(patient)){
            filtered.push(patient);
          }
        }
      });
    });

    this.state.siteFilter.forEach(filter => {
      arr.forEach(patient => {
        if (patient.treatment_site === filter) {
          if (!filtered.includes(patient)){
            filtered.push(patient);
          }
        }
      });
    });

    if (filtered.length === 0) {
      return arr;
    } else {
      return filtered;
    }
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


  _orderBy(arr) {
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
        <th onClick={this._setOrder.bind(this, 'name')}>Name</th>
        <th onClick={this._setOrder.bind(this, 'mrn')}>MRN</th>
        <th onClick={this._setOrder.bind(this, 'dob')}>DOB</th>
        <th onClick={this._setOrder.bind(this, 'demographics')}>Demographics</th>
        <th onClick={this._setOrder.bind(this, 'treatment')}>Treatment Site</th>
      </tr>
    ]];



    //sort by last name
    if (this.state.patientData.length > 0) {
      let filtered = this._filter();

      let ordered = this._orderBy(filtered);
      ordered.forEach(patient => {
        rows.push([<PatientIndexItem key={patient.mrn} patient={patient} age={this._getAge(patient.dob)}/>]);
      });
    }

    return (

    <div className='patient-table'>
      <Filter triggerFilter={this._triggerFilter.bind(this)}/>
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
