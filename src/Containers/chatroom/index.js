import React, { Component } from "react";
import ChatBox from "../../Components/chatbox";
import StyledChatRoom from "./style.js";

class ChatRoom extends Component{

    render(){
        return(
            <StyledChatRoom>
                <ChatBox/>
            </StyledChatRoom>
        )
    }
}

export default ChatRoom;
