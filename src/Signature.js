import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "material-ui/Paper";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input2 } from "./components/RTLinput";
import SignaturePad from 'react-signature-pad-wrapper'
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Delete } from "@material-ui/icons";
export const Signature = () => {
  const { setValues, data } = useData();
  const history = useNavigate();
  let sigData = '';
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      imageData: data.imageData
    },
    mode: "onChange",
  });
  let sigPad = useRef({});
  
  console.log(data);

  // const onSubmit = (data) => {
  //   data["imageData"] = data.sigData
  //   console.log(data);
  //   setValues(data);
  //   console.log(data);
  //   history("/step3");
  //   setValues(data);
  // };

  function clearSig() {
    sigPad.current.clear();
  }
  function registerSig() {
    sigData = sigPad.current.toDataURL();
    data["imageData"] = sigData
    console.log(sigData)
    console.log(data)
    history("/step3");
  }

  
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
      חתום כאן
      </Typography>
      <Form onSubmit={handleSubmit(registerSig)}>
        <Box style={{ border: '2px solid black' }}>
          <SignaturePad
            options={{ minWidth: 2, maxWidth: 3, penColor: 'rgb(66, 133, 244)', dotSize: 2 }}
            ref={sigPad}
          />
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={clearSig}
        >
        מחק
        </Button>
        <Button
          name="imageData"
          variant="outlined"
          ref={register}
          onClick={registerSig}
          {...console.log(sigData)}
         
        >
        שמור
        </Button>
        <PrimaryButton>המשך</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
