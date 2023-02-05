import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'
import axios from 'axios'
import QuestionsComponent from './QuestionsComponent'
import { apiURL } from '../../Api'

const ModalTopUp = (props) => {

  const [questions, setQestions] = useState([])

  // !Get soal untuk saldo
  useEffect(() => {
    if (props.show === true) {
      const showQuestions = () => {
        axios.get(apiURL().QUESTIONS_FOR_TOPUP).then((response) => {
          setQestions(response.data)
        })
      }
      showQuestions()
    }
    // eslint-disable-next-line
  }, [props.show])

  return (
    <>
      <Modal
        {...props}
        size="lg"
        style={{ backdropFilter: "blur(30px)" }}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="bi bi-currency-exchange"></i> TopUp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant='info'>
            <h4> <i className="bi bi-info-square-fill"></i> Note...</h4>
            Silahkan jawab pertanyaan berikut untuk memperoleh saldo !<br />
            <i className='text-secondary'>Statement ini dibuat hanya untuk melengkapi syarat pembelian, karena tidak mungkin dilakukan unutk berkolaborasi dengan third-party seperti wallet digital atau sebagainya. Website ini hanya untuk pembelajaran !</i>
          </Alert>
          <Alert variant='warning'>
            <Container className='d-flex justify-content-center'>
              <h5 className='fw-bold'>Jawab pertanyaan dibawah ini !</h5>
            </Container>
            <Form>
              <div className=" questions-container">
                {
                  questions.map((result) => {
                    return (
                      <QuestionsComponent key={result.id} soal={result.soal} id={result.id} />
                    )
                  })
                }
              </div>
            </Form>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalTopUp