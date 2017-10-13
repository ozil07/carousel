function Carousel(options) {
	let carousel = options.carousel;
	let carouselInner = carousel.querySelector('.carousel__inner');
	let slides = carousel.querySelectorAll('.carousel__slide');
	let activeSlide = carousel.querySelector('.carousel__inner .active');
	let animationDuration = options.duration || 5000;
	let timerId;

	
	function setCarouselHeight() {
		carousel.style.height = activeSlide.offsetHeight + 'px';
	}

	function hightNextNavs() {
		let carouselNavsItem = carousel.querySelectorAll('.carousel__navs span');
		let prevNavsItem;

		for (var i = 0; i < slides.length; i++) {

			if(slides[i] == activeSlide) {
				carouselNavsItem[i].classList.add('active');
				if(i > 0) prevNavsItem = i - 1;
			};

			if(i == 0) prevNavsItem = slides.length - 1;

		};

		if(carouselNavsItem[prevNavsItem].classList.contains('active')) {
			carouselNavsItem[prevNavsItem].classList.remove('active');
		}
	}


	function hightPrevNavs() {
		let carouselNavsItem = carousel.querySelectorAll('.carousel__navs span');
		let prevNavsItem;

		for (var i = 0; i < slides.length; i++) {

			if(slides[i] == activeSlide) {
				carouselNavsItem[i].classList.add('active');
				if(i == slides.length - 1) {
					prevNavsItem = 0;
				} else {
					prevNavsItem = i + 1;
					carouselNavsItem[prevNavsItem].classList.remove('active');
				};
			};
		};

		carouselNavsItem[prevNavsItem].classList.remove('active');
		
	}

	function nextSlide() {
		if(!activeSlide.nextElementSibling) {
			activeSlide.classList.remove('active');
			carouselInner.firstElementChild.classList.add('active');
			activeSlide = carouselInner.firstElementChild;
		} else {
			activeSlide.classList.remove('active');
			activeSlide.nextElementSibling.classList.add('active');
			activeSlide = activeSlide.nextElementSibling;
		}
		hightNextNavs();
		setCarouselHeight();
	}

	function prevSlide() {
		if(!activeSlide.previousElementSibling) {
			activeSlide.classList.remove('active');
			carouselInner.lastElementChild.classList.add('active');
			activeSlide = carouselInner.lastElementChild;
		} else {
			activeSlide.classList.remove('active');
			activeSlide.previousElementSibling.classList.add('active');
			activeSlide = activeSlide.previousElementSibling;
		}
		hightPrevNavs();
		setCarouselHeight();
	}

	function autoPlayCarousel() {
		timerId = setInterval(function() {
			nextSlide();
		}, animationDuration);
	}

	function initCarouselNavs(arr) {
		let slides = arr;
		let navsCarousel = document.createElement('div');

		navsCarousel.className = 'carousel__navs';

		for (var i = slides.length - 1; i >= 0; i--) {
			let span = document.createElement('span');
			navsCarousel.appendChild(span);
		};

		carousel.appendChild(navsCarousel);
	}

	function initCarouselControl() {
		let carouselControl = document.createElement('div');
		let prev = document.createElement('div');
		let next = document.createElement('div');

		carouselControl.className = 'carousel__control';
		prev.className = 'carousel__control__prev';
		next.className = 'carousel__control__next';

		prev.textContent = '←';
		next.textContent = '→';

		carouselControl.appendChild(prev);
		carouselControl.appendChild(next);

		prev.addEventListener('click', function(e){
			prevSlide();
			clearInterval(timerId);
			autoPlayCarousel();
		});

		next.addEventListener('click', function(e){
			nextSlide();
			clearInterval(timerId);
			autoPlayCarousel();
		});

		carousel.appendChild(carouselControl);
	}

	setCarouselHeight();
	autoPlayCarousel();
	initCarouselNavs(slides);
	initCarouselControl();
	hightNextNavs();
}

let carouselArr = document.querySelectorAll('.carousel');

for (var i = carouselArr.length - 1; i >= 0; i--) {
	new Carousel({
		carousel: carouselArr[i],
	})
};

