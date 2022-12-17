import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

const LoadingComponent = () => {

    return (
        <>
            <Card style={{ width: '18rem' }} className="shadow-prev-container">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="secondary" xs={6} />
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} className="shadow-prev-container">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="secondary" xs={6} />
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} className="shadow-prev-container">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="secondary" xs={6} />
                </Card.Body>
            </Card>
        </>
    )
}

export default LoadingComponent