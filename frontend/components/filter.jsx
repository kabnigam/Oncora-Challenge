const React = require('react');
const ReactDOM = require('react-dom');

class PatientList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      age: false,
      sex: false,
      treatment: false,

    };
  }

  componentDidMount() {

      document.querySelectorAll('input').forEach(box => {
        box.addEventListener('click', e => {
          this.props.triggerFilter(e.target.value);
        });
      });

  }

  _setFilter(filter) {

    switch (filter) {
      case 'age':
        this.setState({age: !this.state.age});
        break;
      case 'sex':
        this.setState({sex: !this.state.sex});
        break;
      case 'treatment':
        this.setState({treatment: !this.state.treatment});
        break;
    }
  }

  render() {
    var ageOptions = [];
    var sexOptions = [];
    var treatmentOptions = [];
    if (this.state.age) {
      ageOptions.push(
        <ul>
          <li><input  type='checkbox' value='age:0-10'/>0-10</li>
          <li><input  type='checkbox' value='age:11-20'/>11-20</li>
          <li><input  type='checkbox' value='age:21-30'/>21-30</li>
          <li><input  type='checkbox' value='age:31-40'/>31-40</li>
          <li><input  type='checkbox' value='age:41-50'/>41-50</li>
          <li><input  type='checkbox' value='age:51-60'/>51-60</li>
          <li><input  type='checkbox' value='age:61-70'/>61-70</li>
          <li><input  type='checkbox' value='age:70+'/>70+</li>
        </ul>
      );
    }

    if (this.state.sex) {
      sexOptions.push(
        <ul>
          <li><input  type='checkbox' value='sex:Male'/>Male</li>
          <li><input  type='checkbox' value='sex:Female'/>Female</li>
        </ul>
      );
    }

    if (this.state.treatment) {
      treatmentOptions.push(
        <ul>
          <li><input  type='checkbox' value='site:Prostate'/>Prostate</li>
          <li><input  type='checkbox' value='site:Lung'/>Lung</li>
          <li><input  type='checkbox' value='site:Breast'/>Breast</li>
        </ul>
      );
    }

    return (
      <div className='filter'>
        <h4>Filter By:</h4>
        <ul>
          <li onClick={this._setFilter.bind(this, 'age')} id='age'>Age
          </li>
            {ageOptions}
          <li onClick={this._setFilter.bind(this, 'sex')} id='age'>Sex
          </li>
            {sexOptions}
          <li onClick={this._setFilter.bind(this, 'treatment')} id='age'>Treatment Site
          </li>
            {treatmentOptions}
        </ul>
      </div>
    );
  }
}

module.exports = PatientList;
