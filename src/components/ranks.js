import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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

const ReactHookFormSelect = ({
    name,
    label,
    control,
    defaultValue,
    children,
    ...props
}) => {
    const labelId = `${name}-label`;
    return (
        
        <FormControl margin='none' fullWidth variant="outlined" {...props}>
            <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Controller
                        as={
                            <Select labelId={labelId} label={label}>
                                {children}
                            </Select>
                        }
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                />
                </ThemeProvider>
        </CacheProvider>
        </FormControl>
            
    );
};
export default ReactHookFormSelect;