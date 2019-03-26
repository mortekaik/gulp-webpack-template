const slides = document.querySelectorAll('.slider .slider__item'),
			nextSlide = document.querySelector('.slider__button--next'),
			prevSlide = document.querySelector('.slider__button--prev'),
			controls = document.querySelectorAll('.slider__button');

let currentSlide = 0;

// go to n-slide (starting at 0)
function goToSlide(n) {
	slides[currentSlide].classList.remove('slider__item--active');
	currentSlide = (n + slides.length) % slides.length; // reminder of division
	slides[currentSlide].classList.add('slider__item--active');
}

// event handlers
function setupListners() {
	nextSlide.addEventListener('click', function() {
		goToSlide(currentSlide + 1);
	});
	prevSlide.addEventListener('click', function() {
		goToSlide(currentSlide - 1);
	});
}

// show buttons for navigate
function showButtons() {
	for (let i = 0; i < controls.length; i++) {
		const element = controls[i];
		element.style.display = 'inline-block';
	}
}

// initialize slider
function sliderInit() {
	if (slides.length !== 0) { // if at least one slide is on the page
		setupListners();
		showButtons();
	}
}

module.exports = sliderInit;
