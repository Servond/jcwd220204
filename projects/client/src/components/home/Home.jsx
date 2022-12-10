import React from "react"
import "./Home.scss"

const Home = () => {
  return (
    <div>
      <section className="home" id="home">
        <div className="secContainer container">
          <div className="homeText">
            <h1 className="title">Stay Cheapest Full Happiness</h1>
            <p className="subTitle">
              Stay with us and add your new memorable experiences
            </p>
            <button className="btn">
              <a href="#">Explore</a>
            </button>
          </div>
          {/* <div className="homeCard grid">
            <div className="locationDiv">
              <label htmlFor="location">Location</label>
              <br />
              <input type={"text"} placeholder="Let's stay with us" />
            </div>

            <div className="distDiv">
              <label htmlFor="distance">Location</label>
              <br />
              <input type={"text"} placeholder="11/Meters" />
            </div>

            <div className="priceDiv">
              <label htmlFor="price">Location</label>
              <br />
              <input type={"text"} placeholder="$150 - $500" />
            </div>
            <button className="btn">Search</button>
          </div> */}
        </div>
      </section>
    </div>
  )
}

export default Home
