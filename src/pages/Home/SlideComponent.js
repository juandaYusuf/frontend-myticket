import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import homeSlide1 from '../../assets/homeSlide1.jpg';
import homeSlide2 from '../../assets/homeSlide2.jpg';
import homeSlide3 from '../../assets/homeSlide3.jpg';

const SlideComponent = () => {
    return (
        <>
            <div className="slide-layout scaled-transition">
                <div className="slide-container shadow-prev-container">
                    <Carousel pause="false">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={homeSlide1}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>DIMANA SAJA</h3>
                                <p>Pesan tiket dimana saja tanpa hambatan</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={homeSlide2}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>PELAYANAN TERBAIK</h3>
                                <p>Semua layanan tidak akan membuat anda kecewa</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={homeSlide3}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>AMAN DAN NYAMAN</h3>
                                <p>
                                    Buat perjalanana anda menyenangkan tanpa beban
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default SlideComponent