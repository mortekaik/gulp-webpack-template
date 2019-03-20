const slides = document.querySelectorAll('.slider .slider__item'),
			nextSlide = document.querySelector('.slider__button--next'),
			prevSlide = document.querySelector('.slider__button--prev'),
			controls = document.querySelectorAll('.slider__button');

let currentSlide = 0;






// show buttons for navigate
function showButtons() {
	for (let i = 0; i < controls.length; i++) {
		const element = controls[i];
		element.style.display = 'inline-block';
	}
}
