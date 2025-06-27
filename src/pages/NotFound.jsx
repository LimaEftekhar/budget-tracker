import React from "react";
import styled from 'styled-components';

const StyledA = styled.a`
    color: var(--primary-color);
`
const StyledDiv = styled.div`
    margin-top: 4rem;
    text-align: center;
`

function NotFound({title}){
    return(
        <>
            <StyledDiv>
                <h1>{title}</h1>        
                <p>page not found</p>
                <StyledA href="/">Home</StyledA>
            </StyledDiv>
            
        </>
    )
}
export default NotFound;