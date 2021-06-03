let productItems = []

for (let i in order.items) {
  productItems.push(
    `
      <mj-section css-class="white-background" padding="0">
        <mj-group width="100%">
          <mj-column width="3%">
            <mj-text font-size="14px">${order.items[i].id}</mj-text>
          </mj-column>
          <mj-column width="97%">
            <mj-text padding-left="30px" padding-bottom="0" font-size="14px"> 
              ${order.items[i].description}
            </mj-text>
          </mj-column>
        </mj-group>
        <mj-column width="100%">
          <mj-table table-layout="fixed" font-size="12px" align="center" width="100%" padding="0">
            <tr style="text-align:center;color:#9fa7b1;">
              <th>QTY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
            <tr style="text-align:center;">
              <td>${order.items[i].qty}</td>
              <td>BHD ${order.items[i].price}</td>
              <td>BHD ${order.items[i].total}</td>
            </tr>
          </mj-table>
        </mj-column>
      </mj-section>
    `
  )
}

const templateHead = `
  <mj-head>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900" /> 
    <mj-attributes>
      <mj-all font-family="Roboto" color="#5e6977" />
    </mj-attributes>
    <mj-style inline="inline">
      .wrapper {
        position: relative;
        border: 1px solid #C28C48;
      }
      .gray-background {
        background-image: url('${assets.gray_background}');
      }
      .white-background {
        background-image: url('${assets.white_background}');
      }
      .maxwidth {
        max-width: 200px;
      }
      .ma-bg {
        background: url('${assets.MA_BG}');
      }
      body {
        padding: 20px 0;
        background: #F4F4F4;
      }
    </mj-style>
  </mj-head>
`

const headerSection = `
  <mj-section css-class="ma-bg" padding="8px 0px">
    <mj-column>
      <mj-image width="100px" src="${assets.MA_Logo}"></mj-image>
      <mj-image width="250px" src="${assets.MA_Logo_Text}" alt="MOSTLY ARTISTIC"></mj-image>
    </mj-column>
  </mj-section>
`

const helloSection = `
  <mj-section css-class="gray-background" border="16px double #fdfffc">
    <mj-column width="65%">
      <mj-text font-size="16px" font-weight="bold">
        Hello ${order.customerName},
      </mj-text>
      <mj-text font-size="16px">
        Thanks for your recent purchase, please find the receipt below.
      </mj-text>
    </mj-column>
    <mj-column width="35%">
      <mj-image width="60px" src="${assets.receipt}"></mj-image>
    </mj-column>
  </mj-section>
`

const itemsHeaderSection = `
  <mj-section css-class="white-background" padding-bottom="0">
    <mj-column width="100%">
      <mj-divider border-color="#F4F4F4" padding-top="0"></mj-divider>
      <mj-text padding-left="25px" font-weight="bold" font-size="14px" text-decoration="underline">
        ITEMS
      </mj-text>
    </mj-column>
  </mj-section>
`

const priceSection = `
  <mj-section css-class="white-background">
    <mj-column width="100%">
      <mj-divider border-color="#F4F4F4" padding-top="0"></mj-divider>
      <mj-text padding-left="25px" font-weight="bold" font-size="14px" text-decoration="underline">
        PRICE
      </mj-text>
    </mj-column>
    <mj-group width="100%">
      <mj-column >
        <mj-text align="right">DELIVERY</mj-text>
        <mj-text align="right" font-weight="bold">TOTAL</mj-text>
      </mj-column>
      <mj-column>
        <mj-text>BHD ${order.delivery}</mj-text>
        <mj-text font-weight="bold">BHD ${order.total}</mj-text>
      </mj-column>
    </mj-group>  
  </mj-section>
`

