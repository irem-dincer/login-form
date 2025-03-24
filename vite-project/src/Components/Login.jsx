import { useEffect, useState } from 'react';
import {Button , Form, FormGroup , Label ,Input, Card, CardHeader, FormFeedback, CardBody, CardFooter} from 'reactstrap';

import axios from'axios';


const ErrorMessages={
    name:"Name is required",
    surname:"Surname is required",
    email:"Enter a valid email address",
    password:"Must be at least 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 symbol,at least 1 number",
}

export default function Login() {
 
 const[formData,setFormData]=useState({name:"",surname:"",email:"",password:""}); //form data


 const[errors,setErrors]=useState({name:false,surname:false,email:false,password:false}); //validation errors
const[isValid,setIsValid]=useState(false); //form validation
const [id, setId]=useState("");

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(()=>{
if(formData.name.trim().length>0 && formData.surname.trim().length>0 && validateEmail(formData.email) && regex.test(formData.password)) {
    
   
setIsValid(true)

  }
  else {
    setIsValid(false);

  }
}
  ,[formData])


const handleChange=(event)=>{

    const {name,value}=event.target; //destructing
    setFormData({...formData,[name]:value}); //spread operator
    console.log(formData); 

if(name==="name"){
    if(value.trim().length===0){
        setErrors({...errors,[name]:true});
        setIsValid(false);

    }
    else{
        setErrors({...errors,[name]:false});
        setIsValid(true);
    }
    }

    if(name==="surname"){
        if(value.trim().length===0){
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
       

    })
    .catch(error=>{
        console.log("Error:",error);

    })
    setFormData({name:"",surname:"",email:"",password:""}); //clear the form after submission

 //??????????????????????????????????????????????????????????????????????
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
    />
    {errors.name &&
      <FormFeedback>
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
    />
       {errors.surname &&
      <FormFeedback>
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
    />
           {errors.email &&
      <FormFeedback>
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
    />
               {errors.password &&
      <FormFeedback>
 {ErrorMessages.password}
    </FormFeedback>
}
  </FormGroup>
 

  <Button type="submit" disabled={!isValid}>
 Submit
  </Button>
</Form>
</CardBody>

<CardFooter>
  ID:{id}
</CardFooter>
</Card>

)


}