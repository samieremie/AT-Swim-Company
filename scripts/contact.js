const form = document.querySelector('#contact-form');

function validateField(field) {
  const errorEl = field.parentElement.querySelector('.error-message');

  if (!field.validity.valid) {
    console.log('field is invalid');
    errorEl.textContent = "This field is required";
    return false;
  }

  console.log('field is valid');
  return true;
}

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  let isValid = true;

  const fields = form.querySelectorAll('input');

  fields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    }
  })
  // Check if the email is valid
  const email = document.querySelector('#email').value;
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      return;
  }
  console.log('Email:', email);
  
  if (isValid) {
    console.log('submitting');
  } else {
    console.log('error');
  }

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
    form.reset(); // Clear form
  })
  .catch((error) => {
    console.error(error);
  });
});

