import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap';

// import { userActions } from '../_actions';
import '../HomePage/HomePage.css';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { portfolio: "" };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePortFolio = this.handleChangePortFolio.bind(this);

    }


    handleClick(event) {
        window.location.href = '/portfolio';

    }
    handleChangePortFolio(event) {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.value == "Salary_Advance") {
            window.location.href = '/portfolio';
        }
        else {
            window.location.href = '/walletFinance';
        }
        console.log(event.target.value);

    }



    render() {
        const { user, users } = this.props;
        return (
            <div>
                <div className="container-fluid partner_background">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <p className="partner_text_head">User Guide</p>
                            <hr className="hr_line" />
                        </div>
                    </div>
                </div>

                <div className="blue_banner">
                    <div className="container">

                        <div className="row partner_row_padding">
                            <div className="col-md-3">
                                <label style={{ color: "white" }}><h3 style={{}}>Choose Partner: </h3></label>
                                <select className="form-control">
                                    <option value="">Select Partner</option>
                                    <option value="Edelweiss">Edelweiss</option>
                                </select>
                            </div>
                            <div className="col-md-7 offset-md-2">
                                <div className="card card-default" style={{ borderRadius: "1em" }}>
                                    <div className="card-body">
                                        <h3 style={{ textAlign: "center", lineHeight: "40px" }}>You need to choose Partner and then Portfolio in order to see how the portfolio is behaving</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row partner_row_padding">
                            <div className="col-md-3">
                                <label style={{ color: "white" }}><h3 style={{}}>Choose Portfolio: </h3></label>
                                <select className="form-control" name="portfolio" value={this.state.portfolio} onChange={this.handleChangePortFolio}>
                                    <option value="">Select Portfolio</option>
                                    <option value="Salary_Advance">Salary Advance</option>
                                    <option value="Wallet_Finance">Wallet Finance</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


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

export default withRouter(connect(mapStateToProps)(HomePage));