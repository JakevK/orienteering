import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const ErrorPage = ({ title, description }) => (
  <Container>
    <h1 className="display-3">{title || "Error"}</h1>
    <p>{description || "Something went wrong"}</p>
    <Button href="/">go home</Button>
  </Container>
);

export default ErrorPage;
