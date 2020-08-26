import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const HomeJumboTron = (props) => {
    const {
        content
    } = props

    return (
        <div>
        <Jumbotron>
            <h1 className="display-3">{content.title}</h1>
            <p className="lead">{content.text}</p>
            <hr className="my-2" />
            <p>{content.subtext}</p>
            <p className="lead">
            <Button color="primary">{content.button}</Button>
            </p>
        </Jumbotron>
        </div>
    );
};

export default HomeJumboTron;