import styled from "styled-components";

const StyledChatBox = styled.section`
      padding-top:10vh;
      h3 {
        margin: 40px 0 0;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin: 0 10px;
      }
      a {
        color: #42b983;
      }
      canvas{
        display: none;
      }
      .list-item {
        display: inline-block;
        margin-right: 10px;
      }
      .list-enter-active, .list-leave-active {
        transition: all 1s;
      }
      .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
      }
      #container-chat{
        height: 400px;
        width: 800px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 7px;
        border: 1px solid lightgray;
        > ul {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
            box-sizing: content-box; /* So the width will be 100% + 17px */
        }
      }
      #container-chat li > div{
        text-align: left;
      }
      
      .message-screen{
        margin:10px 0;
        &:last-child{
            margin-bottom:25px;
        }
      }
      
      #container-chat li .my-message{
        text-align: right;
      }
      #container-chat .message-sender{
        color: dodgerblue;
        font-weight: bold;
        vertical-align: top;
        display: block;
        padding: 0 25px;
        margin-bottom: 4px;
      }
      #container-chat .message{
        text-align: left;
        padding: 15px 22px;
        border-radius: 15px;
        border-bottom-left-radius: 0px;
        background: #ececec;
        width: 400px;
        display: inline-block;
        min-height: 30px;
        vertical-align: top;
        box-sizing: border-box;
        margin: 0 20px;
        position: relative;
        img{
          width:100%;
          height:100%;
        }
      }
      #container-chat .message:before{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 20px 25px;
        border-color: transparent transparent #ececec transparent;
        left: -20px;
        bottom: 0;
      }
      #container-chat .my-message .message{
        background: dodgerblue;
        color: white;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 0px;
      }
      #container-chat .my-message .message:before{
        border-width: 20px 0 0 25px;
        border-color: transparent transparent transparent dodgerblue;
        right: -20px;
        left:auto;
      }
      #container-chat::-webkit-scrollbar {
        display: none;
      }
      #message-chat{
        width: 800px;
        margin: 0 auto;
      }
      #message-chat input[type="text"]{
        width: calc(100% - 230px);
        box-sizing: border-box;
        padding: 8px 12px;
        border-radius: 8px;        
        border: 1px solid lightgrey;
        &:focus{
          border: dodgerblue 1px solid;
        }        
      }
      #message-chat button, label{
        font-size: 1rem;
        transition: 200ms ;
        margin: 5px 5px;
        padding: 8px 12px;
        border-radius: 8px;
        background:dodgerblue;
        color: white;
        border: 1px solid dodgerblue;
        box-sizing: border-box;
        &:hover{
            cursor: pointer;
            background:white;
            color: dodgerblue;
        }
      }
      
      #message-chat input[type="file"]{
        opacity: 0;
        height:0;
      }
`;

export default StyledChatBox;
