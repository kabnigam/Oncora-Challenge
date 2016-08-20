var fetchData = function() {
  return {
    type: 'FETCH_DATA'
  };
};

var fetchPatient = function(mrn) {
  return {
    type: 'FETCH_PATIENT',
    mrn: mrn
  };
};

module.exports = {fetchData: fetchData, fetchPatient: fetchPatient};
