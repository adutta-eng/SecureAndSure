import React from "react";
import femaleLicenseStock from "assets/femaleLicenseStock.jpg"
import maleLicenseStock from "assets/maleLicenseStock.jpg"
import passportClipart from "assets/passportClipart.jpg"
import socialSecurityCartoon from "assets/socialSecurityCartoon.png"
import birthCertificateCartoon from "assets/birthCertificateCartoon.png"
import birthCertificateActual from "assets/birthCertificateActual.jpg"
import actualFemaleLicense from "assets/actualFemaleLicense.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import { CardMedia, Card, CardContent, Typography, ListItem, List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
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
                    type: "Driver's License",
                    img: actualFemaleLicense,
                    parsedInfo: [
                        { NAME: "JANE Q" },
                        { ISS: "05/01/2016" },
                        { EXP: "11/14/2020" },
                    ],
                },
                {
                    type: "Birth Certificate",
                    img: birthCertificateActual,
                    parsedInfo: [
                        { NAME: "EXAMPLE" },
                        { SEX: "FEMALE" },
                        { DOB: "SEPTEMBER 14, 1990" }
                    ]
                },
                {
                    type: "Passport",
                    parsedInfo: [
                        { NAME: "EXAMPLE" },
                        { SEX: "FEMALE" },
                        { DOB: "SEPTEMBER 14, 1990" }
                    ]
                },
                {
                    type: "Social Security Card",
                    parsedInfo: [
                        { NAME: "EXAMPLE" },
                        { SEX: "FEMALE" },
                        { DOB: "SEPTEMBER 14, 1990" }
                    ]
                },
                {
                    type: "driverMale",
                    parsedInfo: [
                        { NAME: "EXAMPLE" },
                        { SEX: "FEMALE" },
                        { DOB: "SEPTEMBER 14, 1990" }
                    ]
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
                <div className="docs">
                    {this.state.documents.map(document => (
                        <Card className="document">
                            <CardMedia className="document-photo">
                                <img src={document.img}></img>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {document.type}
                                </Typography>
                                <List className="details">
                                    {document.parsedInfo.map(item => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FontAwesomeIcon icon={faUserShield} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={Object.entries(item)[0][1]} secondary={Object.entries(item)[0][0]}></ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/* <div className="scroll">
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
                } */}
            </div>
        );
    }
}