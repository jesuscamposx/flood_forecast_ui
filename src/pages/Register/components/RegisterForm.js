import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const RegisterForm = ({
    onRegister
}) => {

    const onRegisterClick = () =>{
        onRegister();
    }

    return(
        <div>
            <Form>
                <FormGroup>
                    <Label for="mail">Email</Label>
                    <Input type="email" name="email" id="mail" placeholder="example@domain.com" />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Nombre:</Label>
                    <Input type="text" name="name" id="name" placeholder="Sergio" />
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Apellido:</Label>
                    <Input type="text" name="last_name" id="last_name" placeholder="Andrade" />
                </FormGroup>
                <FormGroup>
                    <Button
                    color="primary"
                    size="lg"
                    onClick={onRegisterClick}
                    >
                        Registrarse
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default RegisterForm;