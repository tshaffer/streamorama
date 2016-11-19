import React from 'react';
import { Component } from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Encoder extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    // <RaisedButton label="Default" />

    handleChange(event, index, value) {
        this.setState({value});
    }


// <p>Source</p>

    render() {

        return (
            <div>
                <div>
                    <div>
                        <SelectField
                            floatingLabelText="Source"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        >
                            <MenuItem value={1} primaryText="HDMI" />
                            <MenuItem value={2} primaryText="File" />
                        </SelectField>
                    </div>
                </div>
            </div>
        );
    }
}

export default Encoder;
