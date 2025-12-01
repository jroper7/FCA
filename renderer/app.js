async function navigateTo(viewName) {
  const viewPath = `views/${viewName}.html`;

  try {
    const html = await fetch(viewPath).then(res => res.text());
    document.getElementById("app").innerHTML = html;
  } catch (err) {
    console.error("Failed to load view:", viewName, err);
  }
}

window.navigateTo = navigateTo;

// Start with login page
navigateTo("admin/dashboard");
