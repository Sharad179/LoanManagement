import React from 'react';
import { withRouter } from 'react-router-dom';

// import ReactDOM, { render } from 'react-dom';
import "./WalletFinancePage.css";
import { getStates, getRegions, getCities, getBranches, getPartners, mapIdTitle } from '../Datamanager/Datamanager';
import { connect } from 'react-redux';
import $ from 'jquery';






// import { userActions } from '../_actions';
export class WalletHeatMapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false, showLoaderTable: false, showHeatMap: true, showDataGrid: false, RegionArray: [], StateArray: [], CityArray: [], BranchArray: [], PartnerArray: [], ResponseArray: [],
            AccountArray: [], regionValue: '', stateValue: '', cityValue: '', branchValue: '', partnerValue: '', RegionDisabled: false,
            StateDisabled: true, CityDisabled: true, BranchDisabled: true, PartnerDisabled: true, currentId: "NoOfContract"

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
        this.handleAnchorClick = this.handleAnchorClick.bind(this);

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
        $('#portfolioStatsMenu').addClass('show');
        $('#NoOfContract').addClass('active');
        this.getTreeMap(this.state.currentId);

    }

    getTreeMap(id) {
        this.setState({ currentId: id, showDataGrid: false, showHeatMap: true });
        console.log("id value", id);
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

        document.getElementById('retrascore10').innerHTML = '';
        _this.setState({ showLoader: true })
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/api/portfolioHeatMap?' + params, {

        }).then(function (handleResponse) {
            return handleResponse.json()
        }).then(function (user) {
            _this.setState({ showLoader: false })
            let heatmapdata = [];

            for (var i in user[id]) {
                let heatmapobj = { "name": "", "value": 0, "colorValue": 0, "actualValue": 0 }
                heatmapobj["name"] = Object.keys(user[id][i])[0];
                heatmapobj["value"] = parseFloat(user[id][i][heatmapobj["name"]]) + 20;
                heatmapobj["actualValue"] = parseFloat(user[id][i][heatmapobj["name"]]);
                if (id == "NoOfContract" || id == 'LoanAmount' || id == 'Od' || id == 'OutstandingAmount' || id == 'WIRR' || id == 'NoOfContractMonthlyList') {
                    heatmapobj["colorValue"] = (heatmapobj["value"] >= 19.9 && heatmapobj["value"] <= 20.05) ? 0.5 : heatmapobj["value"] > 20.05 ? 1 : 0;
                }
                else {
                    heatmapobj["colorValue"] = heatmapobj["value"] > 20.05 ? 0 : heatmapobj["value"] < 20.05 && heatmapobj["value"] > 19.95 ? 0.5 : 1;
                }

                heatmapdata.push(heatmapobj);
            }
            console.log(heatmapdata);
            Highcharts.chart('retrascore10', {
                colorAxis: {
                    stops: [
                        [0, 'red'],
                        [0.5, '#FFBF00'],
                        [1, 'green'],

                    ],
                    min: 0,
                    max: 1
                },
                plotOptions: {
                    series: {
                        events: {
                            click: function (event) {
                                if (!_this.state.regionValue) {
                                    _this.setState({ regionValue: event.point.name, StateDisabled: false, BranchDisabled: true, CityDisabled: true, StateArray: getStates(_this.state.ResponseArray, event.point.name) })
                                    _this.getTreeMap(id)
                                }
                                else if (_this.state.regionValue && !_this.state.stateValue) {

                                    _this.setState({ stateValue: event.point.name, CityDisabled: false, BranchDisabled: true, CityArray: getCities(_this.state.ResponseArray, _this.state.regionValue, event.point.name) })
                                    _this.getTreeMap(id)
                                }
                                else if (_this.state.stateValue && !_this.state.cityValue) {

                                    _this.setState({ cityValue: event.point.name, BranchDisabled: false, BranchArray: getBranches(_this.state.ResponseArray, _this.state.regionValue, _this.state.stateValue, event.point.name) })
                                    _this.getTreeMap(id)
                                }
                                else if (_this.state.stateValue && !_this.state.branchValue) {


                                    _this.setState({ branchValue: event.point.name })
                                    _this.getDataGrid(id)
                                }

                            }
                        }
                    }
                },
                tooltip: {
                    formatter: function () {
                        return this.point.name + ':<b>' + this.point.actualValue;
                    }
                },
                series: [{
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                    data: heatmapdata,


                }],
                title: {
                    text: mapIdTitle[id]
                }
            });
        })
    }


    getDataGrid(id) {
        this.setState({ currentId: id, showDataGrid: true, showHeatMap: false });
        console.log("id value", id);
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


        _this.setState({ showLoaderTable: true })
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/api/portfolioHeatMap?' + params, {

        }).then(function (handleResponse) {
            return handleResponse.json()
        }).then(function (user) {
            _this.setState({ showLoaderTable: false, AccountArray: user });
        })

    }


    handleSidebarClick(e) {

        $('.collapse').removeClass('show');
        $('#' + e.target.id).addClass('show');
        $('.dropdown-item').removeClass('active');
        // console.log(($($("#"+e.target.id).attr('data-target')+":first-child")).attr("id"));
        $("#" + $($($("#" + e.target.id).attr('data-target')).children(":first")).attr('id')).addClass('active');
        $('.btn-primary').removeClass('active');
        $('#' + e.target.id).addClass('active');
        if (this.state.branchValue) {
            this.getDataGrid($($($("#" + e.target.id).attr('data-target')).children(":first")).attr('id'))
        } else {
            this.getTreeMap($($($("#" + e.target.id).attr('data-target')).children(":first")).attr('id'))
        }


    }
    handleAnchorClick(ev) {
        $('.dropdown-item').removeClass('active');
        $('#' + ev.target.id).addClass('active');
        if (this.state.branchValue) {
            this.getDataGrid(ev.target.id)
        }
        else {
            this.getTreeMap(ev.target.id)
        }
    }

    handleChange(e) {
        if (e.target.name == 'Partner') {


            this.setState({ partnerValue: e.target.value }, function () {
                if (this.state.branchValue) {
                    this.getDataGrid(this.state.currentId)
                }
                else {
                    this.getTreeMap(this.state.currentId)
                }
            })

        }
        if (e.target.name == 'Region') {



            this.setState({ regionValue: e.target.value, showHeatMap: true, showDataGrid: false, stateValue: '', cityValue: '', branchValue: '', StateDisabled: false, BranchDisabled: true, CityDisabled: true, StateArray: getStates(this.state.ResponseArray, e.target.value) }, function () {
                this.getTreeMap(this.state.currentId)
            })
        }
        if (e.target.name == 'State') {



            this.setState({ stateValue: e.target.value, showHeatMap: true, showDataGrid: false, cityValue: '', branchValue: '', CityDisabled: false, BranchDisabled: true, CityArray: getCities(this.state.ResponseArray, this.state.regionValue, e.target.value) }, function () {
                this.getTreeMap(this.state.currentId)
            })

        }
        if (e.target.name == 'City') {



            this.setState({ cityValue: e.target.value, showHeatMap: true, showDataGrid: false, branchValue: '', BranchDisabled: false, BranchArray: getBranches(this.state.ResponseArray, this.state.regionValue, this.state.stateValue, e.target.value) }, function () {
                this.getTreeMap(this.state.currentId)
            })
        }
        if (e.target.name == 'Branch') {


            this.setState({ branchValue: e.target.value }, function () {
                this.getDataGrid(this.state.currentId)
            })
        }

        console.log(e.target.id);
        ;





    }
    render() {
        const { user, users } = this.props;

        return (
            <div>


                <form>
                    <div className="row" style={{ marginTop: "40px" }}>
                        <div className="col-md-2 offset-md-1">
                            <select className="form-control" onChange={this.handleChange} value={this.state.partnerValue} name="Partner">
                                <option value="">All Partner</option>
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
                                <option value="">All Branches</option>
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
                                <div className="dropdown">
                                    <button type="button" className="btn btn-primary active" id="portfolioStats" style={{ width: "200px" }} data-toggle="collapse" data-target="#portfolioStatsMenu" onClick={this.handleSidebarClick}>
                                        Portfolio Statistics </button>
                                    <div className="collapse" id="portfolioStatsMenu">
                                        <a className="dropdown-item" id="NoOfContract" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}># Total Contract</a>
                                        <a className="dropdown-item" id="OutstandingAmount" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Total Outstanding Amount</a>
                                        <a className="dropdown-item" id="NoOfContractMonthlyList" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Monthly Contract Disbursed</a>

                                        <a className="dropdown-item" id="LoanAmount" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Disbursement Amount</a>
                                        <a className="dropdown-item" id="Od" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Overdue Amount</a>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ml-2 mt-4">
                            <div className="col-md-2">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-primary" data-toggle="collapse" id="sourcingQuality" style={{ width: "200px" }} data-target="#demo2" onClick={this.handleSidebarClick}>
                                        Sourcing Quality</button>
                                    <div id="demo2" className="collapse">

                                        <a className="dropdown-item" id="Delq30LessThan4" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 30+ mob Less than 4</a>
                                        <a className="dropdown-item" id="Delq60LessThan12" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 60+ mob Less than or equal to 12</a>
                                        <a className="dropdown-item" id="Delq90LessThan12" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 90+ mob Less than or equal to 12</a>
                                        <a className="dropdown-item" id="WIRR" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>WIRR</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ml-2 mt-4">
                            <div className="col-md-2">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-primary" style={{ width: "200px" }} id="creditUnderWriting" data-toggle="collapse" data-target="#demo3" onClick={this.handleSidebarClick}>
                                        Credit Underwriting </button>
                                    <div id="demo3" className="collapse">
                                        <a className="dropdown-item" id="Delq30Count" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 30+ (Count)</a>
                                        <a className="dropdown-item" id="Delq30Amount" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 30+ (Amount)</a>
                                        <a className="dropdown-item" id="Delq60Count" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 60+ (Count)</a>
                                        <a className="dropdown-item" id="Delq60Amount" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 60+ (Amount)</a>
                                        <a className="dropdown-item" id="Delq90Count" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 90+ (Count)</a>
                                        <a className="dropdown-item" id="Delq90Amount" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Delq 90+ (Amount)</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row ml-2 mt-4">
                            <div className="col-md-2">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-primary" style={{ width: "200px" }} id="collectionEfficincy" data-toggle="collapse" data-target="#demo4" onClick={this.handleSidebarClick}>
                                        Collection Indicators</button>
                                    <div id="demo4" className="collapse">
                                        <a className="dropdown-item" id="percent_normal_account" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>% Normal(# Account)</a>
                                        <a className="dropdown-item" id="percent_normal_value" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>% Normal(Value)</a>
                                        <a className="dropdown-item" id="bucket_zero_to_zeroplus" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Bucket 0 to 0+</a>
                                        <a className="dropdown-item" id="bucket_three_to_threeplus" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Bucket 3 to 3+</a>
                                        <a className="dropdown-item" id="bucket_six_to_sixplus" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>Bucket 6 to 6+</a>
                                        <a className="dropdown-item" id="ncl_percent" style={{ cursor: "pointer" }} onClick={this.handleAnchorClick}>NCL%</a>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>

                    <div className="col-md-8 offset-md-1">

                        {this.state.showHeatMap ? <div className="card-body card-body-cascade">

                            {this.state.showLoader ? <div className="loader"></div> : <div id='retrascore10'></div>}


                        </div> : <div className="card">
                                <div className="card-header bg-primary text-white">Account Summary</div>

                                <div className="card-body">
                                    {this.state.showLoaderTable ? <div className="loaderTable"></div> : <div className="table-responsive">

                                        <table className="table table-hover" style={{ overflow: "auto", whiteSpace: "nowrap" }}>
                                            <tbody>

                                                {this.state.AccountArray.map((head, index) => {
                                                    return <tr key={index}>
                                                        {head.map((cell, index) => {
                                                            return (
                                                                <td key={"cell_" + index} style={{ textAlign: "center" }}>{cell}</td>
                                                            );
                                                        })}
                                                    </tr>
                                                }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>}
                                </div>
                            </div>}



                    </div>
                </div>
            </div>







        );
    }
}

