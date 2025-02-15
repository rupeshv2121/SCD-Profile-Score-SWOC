document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Getting values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const title = document.getElementById('title').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();

    // Simple validation
    if (!name || !email || !phone || !title || !linkedin) {
        alert("Please fill all the fields!");
        return;
    }

    // Simulated profile update message
    alert("Profile updated successfully!");

    // Here, you can send data to the backend using fetch() or axios
});
