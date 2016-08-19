const Redux = require('redux');
const d3 = require('d3');

var defaultState = {
  patients: {
    items: _getData()
  }
};

function patientApp(state, action) {
}

function _getData() {
  var patients = [];
  d3.json("patients.json", data => {
    patients = data;
  });
  return patients;
}

var store = Redux.createStore(patientApp, defaultState);
