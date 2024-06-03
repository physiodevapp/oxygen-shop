

class Slider {

  /**
   * 
   * @param {string} sliderId 
   */
  constructor(sliderId) {
    this._slider = document.getElementById(sliderId);
    this._slides = document.querySelectorAll(`#${sliderId} .slider__img`);
    // this._navbar = document.querySelectorAll(`#${sliderId} .slider__navbar`);
    this._visibleSlideIndex = 0;
    this._totalSlides = this._slides.length; 
    this._autoSlideIntervalId = null;
    this._autoSlideMode = "auto";

    this.setSlideStyle("initial");
    this.setLateralButton("right");
    this.setNavbar();
    this.setLateralButton("left");
    this.autoSlide();
  }

  /**
   * 
   * @param {string} mode 
   */
  autoSlide(mode = "auto") {
    this._autoSlideMode = mode;

    if (this._autoSlideMode !== "auto" || !this.canSlide("right"))
      clearInterval(this._autoSlideIntervalId);
    

    if (this._autoSlideMode !== "stop" && this.canSlide("right"))
      this._autoSlideIntervalId = setInterval(() => {
        if (!this.canSlide("right")) {
          clearInterval(this._autoSlideIntervalId);
          return;
        } 

        this.slideTo("right");

      }, 4000);

  }

  /**
   * 
   * @param {string} direction 
   */
  slideTo(direction) {
    if (this.canSlide(direction)) {
      this.setVisibleSlideIndex(direction);
      this.setSlideStyle();  
    }

    this._autoSlideMode !== "stop" && this.autoSlide("reset");
  }

  /**
   * 
   * @returns
   */
  canSlide(direction) {
    let canSlide = false;
    switch (direction) {
      case "right":
        canSlide = this._visibleSlideIndex < this._totalSlides - 1;
        break;
      
      case "left":
        canSlide = this._visibleSlideIndex > 0 ;
        break;
    
      default:
        break;
    }

    return canSlide;

  }

  
  setVisibleSlideIndex(direction) {
    switch (direction) {
      case "right":
        this._visibleSlideIndex ++ ;
        break;
      
      case "left":
        this._visibleSlideIndex -- ;
        break;
    
      default:
        break;
    }
  }

  /**
   * 
   * @param {string} mode 
   */
  setSlideStyle(mode) {
    this._slides.forEach((slide, index) => {
      slide.style = `
        left: ${50 + ((index - this._visibleSlideIndex) * 100)}%;
        ${mode !== "initial" && "transition: all 0.4s ease-in-out;"}
      `
    });

  }

  /**
   * 
   * @param {string} direction 
   */
  setLateralButton(direction) {
    const button = document.createElement("button");
    let buttonHTML = "";

    switch (direction) {
      case "right":
        buttonHTML = `<i class="fa fa-chevron-right" style="font-size:2em;"></i>`;
        break;
      
      case "left":
        buttonHTML = `<i class="fa fa-chevron-left" style="font-size:2em;"></i>`;
        break;
        
      default:
        break;
    }    
    button.innerHTML = buttonHTML;
    
    button.style = `
      ${direction}: 0em;
      margin-${direction}: 1em;
    `;

    button.classList.add(`slider__${direction === "right" ? "next" : "prev"}`);  
    
    button.addEventListener("click", () => {
        this.slideTo(direction);
    })

    this._slider.appendChild(button);

  }

  setNavbar() {
    const navbar = document.createElement("ul");

    navbar.classList.add("slider__navbar");

    this._slides.forEach((slide, index) => {
      const item = document.createElement("li");
      item.classList.add("slider__navbar__item");
      item.innerHTML = index + 1;
      navbar.appendChild(item);
    })

    this._slider.appendChild(navbar);

  }

}



const slider = new Slider("slider");

