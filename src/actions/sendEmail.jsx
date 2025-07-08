"use server";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

async function sendEmail(toEmail) {
  try {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Joining Us!</title>
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
  </head>
  <body
    style="
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      width: 100% !important;
      height: 100% !important;
      margin: 0 auto;
      padding: 0;
      line-height: 1.5;
      color: #191a23;
      background-color: #ffffff;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    "
  >
    <!-- Wrapper for Outlook -->
    <!--[if mso]>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
    <![endif]-->

    <div style="max-width: 800px; margin: 0 auto; padding: 20px">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        style="margin: auto"
      >
        <tr>
          <td align="center" style="padding: 20px 0">
            <!-- Header -->
            <h1
              style="
                background-color: #b9ff66;
                display: inline-block;
                padding: 8px 16px;
                border-radius: 4px;
                margin-bottom: 24px;
                font-weight: 600;
                font-size: 24px;
                line-height: 1.3;
                margin: 0;
              "
            >
              Thank You for Joining Us!
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding: 20px 0">
            <p
              style="
                font-size: 18px;
                font-weight: 500;
                margin: 0 0 32px 0;
                text-align: center;
              "
            >
              We're excited to have you on board. Get ready for an amazing
              journey as we build and grow together!
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 0 0 20px 0">
            <div
              style="
                background-color: #b9ff66;
                display: inline-block;
                padding: 8px 16px;
                border-radius: 4px;
                font-weight: 500;
              "
            >
              Our Roadmap to Success
            </div>
          </td>
        </tr>

        <!-- Roadmap Section -->

        <tr>
          <td
            style="
              background-color: #f5f5f5;
              padding: 20px;
              border-radius: 8px;
              position: relative;
              width: 500px;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

            "
          >
            <!-- Vertical Timeline Line - Positioned absolutely within the container -->
            <div
              style="
                position: absolute;
                left: 55%;
                top: 40px;
                bottom: 40px;
                width: 2px;
                background-color: #000;
                z-index: 1;
              "
            ></div>

            <!-- Step 1 -->
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              style="margin-bottom: 20px; position: relative"
            >
              <tr>
                <td
                  style="
                    width: 70px;
                    padding-right: 40px;
                    vertical-align: center;
                  "
                >
                  <!-- Increased padding-right from 16px to 40px -->
                   <div
  style="
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: table; /* Use table display */
    text-align: center; /* Centers horizontally */
    vertical-align: middle; /* Centers vertically */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 28px;
    color: #000000;
    line-height: 70px; /* Ensures vertical centering of text */
  "
>
  <div
    style="
      display: table-cell;
      vertical-align: middle; /* Centers the content vertically */
    "
  >
    1
  </div>
</div>
                </td>
                <td style="vertical-align: top; padding-left: 24px">
                  <!-- Added padding-left -->
                  <div
                    style="
                      background-color: #b9ff66;
                      padding: 16px;
                      border-radius: 8px;
                      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                      position: relative;
                      z-index: 2;
                      text-align: center;
                    "
                  >
                    <h4 style="margin: 0 0 8px 0">Launch Landing Page</h4>
                    <p style="margin: 0; font-size: 14px; font-weight: 400">
                      Create a compelling and informative pre-launch landing
                      page to capture interest and gather potential user emails.
                    </p>
                  </div>
                </td>
              </tr>
            </table>

            <!-- Step 2 -->
            <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="margin-bottom: 20px; position: relative"
          >
            <tr>
              <td
                style="
                  width: 70px;
                  padding-right: 40px;
                  vertical-align: center;
                "
              >
                <!-- Increased padding-right from 16px to 40px -->
                 <div
  style="
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: table; /* Use table display */
    text-align: center; /* Centers horizontally */
    vertical-align: middle; /* Centers vertically */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 28px;
    color: #000000;
    line-height: 70px; /* Ensures vertical centering of text */
  "
>
  <div
    style="
      display: table-cell;
      vertical-align: middle; /* Centers the content vertically */
    "
  >
    2
  </div>
</div>
              </td>
              <td style="vertical-align: top; padding-left: 24px">
                <!-- Added padding-left -->
                <div
                  style="
                    background-color: #b9ff66;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    position: relative;
                    z-index: 2;
                    text-align: center;
                  "
                >
                  <h4 style="margin: 0 0 8px 0">Developing the App</h4>
                  <p style="margin: 0; font-size: 14px; font-weight: 400">
                    Our team is hard at work designing and building an app
                    that meets your needs, focusing on delivering a seamless
                    user experience.
                  </p>
                </div>
              </td>
            </tr>
          </table>
             <!--  -->
           

            <!-- Step 3 -->
            <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="margin-bottom: 20px; position: relative"
          >
            <tr>
              <td
                style="
                  width: 70px;
                  padding-right: 40px;
                  vertical-align: center;
                "
              >
                <!-- Increased padding-right from 16px to 40px -->
                 <div
  style="
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: table; /* Use table display */
    text-align: center; /* Centers horizontally */
    vertical-align: middle; /* Centers vertically */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 28px;
    color: #000000;
    line-height: 70px; /* Ensures vertical centering of text */
  "
>
  <div
    style="
      display: table-cell;
      vertical-align: middle; /* Centers the content vertically */
    "
  >
    3
  </div>
</div>
              </td>
              <td style="vertical-align: top; padding-left: 24px">
                <!-- Added padding-left -->
                <div
                  style="
                    background-color: #B0B7BF;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    position: relative;
                    z-index: 2;
                    text-align: center;
                  "
                >
                <h4 style="margin: 0 0 8px 0">Launching Beta</h4>
                <p style="margin: 0; font-size: 14px; font-weight: 400">
                  Soon, we'll release a beta version to a select group of
                  users. This phase will help us fine-tune the app based on
                  real user insights.
                </p>
                </div>
              </td>
            </tr>
          </table>

         

            <!-- Step 4 -->
            <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="margin-bottom: 20px; position: relative"
          >
            <tr>
              <td
                style="
                  width: 70px;
                  padding-right: 40px;
                  vertical-align: center;
                "
              >
                <!-- Increased padding-right from 16px to 40px -->
                <div
  style="
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: table; /* Use table display */
    text-align: center; /* Centers horizontally */
    vertical-align: middle; /* Centers vertically */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 28px;
    color: #000000;
    line-height: 70px; /* Ensures vertical centering of text */
  "
>
  <div
    style="
      display: table-cell;
      vertical-align: middle; /* Centers the content vertically */
    "
  >
    4
  </div>
</div>
              </td>
              <td style="vertical-align: top; padding-left: 24px">
                <!-- Added padding-left -->
                <div
                  style="
                    background-color: #B0B7BF;;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    position: relative;
                    z-index: 2;
                    text-align: center;
                  "
                >
                <h4 style="margin: 0 0 8px 0">Testing</h4>
                <p style="margin: 0; font-size: 14px; font-weight: 400">
                  We'll conduct rigorous testing to ensure the app is
                  bug-free and performs smoothly, meeting all quality
                  standards.
                </p>
                </div>
              </td>
            </tr>
          </table>
           

            <!-- Step 5 -->
            <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="margin-bottom: 20px; position: relative"
          >
            <tr>
              <td
                style="
                  width: 70px;
                  padding-right: 40px;
                  vertical-align: center;
                "
              >
                <!-- Increased padding-right from 16px to 40px -->
              <div
  style="
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: table; /* Use table display */
    text-align: center; /* Centers horizontally */
    vertical-align: middle; /* Centers vertically */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 28px;
    color: #000000;
    line-height: 70px; /* Ensures vertical centering of text */
  "
>
  <div
    style="
      display: table-cell;
      vertical-align: middle; /* Centers the content vertically */
    "
  >
    5
  </div>
</div>


              </td>
              <td style="vertical-align: top; padding-left: 24px">
                <!-- Added padding-left -->
                <div
                  style="
                    background-color: #B0B7BF;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    position: relative;
                    z-index: 2;
                    text-align: center;
                  "
                >
                <h4 style="margin: 0 0 8px 0">Go Online</h4>
                    <p style="margin: 0; font-size: 14px; font-weight: 400">
                      Finally, we'll launch the app publicly, making it
                      available for everyone to enjoy and benefit from.
                    </p>
                </div>
              </td>
            </tr>
          </table>
         
          </td>
        </tr>

        <!-- Connection Section -->
        <tr>
          <td align="center" style="padding: 32px 0">
            <div
              style="
                background-color: #b9ff66;
                display: inline-block;
                padding: 8px 16px;
                border-radius: 4px;
                margin-bottom: 24px;
                font-weight: 500;
              "
            >
              Want to connect with us?
            </div>

            <p style="font-weight: 500; margin: 16px 0">
              We're committed to keeping you updated every step of the way.
            </p>

            <p style="font-weight: 500; margin: 16px 0">
              Feel free to connect with us anytime if you have any wishes,
              questions, or feedback—we'd love to hear from you!
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="
              background-color: #1a1b1e;
              color: white;
              border-radius: 16px 16px 0 0;
              padding: 32px;
            "
          >
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
            >
              <tr>
                <td style="padding-bottom: 32px">
                  <a href="#" style="color: white; text-decoration: underline"
                    >Visit our Website</a
                  >
                </td>
              </tr>

              <tr>
                <td style="padding-bottom: 32px;
">
                  <div
                    style="
                      background-color: #b9ff66;
                      color: black;
                      padding: 4px 8px;
                      border-radius: 4px;
                      display: inline-block;
                      margin-bottom: 16px;
                      margin-left: 25px;
                    "
                  >
                    Contact us:
                  </div>
                  <div style="margin-bottom: 8px;  text-align: center;">
                    Email: info@MizanMe.com
                  </div>
                  <div style="margin-bottom: 8px;  text-align: center;">Phone: 555-567-8901</div>
                  <div style="margin-bottom: 8px;  text-align: center;"> 
                    Address: 1234 Main St<br />
                    Moonstone City, Stardust State 12345
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <hr
                    style="
                      border: none;
                      border-top: 1px solid rgba(255, 255, 255, 0.1);
                      margin: 32px 0;
                    "
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                  >
                    <tr>
                      <td style="color: rgba(255, 255, 255, 0.7)">
                        © 2024 MizanMe. All Rights Reserved.
                      </td>
                      <td align="right">
                        <a
                          href="#"
                          style="
                            color: rgba(255, 255, 255, 0.7);
                            text-decoration: underline;
                          "
                          >Privacy Policy</a
                        >
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!--[if mso]>
    </td></tr></table>
    <![endif]-->
  </body>
</html>
`;
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"MizanMe" <hello@mizanme.com>',
      to: toEmail,
      subject: "Welcome to MizanMe! 🎉",
      html: htmlContent,
      text: "Thank you for joining MizanMe! We're excited to have you on board.", // Plain text version
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: `Welcome email successfully sent to ${toEmail}`,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Failed to send welcome email",
      details: error.message,
    };
  }
}
async function sendAdminNotification(requestData) {
  try {
    const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Join Request</title>
  </head>
  <body style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; max-width: 800px; margin: 0 auto; padding: 32px; line-height: 1.5; color: #191A23; background-color: #ffffff;">
    <div style="text-align: center;">
      <h1 style="background-color: #b9ff66; display: inline-block; padding: 8px; border-radius: 4px; margin-bottom: 24px; font-weight: 600;">New Join Request! 🔔</h1>

      <div style="background-color: #f5f5f5; padding: 32px; border-radius: 8px; margin-bottom: 32px; text-align: left;">
        <!-- User Details -->
        <div style="background-color: #b9ff66; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">👤 User Information</h4>
          <p style="margin: 0; font-size: 14px; font-weight: 400;">
            <strong>Name:</strong> ${requestData.name}<br>
            <strong>Email:</strong> ${requestData.email}<br>
            <strong>Request Date:</strong> ${new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

   

      <!-- Footer -->
      <div style="margin-top: 32px; font-size: 12px; color: #666;">
        This is an automated message. Please do not reply to this email.
      </div>
    </div>
  </body>
</html>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com", // Note: Changed from smtp.zoho.com to smtp.zoho.in
      port: 465,
      secure: false, // Using TLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"MizanMe System" <' + process.env.GMAIL_USER + ">",
      to: process.env.GMAIL_USER,
      subject: "New Join Request 🔔",
      html: content,
      text: `New join request received from ${requestData.name} (${requestData.email})`, // Plain text version
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: `Admin notification sent successfully`,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Failed to send admin notification",
      details: error.message,
    };
  }
}
export { sendEmail, sendAdminNotification };
