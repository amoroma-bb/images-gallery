import React from "react";
import { Jumbotron, Button } from 'react-bootstrap';

const Welcome = () => {
    return (
        <Jumbotron>
            <h1>Images Gallery</h1>
            <p>
                This is a simple application that retrives photos using Unsplash API.
            </p>
            <p>
                <Button variant="primary" href="https://unsplash.com" target="_blank">
                    Learn More
                </Button>
            </p>
        </Jumbotron>)
};

export default Welcome