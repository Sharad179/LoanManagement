import React from 'react';

export class ContactComponent extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return(
        <div className="portfolio_blue_part">
            <div className="container-fluid">
                <div className="row ">
                    <h3 className="portfolio_contact_text text-center">Contacts</h3>
                    <hr className="hr_line1" />
                    <div className="col-sm-4 ">
                        <p className="customer_text">Customer Service</p>
                        <div>
                            <img src="./images/manIcon.png" className="img-responsive man_icon" />
                            <p className="portfolio_support_text">Support Team</p>
                        </div>
                        <div style={{ marginTop: 12 + 'px' }}>
                            <img src="./images/phone.png" className="img-responsive man_icon" />
                            <p className="portfolio_support_text">1-800-555-555</p>
                        </div>
                    </div>
                    <div className="col-sm-4 ">
                        <p className="customer_text">Sales</p>
                        <div>
                            <img src="./images/manIcon.png" className="img-responsive man_icon" />
                            <p className="portfolio_support_text">Support Team</p>
                        </div>
                        <div style={{ marginTop: 12 + 'px' }}>
                            <img src="./images/phone.png" className="img-responsive man_icon" />
                            <p className="portfolio_support_text">1-800-555-555</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <img src="./images/logo.png" className="img-responsive footer_logo" />
                    </div>

                </div>
            </div>
        </div>
        )
    }
}