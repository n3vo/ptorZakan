import React, { forwardRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import FormControl from '@mui/material/FormControl';

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const rtlAlign = forwardRef((props, ref) => {
  return (
      <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
              <div dir="rtl">
                  <FormControl>
                      inputRef={ref}
                  </FormControl>
              </div>
          </ThemeProvider>
      </CacheProvider>
  );
});