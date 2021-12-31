
    // //create invoice
    // const createinvoice = (details) => {

    //     const company_logo = {
    //         w: 80,
    //         h: 50
    //     };
    //     const comapnyJSON = {
    //         CompanyName: 'HandPhone',
    //         CompanyState: 'Tamil Nadu',
    //         companyEmail: 'handphone@gmail.com',
    //         companyPhno: '+918189457845',
    //     };

    //     const customer_BillingInfoJSON = {
    //         CustomerName: "" + sessionStorage.getItem("username"),
    //         Customer: '37B76C238B7E1Z5',
    //         CustomerAddress: details.address,
    //         CustomerEmail: details.email,
    //         CustomerPhone: "+91" + details.phone,
    //     };


    //     //   const customer_ShippingInfoJSON={
    //     //     CustomerName:sessionStorage.getItem("username"),
    //     //     Customer:'37B76C238B7E1Z5',
    //     //     CustomerAddress:details.address,
    //     //     CustomerEmail:details.email,
    //     //     CustomerPhone : details.phone,
    //     //   };

    //     const invoiceJSON = {
    //         InvoiceNo: "" + details.invoice,
    //         InvoiceDate: details.invoicedate,
    //         TotalAmnt: 'Rs.' + details.total,
    //     }
    //     const fontSizes = {
    //         HeadTitleFontSize: 18,
    //         Head2TitleFontSize: 16,
    //         TitleFontSize: 14,
    //         SubTitleFontSize: 12,
    //         NormalFontSize: 10,
    //         SmallFontSize: 8
    //     };
    //     const lineSpacing = {
    //         NormalSpacing: 12,
    //     };
    //     let doc = new jsPDF('p', 'pt');
    //     let rightStartCol1 = 400;
    //     let rightStartCol2 = 480;
    //     //let InitialstartX=40;
    //     let startX = 40;
    //     let InitialstartY = 50;
    //     let startY = 0;
    //     //let lineHeights=12;
    //     doc.setFontSize(fontSizes.SubTitleFontSize);
    //     doc.setFont("helvetica");

    //     doc.addImage(brand, 'PNG', startX, startY += 50, company_logo.w, company_logo.h);
    //     doc.text(comapnyJSON.CompanyName, startX, startY += 15 + company_logo.h, 'left');
    //     doc.setFontSize(fontSizes.NormalFontSize);




    //     doc.text("EMAIL", startX, startY += lineSpacing.NormalSpacing);

    //     doc.text(comapnyJSON.companyEmail, 80, startY);

    //     doc.text("Phone: ", startX, startY += lineSpacing.NormalSpacing);

    //     doc.text(comapnyJSON.companyPhno, 80, startY);
    //     let tempY = InitialstartY;

    //     doc.text("INVOICE NO: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);

    //     //  doc.text(invoiceJSON.InvoiceNo, rightStartCol2, tempY);

    //     doc.text("INVOICE Date: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);

    //     doc.text(invoiceJSON.InvoiceDate, rightStartCol2, tempY);


    //     doc.text("Total: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);

    //     doc.text(invoiceJSON.TotalAmnt, rightStartCol2, tempY);

    //     doc.setLineWidth(1);
    //     doc.line(20, startY + lineSpacing.NormalSpacing, 220, startY + lineSpacing.NormalSpacing);
    //     doc.line(380, startY + lineSpacing.NormalSpacing, 580, startY + lineSpacing.NormalSpacing);
    //     doc.setFontSize(fontSizes.Head2TitleFontSize);




    //     //-------Customer Info Billing---------------------
    //     const startBilling = startY;

    //     doc.text("Billing Address,", startX, startY += lineSpacing.NormalSpacing);
    //     doc.text(customer_BillingInfoJSON.CustomerName, startX, startY += lineSpacing.NormalSpacing);
    //     doc.setFontSize(fontSizes.NormalFontSize);


    //     doc.text("Address", startX, startY += lineSpacing.NormalSpacing);

    //     doc.text(customer_BillingInfoJSON.CustomerAddress, 80, startY);




    //     doc.text("EMAIL", startX, startY += lineSpacing.NormalSpacing);

    //     doc.text(customer_BillingInfoJSON.CustomerEmail, 80, startY);

    //     doc.text("Phone: ", startX, startY += lineSpacing.NormalSpacing);

    //     doc.text(customer_BillingInfoJSON.CustomerPhone, 80, startY);
    //     //-------Customer Info Shipping---------------------
    //     let rightcol1 = 340;
    //     let rightcol2 = 400;
    //     startY = startBilling;

    //     doc.text("Shipping Address,", rightcol1, startY += lineSpacing.NormalSpacing);
    //     doc.text(customer_BillingInfoJSON.CustomerName, rightcol1, startY += lineSpacing.NormalSpacing);
    //     doc.setFontSize(fontSizes.NormalFontSize);



    //     doc.text("Address", rightcol1, startY += lineSpacing.NormalSpacing);

    //     doc.text(customer_BillingInfoJSON.CustomerAddress, rightcol2, startY);
    //     doc.text("EMAIL", rightcol1, startY += lineSpacing.NormalSpacing);

    //     doc.text(customer_BillingInfoJSON.CustomerEmail, rightcol2, startY);


    //     doc.text("Phone: ", rightcol1, startY += lineSpacing.NormalSpacing);

    //     doc.text(customer_BillingInfoJSON.CustomerPhone, rightcol2, startY);

    //     let header = function (data) {
    //         doc.setFontSize(8);
    //         doc.setTextColor(40);
    //     };
    //     doc.setFontSize(8);

    //     let options = {
    //         beforePageContent: header,
    //         margin: {
    //             top: 50
    //         },
    //         styles: {
    //             overflow: 'linebreak',
    //             fontSize: 8,
    //             rowHeight: 'auto',
    //             columnWidth: 'wrap'
    //         },
    //         columnStyles: {
    //             1: { columnWidth: 'auto' },
    //             2: { columnWidth: 'auto' },
    //             3: { columnWidth: 'auto' },
    //             4: { columnWidth: 'auto' },
    //             5: { columnWidth: 'auto' },
    //             6: { columnWidth: 'auto' },
    //         },
    //         startY: startY += 50
    //     };
    //     // const columns = Object.keys(details)
    //     // const rows = details.cartlist
    //     // doc.table(startX, startY, rows, columns, { autoSize: true });
    //     // //-------Invoice Footer---------------------
    //     // rightcol1 = 340;
    //     // rightcol2 = 430;

    //     // startY = doc.autoTableEndPosY() + 30;
    //     startY =  330;

    //     doc.setFontSize(fontSizes.NormalFontSize);



    //     doc.text("Grand Total Rs.", rightcol1, startY += lineSpacing.NormalSpacing);

    //     doc.text(invoiceJSON.TotalAmnt, rightcol2 + 25, startY);

    //     doc.text('For ' + comapnyJSON.CompanyName + ',', rightcol2, startY += lineSpacing.NormalSpacing + 25);
    //     doc.text('Authorised Signatory', rightcol2, startY += lineSpacing.NormalSpacing + 25);
    //     doc.save('InvoiceTemplate.pdf');
    // }
    // //     const props = {
    // //         outputType: OutputType.Save,
    // //         returnJsPDFDocObject: true,

    // //         fileName: sessionStorage.getItem("email") + "-" + details.invoice,
    // //         orientationLandscape: false,
    // //         logo: {
    // //             src: brand,
    // //             width: 53.33, //aspect ratio = width/height
    // //             height: 26.66,
    // //             margin: {
    // //                 top: 0, //negative or positive num, from the current position
    // //                 left: 0 //negative or positive num, from the current position
    // //             }
    // //         },
    // //         business: {
    // //             name: "HandPhone",
    // //             address: "Albania, Tirane ish-Dogana, Durres 2001",
    // //             phone: "(+355) 069 11 11 111",
    // //             email: "handpone@gmail.com",
    // //             email_1: "admin@handphone.al",
    // //             website: "www.handphone.net",
    // //         },
    // //         contact: {
    // //             label: "Invoice issued for:",
    // //             name: sessionStorage.getItem("username"),
    // //             address: details.address,
    // //             phone: details.phone.toLocaleString(),
    // //             email: details.email,
    // //             otherInfo: "www.website.al",
    // //         },
    // //         invoice: {
    // //             label: `Invoice #:  `,
    // //             num: details.invoice,
    // //             invDate: `Payment Date: ${details.invoicedate}`,
    // //             invGenDate: `Invoice Date: ${details.invoicedate}`,
    // //             headerBorder: false,
    // //             tableBodyBorder: false,
    // //             header: ["#", "Description", "Price", "Quantity", "Total"],
    // //             table: cartlist.map((item, index) => {
    // //                 return [index + 1,
    // //                 item.name,
    // //                 item.initialprice.toLocaleString(),
    // //                 item.quantity,
    // //                 item.updatedprice.toLocaleString()]
    // //             }),
    // //             invTotalLabel: "Total:",
    // //             invTotal: details.total.toLocaleString(),
    // //             invCurrency: "ALL",

    // //             invDescLabel: "Invoice Note",
    // //             invDesc: "Save this invoice for future use..Be Safe Keep Safe",
    // //         },
    // //         footer: {
    // //             text: "The invoice is created on a computer and is valid without the signature and stamp.",
    // //         },
    // //         pageEnable: true,
    // //         pageLabel: "Page ",
    // //     };
    // //     let pdfCreated = jsPDFInvoiceTemplate.default({ ...props });

    // //    // const pdfObject = jsPDFInvoiceTemplate(props);
    // //    pdfCreated.jsPDFDocObject.save();
    // //     // const jspdf = jsPDF(props)
    // //     // console.log(jspdf);
    // //     // jspdf.addImage(brand, "PNG", 53.66, 23.66)

    // //     // jspdf.save()