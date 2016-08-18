const Chai = require('chai');
const Enzyme = require('enzyme');
const React = require('react');
const Detail = require('./../frontend/components/detail.jsx');

describe('Detail(initial state)', () => {
  const wrapper = Enzyme.shallow(<Detail/>);
  var patient = {
    "name": {
      "first": "Hailey",
      "last": "Wilson"
    },
    "mrn": "12345",
    "dob": "03/05/1980",
    "sex": "Female",
    "treatment_site": "Breast",
    "tumor_size_cm": 1.1,
    "histology": "Ductal carcinoma in situ",
    "weight": 134.1
  };

  it ('does not render <div> with no state', () => {
    Chai.expect(wrapper.type()).to.not.eql('div');
  });

});

describe('Detail(with state)', () => {
  const wrapper = Enzyme.shallow(<Detail/>);
  var patient = {
    "name": {
      "first": "Hailey",
      "last": "Wilson"
    },
    "mrn": "12345",
    "dob": "03/05/1980",
    "sex": "Female",
    "treatment_site": "Breast",
    "tumor_size_cm": 1.1,
    "histology": "Ductal carcinoma in situ",
    "weight": 134.1
  };

  var ageFunction = function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
  };


  wrapper.setState({patient: patient, avg: 167, range: [100, 200]});

  it('renders as a <div> with state', () => {
    Chai.expect(wrapper.type()).to.eql('div');
  });

  it('has button to go back to patient list', () => {
    Chai.expect(wrapper.find('button').text()).to.equal('< Patients');
  });

  it('calculates the correct age', () => {
    Chai.expect(Detail.prototype._getAge('03/05/1980')).to.equal(ageFunction(patient.dob));
  });

  it('renders the correct divs', () => {
    Chai.expect(wrapper.find('div').at(1).prop('className')).to.equal('patient-data');
    Chai.expect(wrapper.find('div').at(2).prop('className')).to.equal('row');
    Chai.expect(wrapper.find('div').at(3).prop('className')).to.equal('disease-data');
    Chai.expect(wrapper.find('div').at(4).prop('className')).to.equal('weight-chart');
  });

  
});
