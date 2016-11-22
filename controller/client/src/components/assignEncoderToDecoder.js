import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AssignEncoderToDecoder extends Component {

    buildRow(decoder) {
        return (
            <div>
                {decoder.name}
            </div>
        );
    }

    buildRows() {

        const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;

        let rows = [];

        for (let serialNumber in decodersBySerialNumber) {
            if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const decoder = decodersBySerialNumber[serialNumber];
                rows.push(this.buildRow(decoder));
            }
        }

        return rows;
    }

    render() {

        let rows = this.buildRows();

        return (

            <MuiThemeProvider>

                <div>
                    <Link to="/">Back</Link>
                    {rows}
                </div>

            </MuiThemeProvider>
        );
    }
}

AssignEncoderToDecoder.propTypes = {
    decoders: React.PropTypes.object.isRequired,
};


export default AssignEncoderToDecoder;