const form = document.querySelector('#contact-form');
const status = document.getElementById("status");

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  alert('Form data captured! Check the console for details.');
  // Check if the email is valid
  const email = document.querySelector('#email').value;
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
  }
  console.log('Email:', email);

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
    status.textContent = "Formulaire envoyé avec succès !";
    form.reset(); // Clear form
  })
  .catch((error) => {
    console.error(error);
    status.textContent = "Erreur lors de l'envoi du formulaire.";
  });
});