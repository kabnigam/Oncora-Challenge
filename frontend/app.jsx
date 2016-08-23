const React = require('react');
const ReactDOM = require('react-dom');
const reactRouter = require('react-router');
const Router = reactRouter.Router;
const Route = reactRouter.Route;
const IndexRoute = reactRouter.IndexRoute;
const hashHistory = reactRouter.hashHistory;

const PatientList = require('./components/list.jsx');
const PatientDetail = require('./components/detail.jsx');



class App extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={PatientList}/>
    <Route path="patient/:id" component={PatientDetail}/>
  </Route>

);


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Router history={hashHistory} routes={routes}></Router>, document.getElementById('main'));
});
