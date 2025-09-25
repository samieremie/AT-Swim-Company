const form = document.querySelector('#contact-form');
const dialog = document.getElementById("successDialog");
const closeBtns = document.querySelectorAll(".closeDialog");

form.setAttribute("novalidate", "");

function validateField(field) {
  const errorEl = field.parentElement.querySelector('.error-message');

  if (!field.validity.valid) {
    field.classList.add("user-invalid");
    errorEl.textContent = field.dataset.error || "Ce champ est obligatoire";
    return false;
  }

  errorEl.textContent = "";
  return true;
}

// Hide error when user focuses
function clearErrorOnFocus(field) {
  const container = field.closest('.user-box');
  const errorEl = container?.querySelector('.error-message');

  field.classList.remove("user-invalid");
  if (errorEl) errorEl.textContent = "";
}

form.querySelectorAll('input').forEach(input => {
  input.addEventListener("blur", () => validateField(input));  // validate when leaving
  input.addEventListener("focus", () => clearErrorOnFocus(input)); // clear when entering
})

closeBtns.forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    // console.log("click on close button");
    dialog.close();
  });
});

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // ---------------- Check validity of form data ----------------
  let isValid = true;

  const fields = form.querySelectorAll('input');

  fields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    }
  })
  
  if (isValid) {
    console.log('submitting');
  } else {
    form.querySelector(":invalid").focus();
    return;
  }

  // ---------------- Send form data ----------------
  // Collect form data
  const formData = new FormData(form);

  // Convert to URLSearchParams (Google Forms accepts application/x-www-form-urlencoded)
  const body = new URLSearchParams();
  formData.forEach((value, key) => body.append(key, value));

  // Google Forms action URL
  const googleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLScPBhOaf3jmeNwrwzg9NoJIez8Fh1kZRO8bMO-3bAADiLAuXg/formResponse";

  // Send the form data via fetch
  fetch(googleFormsURL, {
    method: "POST",
    mode: "no-cors", // Google Forms does not allow CORS, so we use no-cors
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  })
  .then(() => {
    dialog.showModal();
    form.reset(); // Clear form
  })
  .catch((error) => {
    console.error(error);
  });
});