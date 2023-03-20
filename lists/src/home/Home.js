import React, { Component } from "react";
import Slider from 'react-slick';
// Import css files
import '../app.css';
import SLideShowItem from "./SlideShowItem.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Uses https://react-slick.neostack.com/docs/example/simple-slider
function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        zIndex: "1",
        left: "0px\\",
        backgroundColor: "transparent",
        width: "100px",
      }}
    >
    </div>
  );
}

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        zIndex: "1",
        backgroundColor: "transparent",
        width: "100px",
        marginTop: "px"
      }}
    >
    </div>
  );
}


class Home extends Component {
  constructor() {
    super();
    this.state = {
      lists: [], // this holds the name of each list
      items: {} // this property names of this object are the names of the lists; their values are arrays of the items in each list
    };
  }

  // Get the data from the server
  componentDidMount() {
    fetch('/adminData')
      .then(response => response.json())
      .then(listsData => {
        this.setState({ lists: listsData.lists, items: listsData.items });
      })
  }

  renderSlides() {
    if (this.state.lists != null) {
      return this.state.lists.map((list) => {
        return this.state.items[list].map((item, index) => {
          return (
            <div key={index}>
              <SLideShowItem list={list} item={item} />
            </div>
          );
        });
      });
    }
  }

  render() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div style={{ margin: "auto"}}>
        <Slider {...settings}>
          {this.renderSlides()}
        </Slider>
      </div>
    )
  }
}

export default Home;