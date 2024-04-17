import { useState } from "react";
import { Container } from "react-bootstrap";
// import {ThemeProvider} from "../ThemeProvider"
import "../App.jsx";
import NewBudget from "./CreateBudget";

export default function Display() {
  // const containerClassName = "container-" + Theme;


  return (
    <Container>
      <h1 className="my-4"> Welcome, Key in your budget! </h1>
      <NewBudget/>
    </Container>
  );
}
