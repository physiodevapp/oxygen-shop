

class Slider {

  /**
   * 
   * @param {string} sliderId 
   */
  constructor(sliderId) {
    this._slider = document.getElementById(sliderId);
    this._slides = document.querySelectorAll(`#${sliderId} .slider__img`);
    this._visibleSlideIndex = 0;
    this._totalSlides = this._slides.length; 
    this._autoSlideIntervalId = null;
    this._canAutoSlide = false;

    this.setSlideStyle("initial");
    this.setLateralButton("right");
    this.setNavbar();
    this.setLateralButton("left");
    this.autoSlide("auto");
  }

  /**
   * 
   * @param {string} mode 
   */
  autoSlide(mode = "auto") {

    if (!this._canAutoSlide)
      return;

    if (mode !== "auto" || !this.canSlide("right"))
      clearInterval(this._autoSlideIntervalId);
    

    if (mode !== "stop" && this.canSlide("right"))
      this._autoSlideIntervalId = setInterval(() => {
        if (!this.canSlide("right")) {
          clearInterval(this._autoSlideIntervalId);
        } else {
          this.slideToSide("right");
        }


      }, 4000);

  }

  /**
   * 
   * @param {string} direction 
   */
  slideToSide(direction) {
    if (this.canSlide(direction)) {
      this.setVisibleSlideIndex(direction);
      this.setSlideStyle();  
    }

    this.autoSlide("reset");
  }

  /**
   * 
   * @returns
   */
  canSlide(mode, index = null) {
    let canSlide = false;
    switch (mode) {
      case "right":
        canSlide = this._visibleSlideIndex < this._totalSlides - 1;
        break;
      
      case "left":
        canSlide = this._visibleSlideIndex > 0 ;
        break;
    
      case "index":
        canSlide = index >= 0 && index <= this._totalSlides - 1;
        break;
      
      default:
        break;

    }

    return canSlide;

  }

  
  setVisibleSlideIndex(mode, index = null) {
    switch (mode) {
      case "right":
        this._visibleSlideIndex ++ ;
        break;
      
      case "left":
        this._visibleSlideIndex -- ;
        break;
    
      case "index":
        this._visibleSlideIndex = index;
        break;

      default:
        break;

    }

  }

  /**
   * 
   * @param {string} mode 
   */
  setSlideStyle(mode = null) {
    this._slides.forEach((slide, slideIndex) => {
      slide.style = `
        left: ${50 + ((slideIndex - this._visibleSlideIndex) * 100)}%;
        ${!mode && "transition: all 0.4s ease-in-out;"}
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
        this.slideToSide(direction);
    })

    this._slider.appendChild(button);

  }

  slideToIndex(index) {

    this.setSlideStyle("index");

    if (this.canSlide("index", index)) {
      this.setVisibleSlideIndex("index", index);
      this.setSlideStyle("index");
    }

  }

  setNavbar() {
    const navbar = document.createElement("ul");

    navbar.classList.add("slider__navbar");

    this._slides.forEach((slide, index) => {
      const item = document.createElement("li");

      item.classList.add("slider__navbar__item");

      item.innerHTML = index + 1;
      
      item.addEventListener("click", () => {
        this.slideToIndex(index);
      });

      navbar.appendChild(item);

    })

    this._slider.appendChild(navbar);

  }

}



const slider = new Slider("slider");

