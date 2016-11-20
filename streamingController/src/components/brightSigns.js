import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BrightSigns extends Component {

    render() {
        return (

            <MuiThemeProvider>

                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Source</TableHeaderColumn>
                                <TableHeaderColumn>Address</TableHeaderColumn>
                                <TableHeaderColumn>Format</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>
                                    HDMI
                                </TableRowColumn>
                                <TableRowColumn>
                                    239.194.0.2
                                </TableRowColumn>
                                <TableRowColumn>
                                    720p30
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    HDMI
                                </TableRowColumn>
                                <TableRowColumn>
                                    239.194.0.3
                                </TableRowColumn>
                                <TableRowColumn>
                                    1080i60
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

            </MuiThemeProvider>
        );
    }
}

export default BrightSigns;