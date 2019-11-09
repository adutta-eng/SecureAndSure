import React from "react";
import "./style.sass"
import { Paper, IconButton, Fab, CardMedia, Card, CardContent, Typography, Button, ListItem, List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { process } from "./azure.js"
import { addDocument } from 'util/firebase';

class AzureCameraUI extends React.Component {
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
                this.video.srcObject=stream
                this.video.play()
            });
        }  
    }
    snapPhoto() {
        this.canvasRef.current.width = this.video.offsetWidth;
        this.canvasRef.current.height = this.video.offsetHeight;
        const ctx = this.canvasRef.current.getContext('2d');
        ctx.drawImage(this.video, 0, 0, 640, 480);
        let imageData = this.canvasRef.current.toDataURL('image/jpeg');
        fetch(imageData).then(res => res.blob()).then(blobData => {process(blobData, (text) => {
            const parsedInfo = [
                {UIN: text.match(/(?<!\d)\d{9}(?!\d)/)[0]},
                {Library: text.match(/(?<!\d)\d{14}(?!\d)/)[0]},
                {Card: text.match(/(?<!\d)\d{9}(?!\d)/)[0]},
                {Name: text.match(/^[A-Z, -]+$/gm).filter(text => !text.match(/illinois/i))[0]},
                {'Card Expires': text.match(/\d\d\/\d\d\/\d{4}/)[0]}
            ];
            addDocument('I-Card', imageData, parsedInfo);
            this.props.history.push('/home');
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

export default withRouter(AzureCameraUI);
