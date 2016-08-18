const Chai = require('chai');
const Enzyme = require('enzyme');
const React = require('react');
const List = require('./../frontend/components/list.jsx');
const PatientIndexItem = require('./../frontend/components/patient_index_item.jsx');


describe('List(initial state)', () => {
  const wrapper = Enzyme.shallow(<List/>);
  it('renders as a <div>', () => {
    Chai.expect(wrapper.type()).to.eql('div');
  });

  it('contains a div with class patient-table', () => {
    Chai.expect(wrapper.find('.patient-table')).to.have.length(1);
  });

  it('contains a table', () => {
    Chai.expect(wrapper.find('table')).to.have.length(1);
  });

  it('should initialize patientData to an empty array', () => {
    Chai.expect(wrapper.state().patientData).to.have.length(0);
  });

  it('should display correct number of table headers', () => {
    Chai.expect(wrapper.find('th')).to.have.length(5);
  });

  it('should display the correct table headers', () => {
    Chai.expect(wrapper.find('th').at(0).text()).to.equal('Name');
    Chai.expect(wrapper.find('th').at(1).text()).to.equal('MRN');
    Chai.expect(wrapper.find('th').at(2).text()).to.equal('DOB');
    Chai.expect(wrapper.find('th').at(3).text()).to.equal('Sex');
    Chai.expect(wrapper.find('th').at(4).text()).to.equal('Treatment Site');
  });

  it ('should display no PatientIndexItems', () => {
    Chai.expect(wrapper.find(PatientIndexItem)).to.have.length(0);
  });
});

// describe('List(mounted state)', () => {
//
//   const wrapper = Enzyme.mount(<List />);
//   it('calls componentDidMount', () => {
//     Enzyme.spyLifecycle(List);
//     Chai.expect(List.prototype.componentDidMount.calledOnce).to.be.true;
//   });
//
//   it('calls _getData once it mounts', () => {
//     // Enzyme.spyLifecycle(List);
//     Enzyme.mount(<List />);
//     Chai.expect(List.prototype._getData.calledOnce).to.be.true;
//   });
//
// });
