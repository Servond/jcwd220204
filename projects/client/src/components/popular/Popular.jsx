import React, { useEffect } from "react"
import "./Popular.scss"
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"
import { BsArrowRightShort, BsDot } from "react-icons/bs"
import { useState } from "react"
import { axiosInstance } from "../../api"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { Image } from "@chakra-ui/react"
import SimpleImageSlider from "react-simple-image-slider"

const Popular = ({ id, name, city, properties_image }) => {
  const [images, setImages] = useState([])
  const getImages = properties_image.map((val) => val.image_url)

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  }
  return (
    <div className="popularMain">
      <section className="popular section container" id="popular">
        <div className="secContainer">
          <div
            style={{
              marginTop: "5rem",
            }}
          >
            <div className="mainContent">
              <div className="singleDestination">
                <Link to={`/roomdetail/${id}`}>
                  <div className="destImage">
                    {properties_image.map((val) => (
                      <img
                        src={`http://localhost:8000/public/${val.image_url}`}
                      />
                    ))}

                    <div className="overlayInfo">
                      <h3>{name}</h3>

                      <BsArrowRightShort className="icon" />
                    </div>
                  </div>
                  <div className="destFooter">
                    <div className="destText flex">
                      <h6>{city?.cities_name}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Popular
