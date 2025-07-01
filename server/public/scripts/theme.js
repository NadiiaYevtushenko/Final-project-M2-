document.getElementById('toggle-theme')?.addEventListener('click', async () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  try {
    await fetch('/set-theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: newTheme })
    });
    location.reload();  
  } catch (err) {
    console.error('Помилка перемикання теми:', err);
  }
});