import React, { useState } from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useData } from "./DataContext";
import { MainContainer } from "./components/MainContainer";
import { PrimaryButton } from "./components/PrimaryButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import { collection, addDoc, setDoc, doc, where, getDocs, query } from "firebase/firestore";
import { db } from "./firebase-config"
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver';
import { Button } from "@mui/material";
import download from "downloadjs";
import fontkit from '@pdf-lib/fontkit';

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});
export const Result = () => {
  const [success, setSuccess] = useState(false);
  const styles = useStyles();
  const { data } = useData();
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
  const { files } = data;
  const collectionRef = collection(db, "Members")


  
    const flattenForm = async () => {
      // Fetch the PDF with form fields
      const formUrl = 'https://firebasestorage.googleapis.com/v0/b/perekmesimaapp.appspot.com/o/newTofes%20(2).pdf?alt=media&token=eeb09f39-c328-42ae-b185-034df0f83972';
      
      const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formBytes);
      console.log(pdfDoc.context.header.toString());
      // Fetch the Ubuntu font
      const fontUrl = 'https://firebasestorage.googleapis.com/v0/b/perekmesimaapp.appspot.com/o/DavidLibre-Regular.ttf?alt=media&token=7fa3b6aa-9f68-4823-9620-55042a0417b5';
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  
      ;
  
      // Load the PDF with form fields
     
  
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
  
      // Trigger the browser to download the PDF document
      download(pdfBytes, data["personalID"] , "application/pdf");
      }
    
    


  const onSubmit = async () => {
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }
    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    var object = {};

    formData.forEach(function (value, key) {
      object[key] = value;
    });

    var objIndex = Object.values(object);
    var keyIndex = Object.keys(object).indexOf('personalID');
    let dupValue = objIndex[keyIndex];

    const q = query(collectionRef, where("personalID", "==", dupValue));
    const querySnapshot = await getDocs(q);
    let a = true;
    querySnapshot.forEach((doc1) => {
      console.log(doc1.id, " => ", doc1.data());
      setDoc(doc(collectionRef, doc1.id), object);
      a = false;
      Swal.fire({
        icon: "success",
        title: "!מעולה",
        text: "!הפרטים שלך נקלטו במערכת",
        confirmButtonText: "אוקיי"
      });
      setSuccess(true);
    });
    if (a) { await addDoc(collectionRef, object); }
    
 /*    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
     
    } */
  };
  if (success) {
    return <Confetti />;}
/*   
  }
 */ 
  return (
    <>
      <MainContainer>
        
        <Typography component="h2" variant="h5">
          רגע לפני ששולחים
        </Typography>
        <Button onClick={flattenForm}>
          תלחץ לשמור תפידיאף
        </Button>
        <TableContainer className={styles.root} component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>קטגורייה</TableCell>
                <TableCell align="right">נתונים</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row">
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right">{entry[1].toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {files && (
          <>
            <Typography component="h2" variant="h5">
              קבצים
            </Typography>
            <List>
              {files.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        <PrimaryButton onClick={onSubmit}>שלח</PrimaryButton>
        <Link to="/">התחל מחדש</Link>
      </MainContainer>
    </>
  );
};
