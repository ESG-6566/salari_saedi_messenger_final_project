import React from "react";
import Logo2 from "../../assets/logo2.svg";
import styled from "styled-components";

function LogoField() {
    return (
        <Field>
            <img src={Logo2} alt="logo" />
        </Field>
    )
};

export { LogoField };

const Field = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
background-color: #0094ff;
height: 100%;
width: 100%;
  img {
  }
`;
