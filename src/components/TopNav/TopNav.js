import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './TopNav.scss';


class TopNav extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-light navar_mystyle">



                    <a className="navbar-brand" href="#">
                        <img src="./images/logo.png" className="img-responsive logo_style" />
                    </a>

                    <div id="navbar" className="navbar-collapse collapse navigation_style">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><a className="nav-link" href="#">FEATURES </a></li>
                            <li className="nav-item"><a className="nav-link" href="#about">ADVANTAGE</a></li>
                            <li className="nav-item"><a className="nav-link" href="#speciality">DOMAIN</a></li>
                            <li className="nav-item"><a className="nav-link" href="#features">FEATURES </a></li>
                            <li className="nav-item"><a className="nav-link" href="#contact">CONTACT US </a></li>
                            <li className="nav-item"> <a className="nav-link"href="/login">LOGOUT</a></li>
                        </ul>
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

export default connect(mapStateToProps)(TopNav);;