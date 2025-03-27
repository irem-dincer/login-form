import { useEffect, useState } from 'react';
import {Button , Form, FormGroup , Label ,Input, Card, CardHeader, FormFeedback, CardBody, CardFooter} from 'reactstrap';

import axios from'axios';
import { useNavigate } from 'react-router-dom';


export const ErrorMessages={ 
    name:"Please enter your name at least 3 characters",
    surname:"Please enter your surname at least 3 characters",
    email:"Enter a valid email address",
    password:"Must be at least 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 symbol,at least 1 number",
    terms:"You must accept the terms and conditions"
}

export default function Login() {
 
const navigate=useNavigate(); //navigate to success page!

 const[formData,setFormData]=useState({name:"",surname:"",email:"",password:""}); //form data


 const[errors,setErrors]=useState({name:false,surname:false,email:false,password:false,terms:false}); //validation errors
const[isValid,setIsValid]=useState(false); //form validation
const [id, setId]=useState("");

const validateEmail = (email) => { //email validation
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; //password regex

  useEffect(()=>{
if(formData.name.trim().length>0 && formData.surname.trim().length>0 && validateEmail(formData.email) && regex.test(formData.password) && formData.terms) {
    
   
setIsValid(true)

  }
  else {
    setIsValid(false);

  }
}
  ,[formData])


const handleChange=(event)=>{
  let { name, value, type, checked } = event.target;

  value = type === 'checkbox' ? checked : value;

  setFormData({ ...formData, [name]: value });
    console.log(formData); 

if(name==="name"){
    if(value.trim().length<3){
        setErrors({...errors,[name]:true});
        setIsValid(false);

    }
    else{
        setErrors({...errors,[name]:false});
        setIsValid(true);
    }
    }

    if(name==="surname"){
        if(value.trim().length<3){
            setErrors({...errors,[name]:true});
            setIsValid(false);
    
        }
        else{
            setErrors({...errors,[name]:false});
            setIsValid(true);
        }
}

if(name==="email"){
    if(validateEmail(value)) {
        setErrors({...errors,[name]:false});
        setIsValid(true);
    }
    else{
        setErrors({...errors,[name]:true});
        setIsValid(false);

    }


}

if(name==="password"){

if(regex.test(value)){
    setErrors({...errors,[name]:false});
    setIsValid(true);
}
else {
    setErrors({...errors,[name]:true});
    setIsValid(false);
}
}

}




const handleSubmit=(event)=>{
    event.preventDefault();//prevent the page fromn refreshing
    console.log(formData);
    if(isValid){
        alert("Form submitted successfully");

    }
    else {
        alert("Form has errors");
    }
    axios.post("https://reqres.in/api/users",formData).then(response=>{ //post request
        console.log(response.data);
        setId(response.data.id); //get the id of the user
        navigate("/success"); //navigate to success page
       

    })
    .catch(error=>{
        console.log("Error:",error);
        alert("Error in form submission");


    })
    setFormData({name:"",surname:"",email:"",password:"",terms:false}); //clear the form after submission


}


return (
<Card>
    <CardHeader>Sign In</CardHeader>
    <CardBody>
<Form onSubmit={handleSubmit}>
<FormGroup>
    <Label for="exampleName">
      Name:
    </Label>
    <Input
      id="exampleName"
      name="name"
      placeholder="Enter your name"
      type="text"
      onChange={handleChange}
      value={formData.name}
      invalid={errors.name} //if errors.name is true,then the input field will be red.
      data-cy="name-input"
    />
    {errors.name &&
      <FormFeedback  data-cy="error-messages">
 {ErrorMessages.name}
    </FormFeedback>
}

  </FormGroup>
  <FormGroup>
    <Label for="exampleSurname">
      Surname:
    </Label>
    <Input
      id="exampleSurname"
      name="surname"
      placeholder="Enter your surname"
      type="text"
      onChange={handleChange}
      value={formData.surname}
      invalid={errors.surname}
        data-cy="surname-input"
    />
       {errors.surname &&
      <FormFeedback  data-cy="error-messages">
 {ErrorMessages.surname}
    </FormFeedback>
}
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">
      Email:
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="Enter your email"
      type="email"
      onChange={handleChange}
      value={formData.email}
      invalid={errors.email}
        data-cy="email-input"
    />
           {errors.email &&
      <FormFeedback  data-cy="error-messages">
 {ErrorMessages.email}
    </FormFeedback>
}
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword">
      Password:
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="Enter your password"
      type="password"
      onChange={handleChange}
      value={formData.password}
      invalid={errors.password}
        data-cy="password-input"
    />
               {errors.password &&
      <FormFeedback  data-cy="error-messages">
 {ErrorMessages.password}
    </FormFeedback>
}
  </FormGroup>

  <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={formData.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
          data-cy="terms-input"
         
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{ErrorMessages.terms}</FormFeedback>}
      </FormGroup>
 

  <Button type="submit" disabled={!isValid} data-cy="submit-button">
 Submit
  </Button>
</Form>
</CardBody>

{ id &&<CardFooter  data-cy="result-message">
  ID:{id}
</CardFooter> }
</Card>

)


}