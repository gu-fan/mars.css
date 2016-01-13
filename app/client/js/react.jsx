// from bower_components directory
// var ReactDOM = require('react-dom')
// var React = require('react')
var ReactDOM = require('../../../bower_components/react/react-dom')
var React = require('../../../bower_components/react/react')

var $ = require('../../../bower_components/jquery/dist/jquery')

var HelloMessage = React.createClass({
  render: function() {
    return <p className='browserify5'>Hello {this.props.name}</p>;
  }
});

ReactDOM.render(<HelloMessage name="Browserify React" />, $('#browserify').removeClass('hide').get(0));

