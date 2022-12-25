import React from "react"
import { Link } from "react-router-dom"
import "./Footer.scss"
import { FaFacebook } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Are you looking for new experience of stay ?
        </p>
        {/* <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type={"email"}
              placeholder="your email"
            />
            <button className="footer-btn">save</button>
          </form>
        </div> */}
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">LinkedIn</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          {/* <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investor</Link>
            <Link to="/">Terms of services</Link>
          </div> */}
          <div className="footer-link-items">
            <h2>Contact us</h2>
            <Link to="/">Contact</Link>
            <Link to="/">Support</Link>
            <Link to="/">Destinations</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              Nginep.com &nbsp;
              <i className="fas fa-route"></i>
            </Link>
          </div>
          {/* <small className="website-rights">Nginep ® com</small> */}
          <div className="social-icons">
            <Link
              className="social-icon-link fascebook"
              to={"/"}
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
