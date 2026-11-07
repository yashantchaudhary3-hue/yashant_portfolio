const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const year = document.querySelector("#year");

if (year) year.textContent = new Date().getFullYear();

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "Sending your message…";
  status.classList.remove("error");

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  try {
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Your message could not be sent.");
    status.textContent = result.message;
    form.reset();
  } catch (error) {
    status.textContent = error.message || "Something went wrong. Please try again.";
    status.classList.add("error");
  } finally {
    submitButton.disabled = false;
  }
});
