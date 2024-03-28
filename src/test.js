const updatePassword = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  const resetUrl = `${req.protocol}://${req.get("host")}/api/vi/users/resetpassword?token=${token}`;
  console.log(resetUrl, "url");
  return res.send(`<!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 100%;
  }
  
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  .container {
    padding: 2px 16px;
  }
  </style>
  </head>
  <body>
  <div class="card">
    <div class="container">
      <form action="#" method="get" id="myForm">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required>
        <br>
        <br>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  </body>
  
  <script>
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const form = document.getElementById("myForm");
  
  function validate() {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match.");
      return false; // Prevent form submission
    }
    return true;
  }
  
  password.onchange = validate;
  confirmPassword.onkeyup = validate;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = ${resetUrl}
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: password.value,
          confirmPassword: confirmPassword.value,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  });
  </script>
  </html>
  `);
});
