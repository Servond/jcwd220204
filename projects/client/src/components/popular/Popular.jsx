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
import { Image, Text } from "@chakra-ui/react"
import SimpleImageSlider from "react-simple-image-slider"
import { Badge } from "antd"
import { Carousel } from "react-responsive-carousel"

const Popular = ({
  id,
  name,
  city,
  properties_image,
  category,
  property_item,
}) => {
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
  const price = property_item.map((val) => val.price)
  const lowestPrice = Math.min(...price)
  console.log(properties_image)

  return (
    // <div className="popularMain">
    <section
      className="popular section container"
      id="popular"
      style={{
        maxWidth: "400px",
      }}
    >
      <div className="secContainer">
        <Badge.Ribbon text={category}>
          <div className="mainContent">
            <div className="singleDestination">
              <Link to={`/roomdetail/${id}`}>
                <div className="destImage">
                  {properties_image.map((val) => (
                    <img
                      src={`http://localhost:8204/public/${val.image_url}`}
                    />
                  ))}
                </div>
                <div className="destFooter">
                  <div className="destText flex">
                    <h3>{name}</h3>
                    <h6>{city?.cities_name}</h6>

                    <Text color={"black"}>
                      Start from:{" "}
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(lowestPrice)}{" "}
                      /room /night
                    </Text>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Badge.Ribbon>
      </div>
    </section>
    // </div>
  )
}

export default Popular
