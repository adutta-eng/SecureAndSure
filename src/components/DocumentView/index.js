import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteDocument } from "util/firebase"
import { faUserShield, faPlus, fas, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Paper, Fab, CardMedia, Card, CardContent, Typography, ListItem, List, ListItemText, ListItemAvatar, Avatar, Button } from '@material-ui/core';
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
                    {this.props.documents.map((document, index)=> (
                        <Card className="document">
                            <Button onClick={() => deleteDocument(this.props.keys[index])}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </Button>
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
                            <a href="/add">
                                <Fab className="add-button" aria-label="add">
                                    <FontAwesomeIcon icon = {faPlus}/>
                                </Fab>
                            </a>
                        </Paper>
                    </Card>
                </div>
            </div>
        );
    }
}