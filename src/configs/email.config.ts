import nodemailer from 'nodemailer';

const sendEmail = async (to: any, subject: any, text: any) => {
    const send = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "108a73e898e88c",
            pass: "ea52008e55d6d1"
        }
    });

    const option = {
        from: `Forget Password <dilip.bijoriya@emorphis.in>`,
        to: to,
        subject: subject,
        html: text
    }

    send.sendMail(option, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("email sent!");
        }
    });
}

export default sendEmail;