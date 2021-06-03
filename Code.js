function myFunction() {
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Actions').addItem('Send Email', 'sendEmail').addToUi()
}

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('receipt');
var data = sheet.getDataRange().getValues();

const emailTo = data[0][1]
const detailsRow = data[2]
const itemsRowStart = 4

var order = {
  date: detailsRow[0],
  id: detailsRow[3],
  customerName: detailsRow[1],
  address: detailsRow[2].toUpperCase(),
  mode: detailsRow[4].toUpperCase(),
  delivery: detailsRow[5].toFixed(3),
  total: detailsRow[6].toFixed(3),
  items: []
}

for (var i = itemsRowStart; i < data.length; i++) {
  order.items.push({
    id: data[i][0].toFixed(0),
    description: data[i][1],
    price: data[i][2].toFixed(3),
    qty: data[i][3].toFixed(0),
    total: data[i][4].toFixed(3)
  })
}

function fetchHtml (data) {
  const mjmlUser = PropertiesService.getScriptProperties().getProperty('mjmlUser');
  const mjmlKey = PropertiesService.getScriptProperties().getProperty('mjmlKey');

  var mjmlTemplate = {
    "mjml": data
  }

  const res = UrlFetchApp.fetch('https://api.mjml.io/v1/render', {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(mjmlTemplate),
    'headers': {
      'Authorization': 'Basic ' + Utilities.base64Encode(mjmlUser + ':' + mjmlKey)
    },
  })

  var parseRes = JSON.parse(res)
  var mjmlHtml = parseRes.html

  return mjmlHtml;
}

function sendEmail() {
  const pdfHtml = fetchHtml(mjmlPdfTemplate)
  
  const getPdf = Utilities.newBlob(pdfHtml, 'text/html').getAs('application/pdf').setName(`receipt-${order.id}`)
  const receiptsFolder = DriveApp.getFolderById('1LobgMhoevEvUjBmcU8hH6chhzuf-yPp6')
  const pdf = receiptsFolder.createFile(getPdf).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW).getId()

  const mjmlEmailTemplate = `
    <mjml>
      ${templateHead}
      <mj-body>
        <mj-wrapper padding="0" css-class="wrapper">
          <!-- header section-->
          ${headerSection}
          <!-- HELLO SECTION -->
          ${helloSection}
          <!-- ITEMS HEADER SECTION -->
          ${itemsHeaderSection}
          <!-- PRODUCT ITEMS -->
          ${productItems}
          <!-- PRICE SECTION -->
          ${priceSection}
          <!-- DETAILS SECTION -->
          ${detailSection}
          <!-- DOWNLOAD SECTION -->
          <mj-section css-class="white-background noprint" padding-bottom="0">
            <mj-column>
              <mj-divider border-color="#F4F4F4" padding-top="0"></mj-divider>
              <mj-button font-weight="bold" color="#ffffff" href="https://drive.google.com/uc?export=view&id=${pdf}">
                DOWNLOAD RECEIPT
              </mj-button>
              <mj-divider border-color="#F4F4F4" padding-bottom="0"></mj-divider>
            </mj-column>
          </mj-section>
          <!-- HELP TEXT -->
          ${needHelpSection}
          <!-- FOOTER SECTION -->
          ${footerSection}
        </mj-wrapper>
      </mj-body>
    </mjml>
  `

  const emailHtml = fetchHtml(mjmlEmailTemplate)
  
  const mailjetUser = PropertiesService.getScriptProperties().getProperty('mailjetUser');
  const mailjetPass = PropertiesService.getScriptProperties().getProperty('mailjetPass');

  const sendMail = UrlFetchApp.fetch('https://api.mailjet.com/v3.1/send', {
    'method' : 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Basic ' + Utilities.base64Encode(mailjetUser + ':' + mailjetPass)
    },
    'payload': JSON.stringify({
      Messages: [
        {
          From: {
            Email: "hello@mostlyartistic.com",
            Name: "Mostly Artistic"
          },
          To: [{
            Email: emailTo,
            Name: order.customerName
          }],
          Subject: `Your purchase receipt for order no. ${order.id}`,
          HTMLPart: emailHtml
        } 
      ]
    })
  })

  return sendMail
}