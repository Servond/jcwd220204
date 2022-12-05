import React from "react"
import "./Popular.scss"
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"
import { BsArrowRightShort, BsDot } from "react-icons/bs"
import img from "../../assets/1.jpg"
import img2 from "../../assets/2.jpg"
import img3 from "../../assets/3.jpg"
import img4 from "../../assets/4.jpg"
import img5 from "../../assets/5.jpg"
const Popular = () => {
  const Data = [
    {
      id: 1,
      imgSrc: img2,
      destTitle: "The Astungkara",
      location: "Lombok",
    },
    {
      id: 2,
      imgSrc: img3,
      destTitle: "The Langham",
      location: "Jakarta",
    },
    {
      id: 3,
      imgSrc: img4,
      destTitle: "Queens South",
      location: "Yogyakarta",
    },
    {
      id: 4,
      imgSrc: img5,
      destTitle: "Ayana Resort",
      location: "Wakatobi",
    },
  ]
  return (
    <section className="popular section container" id="popular">
      <div className="secContainer">
        <div className="secheader flex">
          <div className="textDiv">
            <h2 className="secTitle">Popular Place to Stay</h2>
            <p>
              Don't worry about your place to stay for an incredible holiday.
            </p>
          </div>
          <div className="iconsDiv flex">
            <HiArrowNarrowLeft className="icon leftIcon" />
            <HiArrowNarrowRight className="icon rightIcon" />
          </div>
        </div>
        <div className="mainContent grid">
          {Data.map(({ id, imgSrc, destTitle, location }) => {
            return (
              <div className="singleDestination">
                <div className="destImage">
                  <img src={imgSrc} alt="title" />
                  <div className="overlayInfo">
                    <h3>Enjoy your stay in {location}</h3>

                    <p>{destTitle}</p>

                    <BsArrowRightShort className="icon" />
                  </div>
                </div>
                <div className="destFooter">
                  <div className="number">0{id}</div>
                  <div className="destText flex">
                    <h6>{location}</h6>
                    <span className="flex">
                      <span className="dot">
                        <BsDot className="icon" />
                      </span>
                      Dot
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Popular
