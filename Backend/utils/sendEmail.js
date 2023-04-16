import nodemailer from 'nodemailer';

const sendEmail =async (email,subject,text) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: process.env.EMAIL_PORT,
            secure: Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        const info= await transporter.sendMail({
            from : process.env.USER,
            to:email,
            subject:subject,
            // text:`This link will expired within 15 minutes use it befor expired or else generate new link and continue the process  ${text}`,
            html:`  <div style="display: flex; justify-content: center; align-items: center; height: 80vh; width: 100vw; ">
            <div className="border" style="height: 300px; width: 400px; border: 3px solid red; padding: 10px; border-radius: 15px;">
                <h1 style="background-color: grey; color: white; border: 3px solid red; border-radius: 5px 5px 0 0; display:flex;align-items: center !important; margin:0px"><img style="width: 50px; padding: 5px; margin-left: 13px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" alt=""> 
                <span style="display:flex; padding-top: 11px;">Bulk Email Tool</span>
                </h1>
                <h3>${subject}</h3>
                <hr>
                <p>This link will expire in 15 minutes please complete the process before that.</p>
                <a href="${text}" target="_blank">click here</a>

            </div>
        </div>
            `
        });
        console.log("Ssk info", info)

        return info
    } catch (error) {
        console.log("Ssk error", error)
        return error
    }
}

export default sendEmail ;