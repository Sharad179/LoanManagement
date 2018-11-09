import React from 'react';
import { Table } from 'react-bootstrap';
export class HorizontalTable extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log(this.props.bodyvalues);
    }
    render() {
        return (
            <div className="row portfolio_white_bg" style={{ height: this.props.panelHeight }}>
                <div className="choose_portfolio_head" style={{ textAlign: "center" }}>{this.props.tablehead}</div>
                <div className="col-sm-12 pl_list">
                </div>
                <Table bordered>
                    <thead>
                        <tr>
                                <th style={{whiteSpace:"nowrap"}}>Loan Id</th>
                                <th>Name</th>
                                <th>PAN</th>
                                <th>City</th>
                                <th style={{whiteSpace:"nowrap"}}>Loan Amount</th>
                            
                        
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bodyvalues.map((body, index) => {
                            return <tr key={index}>
                                <td>{body.LoanId}</td>
                                <td>{body.Name}</td>
                                <td>{body.PAN}</td>
                                <td>{body.City}</td>
                                <td>{body.LoanAmount}</td>
                            </tr>
                        }
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}