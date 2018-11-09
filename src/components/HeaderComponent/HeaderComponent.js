import React from 'react';
export class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="container-fluid partner_background">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <p className="partner_text_head"> {this.props.header}</p>
                            <hr className="hr_line" />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
