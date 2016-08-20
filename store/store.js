const Redux = require('redux');
const d3 = require('d3');

var defaultState = {
  patients: {
    items: {}
  }
};

function patientApp(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return Object.assign({}, _getData());
    case 'FETCH_PATIENT':
      return Object.assign({}, state.patients.items, {patients: state.patients.items.patients[action.mrn]});
  }
}

function _getData() {
  var patients = {};
  var weightRange, avgWeight = undefined;
  d3.json("patients.json", data => {
    weightRange = d3.extent(data, function(d) {return d.weight;});
    avgWeight = d3.mean(data, function(d) {return d.weight;});
    data.forEach(patient => {
      patients[patient.mrn] = patient;
    });
  });
  return patients;
}

// var fetchData = function() {
//   return {
//     type: 'FETCH_DATA'
//   };
// };
//
// var fetchPatient = function(mrn) {
//   return {
//     type: 'FETCH_PATIENT',
//     mrn: mrn
//   };
// };

const store = Redux.createStore(patientApp, defaultState);

module.exports = store;
