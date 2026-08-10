// Wires up the public "Feedback & Ratings" section: star picker, submit to
// /api/feedback (backed by a JSON file in the GitHub repo), live average
// rating, and a scrolling list of recent testimonials.

let selectedRating = 0;

function initStars() {
  const stars = document.querySelectorAll("#starPicker .star");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value, 10);
      paintStars(selectedRating);
    });
    star.addEventListener("mouseenter", () => paintStars(parseInt(star.dataset.value, 10)));
  });
  const picker = document.getElementById("starPicker");
  if (picker) picker.addEventListener("mouseleave", () => paintStars(selectedRating));
}

function paintStars(rating) {
  document.querySelectorAll("#starPicker .star").forEach(star => {
    star.classList.toggle("filled", parseInt(star.dataset.value, 10) <= rating);
  });
}

function starsHTML(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++) out += `<span class="mini-star ${i <= rating ? "filled" : ""}">★</span>`;
  return out;
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [name, secs] of units) {
    const val = Math.floor(seconds / secs);
    if (val >= 1) return `${val} ${name}${val > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

async function submitFeedback(e) {
  e.preventDefault();
  const status = document.getElementById("feedbackStatus");
  const form = document.getElementById("feedbackForm");
  const name = form.querySelector('[name="fbName"]').value.trim() || "Anonymous";
  const message = form.querySelector('[name="fbMessage"]').value.trim();

  if (!selectedRating) {
    status.textContent = "Please select a star rating first.";
    status.className = "form-note error";
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating: selectedRating, message })
    });
    if (!res.ok) throw new Error((await res.json()).error || "Request failed");

    status.textContent = "Thanks for the feedback!";
    status.className = "form-note success";
    form.reset();
    selectedRating = 0;
    paintStars(0);
    loadTestimonials();
  } catch (err) {
    console.error(err);
    status.textContent = "Something went wrong sending your feedback — please try again.";
    status.className = "form-note error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Feedback →";
  }
}

async function loadTestimonials() {
  const listEl = document.getElementById("testimonialList");
  const avgEl = document.getElementById("avgRatingSummary");
  if (!listEl) return;

  try {
    const res = await fetch("/api/feedback");
    if (!res.ok) throw new Error("Could not load feedback");
    const items = await res.json();

    if (avgEl) {
      if (items.length) {
        const avg = items.reduce((s, i) => s + (i.rating || 0), 0) / items.length;
        avgEl.innerHTML = `${starsHTML(Math.round(avg))} <strong>${avg.toFixed(1)}</strong> from ${items.length} review${items.length > 1 ? "s" : ""}`;
      } else {
        avgEl.textContent = "Be the first to leave feedback!";
      }
    }

    listEl.innerHTML = items.slice(0, 9).map(i => `
      <div class="testimonial-card">
        <div class="mini-stars">${starsHTML(i.rating)}</div>
        <p class="testimonial-msg">${(i.message || "").replace(/</g, "&lt;")}</p>
        <p class="testimonial-meta">— ${(i.name || "Anonymous").replace(/</g, "&lt;")} · ${i.createdAt ? timeAgo(new Date(i.createdAt)) : ""}</p>
      </div>`).join("") || `<p class="section-sub">No feedback yet — be the first!</p>`;

    // New cards just got created — wire up their scroll-reveal + tilt animations (script.js).
    window.initRevealTargets && window.initRevealTargets();
    window.initTiltCards && window.initTiltCards();
  } catch (err) {
    console.warn("Could not load testimonials:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  const form = document.getElementById("feedbackForm");
  if (form) form.addEventListener("submit", submitFeedback);
  loadTestimonials();
});
