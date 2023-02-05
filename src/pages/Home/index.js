import React, { useState, useEffect, useContext } from "react"
import NavigationBar from "../Navbar"
import ArtikelCard from "./ArtikelCard"
import SlideComponent from "./SlideComponent"
import axios from 'axios'
import LoadingComponent from "./LoadingComponent"
import UserContext from "../../context/Context"
import CommentComponent from "./CommentComponent"
import { Spinner } from "react-bootstrap"
import { apiURL } from "../../Api"


const Home = () => {

    const [artikels, setArtikels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { setUserID } = useContext(UserContext)
    const [isComment, setIsComment] = useState(false)
    const [userIdOfArtikelSelected, setUserIdOfArtikelSelected] = useState(0)
    const [artikelIdForCommentComponent, setArtikelIdForCommentComponent] = useState(0)

    useEffect(() => {
        setUserID(JSON.parse(window.localStorage.getItem('data')))
        // eslint-disable-next-line
    }, [])

    const getAllArtikel = () => {
        axios.get(apiURL().SHOW_ALL_ARTIKEL).then((response) => {
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

        console.log("userIdOfArtikelSelected=> ",userIdOfArtikelSelected)
    }, [])

    return (
        <>
            <NavigationBar />
            {
                (isComment !== true)
                &&
                <SlideComponent />
            }
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
                                (isComment !== true)
                                    &&
                                    <b> <i className="bi bi-stickies"></i>  ARTIKEL </b>
                                    
                            }
                        </h1>
                        <div className="artikel-card ">
                            {
                                (isComment === false)
                                    ?
                                    artikels.map((result) => {
                                        return <ArtikelCard
                                            key={result.id}
                                            id={result.id}
                                            title={result.title}
                                            content={result.isi}
                                            useridofartikel={result.user_id}
                                            thumbnail={result.thumbnail}
                                            comment={() => setIsComment(true)}
                                            artikelid={ () => setArtikelIdForCommentComponent(result.id)}
                                            user_id_of_artikel_selected ={() => setUserIdOfArtikelSelected(result.user_id)}/>
                                    })
                                    :
                                    <CommentComponent
                                        comment={() => setIsComment(false)} 
                                        artikelid = {artikelIdForCommentComponent}
                                        user_id_of_artikel_selected={userIdOfArtikelSelected}
                                        />
                            }
                        </div>
                    </section>
            }
        </>
    )
}

export default Home