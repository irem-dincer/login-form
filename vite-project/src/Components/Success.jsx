import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Button } from "reactstrap";

export default function Success() {


  return (
    <Card className="text-center mt-5">
      <CardHeader> Success! </CardHeader>
      <CardBody>
        <h3>Login Successful</h3> 
        <p>Welcome! Your login was successful.</p>
      </CardBody>
    </Card>
  );
}