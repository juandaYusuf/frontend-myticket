import React, { useState, useEffect, useContext } from "react"
import NavigationBar from "../Navbar"
import ArtikelCard from "./ArtikelCard"
import SlideComponent from "./SlideComponent"
import axios from 'axios'
import LoadingComponent from "./LoadingComponent"
import UserContext from "../../context/Context"
import CommentComponent from "./CommentComponent"
import { Spinner } from "react-bootstrap"

const Home = () => {

    const [artikels, setArtikels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { setUserID } = useContext(UserContext)
    const [isComment, setIsComment] = useState(false)

    useEffect(() => {
        setUserID(JSON.parse(window.localStorage.getItem('data')))
        // eslint-disable-next-line
    }, [])

    const getAllArtikel = () => {
        const apiURL = `http://127.0.0.1:8000/artikelall/`
        axios.get(apiURL).then((response) => {
            if (response.data) {
                setArtikels(response.data)
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        })
    }

    useEffect(() => {
        getAllArtikel()
    }, [])

    return (
        <>
            <NavigationBar />
            <SlideComponent />
            {
                (isLoading)
                    ?
                    <section>
                        <section className="artikel-card-container">
                            <h1 style={{ color: "DodgerBlue" }}><Spinner animation="border" variant="primary" /> <b> Loading .... </b></h1>
                            <div className="artikel-card">
                                <LoadingComponent />
                            </div>
                        </section>
                    </section>
                    :
                    <section className="artikel-card-container">
                        <h1 style={{ color: "DodgerBlue" }}>
                        {
                            (isComment === true)
                            ?
                            <b> <i className="bi bi-chat text-success"></i>  KOMENTAR </b>
                            :
                            <b> <i className="bi bi-stickies"></i>  ARTIKEL </b>
                        }
                        </h1>
                        <div className="artikel-card ">
                            {
                                (isComment === false)
                                    ?
                                    artikels.map((artikel) => {
                                        return <ArtikelCard
                                            key={artikel.id}
                                            title={artikel.title}
                                            content={artikel.isi}
                                            useridofartikel={artikel.user_id}
                                            thumbnail={artikel.thumbnail}
                                            comment={() => setIsComment(true)} />
                                    })
                                    :
                                    <CommentComponent comment={() => setIsComment(false)} />
                            }
                        </div>
                    </section>
            }
        </>
    )
}

export default Home