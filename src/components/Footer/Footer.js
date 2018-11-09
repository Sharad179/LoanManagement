import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Footer extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <div>
                 <div className="container-fluid footer_part text-center">
                    <p className="copy_text">© Copyrights Retra Ventures Pvt. Ltd.</p>
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

export default connect(mapStateToProps)(Footer);;