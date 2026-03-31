/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.7
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).reframe=t()}(this,function(){"use strict";return function(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n)||-1<r.style.width.indexOf("%"))){var d=(r.getAttribute("height")||r.offsetHeight)/(r.getAttribute("width")||r.offsetWidth)*100,f=document.createElement("div");f.className=n;var s=f.style;s.position="relative",s.width="100%",s.paddingTop=d+"%";var a=r.style;a.position="absolute",a.width="100%",a.height="100%",a.left="0",a.top="0",r.parentNode.insertBefore(f,r),r.parentNode.removeChild(r),f.appendChild(r)}}}});

// Handle responsive video embeds
window.addVideoEmbedsHandlers = function() {
	reframe('iframe[src*="youtube.com"],iframe[src*="vimeo.com"]');
};

window.removeVideoEmbedsHandlers = function() {
	const frameWrappers = document.querySelectorAll('.js-reframe');
	if (frameWrappers) {
		for (let i = 0; i < frameWrappers.length; i += 1) {
			const frameWrapper = frameWrappers[i];
			const frame = frameWrapper.firstChild;
			frame.removeAttribute('style');
			frameWrapper.parentNode.insertBefore(frame, frameWrapper);
			frameWrapper.parentNode.removeChild(frameWrapper);
		}
	}
};

// Handle navigation
function navToggleHandler(e) {
	e.preventDefault();
	document.body.classList.toggle('js-nav-open');
}

window.addMainNavigationHandlers = function() {
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].addEventListener('click', navToggleHandler, false);
		}
	}
};

window.removeMainNavigationHandlers = function() {
	document.body.classList.remove('js-nav-open');
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].removeEventListener('click', navToggleHandler, false);
		}
	}
};

window.addFeaturedSliderHandlers = function() {
	const sliders = document.querySelectorAll('.js-featured-slider');
	sliders.forEach(slider => {
		const slides = slider.querySelectorAll('.slide');
		if (slides.length <= 1) return;

		let currentSlide = 0;
		const nextBtn = slider.querySelector('.js-slider-next');
		const prevBtn = slider.querySelector('.js-slider-prev');

		function showSlide(index) {
			slides.forEach(s => s.classList.remove('is-active'));
			if (index >= slides.length) currentSlide = 0;
			if (index < 0) currentSlide = slides.length - 1;
			slides[currentSlide].classList.add('is-active');
		}

		// Initialize
		showSlide(currentSlide);

		nextBtn.addEventListener('click', () => {
			currentSlide++;
			showSlide(currentSlide);
		});

		prevBtn.addEventListener('click', () => {
			currentSlide--;
			showSlide(currentSlide);
		});

		// Optional: Auto-loop every 8 seconds
		let autoPlay = setInterval(() => {
			currentSlide++;
			showSlide(currentSlide);
		}, 8000);

		slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
		slider.addEventListener('mouseleave', () => {
			autoPlay = setInterval(() => {
				currentSlide++;
				showSlide(currentSlide);
			}, 8000);
		});
	});
};

window.removeFeaturedSliderHandlers = function() {
	// Cleanup logic if needed
};

window.addInsightFilterHandlers = function() {
	const filters = document.querySelectorAll('.js-insight-filter');
	filters.forEach(bar => {
		const btns = bar.querySelectorAll('.insight-filter-bar__btn');
		const grid = bar.closest('.container').querySelector('.js-filterable-grid');
		if (!grid) return;
		const items = grid.children;

		btns.forEach(btn => {
			btn.addEventListener('click', () => {
				// Update active state
				btns.forEach(b => b.classList.remove('is-active'));
				btn.classList.add('is-active');

				const filterValue = btn.getAttribute('data-filter');

				// Filter items
				Array.from(items).forEach(item => {
					const type = item.getAttribute('data-type');
					if (filterValue === 'all' || type === filterValue) {
						item.classList.remove('is-hidden');
					} else {
						item.classList.add('is-hidden');
					}
				});
			});
		});
	});
};

window.removeInsightFilterHandlers = function() {
	// Cleanup if needed
};

window.addEventListener('resize', function () {
  if (document.querySelector('.js-nav-toggle').offsetParent === null) {
    document.body.classList.remove('js-nav-open');
  }
}, true);
