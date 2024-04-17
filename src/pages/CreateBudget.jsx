import { useState, useContext } from "react";
import { Container, Row, Form, Col, Button, Table } from "react-bootstrap";
// import {ThemeProvider} from '../ThemeProvider';
import "../App.css";

function TheBudgetSummary({ data, deleteBudget }) {
  const totalIncome = data
    .filter((item) => item.income)
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  const totalLoss = data
    .filter((item) => !item.income)
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  // Calculate total budget
  const totalBudget = totalIncome - totalLoss;
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Income / Loss</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.income ? "Income" : "Loss"}</td>
            <td>
              <Button
                className="mt-1"
                variant="danger"
                onClick={() => deleteBudget(index)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>

      <thead responsive="md">
        <tr>
          <th>Total budget</th>
          <th style ={{color:'blueviolet'}}> {totalBudget}</th>
        </tr>
      </thead>
     
    </Table>
  );
}

function NewBudget() {
  // const { theme } = useContext(ThemeContext);
  // const containerClassName = 'container-' + theme
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState(false);
  const [loss, setLoss] = useState(false);
  const [budgetData, setBudgetData] = useState([]);

  const handleIncomeChange = () => {
    setIncome(true);
    setLoss(false);
  };

  const handleLossChange = () => {
    setIncome(false);
    setLoss(true);
  };

  const handleSubmit = () => {
    const newData = {
      date: date,
      title: title,
      description: description,
      amount: amount,
      income: income,
      loss: loss,
    };
    setBudgetData([...budgetData, newData]);
    // Reset form fields
    setTitle("");
    setDescription("");
    setDate("");
    setAmount("");
    setIncome(false);
    setLoss(false);
  };

  const deleteBudget = (index) => {
    const updatedBudgetData = [...budgetData];
    updatedBudgetData.splice(index, 1);
    setBudgetData(updatedBudgetData);
  };

  return (
    <Container>
      {/* <h1 className= "my-1">Key in your budget: </h1> */}
      <Form>
        <Row>
          <Col>
            <Form.Control
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="$$"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              required
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Income"
              checked={income}
              onChange={handleIncomeChange}
            />
            <Form.Check
              type="radio"
              label="Loss"
              checked={loss}
              onChange={handleLossChange}
            />
          </Col>
          <Col>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="mt-5">
        <TheBudgetSummary data={budgetData} deleteBudget={deleteBudget} />
      </div>
    </Container>
  );
}

export default NewBudget;
