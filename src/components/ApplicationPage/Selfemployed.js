import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap';
export class SelfEmployed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "pan": "",
            "employerCompany": "",
            "offStabilty": "",
            "loanBand": "",
            "tenure": "",
            "dateOfBirth": "1992-12-31",
            "residOffStabilty": "",
            "maritalStatus": "Single",
            "gender": "Female",
            "customerType": "Self-employed - professional",
            "residenceType": "Owned - Self",
            "educationalLevel": "Post graduate/Professional",
            "cibilScore": "",
            "netMonthlyIncome": "",
            "itrReturn": "",
            "typeOfCreditCard": "Silver",
            "creditCardIssuedBank": "American Express",
            "segmentOfCar": "B",
            "carOwnership": "",
            "carMaker": "",
            "carModel": "",
            "numberOfDependents": "",
            "spouseWorking": "Yes",
            "spouseWorkType": "Salaried",
            "incomeVariant": "Income -  standalone",
            "chequeBounce": "Zero cheque bounce",
            "abb": "> 1 times < 1.5 times",
            "foir": "",
            "employerCompanyCategory": "CAT A",
            "purposeOfLoan": "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    getAge(birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
    handleDateOfBirthValidation(birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970) >= 21 ? true : false;
    }
    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }
    handleSubmit(event) {

        event.preventDefault();
        const customer = this.state;
        const { user, users } = this.props;
        customer["loanBand"] = parseInt(customer["loanBand"])
        customer["tenure"] = parseInt(customer["tenure"])
        customer["age"] = parseInt(customer["age"])
        customer["residOffStabilty"] = parseInt(customer["residOffStabilty"])
        customer["cibilScore"] = parseInt(customer["cibilScore"])
        customer["netMonthlyIncome"] = parseInt(customer["netMonthlyIncome"])
        customer["itrReturn"] = parseInt(customer["itrReturn"])
        customer["numberOfDependents"] = parseInt(customer["numberOfDependents"])
        customer["foir"] = parseFloat(customer["foir"])
        customer["userName"] = this.props.userval.userName;
        customer["type"] = "";
        customer["token"] = this.props.userval.token;
        var dobArray = customer.dateOfBirth.split('-');
        customer["age"] = this.getAge(new Date(dobArray[0], dobArray[1], dobArray[2]));
        localStorage.setItem("name", customer.name);
        localStorage.setItem("age", customer.age);
        localStorage.setItem("pan", customer.pan);
        localStorage.setItem("loanBand", customer.loanBand);
        localStorage.setItem("tenure", customer.tenure);
        localStorage.setItem("residOffStabilty", customer.residOffStabilty);
        localStorage.setItem("maritalStatus", customer.maritalStatus);
        localStorage.setItem("gender", customer.gender);
        localStorage.setItem("netMonthlyIncome", customer.netMonthlyIncome);
        localStorage.setItem("cibilScore", customer.cibilScore);
        console.log(customer);
        var _this = this
        if (!this.handleDateOfBirthValidation(new Date(dobArray[0], dobArray[1], dobArray[2]))) {
            alert("Age must be more than 21 years");
        }
        else {

            localStorage.setItem("customerObj", JSON.stringify(customer));
            localStorage.setItem("programval", this.props.programval)
            window.location.href = "/dashboard";
        }


    }
    render() {
        return (
            <div className="card card-signin my-5" style={{ backgroundColor: '#e0e9cc' }}>
                <div className="card-body">
                    <h5 className="card-title text-center choose_portfolio_head"><b><u>Application Form</u></b></h5>

                    <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalLoanAmount">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>Customer Name:</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="name" value={this.state.name} onChange={this.handleChange} pattern="[A-Za-z\s]{1,100}" required />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalMonthlyObligation">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>PAN Number</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="pan" value={this.state.pan} onChange={this.handleChange} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" required />
                                </Col>
                            </FormGroup></Col>

                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalLoanAmount">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>Loan Band</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="loanBand" value={this.state.loanBand} onChange={this.handleChange} pattern="\d{1,15}" required />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalMonthlyObligation">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Tenure</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="tenure" value={this.state.tenure} onChange={this.handleChange} pattern="\d{1,15}" required />
                                </Col>
                            </FormGroup></Col>

                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalCompanyName">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>Date Of Birth:</b> </Col>
                                    <Col sm={12}>
                                        <FormControl type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} required />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalCompanyName">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>ITR Return:</b> </Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="itrReturn" value={this.state.itrReturn} onChange={this.handleChange} pattern="\d{1,15}" required />
                                    </Col>
                                </FormGroup>
                            </Col>


                        </Row>
                        <Row>


                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalMobileNum">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b  >Employer Company Category</b></Col>
                                    <Col sm={12}>
                                        <select value={this.state.employerCompanyCategory} className="col-sm-12 form-control" title="employerCompanyCategory" name="employerCompanyCategory" onChange={this.handleChange} required>
                                            <option value="CAT A"> CAT A</option>
                                            <option value="CAT B">CAT B</option>
                                            <option value="CAT C">CAT C</option>
                                            <option value="Other public ltd. Companies">Other public ltd. Companies</option>
                                            <option value="Partnership firms/Pvt. Ltd">Partnership firms/Pvt. Ltd</option>
                                        </select>

                                    </Col>
                                </FormGroup>


                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>Residential Stability(in Months)</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="residOffStabilty" value={this.state.residOffStabilty} onChange={this.handleChange} pattern="\d{1,3}" required />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formHorizontalMobileNum">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>Office Stability(in Months)</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="offStabilty" value={this.state.offStabilty} onChange={this.handleChange} pattern="\d{1,3}" required />
                                    </Col>
                                </FormGroup>


                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formMarital">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b>Marital Status</b></Col>
                                    <Col sm={12}>
                                        <select value={this.state.maritalStatus} className="col-sm-12 form-control" title="Marital Status" name="maritalStatus" onChange={this.handleChange} required>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                        </select>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>  <FormGroup controlId="formGender">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Gender</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.gender} className="col-sm-12 form-control" title="Gender" name="gender" onChange={this.handleChange} required>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            <Col md={6}>   <FormGroup controlId="formHorizontalDateOfBirth">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Customer Type</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.customerType} className="col-sm-12 form-control" title="Customer Type" name="customerType" onChange={this.handleChange} required>
                                        <option value="Salaried">Salaried</option>
                                        <option value="Self-employed - professional">Self-employed - professional</option>
                                        <option value="Self-employed - non-professional">Self-employed - non-professional</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                        </Row>

                        <Row>
                            <Col md={6}>  <FormGroup controlId="formHorizontalCompanyExp">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Residence type</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.residenceType} className="col-sm-12 form-control" title="Residence Type" name="residenceType" onChange={this.handleChange} required>
                                        <option value="Salaried">Owned - Self</option>
                                        <option value="Self-employed - professional">Owned - Parents</option>
                                        <option value="Self-employed - non-professional">Company provided</option>
                                        <option value="Rented">Rented</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            <Col md={6}> <FormGroup controlId="formEducationalLevel">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b> Educational Level/Years of Schooling</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.educationalLevel} className="col-sm-12 form-control" title="educationalLevele" name="educationalLevel" onChange={this.handleChange} required>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="General Graduate">General Graduate</option>
                                        <option value="Post graduate/Professional">Post graduate/Professional</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>

                        </Row>
                        <Row>
                            <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Number of Dependents</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="numberOfDependents" value={this.state.numberOfDependents} onChange={this.handleChange} pattern="\d{1,2}" required />
                                </Col>
                            </FormGroup></Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalOfficeAddress2">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Spouse Working Status</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.spouseWorking} className="col-sm-12 form-control" title="" name="spouseWorking" onChange={this.handleChange} required>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>
                            <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Spouse Working Type</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.spouseWorkType} className="col-sm-12 form-control" title="" name="spouseWorkType" onChange={this.handleChange} required>
                                        <option value="Salaried">Salaried</option>
                                        <option value="Self Employed">Self Employed</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalOfficeAddress2">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Income Variant</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.incomeVariant} className="col-sm-12 form-control" title="Income Variant" name="incomeVariant" onChange={this.handleChange} required>
                                        <option value="Income -  standalone"> Income -  standalone</option>
                                        <option value="Income with One Source">Income with One Source</option>
                                        <option value="Income with 2-3 Source">Income with 2-3 Source</option>
                                        <option value="Income with >3 Source">Income with >3 Source</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>
                            <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Purpose of Loan</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.purposeOfLoan} className="col-sm-12 form-control" title="Purpose of Loan" name="purposeOfLoan" onChange={this.handleChange} required>
                                        <option value="Vacation">Vacation/Holiday</option>
                                        <option value="Buying Large Consumer Durables like TV, Refrigerator, AC etc.">Buying Large Consumer Durables like TV, Refrigerator, AC etc.</option>
                                        <option value="Home Rennovation">Home Rennovation</option>
                                        <option value="Marriage">Marriage</option>
                                        <option value="Medical Emergency">Medical Emergency</option>
                                        <option value="Finance Children's Education">Finance Children's Education</option>
                                        <option value="Transferring an existing loan from another bank">Transferring an existing loan from another bank</option>
                                        <option value="Any other personal needs and contingencies">Any other personal needs and contingencies</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalOfficeAddress2">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Cheque bounces in last 12-mnths</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.chequeBounce} className="col-sm-12 form-control" title="chequeBounce" name="chequeBounce" onChange={this.handleChange} required>
                                        <option value="Zero cheque bounce">Zero cheque bounce</option>
                                        <option value="1 per 12 MOB track">1 per 12 MOB track</option>
                                        <option value="2 per 12 MOB track">2 per 12 MOB track</option>
                                        <option value=">2 per 12 MOB track">>2 per 12 MOB track</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>
                            <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Average Bank Balance</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.abb} className="col-sm-12 form-control" title="Abb" name="abb" onChange={this.handleChange} required>
                                        <option value=" > 2 times loan EMI"> Greater than 2 times</option>
                                        <option value=">1.5 times< 2 times">Greater than 1.5 times and Less than 2 times</option>
                                        <option value="> 1 times < 1.5 times">Greater than 1 time and Less than 1.5 times</option>
                                        <option value="> 0.5 times < 1 times">Greater than 0.5 times and Less than 1 times</option>
                                        <option value="< 0.5 times">Less than 0.5 times</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalOfficeAddress2">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Fixed obligation to income ration (FOIR)</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" value={this.state.foir} name="foir" onChange={this.handleChange} pattern="\d{1}\.\d{1}" required />
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>
                            <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Employer Company Name</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="employerCompany" maxLength="95" value={this.state.employerCompany} onChange={this.handleChange} pattern="[A-Za-z\s]{1,100}" required />
                                </Col>
                            </FormGroup></Col>
                            <Col md={6}><FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  > CIBIL score</b></Col>
                                <Col sm={12}>

                                    <FormControl type="text" name="cibilScore" value={this.state.cibilScore} onChange={this.handleChange} pattern="\d{3}" required />
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>
                            <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Net Monthly Income</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="netMonthlyIncome" value={this.state.netMonthlyIncome} onChange={this.handleChange} pattern="\d{1,100}" required />
                                </Col>
                            </FormGroup></Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalOfficeAddress2">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Type of credit card</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.typeOfCreditCard} className="col-sm-12 form-control" title="Type of Credit Card" name="typeOfCreditCard" onChange={this.handleChange} required>
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Others">Platinum/Titanium or any other higher cards</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                        </Row>

                        <Row>


                            <Col sm={6}>  <FormGroup controlId="formHorizontalState">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Credit Card issuing Bank/Institute</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.creditCardIssuedBank} className="col-sm-12 form-control" title="Credit Card Issuing Bank" name="creditCardIssuedBank" onChange={this.handleChange} required>
                                        <option value="Citi">Citi</option>
                                        <option value="American Express">American Express</option>
                                        <option value="Kotak">Kotak</option>
                                        <option value="HDFC Bank">HDFC Bank</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            {/* <Col sm={6}>  <FormGroup controlId="formHorizontalState">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Purpose of Loan</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="purposeOfLoan" value={this.state.purposeOfLoan} onChange={this.handleChange} pattern="[A-Za-z\s]{1,100}" required />
                                </Col>
                            </FormGroup></Col> */}
                            <Col sm={6}> <FormGroup controlId="formHorizontalCity">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Segment of the car</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.segmentOfCar} className="col-sm-12 form-control" title="segmentOfCar" name="segmentOfCar" onChange={this.handleChange} required>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>


                            <Col sm={6}> <FormGroup controlId="formHorizontalCity">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Car Ownership (If any)</b></Col>
                                <Col sm={12}>
                                    <select value={this.state.carOwnership} className="col-sm-12 form-control" title="carOwnership" name="carOwnership" onChange={this.handleChange} required>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </Col>
                            </FormGroup></Col>
                            <Col sm={6}>  <FormGroup controlId="formHorizontalState">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b>Car Maker</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="carMaker" onChange={this.handleChange} value={this.state.carMaker} pattern="[A-Za-z\s]{1,100}" required />
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>

                            
                            <Col sm={6}> <FormGroup controlId="formHorizontalCity">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <b  >Car Model</b></Col>
                                <Col sm={12}>
                                    <FormControl type="text" name="carModel" onChange={this.handleChange} value={this.state.carModel} pattern="[A-Za-z0-9\s]{1,100}" required />
                                </Col>
                            </FormGroup></Col>
                        </Row>
                        <Row>

                        </Row>
                        <br />
                        <Row style={{ textAlign: "center" }}>
                            <div className="col-md-6 offset-md-3">
                                <FormGroup>
                                    <input type="submit" value="Submit" className="btn btn-warning" />
                                </FormGroup>
                            </div>
                        </Row>
                    </Form>

                </div>
            </div>
        );
    }


}
