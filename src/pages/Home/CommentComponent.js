import React from 'react'
import { Button, Card } from 'react-bootstrap'

const CommentComponent = (props) => {
    return (
        <>
            <Card className='scaled-transition' style={{ width: "100%" }}>
                <Card.Header>
                    <div className='d-flex justify-content-start'>
                        <Button variant="outline-secondary" onClick={() => props.comment(false)}>
                            <span className="bi bi-arrow-left-short h4" style={{fontWeight: "bolder"}} />
                        </Button>
                        <span className="h2">
                            | Comment
                        </span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Judul artikel</Card.Title>
                    <Card.Text>
                        Ini akan di isi commentar pada artikel
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default CommentComponent