import React from 'react';
import { withRouter } from 'react-router-dom';
import './ApplicationPage.css';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Salaried } from './SalariedPage';
import { SelfEmployed } from './Selfemployed';

// import { userActions } from '../_actions';


class applicationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "segment": "salaried","program":"Income+CIBIL" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <div className="container-fluid partner_background">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <p className="partner_text_head"> Portfolios</p>
                            <hr className="hr_line" />
                        </div>
                    </div>
                </div>

                <div className="body_background">
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-md-3">

                                <div className="row portfolio_white_bg">
                                    <h3 className="choose_portfolio_head" >Choose Portfolio</h3>
                                    <div className="col-md-12 pl_list">
                                        <ul >
                                            <li><img src="./images/point.png" className="points_style" /><a href="#">Salary Advance Upfront</a></li>
                                            <li><img src="./images/point.png" className="points_style" /><a href="#">Salary Advance Regular </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-3 col-md-offset-1">
                                        <h3 className="choose_portfolio_head" style={{ color: "white" }}>Select Segment</h3>
                                        <select value={this.state.segment} className="form-control" title="Select Segment" name="segment" onChange={this.handleChange} required>
                                            <option value="salaried">Salaried</option>
                                            <option value="self_employed">Self Employed</option>


                                        </select>
                                    </div>

                                    <div className="col-md-3 col-md-offset-4">
                                        <h3 className="choose_portfolio_head" style={{ color: "white" }}>Select Program</h3>
                                        <select value={this.state.program} className="form-control" title="Select Program" name="program" onChange={this.handleChange} required>
                                            <option value="Income+CIBIL">Income+CIBIL</option>
                                            <option value="Income">Income</option>
                                            <option value="CIBIL">CIBIL</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Car type">Car type</option>
                                      </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-10 col-md-offset-1 form_part">



                                        <br />
                                        <div className="row">
                                            {this.state.segment == "salaried" ? <Salaried userval = {user} programval = {this.state.program}/> : <SelfEmployed userval = {user} programval = {this.state.program}/>}
                                        </div>

                                    </div></div>
                            </div>

                            <br />
                        </div>
                    </div>
                </div>

                <div className="portfolio_blue_part">
                    <div className="container-fluid">
                        <div className="row ">
                            <h3 className="portfolio_contact_text text-center">Contacts</h3>
                            <hr className="hr_line1" />
                            <div className="col-sm-4 ">
                                <p className="customer_text">Customer Service</p>
                                <div>
                                    <img src="./images/manIcon.png" className="img-responsive man_icon" />
                                    <p className="portfolio_support_text">Support Team</p>
                                </div>
                                <div style={{ marginTop: 12 + 'px' }}>
                                    <img src="./images/phone.png" className="img-responsive man_icon" />
                                    <p className="portfolio_support_text">1-800-555-555</p>
                                </div>
                            </div>
                            <div className="col-sm-4 ">
                                <p className="customer_text">Sales</p>
                                <div>
                                    <img src="./images/manIcon.png" className="img-responsive man_icon" />
                                    <p className="portfolio_support_text">Support Team</p>
                                </div>
                                <div style={{ marginTop: 12 + 'px' }}>
                                    <img src="./images/phone.png" className="img-responsive man_icon" />
                                    <p className="portfolio_support_text">1-800-555-555</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <img src="./images/logo.png" className="img-responsive footer_logo" />
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

export default withRouter(connect(mapStateToProps)(applicationPage));