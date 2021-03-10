import React, {
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

const SlideBox = styled.div`
  &.slide_transition_next,
  &.slide_transition_prev {
    transition: transform 300ms ease-in-out;
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

  const slideBox = useRef<HTMLDivElement>(null);

  let currentIndex = state.index;
  useEffect(() => {
    const autoCarousel = () => {
      const { current } = slideBox;
      const slideItems = document.querySelectorAll(".slide_item");
      const slideItemsLength = slideItems.length;
      let front = [];
      let back = [];
      let frontIndex = 1;
      let backIndex = slideItemsLength;
      for (let index = 0; index <= slideItemsLength - currentIndex; index++) {
        if (frontIndex < slideItemsLength) {
          front.push(frontIndex);
          frontIndex++;
        }
      }
      for (let index = 0; index < currentIndex - 1; index++) {
        back.push(backIndex);
        backIndex--;
      }
      const orderList = back.sort().concat(front);

      slideItems.forEach((element: any, i: number) => {
        if (currentIndex === 1) {
          // console.log(slideItems.item(slideItemsLength - 1));
          element.style.order = i + 1;
        } else {
          // console.log(slideItems.item(currentIndex - 2));
          element.style.order = orderList[i];
        }
        // if (parseInt(element.dataset.position) === currentIndex) {
        //   return (element.style.order = 1);
        // } else if (currentIndex - parseInt(element.dataset.position) === 1) {
        //   return (element.style.order = currentIndex);
        // } else if (parseInt(element.dataset.position) < currentIndex) {
        //   if (i === 0) {
        //     return (element.style.order =
        //       parseInt(element.dataset.position) + i + 1);
        //   }
        //   return (element.style.order = parseInt(element.dataset.position) + i);
        // } else if (parseInt(element.dataset.position) > currentIndex) {
        //   return (element.style.order = parseInt(element.dataset.position) - i);
        // }
      });

      if (current) {
        // const bodyWidth: number = document.querySelector(".slide_box")
        //   ?.clientWidth as number;

        current.addEventListener("transitionstart", () => {});

        current.addEventListener("transitionend", () => {
          if (current.classList.contains("slide_transition_next")) {
            if (currentIndex === slideItemsLength) {
              currentIndex = 1;
            } else {
              currentIndex++;
            }
            let order = 1;
            console.log("여기 되냐", currentIndex);
            // change order from current position till last
            for (let i = currentIndex; i <= slideItemsLength; i++) {
              current.childNodes.forEach((node: any) => {
                if (node.dataset.position === i.toString()) {
                  node.style.order = order;
                }
              });
              order++;
            }
            for (let i = 1; i < currentIndex; i++) {
              current.childNodes.forEach((node: any) => {
                if (node.dataset.position === i.toString()) {
                  node.style.order = order;
                }
              });
              order++;
            }
            current.classList.remove("slide_transition_next");
            current.style.transform = "translateX(0)";
          } else {
            if (currentIndex === slideItemsLength) {
              currentIndex = 1;
            } else {
              currentIndex++;
            }
            let order = 1;
            for (let i = currentIndex; i <= slideItemsLength; i++) {
              current.childNodes.forEach((node: any) => {
                if (node.dataset.position === i.toString()) {
                  node.style.order = order;
                }
              });
              order++;
            }
            for (let i = 1; i < currentIndex; i++) {
              current.childNodes.forEach((node: any) => {
                if (node.dataset.position === i.toString()) {
                  node.style.order = order;
                }
              });
              order++;
            }
            current.classList.remove("slide_transition_prev");
            current.style.transform = "translateX(0)";
          }
        });
      }
    };
    autoCarousel();
  }, []);

  const next = () => {
    const { current } = slideBox;
    if (current) {
      current.classList.add("slide_transition_next");
      current.style.transform = "translateX(-100%)";
    }
  };
  const prev = () => {
    const { current } = slideBox;
    if (current) {
      current.classList.add("slide_transition_prev");
      current.style.transform = "translateX(100%)";
    }
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
      <SlideBox
        ref={slideBox}
        className={"slide_box flex h-full absolute w-full left-0 top-0"}
        style={{ backgroundColor: "#000000db" }}
      >
        {state?.groupedSlides?.map((slide: any, i: number) => (
          <>
            <SlideItem
              key={i}
              index={i}
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
          </>
        ))}
        <NextArrow onClick={next} />
        <PrevArrow onClick={prev} />
      </SlideBox>
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "red",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        top: "10%",
        width: "120px",
        height: "80%",
        opacity: "0",
        zIndex: 1000,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "green",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: "10%",
        width: "120px",
        height: "80%",
        opacity: "0",
        zIndex: 1000,
      }}
      onClick={onClick}
    />
  );
};
