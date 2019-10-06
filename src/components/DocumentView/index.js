import React from "react";
import femaleLicenseStock from "assets/femaleLicenseStock.jpg"
import maleLicenseStock from "assets/maleLicenseStock.jpg"
import passportClipart from "assets/passportClipart.jpg"
import socialSecurityCartoon from "assets/socialSecurityCartoon.png"
import birthCertificateCartoon from "assets/birthCertificateCartoon.png"
import "./style.sass"

const typeToImage = {
    driver: femaleLicenseStock,
    passport: passportClipart,
    birth: birthCertificateCartoon,
    social: socialSecurityCartoon,
    driverMale: maleLicenseStock
}

export default class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [
                {
                    type: "driver"
                },
                {
                    type: "passport"
                },
                {
                    type: "birth"
                },
                {
                    type: "social"
                },
                {
                    type: "driverMale"
                }
            ]
        }
    }
    render() {
        return(
            <div className="document-view">
                <div className="scroll">
                    {this.state.documents.map(document => <img src={typeToImage[document.type]}/>)}
                </div>
            </div>
        );
    }
}