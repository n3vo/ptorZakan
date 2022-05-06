import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useData } from "./DataContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input2 } from "./components/RTLinput";
import * as yup from "yup";
import { AsYouType } from 'libphonenumber-js';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("האימייל הוזן בצורה לא נכונה"),
  phoneNumber: yup
  .string()
  .required("חובה למלא את מספר הטלפון")
});

const normalizePhoneNumber = (value) => {
  return (
    new AsYouType('IL').input(value)
  );
};

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useNavigate();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasEmail: data.hasEmail,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const hasEmail = watch("hasEmail");

  const onSubmit = (data) => {
    history("/step3");
    var objIndex = Object.values(data);
    var keyIndex = Object.keys(data).indexOf('hasEmail');
    let dupValue = objIndex[keyIndex];
    console.log(dupValue);
    if(!dupValue)
    {
      console.log("in the if");
      console.log(data["hasEmail"]);
      delete data["email"];
    }
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
      Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Input2
            ref={register}
            id="phoneNumber"
            type="tel"
            label="מספר טלפון"
            name="phoneNumber"
            dir='ltr'
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            required
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        
        
        <FormControlLabel
          control={
            <Checkbox defaultValue={data.hasEmail} defaultChecked={data.hasEmail} color="primary"  inputRef={register} name="hasEmail"/>
          }
          dir='rtl'
          label="האם יש לך כתובת אימייל?"
        />

        {hasEmail && (
          <Input2
          ref={register}
          id="email"
          type="email"
          label="אימייל"
          name="email"
          dir='ltr'
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
