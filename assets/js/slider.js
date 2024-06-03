

class Slider {

  constructor(sliderId) {
    this._slider = document.getElementById(sliderId);
    this._slides = document.querySelectorAll(`#${sliderId} .slider__img`);
    this._navbar = null;
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

  autoSlide(autoSlideBehavior = "auto") {

    if (!this._canAutoSlide)
      return;

    if (autoSlideBehavior !== "auto" || !this.canSlide("right"))
      clearInterval(this._autoSlideIntervalId);
    

    if (autoSlideBehavior !== "stop" && this.canSlide("right"))
      this._autoSlideIntervalId = setInterval(() => {
        if (!this.canSlide("right")) {
          clearInterval(this._autoSlideIntervalId);
        } else {
          this.slideToSide("right");
        }

      }, 4000);

  }

  slideToSide(direction) {
    if (this.canSlide(direction)) {
      this.setVisibleSlideIndex(direction);
      this.setStyleNavbarItem(this._visibleSlideIndex);
      this.setSlideStyle();  
    }

    this.autoSlide("reset");
  }

  canSlide(slideBehavior, slideIndex = null) {
    let canSlide = false;

    switch (slideBehavior) {
      case "right":
        canSlide = this._visibleSlideIndex < this._totalSlides - 1;
        break;
      
      case "left":
        canSlide = this._visibleSlideIndex > 0 ;
        break;
    
      case "slideIndex":
        canSlide = slideIndex >= 0 && slideIndex <= this._totalSlides - 1;
        break;
      
      default:
        break;

    }

    return canSlide;

  }

  setVisibleSlideIndex(indexBehavior, slideIndex = null) {
    switch (indexBehavior) {
      case "right":
        this._visibleSlideIndex ++ ;
        break;
      
      case "left":
        this._visibleSlideIndex -- ;
        break;
    
      case "slideIndex":
        this._visibleSlideIndex = slideIndex;
        break;

      default:
        break;

    }

  }

  setSlideStyle(transitionMode = null) {
    this._slides.forEach((slide, slideIndex) => {
      slide.style = `
        left: ${50 + ((slideIndex - this._visibleSlideIndex) * 100)}%;
        ${!transitionMode && "transition: all 0.4s ease-in-out;"}
      `
    });

  }

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

  slideToIndex(slideIndex) {

    this.setSlideStyle("index");

    if (this.canSlide("slideIndex", slideIndex)) {
      this.setVisibleSlideIndex("slideIndex", slideIndex);
      this.setSlideStyle("slideIndex");
    }

  }

  setStyleNavbarItem(itemIndex) {

    Array.from(this._navbar.children).forEach((child, index) => {
      index === itemIndex ? child.classList.add("active") : child.classList.remove("active")
    });

  }

  setNavbar() {
    const navbar = document.createElement("ul");
    this._navbar = navbar;

    this._navbar.classList.add("slider__navbar");

    this._slides.forEach((slide, index) => {
      const item = document.createElement("li");

      item.classList.add("slider__navbar__item");
     
      item.addEventListener("click", () => {
        this.slideToIndex(index);
        
        this.setStyleNavbarItem(index);
        
      });
      
      navbar.appendChild(item);

      index === 0 && this.setStyleNavbarItem(0);

    })

    this._slider.appendChild(navbar);

  }

}


const slider = new Slider("slider");