const detailSection = `
  <mj-section css-class="white-background">
    <mj-column width="100%">
      <mj-divider border-color="#F4F4F4" padding-top="0"></mj-divider>
      <mj-text padding-left="25px" font-weight="bold" font-size="14px" text-decoration="underline">
        DETAILS
      </mj-text>
    </mj-column>
    <mj-group width="100%">
      <mj-column>
        <mj-text align="right">ORDER ID</mj-text>
        <mj-text align="right">DATE</mj-text>
        <mj-text align="right">PAYMENT MODE</mj-text>
        <mj-text align="right">ADDRESS</mj-text>
      </mj-column>
      <mj-column css-class="maxwidth">
        <mj-text>${order.id}</mj-text>
        <mj-text>${order.date}</mj-text>
        <mj-text>${order.mode}</mj-text>
        <mj-text>${order.address}</mj-text>
      </mj-column>
    </mj-group>  
  </mj-section>
`

const needHelpSection = `
  <mj-section css-class="white-background" padding-top="0" padding-bottom="0" >
    <mj-column padding="5px">
      <mj-text align="center">Notice something wrong ? <a style="color:#5e6977;" href="mailto:hello@mostlyartistic.com">Contact us</a> and we will be happy to assist you.</mj-text>
    </mj-column>
  </mj-section>
`

const footerSection = `
  <mj-section css-class="ma-bg" padding="5px 0px">
    <mj-column>
      <mj-social font-size="18px" color="#F5EDE3">
        <mj-social-element align="center" icon-size="16px" href="https://instagram.com/mostlyartistic" src="${assets.insta_white}">mostlyartistic</mj-social-element>
        </mj-social>
    </mj-column>
  </mj-section>
`

const mjmlPdfTemplate = `
  <mjml>
    <mj-head>
      <mj-font name="Roboto" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900" /> 
      <mj-attributes>
        <mj-all font-family="Roboto" color="#5e6977" />
      </mj-attributes>
      <mj-style>
        .wrapper {
          position: relative;
          border: 1px solid #C28C48;
        }
        .maxwidth {
          max-width: 200px;
        }
        body {
          padding: 20px 0;
          background: #F4F4F4;
        }
        @media print {
          html { -webkit-print-color-adjust: exact; }
          html, body {
            display: block;
            background: #fff;
            width: 21cm;
            height: 29.7cm;
            margin: 0;
            padding: 5mm 10mm;
          }
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-wrapper padding="0" css-class="wrapper">
        <!-- header section-->
        <mj-section background-color="${pdfAssets.MA_BG}" padding="8px 0px">
          <mj-column>
            <mj-image width="100px" src="${pdfAssets.MA_Logo}"></mj-image>
            <mj-image width="250px" src="${pdfAssets.MA_Logo_Text}"></mj-image>
          </mj-column>
        </mj-section>
        <!-- HELLO SECTION -->
        <mj-section background-color="${pdfAssets.gray_background}" border="16px double #fdfffc" >
          <mj-group width="100%">
            <mj-column width="65%">
              <mj-text font-size="16px" font-weight="bold">
                Hello ${order.customerName},
              </mj-text>
              <mj-text font-size="16px">
                Thanks for your recent purchase, please find the receipt below.
              </mj-text>
            </mj-column>
            <mj-column width="35%">
              <mj-image width="60px" src="${pdfAssets.receipt}"></mj-image>
            </mj-column>
          </mj-group>
        </mj-section>
        <!-- ITEMS HEADER SECTION -->
        ${itemsHeaderSection}
        <!-- PRODUCT ITEMS -->
        ${productItems}
        <!-- PRICE SECTION -->
        ${priceSection}
        <!-- DETAILS SECTION -->
        ${detailSection}
        <!-- HELP TEXT -->
        ${needHelpSection}
        <!-- FOOTER SECTION -->
        <mj-section background-color="${pdfAssets.MA_BG}" padding="5px 0px">
          <mj-column>
            <mj-social font-size="18px" color="#F5EDE3">
              <mj-social-element align="center" icon-size="16px" href="https://instagram.com/mostlyartistic" src="${pdfAssets.insta_white}">mostlyartistic</mj-social-element>
              </mj-social>
          </mj-column>
        </mj-section>
      </mj-wrapper>
    </mj-body>
  </mjml>
`
