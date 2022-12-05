import React from 'react'

const Struktur = () => {
    return (
        <>
            <div className='about-container'>
                <div className='shape-1' >
                    <div className='blob-1' />
                </div>
                <div className='shape-2' >
                    <div className='blob-2' />
                </div>
                <div className='shape-3' >
                    <div className='blob-3' />
                </div>
                <section className='anggota-container scaled-transition' >
                    <div className='card-anggota'>
                        <div className='anggota-1'>
                            <div className='people-1'>
                                <div className='isi-people-1'>
                                </div>
                                <div className='desc-people-1'>
                                    <span>Ketua :</span><br />
                                    <span style={
                                        {
                                            fontWeight: "bold",
                                            fontSize: "30px",
                                            textTransform: "uppercase"
                                        }
                                    }>Arif Rahman Hakim</span>
                                </div>
                            </div>
                        </div>
                        <div className='anggota-2'>
                            <div className='people-1'>
                                <div className='isi-people-1'>
                                </div>
                                <div className='desc-people-1'>
                                    <span>Ketua :</span><br />
                                    <span style={
                                        {
                                            fontWeight: "bold",
                                            fontSize: "30px",
                                            textTransform: "uppercase"
                                        }
                                    }>Arif Rahman Hakim</span>
                                </div>
                            </div>
                            <div className='people-1'>
                                <div className='isi-people-1'>
                                </div>
                                <div className='desc-people-1'>
                                    <span>Ketua :</span><br />
                                    <span style={
                                        {
                                            fontWeight: "bold",
                                            fontSize: "30px",
                                            textTransform: "uppercase"
                                        }
                                    }>Arif Rahman Hakim</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Struktur