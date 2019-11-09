import React from "react";
import "./style.sass"
import { Paper, IconButton, Fab, CardMedia, Card, CardContent, Typography, Button, ListItem, List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import {process} from "./azure.js"
export default class AzureCameraUI extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            stream: null
        }
        this.canvasRef = React.createRef();
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
    snapPhoto() {
        const ctx = this.canvasRef.current.getContext('2d');
        ctx.drawImage(this.video, 0, 0, 640, 480);
        let imageData = this.canvasRef.current.toDataURL('image/jpeg');
        fetch(imageData).then(res => res.blob()).then(blobData => {process(blobData, (text) => {
            
        })})
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
                {/* <video className="camera" ref={video => console.log(video)}>

                </video> */}
                <Button className="take_photo" variant="contained" size="large" color="primary" onClick = {() => this.snapPhoto()}>
                    SNAP PHOTO
                </Button>
                <canvas className="picture_canvas" ref={this.canvasRef}>

                </canvas>
            </div>
        )
    }
}
