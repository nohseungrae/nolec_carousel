import React from "react";
import styled, { keyframes } from "styled-components";
import { checkVideoImg } from "./basicCarousel";

const Open = keyframes`
  0% {
    transform: scale(0.2);
    opacity: 0; 
  }
  
  20%{
    transform: scale(0.2);
    opacity: 0; 
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`;
const Title = keyframes`
  from {
    transform: translate(0, -120px);
    opacity: 0;
  }
  50% {
    transform: translate(0, -40px);
    opacity: 0;  
  }
  to{
    margin-bottom: 10px;
    opacity: 1;
  }
`;
const Links = keyframes`
  from {
    transform: translate(0, 100px);
    opacity: 0;
  }
  to{
    transform: translate(0, 0);
    opacity: 1;
  }
`;

interface ISlideItemStyleProps {
  bgColor?: any;
  displayurl?: any;
}

const StoryItem = styled.div<ISlideItemStyleProps>`
  background-size: auto 100%;
  width: 100%;
  height: 100%;
  left: 0;
  background: ${(props) => props.bgColor};
  color: white;
  z-index: 997;
  animation: ${Open} 0.3s ease-in-out;
  flex: 1 0 100%;

  & .story_img {
    width: 100%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    & img {
      width: 100%;
    }
    .overlay {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 997;
      background: url(${process.env.REACT_APP_BACKEND_HOST +
        "static/m/images/story_overlay.png"})
        repeat-x;
      background-size: auto 100%;
    }
  }
`;
const StoryFooter = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 999;
`;

const StoryTitle = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 10px;
  padding: 0 15px;
  color: #fff;
  transition: margin-bottom, opacity 0.5s linear;
  &.animation {
    animation: ${Title} 0.7s linear;
  }
  > h2 {
    color: #fff;
    font-size: 1.8em;
  }
  > span {
    margin: 5px 0;
    color: #ececec;
    font-size: 1em;
  }
`;

const StoryLink = styled.div`
  transition: margin-bottom, opacity 0.5s ease-out;
  height: 80px;
  &.animation {
    animation: ${Links} 0.5s ease-out;
  }
`;

const A = styled.a<ISlideItemStyleProps>`
  display: ${(props) => props.displayurl ?? "flex"};
  align-items: center;
  flex-flow: column wrap;
  text-decoration: none;
  > span {
    padding: 5px 25px;
    border-radius: 0.3em;
    margin: 0 auto;
    color: white;
    text-decoration: none;
    border: 1px solid white;
  }
  > img {
    width: 45px;
    height: 45px;
    padding: 7px;
  }
`;

export const SlideItem = (props: any) => {
  return (
    <StoryItem
      className={"slide_item"}
      data-position={parseInt(props.index) + 1}
      bgColor={props.color}
    >
      <input
        onChange={props.onChange}
        value={props.value}
        type="text"
        placeholder="0"
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 1,
          height: "20px",
          display: "none",
        }}
      />
      {/* <Progress
        delay={props.delay}
        bar={props.bar}
        display={props.display}
        width={"100%"}
        duration={props.duration}
      /> */}
      <StoryFooter>
        <StoryTitle className={props.ani}>
          <h2>{props.main_copy}</h2>
          <span>{props.sub_copy}</span>
        </StoryTitle>
        <StoryLink className={props.ani}>
          <A href={props.href} displayurl={props.displayurl}>
            <img
              src={`/static/icons/ico_circle_arrow_up.png`}
              alt="화살표아이콘"
            />
            <span>자세히보기</span>
          </A>
        </StoryLink>
      </StoryFooter>
      <div className="story_img">
        <div className="overlay" />
        {checkVideoImg(props.src, props.slide, undefined)}
      </div>
    </StoryItem>
  );
};
