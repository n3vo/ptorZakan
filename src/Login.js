import React, { useState } from "react";
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
import auth from "./components/routing/auth";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "./firebase-config"
import Swal from "sweetalert2";
import { DotWave } from '@uiball/loaders'


export const hasEmailString = (data2) => {
  {
    var objIndex = Object.values(data2);
    var keyIndex = Object.keys(data2).indexOf('hasEmail');
    let dupValue = objIndex[keyIndex];
    console.log(dupValue);
    if (dupValue === 'true')
      data2["hasEmail"] = true;
    console.log(data2["hasEmail"]);
    if (dupValue === 'false')
      data2["hasEmail"] = false;
    console.log(data2["hasEmail"]);
  }
  {
    var objIndex = Object.values(data2);
    var keyIndex = Object.keys(data2).indexOf('isDati');
    let dupValue = objIndex[keyIndex];
    console.log(dupValue);
    if (dupValue === 'true')
      data2["isDati"] = true;
    console.log(data2["isDati"]);
    if (dupValue === 'false')
      data2["isDati"] = false;
    console.log(data2["isDati"]);
  }
  return data2;
}


const schema = yup.object().shape({
  personalID: yup
    .number()
    .typeError('המספר האישי חייב להיות מספר')
    .test('len', 'המספר האישי חייב להכיל 7 ספרות', val => val.toString().length === 7),
});

export const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const { setValues, data } = useData();
  const history = useNavigate();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      personalID: data.personalID
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const collectionRef = collection(db, "Members")
  let newData = async (data2) => {
    let info = Object.values(data2).toString();
    let q = query(collectionRef, where("personalID", "==", info));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc1) => {
      data2 = doc1.data();
    });

    await hasEmailString(data2);

    return data2;
  };
  const onSubmit = async (data) => {
    setLoading(true);
    let data2 = await newData(data);
    if (data === data2) {
      setLoading(false);
      auth.logout(() => { history("./"); });
      Swal.fire({
        icon: "error",
        title: "המספר האישי לא במערכת",
        text: ".יכול להיות שהמספר הוזן בצורה שגויה אנא נסה שנית",
        confirmButtonText: "אוקיי"
      });
    }
    else {
      auth.login(() => { history("./step1"); });
    }
    setValues(data2);
  };


  return (
    <MainContainer >
      <Typography component="h2" variant="h5">הזדהות</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input2
          dir="rtl"
          ref={register}
          id="personalID"
          type="number"
          label="מספר אישי"
          name="personalID"
          error={!!errors.personalID}
          helperText={errors?.personalID?.message}
        />

        <PrimaryButton disabled={isLoading}>
          {isLoading && (
            <DotWave
              size={40}
              speed={2.5}
              color="gray"
            />
          )}
          {!isLoading && <span>כניסה</span>}
        </PrimaryButton>
      </Form>
    </MainContainer>
  );
};
