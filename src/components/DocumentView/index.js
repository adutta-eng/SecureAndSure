import React from "react";
import femaleLicenseStock from "assets/femaleLicenseStock.jpg"
import maleLicenseStock from "assets/maleLicenseStock.jpg"
import passportClipart from "assets/passportClipart.jpg"
import socialSecurityCartoon from "assets/socialSecurityCartoon.png"
import birthCertificateCartoon from "assets/birthCertificateCartoon.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield, faPlus, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { Paper, IconButton, Fab, CardMedia, Card, CardContent, Typography, ListItem, List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import "./style.sass"

export default class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedDocument: "",
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
                    {this.props.documents.map(document => (
                        <Card className="document">
                            <CardMedia className="document-photo">
                                <img src={document.image}></img>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {document.type}
                                </Typography>
                                <List className="details">
                                    {document.parsedInfo.map(item => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className="avatar">
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
                    <Card className="add-doc">
                        <Paper color= "text.primary" className="box">
                            <a href="https://secure-and-sur3.netlify.com/add">
                                <Fab color= "#3f51b5" aria-label="add">
                                    <FontAwesomeIcon icon = {faPlus}/>
                                </Fab>
                            </a>
                        </Paper>
                    </Card>
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