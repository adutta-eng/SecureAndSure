import React from "react";
import "./style.sass"
import { Paper, IconButton, Fab, CardMedia, Card, CardContent, Typography, Button, ListItem, List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { process } from "./azure.js"
import { addDocument, getPublicKey } from 'util/firebase';
import { encryptInfo } from 'util/encryption'

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

    uploadPhoto(input) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            const width = Math.min(img.width, .7 * window.innerWidth);
            const height = width * (img.height / img.width);
            canvas.width = window.innerWidth;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const imageData = this.canvasRef.current.toDataURL('image/jpeg');

            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                this.processImage(arrayBuffer, imageData);
            }
            reader.readAsArrayBuffer(input.files[0]);
        }
        img.src = URL.createObjectURL(input.files[0]);
    }
    snapPhoto() {
        this.canvasRef.current.width = window.innerWidth;
        this.canvasRef.current.height = this.video.videoHeight;
        const ctx = this.canvasRef.current.getContext('2d');
        ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
        let imageData = this.canvasRef.current.toDataURL('image/jpeg');

        this.video.srcObject.getTracks().forEach(track => track.stop()); // stop using camera

        fetch(imageData).then(res => res.blob()).then(blobData => this.processImage(blobData));
    }

    processImage(fileData, imageData) {
        process(fileData, text => {
            const parsedInfo = [
                {UIN: text.match(/(?<!\d)\d{9}(?!\d)/)[0]},
                {Library: text.match(/(?<!\d)\d{14}(?!\d)/)[0]},
                {Card: text.match(/(?<!\d)\d{16}(?!\d)/)[0]},
                {Name: text.match(/^[A-Z, -]+$/gm).filter(text => !text.match(/illinois/i))[0]},
                {'Card Expires': text.match(/\d\d\/\d\d\/\d{4}/)[0]}
            ];

            getPublicKey().then(publicKey => {
                const encryptedInfo = encryptInfo({
                    type: 'I-Card',
                    parsedInfo,
                    image: imageData,
                    publicKey,
                })
                addDocument(encryptedInfo);
                this.props.history.push('/home');
            })
        })
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
                        <Button component="label" label="CHOOSE FILE" variant="contained" size="large" color="primary">
                            <input type="file" className="hidden" onChange={(event) => this.uploadPhoto(event.target)}/>
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
