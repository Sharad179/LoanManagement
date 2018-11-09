import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions } from '../../actions/userActions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            
            <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-7 nopadding ">
                        <img src="./images/baloons.png" className="banner_img_ballons img-responsive" />
                        <div>
                            <h3 className="banner_head">
                                Experience State-of-the-art intelligence.
                </h3>
                            <p className="banner_text">
                                “Talior made to financial domain with scalable technologies and advanced analytices,
                                using dynamic and deployable interface.”
                </p>

                        </div>
                    </div>
                    <div className="col-md-1 nopadding">
                        <img src="./images/greenbaloons.png" className="img-responsive green_ballon" /></div>
                    <div className="col-xs-12  col-sm-6 col-md-4 login_img">
                        <div className="white_part">

                            <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-lg btn-primary btn-block text-uppercase">Login</button>
                                {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                
                            </div>
                        </form>

                        </div>

                    </div>

                </div>

            </div>

            <div className="light_background">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 box_style">
                            <img src="./images/graphics-scale.png" className="img-responsive icon_blue" />
                            <p className="icon_head">Applied Analytics</p>
                            <p className="icon_para">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the , when a
                                n unknown printer took a galley of type and
                    scrambled it to make a type specimen book. </p>
                            <p className="icon_para">but also the leap into electronic
                    typesetting, remaining essentially unchanglso the leap into elected.lso the leap into elect. </p>
                            <button className="btn-info more_btn">More</button>
                        </div>
                        <div className="col-sm-4 box_style">
                            <img src="./images/report (2).png" className="img-responsive icon_blue" />
                            <p className="icon_head">Dashboard & Reporting</p>
                            <p className="icon_para">Lorem Ipsum is simply dummy text of and industry.
                </p>
                            <p className="icon_para">n unknown printer took a galley of type and
                    scrambled it to make a type specimen book. </p>
                            <p className="icon_para">but also the leap into electronic
                    typesetting, remaining essentially unchanged. </p>
                            <button className="btn-info more_btn">More</button>

                        </div>
                        <div className="col-sm-4 ">
                            <img src="./images/titleicon.png" className="img-responsive  icon_blue_logo" />
                            <p className="icon_head"> About Platform</p>
                            <p className="icon_para">Lorem Ipsum is simply dummy text of and industry.

                                n unknown printer took a galley of type and
                    scrambled it to make a type specimen book. </p>
                            <p className="icon_para">but also the leap into electronic
                                typesetting, remaining essentially unchanged. but also the leap into electronic
                                typesetting, remaining essentially unchanged.but also the leap into electronic
                    typesetting, remaining essentially unchanged. </p>
                            <button className="btn-info more_btn">More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default withRouter(connect(mapStateToProps)(LoginPage)); 