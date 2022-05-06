import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input2 } from "./components/RTLinput";
import * as yup from "yup";



const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "השם הפרטי לא יכול לכלול מספרים")
    .required("חובה למלא את השם הפרטי"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "השם משפחה לא יכול לכלול מספרים")
    .required("חובה למלא את השם משפחה"),
});


export const Step1 = () => {
  const { setValues, data } = useData();
  const history = useNavigate();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    history("/step2");
    setValues(data);
  };

  return (
    <MainContainer >
      <Typography component="h2" variant="h5">שלב 1</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input2
          dir="rtl"
          ref={register}
          id="firstName"
          type="text"
          label="שם פרטי"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input2
          dir="rtl"
          ref={register}
          id="lastName"
          type="text"
          label="שם משפחה"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />


        <PrimaryButton>הבא</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
