import nodemailer from "nodemailer";

const RECAPTCHA_SECRET_KEY = "6Lc2_XYlAAAAAOSI_46Md-SzyHQeILMa5vDGl2-w";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "jaimelanda.tech@gmail.com",
    pass: "jqzttfjmsgfhktwu",
  },
});

export const createContactUs = async (req, res) => {
  const { reCaptcha, phone, name, email, subject, country, message } = req.body;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${reCaptcha}`;

  await fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
      if (google_response.success) {
        try {
          transporter.sendMail({
            from: email,
            to: "jaimelanda.tech@gmail.com",
            subject: subject,
            text: `Nombre: ${name}, Teléfono: ${phone}, País:${country}, Correo: ${email}\n ${message}`,
          });
          return res
            .status(200)
            .json({ message: "Mensaje enviado correctamente" });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Error al enviar el mensaje" });
        }
      }
      return res.status(400).json({ error: "Invalid Recaptcha" });
    })
    .catch((error) => res.json({ error }));
};
