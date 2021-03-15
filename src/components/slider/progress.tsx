import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const barAnimation = keyframes`
    from { width : 0; }
    to { width : 100%; }
`;

interface IStyles {
    display: string;
    duration: number;
    delay: number;
}

const ProgressContainer = styled.div<IStyles>`
    width: 100%;
    display: ${(props) => props.display};
    margin: 0 auto;
    overflow: hidden;
    height: 5px;
    border-radius: 1em;
    line-height: 0.625em;
    box-shadow: inset 0 0.1rem 0.1rem rgba(90, 97, 105, 0.15);
    position: absolute;
    top: 7px;
    left: 0;
    z-index: 999;
    .progress {
        height: 5px;
        line-height: 5px;
        border-radius: 1em;
        background-color: white;
        transition: width 0.1s ease;
        position: relative;
        width: 0;
        animation-name: ${barAnimation};
        animation-duration: ${(props) => props.duration}s;
        animation-timing-function: ease-in-out;
        animation-delay: ${(props) => props.delay ?? 0}s;
    }
`;

interface IProgressBarProps {
    duration: number;
    delay: number;
    display: string;
}

export const ProgressBar: React.FC<IProgressBarProps> = (props: any) => {
    const { duration, display, delay } = props;
    return (
        <ProgressContainer delay={delay} duration={duration} display={display}>
            <div className="progress" />
        </ProgressContainer>
    );
};
