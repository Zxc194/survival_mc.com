const toast = document.getElementById("toast");

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
};

const copyButtons = document.querySelectorAll("[data-copy]");

copyButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const value = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showToast("Скопировано: " + value);
    } catch {
      showToast("Не удалось скопировать");
    }
  });
});

const counters = document.querySelectorAll("[data-count]");

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-count"));
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(interval);
      } else {
        counter.textContent = current;
      }
    }, 18);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

if (counters.length) {
  observer.observe(counters[0]);
}
