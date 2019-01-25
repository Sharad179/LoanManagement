import React from 'react';
import { withRouter } from 'react-router-dom';

// import ReactDOM, { render } from 'react-dom';
import "./WalletFinancePage.css";
import { getStates, getRegions, getCities, getBranches, getPartners } from '../Datamanager/Datamanager';

import { connect } from 'react-redux';
import $ from 'jquery';






// import { userActions } from '../_actions';
export class WalletDashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId:"portfolioStats",
            showLoader: false,
            xValue: [],
            yAxisLabelPortfolio: [{
                title: {
                    text: 'Disbursments and OD Amount',
                },
                labels: {
                    format: '{value}',
                },
                allowDecimals: false
            }, {
                title: {
                    text: '# of Contracts and WIRR',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                allowDecimals: false,
                opposite: true
            }],
            seriesPortfolio: [],
            yAxisLabelSourcingQuality: {
                title: {
                    text: 'Sourcing Parameters',
                }
            },
            seriesSourcingQuality: [], yAxisLabelCreditUnderwriting: [{
                title: {
                    text: 'Amount Delinquent',
                },
                labels: {
                    format: '{value}',
                },
                allowDecimals: false
            }, {
                title: {
                    text: 'Percent Delinquent',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                allowDecimals: false,
                opposite: true
            }],
            seriesCreditUnderwriting: [], RegionArray: [], StateArray: [], CityArray: [], BranchArray: [], PartnerArray: [], ResponseArray: [],
            regionValue: '', stateValue: '', cityValue: '', branchValue: '', partnerValue: '', RegionDisabled: false,
            StateDisabled: true, CityDisabled: true, BranchDisabled: true, PartnerDisabled: true

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSidebarClick = this.handleSidebarClick.bind(this);

    }
    componentDidMount() {

        document.body.style.background = "#f4f8fb";
        var _this = this;
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/regionList', {

        }).then(function (handleResponse) {
            return handleResponse.json()
        }).then(function (user) {
            _this.setState({ ResponseArray: user, RegionArray: getRegions(user), StateArray: getStates(user, _this.state.regionValue), CityArray: getCities(user), BranchArray: getBranches(user) })
            // _this.callApiRag();

        })
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/partnerList', {

        }).then(function (handleResponse) {
            return handleResponse.json()
        }).then(function (user) {
            _this.setState({ PartnerArray: getPartners(user) })
            // _this.callApiRag();

        })
        // this.setState({ ResponseArray: RegionStateCityMapping, RegionArray: this.getRegions(RegionStateCityMapping), StateArray: this.getStates(RegionStateCityMapping, this.state.regionValue), CityArray: this.getCities(RegionStateCityMapping), BranchArray: this.getBranches(RegionStateCityMapping), PartnerArray: this.getPartners(PartnersArray)})
        $('#portfolioStats').addClass('active');

        this.callApiPortfolio(this.state.currentId);

    }
   


   
    areaChartFunc(titleval, idval, xval, ylabel, seriesval) {
        var _this = this;
        var options = {
            title: {
                text: titleval
            },
            xAxis: {
                categories: xval,
                crosshair: true
            },
            yAxis: ylabel,
            allowDecimals: false,
            tooltip: {
                shared: true
            },
            series: seriesval
        }
        Highcharts.chart(idval, options)
    }

    callApiPortfolio(panel) {
        var _this = this;
        let params = "";
        if (this.state.partnerValue) {
            params = params + "Partner=" + this.state.partnerValue;
        }
        if (this.state.regionValue) {
            params = params + "&Region=" + this.state.regionValue;
        }
        if (this.state.stateValue) {
            params = params + "&State=" + this.state.stateValue;
        }
        if (this.state.cityValue) {
            params = params + "&City=" + this.state.cityValue;
        }
        if (this.state.branchValue) {
            params = params + "&Branch=" + this.state.branchValue;
        }
       
        _this.setState({showLoader:true})
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/api/portfolioTrend?' + params, {

        }).then(function (handleResponse) {
            return handleResponse.json()
        }).then(function (user) {
            _this.setState({showLoader:false})
            _this.setState({
                xValue: user.name, seriesPortfolio: [{
                    name: '# of Contracts',
                    type: 'spline',
                    color: 'black',
                    yAxis: 1,
                    data: user.NoOfContract
                }, {
                    name: 'Disbursement',
                    type: 'column',
                    color: 'rgb(51, 181, 229,0.4)',
                    data: user.LoanAmount
                },
                {
                    name: 'OD amount',
                    type: 'column',
                    color: 'rgb(255, 0, 0,0.6)',
                    data: user.OD
                },
                {
                    name: 'Total Outstanding',
                    type: 'column',
                    color: 'rgb(0,255,0,0.6)',
                    data: user.OutstandingAmount
                }
            ],
                seriesSourcingQuality: [
                    
                    {
                        name: 'Delq 30+ mob <4',
                        type: 'spline',
                        color: 'rgb(51, 181, 229)',
                        data: user.Delq30LessThan4
                    },
                    {
                        name: 'Delq 60+ mob <=12',
                        type: 'spline',
                        color: 'rgb(0, 100, 81)',
                        data: user.Delq60LessThan12
                    },
                    {
                        name: 'Delq 90+ mob <=12',
                        type: 'spline',
                        color: 'rgb(100, 200, 81)',
                        data: user.Delq90LessThan12
                    },
                    
                {
                    name: 'WIRR',
                    type: 'column',
                    color: 'rgb(120, 200, 81,0.6)',
                    data: user.WIRR
                }
                ], seriesCreditUnderwriting: [{
                    name: 'Delq 30+ (Count)',
                    type: 'spline',
                    yAxis:1,
                    color: 'rgb(255, 100, 100)',
                    data: user.Delq30Count
                },{
                    name: 'Delq 30+ (Amount)',
                    type: 'column',
                    
                    color: 'rgb(255, 100,100, 0.8)',
                    data: user.Delq30Amount
                }, 
                {
                    name: 'Delq 60+ (Count)',
                    type: 'spline',
                    yAxis:1,
                    color: 'rgb(220, 140, 200)',
                    data: user.Delq60Count
                },
                {
                    name: 'Delq 60+ (Amount)',
                    type: 'column',
                    
                    color: 'rgb(220, 140, 200, 0.8)',
                    data: user.Delq60Amount
                },
                {
                    name: 'Delq 90+ (Count)',
                    type: 'spline',
                    yAxis:1,
                    color: 'rgb(120, 150, 140)',
                    data: user.Delq90Count
                },{
                    name: 'Delq 90+ (Amount)',
                    type: 'column',
                    color: 'rgb(120, 150, 140, 0.8)',
                    data: user.Delq90Amount
                }
            ]

            }, function () {
                if (panel == "portfolioStats") {
                    this.areaChartFunc("Portfolio Statistics", 'retrascore1', this.state.xValue, this.state.yAxisLabelPortfolio, this.state.seriesPortfolio)
                }
                else if (panel == "sourcingQuality") {
                    this.areaChartFunc("Sourcing Quality", 'retrascore1', this.state.xValue, this.state.yAxisLabelSourcingQuality, this.state.seriesSourcingQuality);
                }
                else if (panel == "creditUnderWriting") {
                    this.areaChartFunc("Credit Underwriting", 'retrascore1', this.state.xValue, this.state.yAxisLabelCreditUnderwriting, this.state.seriesCreditUnderwriting);
                }
                
            })
        })

    }

    handleSidebarClick(e) {
        $('.btn-primary').removeClass('active');
        $('#' + e.target.id).addClass('active');
        this.setState({"currentId":e.target.id})
        this.callApiPortfolio(e.target.id)
    }
    handleChange(e) {
        if (e.target.name == 'Partner') {
            
            
            this.setState({ partnerValue:e.target.value,RegionDisabled:false,StateDisabled: true, BranchDisabled: true, CityDisabled: true, RegionArray: getRegions(this.state.ResponseArray) },function(){
                this.callApiPortfolio(this.state.currentId);
            })
            
        }
        if (e.target.name == 'Region') {
            
            this.state.stateValue = '';
            this.state.cityValue = '';
            this.state.branchValue = '';
            
            this.setState({ regionValue:e.target.value,StateDisabled: false, BranchDisabled:true,  CityDisabled: true, StateArray: getStates(this.state.ResponseArray, e.target.value) },function(){
                this.callApiPortfolio(this.state.currentId);
            })
        }
        if (e.target.name == 'State') {
            
            this.state.cityValue = '';
            this.state.branchValue = '';
            
            this.setState({ stateValue:e.target.value,CityDisabled: false, BranchDisabled: true,  CityArray: getCities(this.state.ResponseArray, this.state.regionValue, e.target.value) },function(){
                this.callApiPortfolio(this.state.currentId);
            })

        }
        if (e.target.name == 'City') {
            
            this.state.branchValue = '';
            
            this.setState({ cityValue:e.target.value, BranchDisabled: false, BranchArray: getBranches(this.state.ResponseArray, this.state.regionValue, this.state.stateValue, e.target.value) },function(){
                this.callApiPortfolio(this.state.currentId);
            })
        }
        if (e.target.name == 'Branch') {
            
            
            this.setState({ branchValue:e.target.value },function(){
                this.callApiPortfolio(this.state.currentId);
            })
        }
        
        console.log(e.target.id);
        





    }
    render() {
        const { user, users } = this.props;

        return (
            <div>
                <form>
                    <div className="row" style={{ marginTop: "40px" }}>
                    <div className="col-md-2 offset-md-1">
                            <select className="form-control" onChange={this.handleChange} value={this.state.partnerValue} name="Partner">
                                <option value="">All Partners</option>
                                {this.state.PartnerArray.map((head, index) => {
                                    return <option value={head} key={index}>{head}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={this.handleChange} value={this.state.regionValue} name="Region" disabled={this.state.RegionDisabled}>
                                <option value="">All Regions</option>
                                {this.state.RegionArray.map((head, index) => {
                                    return <option value={head} key={index}>{head}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={this.handleChange} value={this.state.stateValue} name="State" disabled={this.state.StateDisabled}>
                                <option value="">All States</option>
                                {this.state.StateArray.map((head, index) => {
                                    return <option value={head} key={index}>{head}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={this.handleChange} value={this.state.cityValue} name="City" disabled={this.state.CityDisabled}>
                                <option value="">All Cities</option>
                                {this.state.CityArray.map((head, index) => {
                                    return <option value={head} key={index}>{head}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={this.handleChange} value={this.state.branchValue} name="Branch" disabled={this.state.BranchDisabled}>
                                <option value="">All Branch</option>
                                {this.state.BranchArray.map((head, index) => {
                                    return <option value={head} key={index}>{head}</option>
                                })}
                            </select>
                        </div>
                       



                    </div>
                </form>
                <div className="row mt-4 mb-4">
                    <div className="col-md-2">
                        <div className="row ml-2 mt-4">
                            <div className="col-md-2">

                                <button type="button" className="btn btn-primary active" id="portfolioStats" style={{ width: "200px" }} onClick={this.handleSidebarClick}>
                                    Portfolio Statistics </button>


                            </div>
                        </div>
                        <div className="row ml-2 mt-4">
                            <div className="col-md-2">

                                <button type="button" className="btn btn-primary" id="sourcingQuality" style={{ width: "200px" }} onClick={this.handleSidebarClick}>
                                    Sourcing Quality</button>


                            </div>
                        </div>
                        <div className="row ml-2 mt-4">
                            <div className="col-md-2">

                                <button type="button" className="btn btn-primary" style={{ width: "200px" }} id="creditUnderWriting" onClick={this.handleSidebarClick}>
                                    Credit Underwriting </button>


                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-8 offset-md-1">

                        <div className="card card-cascade narrower">
                            <div>
                                <div className="view view-cascade gradient-card-header blue-gradient">
                                    <h3 className="h4-responsive" style={{ padding: "10px", color: "white" }}>
                                        <i className="fa fa-bar-chart"></i>&nbsp;Portfolio Statistics</h3></div></div>
                            <div className="card-body card-body-cascade">

                                {this.state.showLoader ? <div className="loader"></div> : <div id='retrascore1'></div>}


                            </div>

                        </div>
                        
                    </div>
                </div>


            </div>




        );
    }
}

