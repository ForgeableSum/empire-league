const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

reveals.forEach((element) => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(!isExpanded));
    answer.hidden = isExpanded;
  });
});

const plannedFeaturesToggle = document.querySelector('.planned-features-toggle');
if (plannedFeaturesToggle) {
  plannedFeaturesToggle.addEventListener('click', () => {
    const isExpanded = plannedFeaturesToggle.getAttribute('aria-expanded') === 'true';
    const plannedFeatures = document.getElementById(plannedFeaturesToggle.getAttribute('aria-controls'));
    plannedFeaturesToggle.setAttribute('aria-expanded', String(!isExpanded));
    plannedFeaturesToggle.querySelector('span').textContent = isExpanded ? 'Show Planned Features' : 'Hide Planned Features';
    plannedFeatures.hidden = isExpanded;
  });
}

const downloadModal = document.querySelector('.download-modal');
const downloadModalClose = document.querySelector('.download-modal-close');

document.querySelectorAll('[data-download]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    downloadModal.showModal();
  });
});

downloadModalClose.addEventListener('click', () => downloadModal.close());
downloadModal.addEventListener('click', (event) => {
  if (event.target === downloadModal) downloadModal.close();
});
