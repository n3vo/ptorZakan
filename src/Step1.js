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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Grid from "@material-ui/core/Grid";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "./firebase-config"
import { Controller } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormSelect from "./components/ranks"
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "השם הפרטי לא יכול לכלול מספרים")
    .required("חובה למלא את השם הפרטי"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "השם משפחה לא יכול לכלול מספרים")
    .required("חובה למלא את השם משפחה"),
  isDati: yup
    .boolean(),
  datiORishy: yup
    .string()
  ,
  shapeOfBeard: yup
    .string()
  ,
  ranks: yup
    .string()
  ,
  date: yup
    .string()

});



export const Step1 = () => {
  const [value, setValue] = useState(new Date());
  const [rank, setRank] = React.useState('');
  const handleChangeRank = (event) => {
    setRank(event.target.value);
  };
  const { setValues, data } = useData();
  const history = useNavigate();
  const [RegOffice, setRegOffice] = useState(data.datiORishylabel);
  const handleChangeRegOffice = (event) => {
    setRegOffice(event.target.value);
  };

  const [RegOffice2, setRegOffice2] = useState(data.shapeOfBeard);
  const handleChangeRegOffice2 = (event) => {
    setRegOffice2(event.target.value);
  };

  const { register, unregister, handleSubmit, errors, control } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      datiORishylabel: data.datiORishylabel,
      shapeOfBeard: data.shapeOfBeard,
      isDati: data.isDati,
      ranks: data.ranks,
      date: data.date
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {

    console.log(data);
    setValues(data);
    history("/Signature");
    
  };


  console.log(data)

  return (
    <MainContainer >
      <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
      <Typography component="h2" variant="h5">שלב 1</Typography>
      <Stack
        spacing={9}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box dir='rtl' m={2}>
            <Grid container
              direction="row"
              alignItems="center"
              spacing={2}>

              <Grid item container
                direction="row"
                alignItems="flex-end"
                justify="center" md={4}>
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
              </Grid>

              <Grid item container
                direction="row"
                alignItems="flex-end"
                justify="center" md={4}>
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
              </Grid>

              <Grid item container
                direction="row"
                alignItems="flex-end"
                justify="center" md={4}>
                <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <ReactHookFormSelect
                      id="ranks"
                      name="ranks"
                      label="דרגה"
                      dir='rtl'
                      control={control}
                      defaultValue=""
                    >
                      <MenuItem value="טוראי">טוראי</MenuItem>
                      <MenuItem value="רב״ט">רב״ט</MenuItem>
                      <MenuItem value="סמל">סמל</MenuItem>
                      <MenuItem value="סמ״ר">סמ״ר</MenuItem>
                    </ReactHookFormSelect>
                  </ThemeProvider>
                </CacheProvider>
              </Grid>

            </Grid>
          </Box>

          <FormGroup dir='rtl'>
            <FormControl>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={8} md={4}>
                  <FormLabel id="datiORishylabel">סיבת הבקשה</FormLabel>
                  <RadioGroup
                    defaultValue={RegOffice}
                    onChange={handleChangeRegOffice}
                  >

                    <FormControlLabel control={
                      <Radio
                        name="datiORishylabel"
                        inputRef={register}
                        value="ishy"
                        {...unregister("isDati")}
                        checked={RegOffice === "ishy"}
                        onChange={handleChangeRegOffice}
                      />} label="אישי" />
                    <FormControlLabel control={
                      <Radio
                        name="datiORishylabel"
                        inputRef={register}
                        value="dati"
                        checked={RegOffice === "dati"}
                        onChange={handleChangeRegOffice}
                      />} label="דתי" />
                  </RadioGroup>
                </Grid>

                <Grid item xs={8} md={4}>
                  <FormLabel id="shapeOfBeardlabel">מה צורת הזקן?</FormLabel>
                  <RadioGroup
                    defaultValue={RegOffice2}
                    onChange={handleChangeRegOffice2}
                  >
                    <FormControlLabel value="full" control={
                      <Radio
                        name="shapeOfBeard"
                        inputRef={register}
                        value="full"
                        checked={RegOffice2 === "full"}
                        onChange={handleChangeRegOffice2}
                      />} label="מלא" />
                    <FormControlLabel value="french" control={
                      <Radio
                        name="shapeOfBeard"
                        inputRef={register}
                        value="french"
                        checked={RegOffice2 === "french"}
                        onChange={handleChangeRegOffice2}
                      />} label="צרפתי" />
                    <FormControlLabel value="other" control={
                      <Radio
                        name="shapeOfBeard"
                        inputRef={register}
                        value="other"
                        checked={RegOffice2 === "other"}
                        onChange={handleChangeRegOffice2}
                      />} label="אחר" />
                  </RadioGroup>
                </Grid>

                {RegOffice === 'dati' && (<Grid item xs={8}>
                  <FormLabel id="isDatilabel">האם אתה דתי?</FormLabel>
                  <FormControlLabel control={<Checkbox
                    defaultValue={data.isDati}
                    defaultChecked={data.isDati}
                    inputRef={register}
                    name="isDati"
                  />} label="אני מקיים אורח חיים דתי" />
                </Grid>)}

                {RegOffice !== 'dati' && (<Grid item xs={8}>
                  <FormLabel id="isDatilabel">האם אתה דתי?</FormLabel>
                  <FormControlLabel control={<Checkbox
                    value={false}
                    checked={false}
                    disabled
                    inputRef={register}
                    name="isDati"
                  />} label="אני מקיים אורח חיים דתי" />
                </Grid>)
                }
                <Grid item container justify="center" xs={8}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DatePicker
                      dir="rtl"
                      label="דוגמה"
                      id="date"
                      inputFormat="dd/MM/yyyy"
                      disabled
                      value={value}
                      inputRef={register}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <Input2 name="date"{...params} />}
                    />
                  </LocalizationProvider>
                </Grid>


              </Grid>
            </FormControl>
          </FormGroup>

          <PrimaryButton>הבא</PrimaryButton>
        </Form>
        </Stack>
        </ThemeProvider>
        </CacheProvider>
    </MainContainer>
  );
};
