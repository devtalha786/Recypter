const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
let email = 'xyz@receiptgenerator.shop';

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: email,
      pass: 'Germanshepard2007!', // Change pass here if not working after pass change
    },
});
let templatesJsonPath = path.join(__dirname, '../json/templates.json');

let templateAttrsPath = path.join(__dirname, '../json/template-attrs.json');

function replacePlaceholders(template, values) {
    return template.replace(/{{(.*?)}}/g, (match, key) => {
        return values[key.trim()] || match;
    });
}
async function giveNeededInput(name) {
    // let htmlPath = path.join(__dirname, ('../templates/' + name + '.html'));
    // let htmlFile = fs.readFileSync(htmlPath, {
    //     encoding: 'utf-8',
    // });
    let templatesJson = JSON.parse(fs.readFileSync(templatesJsonPath, {
        encoding: 'utf-8',
    }));
    let templateAttrsJson = JSON.parse(fs.readFileSync(templateAttrsPath, {
        encoding: 'utf-8',
    }));

    let templateObj = templatesJson[name];
    let objInput = {};

    Object.keys(templateObj).forEach((v) => {
        if (templateAttrsJson[v]) {
            objInput[v] = templateAttrsJson[v];
        };
    });

    return objInput;
};

async function getSubject(html) {
    let subjectMatch = html.match(/Subject:\s*(.*)/);
    
    return subjectMatch;
};

async function convertInputToHtml(inputs, name) {
    let htmlPath = path.join(__dirname, ('../templates/' + name + '.html'));
    let htmlFile = fs.readFileSync(htmlPath, {
        encoding: 'utf-8',
    });

    if (inputs.shipping_address) {
        let shippingLines = inputs.shipping_address.split(',').map(item => item.trim());

        inputs['country'] = shippingLines[0];
        inputs['city'] = shippingLines[1];
        inputs['street'] = shippingLines[2];
        inputs['zip_code'] = shippingLines[3];
        inputs['house_number'] = shippingLines[4];
    } else if (inputs.billing_address) {
        let billingLines = inputs.billing_address.split(',').map(item => item.trim());

        inputs['billing_country'] = billingLines[0];
        inputs['billing_city'] = billingLines[1];
        inputs['billing_street'] = billingLines[2];
        inputs['billing_zip_code'] = billingLines[3];
        inputs['billing_house_number'] = billingLines[4];
    };

    let numericKeys = Object.keys(data).filter(key => typeof data[key] === 'number');
    let totalSum = numericKeys.reduce((sum, key) => sum + data[key], 0);

    inputs['price_total'] = totalSum.toString();

    let result = replacePlaceholders(htmlFile, inputs);
    let subject = getSubject(htmlFile);

    return [result, subject];
};

async function sendEmail(inputs, name, to) {
    let html = await convertInputToHtml(inputs, name);

    await transporter.sendMail({
        from: email,
        to: to,
        subject: html[1],
        html: html[0],
    }, async (err, res) => {
        if (err) {
            resolve(false);
        } else {
            resolve(true);
        };
    });
};
module.exports = {
    giveNeededInput,
    sendEmail,
};