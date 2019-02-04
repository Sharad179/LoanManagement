import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';
import { ContactComponent } from '../ContactComponent/ContactComponent';
import { HorizontalTable } from '../TableComponent/HorizontalTable';
import { VerticalTable } from '../TableComponent/VerticalTable';
import { GaugechartComponent } from '../HighchartComponent/GaugechartComponent';
import { Form, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap';
// import {HighchartComponent} from '../HighchartComponent/HighchartComponent';

// var element;

// // Create and render element
// element = React.createElement(HighchartComponent, { container: 'chart', options: options });
// ReactDOM.render(element, document.getElementById('react-app'));
// import { userActions } from '../_actions';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"scoreone":"","scoretwo":"","riskbasedFitment":"","previousRecord":[]};
        this.handleChange = this.handleChange.bind(this);
        
    }
    componentDidMount(){
        const customer = JSON.parse(localStorage.getItem('customerObj'));
        const programval = localStorage.getItem('programval')
        console.log("customer",customer);
        var _this = this;
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/api/getScore?', {
            method: 'POST',
            body: JSON.stringify(customer)
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            _this.setState({"previousRecord":body["previousRecord"],"scoreone":body["score1"][programval]["Rescaled Score"],"scoretwo":body["score2"][programval]["Rescaled Score"],"riskbasedFitment":body["RiskBasedPricingGrid"]});
           
        });
    }
    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    render() {
        const { user, users } = this.props;
        const customer = JSON.parse(localStorage.getItem('customerObj'));
        return (
            <div>
                <HeaderComponent header="Dashboard" />

                <div className="body_background">
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-sm-4">

                              
                                       <VerticalTable tablehead = {"PL - Salary Advance"} heading = {[{field:"PAN Card",value:customer.pan},{field:"Name",value:customer.name},{field:"Age",value:customer.age},{field:"Loan Band",value:customer.loanBand},{field:"Tenure",value:customer.tenure},{field:"Residential/Office Stability",value:customer.residOffStabilty},{field:"Marital Status",value:customer.maritalStatus},{field:"Gender",value:customer.gender},{field:"Net Monthly Income",value:customer.netMonthlyIncome},{field:"Cibil Score",value:customer.cibilScore}]} panelHeight="650px"/>
                                
                            </div>
                            <div className="col-sm-8 col-sm-offset-1 form_part">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card my-5" style={{ backgroundColor: '#F0F0F0',border: "0",bordeRadius: "1rem",boxShadow: "0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)"}}>
                                           { this.state.scoreone?<div className="card-body">
                                                <h3 className="card-title choose_portfolio_head" style={{textAlign:"center" }}>Retra Score 1</h3>
                                                <p style={{textAlign:"center"}}><button className = "btn btn-default"><b>{this.state.scoreone}</b></button></p>
                                                <GaugechartComponent container = 'retrascore1' scoreval = {parseInt(this.state.scoreone)} titleval = "Retra Score 1"/>
                                            </div>:""}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card my-5" style={{ backgroundColor: '#F0F0F0' }}>
                                        { this.state.scoreone?<div className="card-body">
                                                <h3 className="card-title text-center choose_portfolio_head">Retra Score 2</h3>
                                                <p style={{textAlign:"center"}}><button className = "btn btn-default"><b>{this.state.scoretwo}</b></button></p>
                                                <GaugechartComponent container = 'retrascore2' scoreval = {parseInt(this.state.scoretwo)} titleval = "Retra Score 2"/>
                                            </div>:""}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card my-5" style={{ backgroundColor: '#F0F0F0' }}>
                                            <div className="card-body">
                                                <h3 className="card-title text-center choose_portfolio_head">CIBIL</h3>
                                                <p style={{textAlign:"center"}}><button className = "btn btn-default"><b>{customer.cibilScore}</b></button></p>
                                                <GaugechartComponent container = 'cibilScore' scoreval = {customer.cibilScore} titleval = "CIBIL Score"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>


                                <div className="row">&nbsp;</div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="card card-signin my-5" style={{ backgroundColor: '#F0F0F0' }}>
                                            <div className="card-body">
                                                <h3 className="card-title text-centerchoose_portfolio_head"><b>RISK BASED FITMENT GRID</b></h3>
                                            
                                                <VerticalTable tablehead = {""} heading = {[{field:"Retra Score 1",value:this.state.scoreone},{field:"Pricing",value:this.state.riskbasedFitment}]} panelHeight="150px"/>                                           
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card card-signin my-5" style={{ backgroundColor: '#F0F0F0',height:"243px" }}>
                                            <div className="card-body">
                                                <h3 className="card-title text-centerchoose_portfolio_head"><b>INTELLI-MATCH (DEDUPING)</b></h3>
                                                {this.state.previousRecord.length>0?<HorizontalTable tablehead = {""} bodyvalues = {this.state.previousRecord} panelHeight="150px"/>:<h4 style={{textAlign:"center"}}>No Previous Records Found</h4>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <ContactComponent />

            </div>

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));