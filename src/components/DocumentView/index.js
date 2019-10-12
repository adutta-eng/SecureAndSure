import React from "react";
import femaleLicenseStock from "assets/femaleLicenseStock.jpg"
import maleLicenseStock from "assets/maleLicenseStock.jpg"
import passportClipart from "assets/passportClipart.jpg"
import socialSecurityCartoon from "assets/socialSecurityCartoon.png"
import birthCertificateCartoon from "assets/birthCertificateCartoon.png"
import birthCertificateActual from "assets/birthCertificateActual.jpg"
import actualFemaleLicense from "assets/actualFemaleLicense.jpg"
import { Paper, TableRow, TableHead, TableCell, TableBody, Table } from '@material-ui/core';
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
            clickedDocument: "",
            documents: [
                {
                    type: "driver",
                    img: actualFemaleLicense,
                    parsedInfo: [
                        { NAME: "JANE Q" },
                        { ISS: "05/01/2016" },
                        { EXP: "11/14/2020" },
                    ],
                },
                {
                    type: "birth",
                    img: birthCertificateActual,
                    parsedInfo: [
                        {NAME: "EXAMPLE"},
                        {SEX: "FEMALE"},
                        {DOB: "SEPTEMBER 14, 1990"}
                    ]
                },
                {
                    type: "passport",
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
    handleScrollClick(document) {
        this.setState({
            clickedDocument: document
        })
    }
    render() {
        return (
            <div className="document-view">
                <div className="scroll">
                    {this.state.documents.map(document => (
                        <img alt="Icon representing stored document"
                            onClick={() => this.handleScrollClick(document)}
                            src={typeToImage[document.type]} />
                    ))}
                </div>
                {this.state.clickedDocument &&
                    <div className="storedInfo">
                        <img src={this.state.clickedDocument.img}></img>
                        <Paper className="infoTable">
                            <Table>
                                <TableBody>
                                    {this.state.clickedDocument.parsedInfo.map(item => (
                                        <TableRow>
                                            <TableCell className="description">{Object.entries(item)[0][0]}</TableCell>
                                            <TableCell className="value">{Object.entries(item)[0][1]}</TableCell>
                                        </TableRow>
                                    )
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}