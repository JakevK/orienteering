import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => (
  <>
    <Container fluid="md">
      <Row className="mb-5">
        <h1 className="display-3 text-center">orienteering games</h1>
      </Row>
      <Row>
        <Col sm={4}>
          <Card h={100} my={2}>
            <Card.Img
              variant="top"
              src={process.env.PUBLIC_URL + "/images/cards/rogaine.png"}
            />
            <Card.Body>
              <Card.Title>Rogaine Planning</Card.Title>
              <Card.Text>
                Link up controls in the shortest route possible.
              </Card.Text>
              <Button href="/rogaine" variant="primary">
                Play
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Img
              variant="top"
              src={process.env.PUBLIC_URL + "/images/cards/course.jpg"}
            />
            <Card.Body>
              <Card.Title>Course Generation</Card.Title>
              <Card.Text>
                Simulate competing in an orienteering event using randomly
                generated maps and courses.
              </Card.Text>
              <Button href="/course" variant="primary">
                Play
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);
export default HomePage;
