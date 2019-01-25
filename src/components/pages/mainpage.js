"use strict"

import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import ApplicationPage from '../ApplicationPage/ApplicationPage'
import DashboardPage from '../DashboardPage/DashboardPage'
import TopNav from '../TopNav/TopNav';
import TopNavLogin from '../TopNav/TopNavLogin';
import Footer from '../Footer/Footer';
import WalletFinancePage from '../WalletFinancePage/WalletFinancePage'

import 'bootstrap/dist/css/bootstrap.min.css';


class MainPage extends React.Component {
    render() {
        const LoginContainer = () => (
            <div>
                <TopNavLogin> </TopNavLogin>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={LoginPage} />
                <Footer />
            </div>
        )
        const DefaultContainer = () => (
            <div>
                <TopNav></TopNav>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/home" component={HomePage} />
                <Route path="/portfolio" component={ApplicationPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/walletFinance" component={WalletFinancePage} />
                <Footer />
            </div>
        )
        return (

            <div>
                <PrivateRoute path="/home" component={DefaultContainer} />
                <PrivateRoute path="/portfolio" component={DefaultContainer} />
                <Route path="/login" component={LoginContainer} />
                <PrivateRoute path="/dashboard" component={DefaultContainer} />
                <PrivateRoute path="/walletFinance" component={DefaultContainer} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(MainPage);