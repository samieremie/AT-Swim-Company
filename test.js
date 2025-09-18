// document.querySelectorAll('.test').forEach(function(button) {
//     button.addEventListener('click', function() {
//         const arrow = this.querySelector('.arrow');
//         if (arrow) {
//             arrow.classList.toggle('active');
//         }
//     });
// });

document.querySelectorAll('.arrow').forEach(function(arrow) {
    arrow.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});
