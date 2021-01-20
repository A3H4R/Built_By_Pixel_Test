import styled from "styled-components";
import { Card as CardSC } from "antd";

export const UserCardsDiv = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const UserCard = styled(CardSC)`
  border: 1px black solid;
  margin: 0 1em 1em 1em;
`;

export const PageDiv = styled.div`
height:100vh;
max-width:100%;
`
export const Header = styled.div`
height:64px;
background:black;
`
export const Footer = styled.div`
height:64px;
background:black;
`
export const PageContent = styled.div`
min-height: calc(100vh - 64px - 64px);
padding:2em;
`
export const Title = styled.h1`
text-align: ${props=>props.center && "center"}
`
export const ButtonToolBar = styled.h1`
display:flex;
flex-direction: row;
justify-content: space-around;
border: 2px dashed black;
padding: 0.5em;
border-radius: 5px;
`