import React from 'react';
import { Table } from 'react-bootstrap';
export class VerticalTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row portfolio_white_bg" style={{ height: this.props.panelHeight }}>
                <div className="choose_portfolio_head" style={{ textAlign: "center" }}>{this.props.tablehead}</div>
                <div className="col-sm-12 pl_list">
                </div>
                <Table bordered>
                    <tbody>
                        {this.props.heading.map((head, index) => {
                            return <tr key={index}>
                                <th>{head.field}</th>
                                <td>{head.value}</td>
                            </tr>
                        }
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}