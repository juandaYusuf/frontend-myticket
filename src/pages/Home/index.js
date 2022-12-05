import React, { useState, useEffect } from "react"
import NavigationBar from "../Navbar"
import ArtikelCard from "./ArtikelCard"
import SlideComponent from "./SlideComponent"
import axios from 'axios'
import LoadingComponent from "./LoadingComponent"

const Home = () => {

    const [artikels, setArtikels] = useState([])
    const [isLoading, setIsLoading] = useState(true);


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
                    <span>
                        <section className="artikel-card-container">
                            <h1 style={{ color: "DodgerBlue" }}> <b> ARTIKEL </b></h1>
                            <div className="artikel-card">
                                <LoadingComponent />
                            </div>
                        </section>
                    </span>
                    :
                    <section className="artikel-card-container scaled-transition">
                        <h1 style={{ color: "DodgerBlue" }}> <b> ARTIKEL </b></h1>
                        <div className="artikel-card">
                            {
                                artikels.map((artikel) => {
                                    return <ArtikelCard key={artikel.id} title={artikel.title} content={artikel.isi} useridofartikel={artikel.user_id} thumbnail={artikel.thumbnail}/>
                                })
                            }
                        </div>
                    </section>
            }
        </>
    )
}

export default Home
