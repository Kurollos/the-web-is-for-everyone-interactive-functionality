document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
    });
  }
});