import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './TopNav.scss';


class TopNavLogin extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <nav className="navbar navbar-default navar_mystyle">
                    <div className="container">
                        <div className="navbar-header ">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                                aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">
                                <img src="./images/logo.png" className="img-responsive logo_style" />
                            </a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse navigation_style ">
                            <ul className="nav navbar-nav ">
                                <li className="sliding-middle-out"><a href="#">FEATURES </a></li>
                                <li className="sliding-middle-out"><a href="#about">ADVANTAGE</a></li>
                                <li className="sliding-middle-out"><a href="#speciality">DOMAIN</a></li>
                                <li className="sliding-middle-out"><a href="#features">FEATURES </a></li>
                                <li className="sliding-middle-out"><a href="#contact">CONTACT US </a></li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
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

export default connect(mapStateToProps)(TopNavLogin);;