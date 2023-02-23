const generatePDF = async (name) => {
    const { PDFDocument, rgb } = PDFLib;
    /*
    const qr = qrcode.generate(name, { // generate QR code details
      width: 100,
      height: 100
    });
    */
    const exBytes = await fetch("./cert/cert.pdf").then((res) => {
      return res.arrayBuffer();
    });
  
    const exFont = await fetch("./fonts/Rubik-Regular.ttf").then((res) => {
      return res.arrayBuffer();
    });
    /*
    const qrCode = await QRCode.toDataURL(`${name}`);
    const qrCodeBytes = await fetch(qrCode).then((res) => {
      return res.arrayBuffer();
    });
    */
  
  
    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);
  
    const pages = pdfDoc.getPages();
    const firstPg = pages[0];
    firstPg.drawText(name, {
      x: 70,
      y: 270,
      size: 40,
      font: myFont,
      color: rgb(0, 0, 0),  
    });

/*
    firstPg.drawText(role, {
        x: 290,
        y: 220,
        size: 24,
        font: myFont,
    });
    */
/*
    firstPg.drawText(startDate, {
        x: 250,
        y: 170,
        size: 24,
        font: myFont,
    });
    */
  
   /*
    const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);
    firstPg.drawImage(qrCodeImage, {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    });
    */
  

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, "Kartexa Certificate.pdf", { autoBom: true });
  };
  
  const downloadBtn = document.querySelector(".download-btn");
  const printBtn = document.querySelector(".print-btn");
  const inputVal = document.querySelector("#name");
//const inputRole = document.querySelector("#role");

  
  downloadBtn.addEventListener("click", () => {
    const val = inputVal.value;
  //  const role = inputRole.value;
    generatePDF(val);
  });


  printBtn.addEventListener("click", async () => {
    const val = inputVal.value;
    const pdfDataUri = await generatePDF(val);
    const blob = await fetch(pdfDataUri).then((res) => res.blob());
    const pdfUrl = URL.createObjectURL(blob);
    const pdfWindow = window.open(pdfUrl);
    pdfWindow.print();
  });
  