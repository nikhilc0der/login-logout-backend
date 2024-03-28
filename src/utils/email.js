import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "nikhilcallsmaster12@gmail.com",
      pass: "ichjbdarzqxgxydw",
    },
  });

  const emailOptions = {
    from: "nikhilcallsmaster12@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: `<!DOCTYPE html>
    //     <html>
    //     <head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1">
    //     <style>
    //     .card {
    //       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    //       transition: 0.3s;
    //       width: 100%;
    //     }

    //     .card:hover {
    //       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    //     }

    //     .container {
    //       padding: 2px 16px;
    //     }
    //     </style>
    //     </head>
    //     <body>
    //     <div class="card">

    //       <div class="container">

    //         hello world

    //       </div>
    //     </div>

    //     </body>
    //     </html>
    //     `,
  };

  await transporter.sendMail(emailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export { sendEmail };
