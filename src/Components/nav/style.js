import styled from "styled-components";

const StyledNavigation = styled.nav`
  background: #282c34;
    margin-top: 0;
    padding: 1px;
    display:flex;
    justify-content: space-between;
    
    .navbar-list{
        padding-left:15px;
        li{
            list-style:none;
            display:inline-block;
            padding:8px 15px;
            a{
              text-decoration: none;
              color:white;
              &:hover{
                  color:#42b983;
              }
              svg{
                width: 25px;
                display:inline-block;
                margin-right: 8px;
              }
            }
        }
        &.login{
          padding-right:20px;
          button{
            background: none;
            box-shadow: none;
            border:none;
            color:white;
            &:hover{
              color:#42b983;
            }
          }
        }
    }
`;

export default StyledNavigation;
