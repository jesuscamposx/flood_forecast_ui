import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const RegisterForm = ({
    registerUser
}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const register = () => {
        console.log(email)
        console.log(name)
        console.log(lastName)
        if(email.length > 0 && name.length > 0
            && lastName.length > 0){
                registerUser({
                    email: email,
                    nombre: name,
                    apellido: lastName
                })
            }
    }

    return(
        <Form>
            <FormGroup>
                <Label for="mail">Email</Label>
                <Input type="email" name="email" id="mail" placeholder="example@domain.com" onChange={(n)=>(setEmail(n.target.value))}/>
            </FormGroup>
            <FormGroup>
                <Label for="name">Nombre:</Label>
                <Input type="text" name="name" id="name" placeholder="Nombre" onChange={(n)=>(setName(n.target.value))} />
            </FormGroup>
            <FormGroup>
                <Label for="last_name">Apellido:</Label>
                <Input type="text" name="last_name" id="last_name" placeholder="Apellido" onChange={(ln)=>(setLastName(ln.target.value))}/>
            </FormGroup>
            <FormGroup>
                <Button
                color="primary"
                size="lg"
                onClick={register}
                >
                    Registrarse
                </Button>
            </FormGroup>
        </Form>
    );
}

export default RegisterForm;