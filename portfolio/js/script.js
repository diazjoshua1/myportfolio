(function () {
	// Mobile navigation toggle
	const menuButton = document.querySelector('.menu-btn');
	const navLinks = document.querySelector('.nav-links');
	if (menuButton && navLinks) {
		menuButton.addEventListener('click', () => {
			navLinks.classList.toggle('open');
			menuButton.setAttribute('aria-expanded', navLinks.classList.contains('open'));
		});
	}

	// Close menu when clicking a link (mobile)
	if (navLinks) {
		navLinks.addEventListener('click', (e) => {
			const target = e.target;
			if (target.tagName === 'A' && navLinks.classList.contains('open')) {
				navLinks.classList.remove('open');
				menuButton && menuButton.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Newsletter form (on blog page)
	const newsletterForm = document.querySelector('#newsletter-form');
	if (newsletterForm) {
		newsletterForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const emailInput = newsletterForm.querySelector('input[type="email"]');
			const email = (emailInput && emailInput.value || '').trim();
			const valid = /.+@.+\..+/.test(email);
			if (!valid) {
				alert('Please enter a valid email address.');
				return;
			}
			newsletterForm.reset();
			alert('Thanks for subscribing!');
		});
	}

	// Image lightbox for blog post thumbnails
	function openLightbox(src) {
		const modal = document.getElementById('image-modal');
		if (!modal) return;
		const modalImg = modal.querySelector('img');
		modalImg.src = src;
		modal.classList.add('open');
	}

	function closeLightbox() {
		const modal = document.getElementById('image-modal');
		if (modal) modal.classList.remove('open');
	}

	document.addEventListener('click', (e) => {
		const t = e.target;
		if (t && t.classList && t.classList.contains('lightbox')) {
			e.preventDefault();
			const src = t.getAttribute('data-full') || t.getAttribute('src');
			openLightbox(src);
		}
		if (t && (t.id === 'image-modal' || t.classList.contains('modal-close'))) {
			closeLightbox();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeLightbox();
	});

	// Simple current nav link highlighting (based on filename)
	const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
	const active = document.querySelector(`.nav-links a[href$="${path || 'index.html'}"]`);
	if (active) active.classList.add('active');
})();


