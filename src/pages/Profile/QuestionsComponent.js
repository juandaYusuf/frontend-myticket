import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import UserContext from '../../context/Context'
import { apiURL } from '../../Api'

const QuestionsComponent = (props) => {

    const [userAnswer, setUserAnswer] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState("default")
    const { userID, setUserSaldo } = useContext(UserContext)

    //Ref soal
    //! https://www.elvatya.com/2021/06/contoh-soal-pemrograman-dasar-pilihan-ganda.html

    const answer = [
        {
            "id": 1,
            "a": "Analisis masalah",
            "b": "Dokumentasi",
            "c": "Mencari bug",
            "d": "Estimasi program",
            "e": "Merancang algoritma"
        },
        {
            "id": 2,
            "a": "Pseudocode",
            "b": "Fungsi",
            "c": "Array",
            "d": "Algoritma",
            "e": "Pemrograman"
        },
        {
            "id": 3,
            "a": "Bahasa pemrograman",
            "b": "Bahasa latin",
            "c": "Bahasa Indonesia",
            "d": "Bahasa terstruktur",
            "e": "Bahasa sehari-hari dan terstruktur"
        },
        {
            "id": 4,
            "a": "Input - Proses - Output",
            "b": "Start - Proses - Input",
            "c": "Start - Proses - Output",
            "d": "Start - Input - End",
            "e": "Output - Input - Proses"
        },
        {
            "id": 5,
            "a": "Array",
            "b": "Float",
            "c": "Char",
            "d": "Fungsi",
            "e": "Dimensi dua"
        },
        {
            "id": 6,
            "a": "?>",
            "b": "//",
            "c": "titik koma(;)",
            "d": "'",
            "e": "{}"
        },
        {
            "id": 7,
            "a": "Array",
            "b": "Float",
            "c": "Char",
            "d": "Fungsi",
            "e": "Dimensi dua"
        },
        {
            "id": 8,
            "a": " Aray",
            "b": "Looping",
            "c": "Fungsi",
            "d": "Variabel",
            "e": "Tipe data"
        },
        {
            "id": 9,
            "a": " getch",
            "b": ";",
            "c": "return0",
            "d": "using namespace std",
            "e": "int main"
        },
        {
            "id": 10,
            "a": "Untuk menhasilkan output",
            "b": "Untuk menginput data",
            "c": "Untuk membuat program",
            "d": "Untuk mengetahui adanya debug",
            "e": "Untuk menampilkan output"
        },
        {
            "id": 11,
            "a": "Bjarne Stroustrup",
            "b": "Mark Lee",
            "c": "Khoiril Anwar",
            "d": "Bill Gates",
            "e": "Paul Alen"
        },
        {
            "id": 12,
            "a": "Float",
            "b": "Deklarasi",
            "c": "Algoritma",
            "d": "Integer",
            "e": "Looping"
        },
        {
            "id": 13,
            "a": "Pseudocode",
            "b": "Fungsi",
            "c": "Array",
            "d": "Algoritma",
            "e": "Pemrograman"
        },
        {
            "id": 14,
            "a": "Input",
            "b": "Output",
            "c": "Proses",
            "d": "Start",
            "e": "End"
        },
        {
            "id": 15,
            "a": "Input",
            "b": "Output",
            "c": "Proses",
            "d": "Start",
            "e": "Pointer"
        },
        {
            "id": 16,
            "a": "Pengulangan",
            "b": "Proses",
            "c": "Flowchart",
            "d": "Dimensi",
            "e": "Variabel"
        },
        {
            "id": 17,
            "a": "Boolean",
            "b": "String",
            "c": "Char",
            "d": "Int",
            "e": "Value"
        },
        {
            "id": 18,
            "a": "Sequence, Selection dan Looping",
            "b": "String, Boolean dan Integer",
            "c": "Flowchart, Deklarasi dan Output",
            "d": "Array, Pointer dan Variabel",
            "e": "Perulangan, Looping dan Pemilihan"
        },
        {
            "id": 19,
            "a": "Sequence",
            "b": "Looping",
            "c": "Selection",
            "d": "String",
            "e": "Boolean"
        },
        {
            "id": 20,
            "a": "Sequence",
            "b": "Looping",
            "c": "Selection",
            "d": "String",
            "e": "Boolean"
        }
    ]

    const checkUserAnswer = () => {
        let userSaldo = 0
        const answerCheckerData = {
            "soal": props.soal,
            "correct_answer": userAnswer
        }
        // cek jawaban user
        axios.post(apiURL().QUESTIONS_ANSWER_CHECKER, answerCheckerData).then((response) => {
            if (response.data === "correct") {
                //cek saldo user sebelumnya
                axios.get(apiURL(userID).USER_SALDO_CHECKER).then((response) => {
                    userSaldo = parseInt(response.data.saldo) + 3000 // menambahkan usersaldo berdasarkan jawaban benar(1 jawaban benar += 3000)
                    if(userSaldo !== 0){
                        // update userSaldo
                        axios.post(apiURL(userID, userSaldo).UPDATE_USER_SALDO).then(() => {
                            setIsAnswerCorrect("correct")
                            setDisabled(true)
                            setUserSaldo(userSaldo)
                        })
                    }else{
                        alert("Terjadi kesalahan, silahkan coba beberapa saat lagi...!")
                    }
                })
            } else {
                setIsAnswerCorrect("incorrect")
                setDisabled(true)
            }
        })
    }

    return (
        <>
            <div className='border border-2 border-warning rounded p-2 my-1'>
                <Form.Label className='fw-bold'>{props.soal}</Form.Label>
                {
                    answer.map((result, i) => {
                        return ((result.id === props.id) && <div key={result.id} className="px-2">
                            <Form.Check disabled={disabled} label={result.a} name={`group${i}`} type="radio" id={`reverse-radio-1`} value={result.a} onChange={(e) => { setUserAnswer(e.target.value) }} />
                            <Form.Check disabled={disabled} label={result.b} name={`group${i}`} type="radio" id={`reverse-radio-2`} value={result.b} onChange={(e) => { setUserAnswer(e.target.value) }} />
                            <Form.Check disabled={disabled} label={result.c} name={`group${i}`} type="radio" id={`reverse-radio-4`} value={result.c} onChange={(e) => { setUserAnswer(e.target.value) }} />
                            <Form.Check disabled={disabled} label={result.d} name={`group${i}`} type="radio" id={`reverse-radio-5`} value={result.d} onChange={(e) => { setUserAnswer(e.target.value) }} />
                            <Form.Check disabled={disabled} label={result.e} name={`group${i}`} type="radio" id={`reverse-radio-6`} value={result.e} onChange={(e) => { setUserAnswer(e.target.value) }} />
                            <Button disabled={disabled} variant='warning mt-2' onClick={() => { checkUserAnswer() }} > Cek jawaban </Button>
                        </div>
                        )
                    })
                }
                <div className='mt-3 isanswercorrect-container'>
                    {
                        (isAnswerCorrect === "correct")
                            ?
                            <p className='text-success typewriter-animation-1'> Selamat anda menjawab dengan tepat. Anda mendapat ~ <b>Rp.3000 ~ <i className="bi bi-check-circle-fill"> </i> </b> </p>
                            :
                            (isAnswerCorrect === "incorrect")
                                &&
                                <p className='text-danger typewriter-animation-2'> Jawaban anda tidak tepat. Silahkan coba lagi <i className="bi bi-x-circle-fill"></i></p>
                    }
                </div>
            </div>
        </>
    )
}

export default QuestionsComponent