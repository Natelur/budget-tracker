import { Container } from "react-bootstrap";
import { useTheme } from "../ThemeProvider";

export default function Logout() {
  const { backgroundColor, fontColor } = useTheme();

  return (
    <Container style={{ backgroundColor, color: fontColor }}>
      <h1 className="my-4"> Signed out. Click sign in to enter trackbudget </h1>
    </Container>
  );
}
