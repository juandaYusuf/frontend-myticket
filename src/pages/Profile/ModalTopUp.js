import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'

const ModalTopUp = (props) => {

  const [userAnswer, setUserAnswer] = useState("")
  const [isAnswerCorrect, setIsAnswerCorrect] = useState("default")

  const checkUserAnswer = () => {
    if (userAnswer === "Ujang ngabret") {
      console.log("Jawab anda benar")
      setIsAnswerCorrect("correct")
    } else {
      setIsAnswerCorrect("inCorrect")
    }
  }

  useEffect(() => {
    if (props.show === false) {
      setIsAnswerCorrect("default")
      setUserAnswer("")
    }
    return (() => props.show)
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
              <h6>Jawab pertanyaan dibawah ini !</h6>
            </Container>
            <hr />
            <Form>
              <div className="m-3">
                <Form.Label className='fw-bold'>Siapa pembunuh munir</Form.Label>
                <Form.Check label="Ujang ngabret" name="group1" type="radio" id={`reverse-radio-1`} value="Ujang ngabret" onChange={(e) => { setUserAnswer(e.target.value) }} />
                <Form.Check label="Asep Rante" name="group1" type="radio" id={`reverse-radio-2`} value="Asep Rante" onChange={(e) => { setUserAnswer(e.target.value) }} />
                <Form.Check label="Dadang Bedog" name="group1" type="radio" id={`reverse-radio-3`} value="Dadang Bedog" onChange={(e) => { setUserAnswer(e.target.value) }} />
                <Button variant='warning mt-3' onClick={() => { checkUserAnswer() }} > Jawab </Button>
                <div className='mt-3 isanswercorrect-container'>
                  {
                    (isAnswerCorrect === "correct")
                      ?
                      <p className='text-success typewriter-animation-1'> Selamat anda menjawab dengan tepat. Anda mendapat ~ <b>Rp.3000 ~ <i className="bi bi-check-circle-fill"> </i> </b> </p>
                      :
                      (isAnswerCorrect === "inCorrect")
                        ?
                        <p className='text-danger typewriter-animation-2'> Jawaban anda tidak tepat. Silahkan coba lagi <i className="bi bi-x-circle-fill"></i></p>
                        : null
                  }
                </div>
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