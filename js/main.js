const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("status");
    if (status) status.classList.remove("hidden");
    this.reset();
  });
}

/* ===== Automatic Table of Contents (TOC) based on h3 ===== */
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const tocList = document.querySelector('.toc-list');
  if (!content || !tocList) return;

  const headings = content.querySelectorAll('h3');
  const slugify = (text) => text.toLowerCase().trim()
    .replace(/[^a-z0-9\u00C0-\uFFFF]+/g, '-')
    .replace(/^-+|-+$/g, '') || '';

  headings.forEach((h, i) => {
    if (!h.id) h.id = slugify(h.textContent) || `section-${i+1}`;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = 'toc-link text-sm text-gray-700 hover:underline';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(h.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${h.id}`);
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  const tocLinks = document.querySelectorAll('.toc-list a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  headings.forEach((h) => observer.observe(h));
});
