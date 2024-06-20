const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSMAIL,
    },
});


// Adresse e-mail statique en copie
const ccEmail = "dickobenjmohamed@gmail.com";


exports.sendEmail = async (req, res) => {
    try {
        // console.log(process.env.EMAIL)
        const { to, subject, html } = req.body;

        // Message personnalisé avec HTML
        const customHtml = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F0F5F9;">

        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1E2022; color: #C9D6DF; text-align: center;">
            <h2 style="color: #C9D6DF;">Bonjour,</h2>
            <p style="color: #C9D6DF;">Nous avons bien reçu votre message :</p>
            <p style="margin-bottom: 20px;color: #C9D6DF"><strong>${html}</strong></p>
            <p style="color: #C9D6DF;">Merci de nous avoir contactés!</p>
        
        </div>
    
    </body>
    
    `;

        const mailOptions = {
            from: process.env.EMAIL,
            to,
            cc: ccEmail,
            subject,
            html: customHtml,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};