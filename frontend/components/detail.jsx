const React = require('react');
const ReactDOM = require('react-dom');
const hashHistory = require('react-router').hashHistory;
const d3 = require('d3');
const Store = require('./store.js');



class PatientDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      patient: undefined,
      avg: undefined,
      range: undefined
    };
  }

  componentWillMount() {
    Store.subscribe(() => {
      var state = Store.getState();
      this.setState({
        patient: state.patients.items
      });
    });
  }

  componentDidMount() {
    Store.fetchPatient(this.props.params.id);
  }

  // componentDidMount() {
  //   d3.json("patients.json", data => {
  //     let match = this.props.params.id;
  //     let target = undefined;
  //     for (var i = 0; i < data.length; i++) {
  //       if (data[i].mrn === match) {
  //         target = data[i];
  //       }
  //     }
  //     let weightRange = d3.extent(data, function(d) {return d.weight;});
  //     let avgWeight = d3.mean(data, function(d) {return d.weight;});
  //
  //     this.setState({patient: target, avg: avgWeight, range: weightRange});
  //   });
  // }


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

  _generateChart() {
    var svgContainer = d3.select("body").append("svg").attr("width", 500).attr("height", 200);
    var axisScale = d3.scaleLinear().domain(this.state.range).range([this.state.range[0],400]);
    var axisBot = d3.axisBottom(axisScale);
    var ticks = [this.state.range[0], this.state.range[1], this.state.avg, this.state.patient.weight];
    axisBot.tickValues(ticks);
    var xAxisGroup = svgContainer.append("g").call(axisBot);
    let that = this;
    let target = d3.selectAll('g.tick').filter(function(d){
      return d==that.state.patient.weight;
    } );
    target.append("circle").attr("r", 8).attr('fill','red');
    if (this.state.patient.weight != this.state.range[0] && this.state.patient.weight != this.state.range[1]) {
      target.select('line').remove();
      target.select('text').remove();
    }

  }

  _redirectToList() {
    d3.selectAll("svg > *").remove();
    d3.selectAll("svg").remove();
    hashHistory.push('/');
  }

  render() {

    let age = undefined;
    if (this.state.patient) {
      age = this._getAge(this.state.patient.dob);
      this._generateChart();
      return (
        <div>
          <button onClick={this._redirectToList}>{'< Patients'}</button>
          <div className='patient-data'>
            <h2>{this.state.patient.name.last}, {this.state.patient.name.first}</h2>
            <div className='row'>
              <p>MRN: {this.state.patient.mrn}</p>
              <p>{this.state.patient.dob}</p>
              <p>{age} y.o. {this.state.patient.sex}</p>
            </div>
            <div className='disease-data'>
              <p>{this.state.patient.tumor_size_cm} cm {this.state.patient.histology}, {this.state.patient.treatment_site}</p>
            </div>
            <div className='weight-chart'>
              <p>{this.state.patient.weight} lbs</p>

            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <h2></h2>
      );
    }
  }
}

module.exports = PatientDetail;
