import React from "react";
import Grid from "@material-ui/core/Grid";
import Spline from '@splinetool/react-spline';

export const Header = () => {

  return (
    <Grid container justify = "center">
      <Spline scene="https://prod.spline.design/7unKF64rDJYGN6uZ/scene.splinecode" />
    </Grid>
  )
};
