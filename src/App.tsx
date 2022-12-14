import "./App.css";

import React, { createRef, useRef, useState, useEffect } from "react";

import { Home, Tr01 } from "./pages/01-Home";
import { Expert, Tr02 } from "./pages/02-Expert";
import { TheApp, Tr03 } from "./pages/03-TheApp";
import { PathOfArt, Tr04 } from "./pages/04-PathOfArt";
import { Reward, Tr05 } from "./pages/05-Rewar";
import { Gallery, Tr06 } from "./pages/06-Gallery";
import { ThePad } from "./pages/07-ThePad";
import { Signin } from "./styled-components/TwiterBtn";
import { PrimaryBtn } from "./styled-components/PrimaryBtn";
import { StyledIconGallery } from "./styled-components/Icon";
import { Responsive } from "./pages/08-Responsive";
import Player from "./MusicIcon/Music";
import { PopUp } from "./styled-components/styledPopUp";
import { RendAux } from "./pages/09-AuxRendHover";


let scrolling = false;

export default function App() {
  const [popUp, setPopUp] = useState(true)
  const [active, setActive] = useState(0);
  const scrollRefs = useRef<any[]>([]);
  const navRefs = useRef<any[]>([]);

  const list = [
    { name: "", component: <Home /> },
    { name: "", component: <Tr01 /> },
    { name: "Experts", component: <Expert /> },
    { name: "", component: <Tr02 /> },
    { name: "The App", component: <TheApp /> },
    { name: "", component: <Tr03 /> },
    { name: "Path of art", component: <PathOfArt /> },
    { name: "", component: <Tr04 /> },
    { name: "Reward Claim", component: <Reward /> },
    { name: "", component: <Tr05 /> },
    { name: "My gallery", component: <Gallery /> },
    { name: "", component: <Tr06 /> },
    { name: "The pad", component: <ThePad /> },
    { name: "", component: "" },
  ];

  scrollRefs.current = [...Array.from(Array(list.length).keys())].map(
    (_, i) => scrollRefs.current[i] ?? createRef()
  );

  navRefs.current = [...Array.from(Array(list.length).keys())].map(
    (_, i) => navRefs.current[i] ?? createRef()
  );

  const scrollTo = (index: number) => {
    scrolling = true;
    scrollRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
    setActive(index);
    setTimeout(() => {
      scrolling = false;
      navRefs.current[index].current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }, 1000);
  };

  const scrollHandler = (e: any) => {

    const scrollRefsElements = scrollRefs.current;

    scrollRefsElements.forEach((el: any, i: number) => {
      const rect = el.current.getBoundingClientRect();
      const elemTop = rect.left;
      const elemBottom = rect.right;
      const isVisible =
        elemTop < window.innerWidth / 2 && elemBottom > window.innerWidth / 2;

      if (isVisible) {
        navRefs.current[i].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
        setActive(i);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector("nav");
    if (scrollContainer === null) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
      scrollContainer.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="main">
      <div className="displaynone">
        <RendAux />
      </div>
      <div className="responsive">
        <Responsive />
      </div>
      <div className="content">
        <div className="header">
          <a className="icon_gallery" href="#s-0">
            <StyledIconGallery></StyledIconGallery>
          </a>
          <div className="myMenu">
            {list.map((item, i) => (
              <span key={i} ref={navRefs.current[i]}>
                <a
                  href={`#s-${i}`}
                  className={`nav-link ${active === i ? "text-danger" : ""}`}
                  onClick={(e) => {
                    scrollTo(i);
                  }}
                >
                  {item.name}
                </a>
              </span>
            ))}
          </div>
          <Signin />
          <PrimaryBtn label="connect" />
        </div>
        <Player />
        <div onClick={() => setPopUp(false)}>
          {popUp && <PopUp /> }
        </div>
        <nav id="gallery" className="contenido">
          {list.map((item, i) => (
            <div
              key={i}
              id={`s-${i}`}
              ref={scrollRefs.current[i]}
              onWheel={scrollHandler}
              className="py-100"
            >
              {item.component}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
