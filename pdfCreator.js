import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fetch from 'node-fetch';
import * as fs from 'fs';
import { useData } from "/Users/nevoriemer/Downloads/ultimate-react-hook-form-form-master 20.59.50/src/DataContext.js";
const { data } = useData();

    // Fetch the PDF with form fields
    const formUrl = 'https://drive.google.com/uc?export=download&id=14VUT3-pyQmMxmd3IzZZQ6mHbqLbyb0Z1';
    const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    // Fetch the Ubuntu font
    const fontUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
    const fontBytes = fs.readFileSync('DavidLibre-Regular.ttf');
    ;

    // Load the PDF with form fields
    const pdfDoc = await PDFDocument.load(formBytes);

    // Embed the Ubuntu font
    pdfDoc.registerFontkit(fontkit);
    const ubuntuFont = await pdfDoc.embedFont(fontBytes);

    // Get two text fields from the form
    const form = pdfDoc.getForm();
    const nameField = form.getTextField('firstname');
    const lastnameField = form.getTextField('lastname');
    const idField = form.getTextField('ID');
    const rankField = form.getTextField('RANK');

    // Fill the text fields with some fancy Unicode characters (outside
    // the WinAnsi latin character set)
    nameField.setText(data["firstName"]);
    lastnameField.setText(data["lastName"]);
    idField.setText(data["personalID"]);
    rankField.setText(data["ranks"]);

    // **Key Step:** Update the field appearances with the Ubuntu font
    form.updateFieldAppearances(ubuntuFont);

    // Save the PDF with filled form fields
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('./save.pdf', pdfBytes);
