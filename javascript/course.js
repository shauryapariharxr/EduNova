// EduNova · Course catalog filtering
document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('#courseGrid .course-card');
  const searchInput = document.getElementById('courseSearch');
  const noResults = document.getElementById('noResults');

  let activeFilter = 'all';

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const title = card.querySelector('h3').textContent.toLowerCase();
      const matchesSearch = query === '' || title.includes(query);
      const show = matchesCategory && matchesSearch;

      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    noResults.hidden = visibleCount !== 0;
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeFilter = pill.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);
});
