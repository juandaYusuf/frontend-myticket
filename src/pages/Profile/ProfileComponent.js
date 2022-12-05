import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/Context'
import editIconBanner from '../../assets/edit_icon.png'
import axios from 'axios'
import TiketSaya from './TiketSaya'
import EditProfile from './ProfileEditComponent'
import ModalUploadPhoto from './MoodalUploadPhoto'
import { useNavigate } from 'react-router-dom'
import ArtikelSaya from './ArtikelSaya'
import ModalUpdateArtikel from './ModalUpdateArtikel'


const ProfileComponent = () => {

  const { userID, setUserID } = useContext(UserContext)
  const [fullName, setFullName] = useState("")
  const [email, setemail] = useState("")
  const [noTelepon, setnoTelepon] = useState("")
  const [isEditProfile, setisEditProfile] = useState("menuTiket")
  const [menuTitle, setmenuTitle] = useState("TIKET SAYA")
  const [modalUpload, setModalUpload] = useState(false)
  const [titleModalUpload, setTitleModalUpload] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [userProfilePicture, setUserProfilePicture] = useState("")
  const [userBannerPicture, setUserBannerPicture] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [showThumnail, setShowThumnail] = useState("thumbnail")
  const [previewImage, setPreviewImage] = useState("")
  const navigateTo = useNavigate()

  //! Get user by ID 
  const titleNama = () => {
    const apiURL = `http://127.0.0.1:8000/profile/${userID}`
    axios.get(apiURL).then((response) => {
      if (response.data !== null) {
        setFullName(response.data.fullname)
        setemail(response.data.email)
        setnoTelepon(response.data.noTelepon)
        setUserProfilePicture(response.data.profilPhoto)
        setUserBannerPicture(response.data.profilBannerPhoto)
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    })
  }

  const CloseModalWhenImageUploaded = () => {
    setModalUpload(false)
  }

  // !log out func & clear local storage
  const logOut = () => {
    window.localStorage.clear()
    navigateTo('/SignInUp')
  }

  //!call profile title name 
  useEffect(() => {
    titleNama()
    setFullName(fullName)
    setemail(email)
    setnoTelepon(noTelepon)
  }, [
    titleNama,
    setFullName,
    setemail,
    setnoTelepon
  ])

  //! Load data from local storage
  useEffect(() => {
    setUserID(JSON.parse(window.localStorage.getItem('data')))
  }, []);


  return (
    <>
      <div className='profile-container scaled-transition '>
        <div className='profile-banner shadow-prev-container' style={{ backgroundImage: `url(${userBannerPicture})` }}>
          <div className='icon-edit-banner-container'>
            <div style={{ cursor: "pointer", height: "100%", width: "100%"}} onClick={() => {
              setModalShow(true)
              setShowThumnail("thumbnail")
              setPreviewImage(userBannerPicture)
            }} />
            <div className='icon-container'>
              <img src={editIconBanner}
                onClick={() => {
                  setModalUpload(true)
                  setTitleModalUpload("Upload photo sampul")
                }}
                style={{ width: '35px', height: '35px' }}
              />
              <b onClick={() => {
                setTitleModalUpload("Upload photo sampul")
                setModalUpload(true)
              }}>Edit</b>
            </div>
          </div>

          <div className='profile-photo-container ' >
            <div className='profile-photo shadow-prev-container'>
              <img src={userProfilePicture} style={{ height: "200px", width: "200px", objectFit: "cover", cursor: "pointer" }} onClick={() => {
                setModalShow(true)
                setShowThumnail("thumbnail")
                setPreviewImage(userProfilePicture)
              }} />
              <div className='upload-profile-photo shadow-prev-container' onClick={() => {
                setModalUpload(true)
                setTitleModalUpload("Upload photo profile")
              }}
              />
            </div>

            <div className='profile-name-container '>
              <span style={{ color: "DodgerBlue", fontWeight: "bold", textTransform: "uppercase", }}>
                {
                  (isLoading)
                    ?
                    "Loading..."
                    :
                    fullName
                }
              </span>
              <span style={{ color: "grey", fontWeight: "bold", textTransform: "lowercase", fontSize: "15px" }}>
                {email}
              </span>
              <span style={{ color: "grey", fontSize: "15px" }}>
                {noTelepon}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='menu-container scaled-transition' >
        <div className='act-container'>

          <div className='menu-edit shadow-prev-container' onClick={() => {
            setisEditProfile('editProfile')
            setmenuTitle("EDIT PROFILE")
          }}>
            Edit Profile
          </div>

          <div className='menu-tiket shadow-prev-container' onClick={() => {
            setisEditProfile("menuTiket")
            setmenuTitle("TIKET SAYA")
          }}>
            Tiket saya
          </div>

          <div className='menu-artikel shadow-prev-container' onClick={() => {
            setisEditProfile("menuArtikel")
            setmenuTitle("ARTIKEL SAYA")
          }}>
            Artikel saya
          </div>
        </div>

        <div className='isi-menu scaled-transition shadow-prev-container'>
          <div className='scaled-transition' style={{ display: "flex" }}>
            <h1 style={{ color: "grey", fontWeight: "bold" }}>
              {menuTitle}
            </h1>
          </div>
          <hr />
          {
            (isEditProfile === "editProfile")
              ?
              <EditProfile refreshTitle={titleNama} />
              :
              (isEditProfile === "menuTiket")
                ?
                <TiketSaya />
                :
                (isEditProfile === "menuArtikel")
                &&
                <ArtikelSaya />
          }
          
          <div className='btn btn-danger shadow-prev-container' onClick={() => { logOut() }}> LOGOUT</div>
          <hr />
          <div style={{ display: "flex", justifyContent: "end" }
          }>
            <span style={{ color: "grey", fontWeight: "bold", textAlign: "right" }}>
              MY <br /> TICKET
            </span>
            <div className='isi-menu-footer'>
              <span style={{ color: "grey", fontWeight: "bold", fontSize: "12px" }}>
                MyTicket.com
              </span>
              <span style={{ color: "grey", fontSize: "11px" }}>
                Copyright &#169; 2022
              </span>
            </div>
          </div>
        </div>
      </div>

      <ModalUploadPhoto
        modaltitle={titleModalUpload}
        closewhenimageuploaded={CloseModalWhenImageUploaded}
        show={modalUpload}
        onHide={() => setModalUpload(false)} />

      <ModalUpdateArtikel
        show={modalShow}
        thumbnail={previewImage}
        isshowthumbnail={showThumnail}
        onHide={() => setModalShow(false)} />
    </>
  )
}

export default ProfileComponent