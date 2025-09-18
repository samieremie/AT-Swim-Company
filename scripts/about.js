document.querySelectorAll('.question').forEach(function(question) {
  question.addEventListener('click', function() {
    // Find the parent container
    const container = this.parentElement;
    // Find the corresponding response inside the same container
    const response = container.querySelector('.response');
    // Show/ hide response
    if (response) {
      response.classList.toggle('hidden'); // Toggle visibility
    }

    // Arrow animation
    const arrow = this.querySelector('.arrow');
      if (arrow) {
          arrow.classList.toggle('active');
      }
  });
});