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

const toast = document.querySelector('.toast');
document.querySelectorAll('[data-download]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    toast.classList.add('show');
    window.clearTimeout(window.downloadToastTimer);
    window.downloadToastTimer = window.setTimeout(() => toast.classList.remove('show'), 3600);
  });
});
