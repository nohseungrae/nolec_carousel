import React, { useState } from "react";
import { Close } from "./close";
import styled from "styled-components";
import { SlideItem } from "./slideItem";

const StoryHeart = styled.div`
  cursor: pointer;
  border-left: 1px solid #eaeaea;
  position: absolute;
  bottom: 9px;
  right: 0;
  width: 55px;
  height: 30px;
  z-index: 450;
  & .heartBtn {
    font-size: 2em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    > img {
      width: 34px;
      height: auto;
    }
  }

  .animation-icon {
    position: absolute;
    left: 50%;
    bottom: calc(50% - 12px);
    transform: translateX(-50%);
    transition: 0.8s;
    opacity: 1;

    &.animate {
      font-size: 50px;
      opacity: 0;
      vertical-align: bottom;
      bottom: 100px;
    }
  }
`;

interface IPopupProps {
  state: { displayState: string; index: number; groupedSlides: any[] };
  closePopup: Function;
  imgDomain: string;
  imgLegacy: string;
}

export const Popup: React.FC<IPopupProps> = ({
  state,
  closePopup,
  imgDomain,
  imgLegacy,
}) => {
  console.log(state);
  const [slideState, setSlideState] = useState({
    slideIndex: state.index,
    slides: state.groupedSlides,
    heartIndex: [],
  });
  const handleAddHeart = (e: any, i: number) => {
    e.preventDefault();
    const { target } = e;
    const heartBtn = target.parentElement;
    let cloneIcon = target.cloneNode();

    cloneIcon.classList.add("animation-icon");
    target.setAttribute(
      "src",
      `${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_heart_on.png`
    );
    cloneIcon.setAttribute(
      "src",
      `${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_heart_on.png`
    );

    heartBtn.insertAdjacentElement("beforeend", cloneIcon);
    setTimeout(function () {
      cloneIcon.classList.add("animate");
      cloneIcon.style.left = 80 * Math.random() + "px";
    }, 50);
    setTimeout(() => cloneIcon.parentNode.removeChild(cloneIcon), 600);
  };
  return (
    <div
      className={"top-0 left-0 fixed w-full h-full z-20"}
      style={{ display: state.displayState, transition: "all 2s ease-in-out" }}
    >
      <Close closePopup={closePopup} display={state.displayState} />
      {state?.groupedSlides?.map((item: any, i: number) => (
        <StoryHeart
          onClick={(e) => handleAddHeart(e, i)}
          style={{ display: i === state.index ? "block" : "none" }}
          key={i}
        >
          <div className="heartBtn">
            <img
              src={`${process.env.REACT_APP_BACKEND_HOST}static/icons/ico_heart_off.png`}
              alt="하트버튼"
            />
            <span></span>
          </div>
        </StoryHeart>
      ))}
      <div
        className={"slide_box flex h-full"}
        style={{ backgroundColor: "#000000db" }}
      >
        {state?.groupedSlides?.map((slide: any, i: number) => (
          <SlideItem
            key={i}
            color={slide.color}
            alt={slide.alt}
            value={slideState.slideIndex}
            src={
              slide["created_at"] >= "2021-01-19" ||
              slide["updated_at"] >= "2021-01-19"
                ? `${imgDomain}/banner/${slide?.img}`
                : `${imgLegacy}/img/banner/image/${slide.relation_id}/${slide.img}`
            }
            href={slide.url}
            main_copy={slide.main_copy}
            sub_copy={slide.sub_copy}
            bar={i === slideState.slideIndex ? "100" : "0"}
            display={i === slideState.slideIndex ? "block" : "none"}
            ani={i === slideState.slideIndex ? "animation" : ""}
            displayurl={
              slide.url === null || slide.url === "" ? "none" : "flex"
            }
            slide={slide}
          />
        ))}
      </div>
    </div>
  );
};
