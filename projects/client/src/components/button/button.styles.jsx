// :root {
//   --PrimaryColor: hsl(46, 100%, 56%);
//   --HoverColor: hsl(46, 69%, 44%);
//   --WhiteColor: hsl(0, 0%, 100%);
//   --BlackColor: hsl(0, 0%, 5%);
//   // --TextColor: hsl(273, 100%, 65%);
//   --TextColor: hsl(273, 100%, 0%);
//   --WhiteColorDeam: hsl(0, 0%, 90%);
//   --GreyBg: hsl(0, 0%, 95%);
//   --GreyText: rgb(190, 190, 190);
//   --InputColor: hsl(330, 12%, 97%);
// }

import styled from "styled-components"

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: hsl(46, 100%, 56%);
  color: white;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

export const GoogleSignInButton = styled(BaseButton)`
  background-color: hsl(0, 0%, 95%);
  color: hsl(46, 100%, 56%);
  margin: 1px solid;
  font-size: 15px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`
