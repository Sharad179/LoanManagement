import React from 'react';
import { withRouter } from 'react-router-dom';

// import ReactDOM, { render } from 'react-dom';
import "./WalletFinancePage.css";
import { connect } from 'react-redux';
import $ from 'jquery';
import {WalletHeatMapPage} from './WalletHeatMap';
import {WalletDashboardPage} from './WalletDashboard';






// import { userActions } from '../_actions';
class WalletFinancePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPortfolio: true, showDashboard: false

    }
    this.handleToggle = this.handleToggle.bind(this);
}
    componentDidMount() {

        document.body.style.background = "#f4f8fb";
    }
        
    handleToggle(e) {

        $('.btn').removeClass('active');
        
      
        if (e.target.value == "Heatmap") {
            
            this.setState({ showPortfolio: true, showDashboard: false })
            $('.btn-outline-info').addClass('active');
        }
        else {
           
            this.setState({ showDashboard: true, showPortfolio: false })
            $('.btn-outline-warning').addClass('active');


        }


    }
   

    
    render() {
        const { user, users } = this.props;

        return (
            <div>
                <div className="container-fluid" style={{ padding: "20px", backgroundColor: "#b3d9ff" }}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <p className="partner_text_head_small">Portfolio Dashboard</p>
                            <hr className="hr_line" />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-5"></div>
                    <div className="col-md-4">
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-info active" value="Heatmap" id="HeatMapBtn" onClick={this.handleToggle}>Heatmap</button>
                            <button type="button" className="btn btn-outline-warning" value="Dashboard" id="DashboardBtn" onClick={this.handleToggle}>Dashboard</button>

                        </div>
                    </div>
                </div>
                {this.state.showPortfolio?<WalletHeatMapPage/>:<WalletDashboardPage/>}
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

export default withRouter(connect(mapStateToProps)(WalletFinancePage));