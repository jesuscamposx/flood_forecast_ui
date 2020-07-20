import React from 'react';
import { Container, Row} from 'reactstrap';
import RegisterForm from './components/RegisterForm'

const Register = () => {


    return(
        <Container>
            <Row>
                <RegisterForm/>
            </Row>
        </Container>
    );
}

export default Register;