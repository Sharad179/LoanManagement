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
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        
    }

    
    handleClick(event) {
        window.location.href = '/portfolio';

    }
   

    

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <div className="container-fluid partner_background">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <p className="partner_text_head"> Partners</p>
                            <hr className="hr_line" />
                        </div>
                    </div>
                </div>

                <div className="blue_banner">
                    <div className="container">

                        <div className="row partner_row_padding">
                            <div className="col-xs-12 col-sm-4">
                                <a href="#">
                                    <img src="../images/Edelweiss-Logo.jpg" className="img-responsive partner_style" onClick={this.handleClick}/>
                                </a>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <img src="" className="img-responsive" />
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <img src="" className="img-responsive" />
                            </div>
                        </div>

                        <div className="row partner_row_padding">
                            <div className="col-xs-12 col-sm-4">
                                <img src="" className="img-responsive" />
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <img src="" className="img-responsive" />
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <img src="" className="img-responsive" />
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