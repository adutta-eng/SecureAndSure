import React from "react";
import "./style.sass"
import { Paper, IconButton, Fab, CardMedia, Card, CardContent, Typography, Button, ListItem, List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

export default class AzureCameraUI extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            stream: null
        }
    }
    startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                // this.setState({
                //     stream
                // })
                this.video.srcObject=stream
                this.video.play()
            });
        }  
    }
    render() {
        return(
            <div className="cameraUI">
                <Paper className="heading">
                    <Typography className="top" variant="h2" component="header">
                        Add an Image
                    </Typography>
                </Paper>
                <div className="buttons">
                    <Card className="upload_existing">
                        <Button variant="contained" size="large" color="primary">
                            CHOOSE FILE
                        </Button>
                    </Card>
                    <Card className="snap_new">
                        <Button className="camera_button" variant="contained" size="large" color="primary" onClick = {()=>this.startCamera()}>
                            USE CAMERA
                        </Button>
                    </Card>
                </div>
                <video className="camera" ref={video => {this.video = video}}>

                </video>
                <video className="camera" ref={video => console.log(video)}>

                </video>
            </div>
        )
    }
}
