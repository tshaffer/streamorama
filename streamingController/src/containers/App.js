import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    componentWillMount() {
    }

    render() {

        return (
            <div>
                Stream Pizza
            </div>
        );
    }
}

export default App;

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({loadAppData},
//         dispatch);
// }
//
// App.propTypes = {
//     loadAppData: React.PropTypes.func.isRequired,
// };
//
// export default connect(null, mapDispatchToProps)(App);
