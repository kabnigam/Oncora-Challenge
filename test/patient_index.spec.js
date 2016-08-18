const Chai = require('chai');
const Enzyme = require('enzyme');
const React = require('react');

const PatientIndexItem = require('./../frontend/components/patient_index_item.jsx');


describe('PatientIndexItem(initial state)', () => {
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
  const wrapper = Enzyme.shallow(<PatientIndexItem patient={patient}/>);

  it ('renders the correct table row', () => {
    Chai.expect(wrapper.type()).to.eql('tr');
    Chai.expect(wrapper.prop('className')).to.eql('all-patient-data');
  });

  it ('renders the correct data', () => {
    Chai.expect(wrapper.find('td')).to.have.length(5);
    Chai.expect(wrapper.find('td').at(0).text()).to.equal(`${patient.name.last}, ${patient.name.first}`);
    Chai.expect(wrapper.find('td').at(1).text()).to.equal(patient.mrn);
    Chai.expect(wrapper.find('td').at(2).text()).to.equal(patient.dob);
    Chai.expect(wrapper.find('td').at(3).text()).to.equal(patient.sex);
    Chai.expect(wrapper.find('td').at(4).text()).to.equal(patient.treatment_site);
  });

});
