document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toggle-theme");
  if (!button) return;

  button.addEventListener("click", async () => {
    const current = document.body.dataset.theme || "light";
    const next = current === "dark" ? "light" : "dark";

    await fetch("/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ theme: next })
    });

    location.reload();
  });
});