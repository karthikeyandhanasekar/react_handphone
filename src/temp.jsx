
    // //create invoice
    // const createinvoice = (details) => {

   
    //     const props = {
    //         outputType: OutputType.Save,
    //         returnJsPDFDocObject: true,

    //         fileName: sessionStorage.getItem("email") + "-" + details.invoice,
    //         orientationLandscape: false,
    //         logo: {
    //             src: brand,
    //             width: 53.33, //aspect ratio = width/height
    //             height: 26.66,
    //             margin: {
    //                 top: 0, //negative or positive num, from the current position
    //                 left: 0 //negative or positive num, from the current position
    //             }
    //         },
    //         business: {
    //             name: "HandPhone",
    //             address: "Albania, Tirane ish-Dogana, Durres 2001",
    //             phone: "(+355) 069 11 11 111",
    //             email: "handpone@gmail.com",
    //             email_1: "admin@handphone.al",
    //             website: "www.handphone.net",
    //         },
    //         contact: {
    //             label: "Invoice issued for:",
    //             name: sessionStorage.getItem("username"),
    //             address: details.address,
    //             phone: details.phone.toLocaleString(),
    //             email: details.email,
    //             otherInfo: "www.website.al",
    //         },
    //         invoice: {
    //             label: `Invoice #:  `,
    //             num: details.invoice,
    //             invDate: `Payment Date: ${details.invoicedate}`,
    //             invGenDate: `Invoice Date: ${details.invoicedate}`,
    //             headerBorder: false,
    //             tableBodyBorder: false,
    //             header: ["#", "Description", "Price", "Quantity", "Total"],
    //             table: cartlist.map((item, index) => {
    //                 return [index + 1,
    //                 item.name,
    //                 item.initialprice.toLocaleString(),
    //                 item.quantity,
    //                 item.updatedprice.toLocaleString()]
    //             }),
    //             invTotalLabel: "Total:",
    //             invTotal: details.total.toLocaleString(),
    //             invCurrency: "ALL",

    //             invDescLabel: "Invoice Note",
    //             invDesc: "Save this invoice for future use..Be Safe Keep Safe",
    //         },
    //         footer: {
    //             text: "The invoice is created on a computer and is valid without the signature and stamp.",
    //         },
    //         pageEnable: true,
    //         pageLabel: "Page ",
    //     };
    //     let pdfCreated = jsPDFInvoiceTemplate.default({ ...props });

    //    // const pdfObject = jsPDFInvoiceTemplate(props);
    //    pdfCreated.jsPDFDocObject.save();
 

// }