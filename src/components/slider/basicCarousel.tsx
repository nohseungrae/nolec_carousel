import React, { useState } from "react";
import { DataMapping, imgPathFunc } from "../../Utils/DataMapping";
import styled from "styled-components";
import { Popup } from "./popup";

const StoryMain = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 100%;
  margin: auto;
  -ms-overflow-style: none;
`;

interface IBasicCarouselProps {
  stories: any[];
  imgDomain: string;
  imgLegacy: string;
}

export const checkVideoImg = (img: string, story: any, value?: any) => {
  const mimeTypes = [
    "avi",
    "mov",
    "mp4",
    "m4v",
    "mpeg",
    "mpg",
    "oga",
    "ogg",
    "ogv",
    "webm",
    "wmv",
  ];
  const mapping = DataMapping.mappingType(img) as {
    mimeType: string;
    name: string;
  };
  if (mimeTypes.includes(mapping?.mimeType)) {
    return (
      <video
        className={`story_video_${story?.id}`}
        style={{ width: "100%", borderRadius: "0.7em" }}
        controlsList="nodownload"
        muted
        autoPlay
        playsInline
        loop
        src={img}
      ></video>
    );
  }
  return (
    <img
      style={{ borderRadius: "0.7em" }}
      src={img}
      onError={(e: any) => imgPathFunc.solveImgError(e, story)}
      alt={story?.alt}
    />
  );
};

export const BasicCarousel: React.FC<IBasicCarouselProps> = ({
  stories,
  imgDomain,
  imgLegacy,
}) => {
  const mappingData = DataMapping.jsonListMapping(stories, "seq");

  const [state, setState] = useState({
    displayState: "none",
    index: 0,
    groupedSlides: mappingData,
  });

  const openPopup = (e: any, i: number) => {
    e.preventDefault();
    const parsedIndex = i;
    const body: HTMLBodyElement | null = document.querySelector(
      "body"
    ) as HTMLBodyElement;
    body.style.overflowY = "hidden";
    setState({
      ...state,
      displayState: "block",
      index: parsedIndex,
    });
  };

  const closePopup = () => {
    const body: HTMLElement | null = document.querySelector(
      "body"
    ) as HTMLBodyElement;
    body.style.overflowY = "auto";
    setState({
      ...state,
      displayState: "none",
    });
  };

  return (
    <>
      {state?.displayState === "none" ? null : (
        <Popup
          state={state}
          closePopup={closePopup}
          imgDomain={imgDomain}
          imgLegacy={imgLegacy}
        />
      )}
      <div className="story_main flex overflow-x-auto max-w-full mr-auto">
        <ul
          className="flex justify-center flex-grow"
          style={{ padding: "0px 3% 3%" }}
        >
          {state.groupedSlides.map((slide, i) => {
            return (
              <li
                key={slide.id}
                className={`mr-10px relative block bg-${slide.color}`}
                onClick={(e) => openPopup(e, i)}
                style={{
                  width: "125px",
                  marginRight: "10px",
                  borderRadius: "0.7em",
                }}
              >
                <span
                  className="absolute w-full z-10 text-center text-white"
                  style={{ bottom: "15px" }}
                >
                  {slide.alt}
                </span>
                <img
                  className="absolute -bottom-0 z-10"
                  style={{ borderRadius: "0.7em" }}
                  src={`/static/m/images/story_overlay.png`}
                  alt={"overlay"}
                />
                {checkVideoImg(
                  imgPathFunc.getImgPath(
                    slide,
                    "https://thesaracen-1304267401.cos.ap-seoul.myqcloud.com",
                    "https://active.thesaracen.com"
                  ),
                  slide
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
