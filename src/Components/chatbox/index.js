import React, { Component } from "react";
import StyledChatBox from "./style";
import firebase from "firebase";
import { mdReact } from 'markdown-react-js';

class ChatBox extends Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();

        this.state = {
            messages: [],
            currentMessage: "",
        };

        this.messageValue = this.messageValue.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.fitImageOn = this.fitImageOn.bind(this);
        this.loadFile = this.loadFile.bind(this);

        firebase.database().ref('users/').on('value', snapshot => {
            if (snapshot.val() !== null) {
                this.setState({
                    messages: Object.values(snapshot.val()),
                });
            }
        });

        /*const connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function(snap) {
            if (snap.val() === true) {
                alert("connected");
            } else {
                alert("not connected");
            }
        });*/
    }

    messageValue(e){
        this.setState({
            currentMessage: e.target.value,
        });
    };

    submitMessage(e){
        console.log('beep')
        e.preventDefault();
        if(this.state.currentMessage !== ''){
            let entry = {
                utilisateur: "Charlie",
                message: this.state.currentMessage
            };

            console.log(entry);

            firebase.database().ref('users/').push(entry, (error) => {
                if (error) {
                    alert("dla merde")
                } else {
                    // alert("yeah")
                    entry.message = '';
                }
            });
        }
    };

    fitImageOn(ctx, canvas, imageObj) {
        const imageAspectRatio = imageObj.width / imageObj.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        let renderableHeight, renderableWidth, xStart, yStart;

        // If image's aspect ratio is less than canvas's we fit on height
        // and place the image centrally along width
        if(imageAspectRatio < canvasAspectRatio) {
            renderableHeight = canvas.height;
            renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
            xStart = (canvas.width - renderableWidth) / 2;
            yStart = 0;
        }

        // If image's aspect ratio is greater than canvas's we fit on width
        // and place the image centrally along height
        else if(imageAspectRatio > canvasAspectRatio) {
            renderableWidth = canvas.width;
            renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
            xStart = 0;
            yStart = (canvas.height - renderableHeight) / 2;
        }

        // Happy path - keep aspect ratio
        else {
            renderableHeight = canvas.height;
            renderableWidth = canvas.width;
            xStart = 0;
            yStart = 0;
        }
        ctx.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
    };

    loadFile(e){
        e.preventDefault();
        if(e.target.files[0]) {
            const file = e.target.files[0];
            let img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                let canvas = this.refs.imgCanvas;
                let ctx = canvas.getContext('2d');
                this.fitImageOn(ctx, canvas, img);
                canvas.toBlob(blob => {
                    console.log(blob, file);
                    console.log(firebase.storage().ref('images/').child(file.name).put(blob));
                    // inject into storage then send msg

                    firebase.storage().ref('images/').child(file.name).put(blob)
                        .then(snapshot => {
                            console.log(snapshot);
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    this.setState({
                                        currentMessage : "![prout](" + downloadURL + ")",
                                    });
                                    console.log(this.state.currentMessage);
                                    this.submitMessage(e)

                                });
                        })

                }, 'image/webp', 0.8)
            };
        }
    }


    render(){
        const messageStreak = (message, index) => {
            if(index !== 0 && this.state.messages[index - 1].utilisateur !== message.utilisateur){
                return <span className="message-sender">{message.utilisateur}</span>
            } else if (index === 0){
                return <span className="message-sender">{message.utilisateur}</span>
            }
            return false
        };

        const displayMessages = () => {
            return this.state.messages.map((message, index) => {
                return (
                    <li key={index} className="message-screen">
                        <div className={message.utilisateur === "Charlie" ? "my-message" : ''}>
                            {messageStreak(message, index)}
                            <span className="message">{mdReact()(message.message)}</span>
                        </div>
                    </li>
                )
            })
        };

        return(
            <StyledChatBox>
                <div id="container-chat">
                    <ul>
                        {displayMessages()}
                    </ul>
                </div>
                <canvas ref="imgCanvas"></canvas>
                <form id="message-chat">
                    <input type="text" ref="textInput" onChange={e => this.messageValue(e)}/>
                    <button type="button" onClick={e => this.submitMessage(e)} onSubmit={e => e.preventDefault}>Envoyer</button>
                    <label htmlFor="sendImage">Image</label>
                    <input id="sendImage" type="file" ref="fileInput" onChange={e => this.loadFile(e)}/>
                </form>
            </StyledChatBox>
        )
    }
}

export default ChatBox;
