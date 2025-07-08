import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Configure your email transporter

let email = 'xyz@receiptgenerator.shop';

let transporter = nodemailer.createTransport({
    // host: 'smtp-mail.outlook.com',
    // port: 587,
    // secure: false,
    // auth: {
    //   user: "saudgul188@gmail.com",
    //   pass: 'Germanshepard2007!', // Change pass here if not working after pass change
    // },
    service: "gmail",
    auth: {
        user: "ziatalhazia@gmail.com",
        pass: 'ydjt ggey gpbn dsko', // Change pass here if not working after pass change
    },
});

function replacePlaceholders(template, values) {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        return values[key.trim()] || match;
    });
}

async function convertInputToHtml(inputs, templateName) {
    try {
        const htmlPath = path.join(process.cwd(), 'src/templates', `${templateName}.html`);
        const htmlFile = fs.readFileSync(htmlPath, 'utf-8');

        // Calculate total from the items array if it exists
        // if (inputs.items && Array.isArray(inputs.items)) {
        //     let totalSum = inputs.items.reduce((sum, item) => {
        //         const price = parseFloat(item.price || 0);
        //         const quantity = parseFloat(item.quantity || 1);
        //         return sum + (price * quantity);
        //     }, 0);
            
        //     // Add price_total to inputs object
        //     inputs.price_total = totalSum.toFixed(2);
        // }
        // // Fallback for direct data calculation
        // else if (inputs.data) {
        //     let totalSum = 0;
        //     Object.entries(inputs.data).forEach(([key, value]) => {
        //         if (key.toLowerCase().includes('price') || key.toLowerCase().includes('amount')) {
        //             const numValue = parseFloat(value);
        //             if (!isNaN(numValue)) {
        //                 totalSum += numValue;
        //             }
        //         }
        //     });
        //     inputs.price_total = totalSum.toFixed(2);
        // }

        const html = replacePlaceholders(htmlFile, inputs);

        // Use templateName as subject
        const subject = templateName;

        return { html, subject };
    } catch (error) {
        console.error('Error converting input to HTML:', error);
        throw error;
    }
}

// POST handler for the API route
export async function POST(request) {
    try {
        const body = await request.json();
        const { inputs, templateName, to } = body;
        console.log("Original inputs:", inputs);

        if (!inputs || !templateName || !to) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let { html, subject } = await convertInputToHtml(inputs, templateName);
        let changeSubject=subject
        // console.log("subject ____",subject )
        switch(changeSubject){
            case "stockx_new_ordered":
                changeSubject="StockX Order Confirmed: 👍 Order Confirmed: Jordan 6 Retro UNC (Size 7.5 UK)"
                break;
            case "stockx_new_verified":
                changeSubject="StockX Order Verified: ✅ Order Verified & Shipped: Hellstar Glitter P2P T-shirt (Size S)" 
                break;
            case "apple":
                changeSubject ="Apple: We're processing your order W8656304361"
                break;
            case "amazon":
                changeSubject ="Amazon: Your Amazon.com order of Tobacco Vanille by Tom Ford fo..."
                break;
            case "balenciaga":
                changeSubject ="Balenciaga: Your Balenciaga Order Registration"
                break;
            case "farfetch":
                changeSubject ="Farfetch: Your order will be with you soon"
                break;
            case "goat":
                changeSubject="Goat: Your GOAT order #720367028"
                break;
            case "grail-point":
                changeSubject  ="Grail Point: [Grail Point] Otrzymaliśmy twoje zamówienie!"
                break;
            case "grailed":
                changeSubject ="Grailed: Congrats on your purchase!"
                break;
            case "louis-vuitton":
                changeSubject ="Louis Viton: Your Louis Vuitton Order Has been Shipped"
                break;
            case "nike":
                changeSubject ="Nike: Thank you for placing your order"
                break;
            case "moncler":
                changeSubject ="Moncler: Thank you for your order"
                break;
            case "off-white":
                changeSubject ="Off-White: Your order has been confirmed"
                break;
            case "prada":
                changeSubject ="Prada: Your order has been confirmed"
                break;
            case "supreme":
                changeSubject ="Supreme: Your order has been confirmed"
                break;
        }
        console.log("after s ____",changeSubject )
        console.log("")
        // Send email
        await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: email,
                to: to, // Use the 'to' parameter from the request
                subject:changeSubject,
                html: html,
            }, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in email sending:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
