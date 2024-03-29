import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/Context'
import editIconBanner from '../../assets/edit_icon.png'
import axios from 'axios'
import TiketSaya from './TiketSaya'
import EditProfile from './ProfileEditComponent'
import ModalUploadPhoto from './MoodalUploadPhoto'
import ArtikelSaya from './ArtikelSaya'
import ModalUpdateArtikel from './ModalUpdateArtikel'
import { Col } from 'react-bootstrap'
import ModalSaldo from './ModalSaldo'
import ModalTopUp from './ModalTopUp'
import { apiURL } from '../../Api';


const ProfileComponent = () => {

  const { userID } = useContext(UserContext)
  const { setprofilePictureUpdater } = useContext(UserContext)
  const { refreshFullName } = useContext(UserContext)
  const { RefreshEmail } = useContext(UserContext)
  const { RefreshNoTelepon } = useContext(UserContext)
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
  const [modalShowSaldo, setModalShowSaldo] = useState(false)
  const [modalShowTopUp, setmodalShowTopUp] = useState(false)
  const [showThumnail, setShowThumnail] = useState("thumbnail")
  const [previewImage, setPreviewImage] = useState("")

  //! Get user by ID 
  const titleNama = () => {
    axios.get(apiURL(userID).PROFILE_USER_DATA).then((response) => {
      if (response.data !== null) {
        setFullName(response.data.fullname)
        setemail(response.data.email)
        setnoTelepon(response.data.noTelepon)
        setUserProfilePicture(response.data.profilPhoto)
        setprofilePictureUpdater(response.data.profilPhoto)
        setUserBannerPicture(response.data.profilBannerPhoto)
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    })
  }

  //!call profile title name 
  useEffect(() => {
    const displayUserIdentity = () => {
      titleNama()
      setFullName(fullName)
      setemail(email)
      setnoTelepon(noTelepon)
    }

    displayUserIdentity()
    // eslint-disable-next-line
  }, [titleNama, setFullName, setemail, setnoTelepon])

  return (
    <>
      <div className='profile-container scaled-transition'>
        <div className='profile-banner shadow-prev-container' style={{ backgroundImage: `url(${userBannerPicture})` }}>
          <div className='icon-edit-banner-container'>
            <div style={{ cursor: "pointer", height: "100%", width: "100%" }} onClick={() => {
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
                alt="Gambar tidak tersedia"
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
              }} alt="Gambar tidak tersedia" />
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
                    (refreshFullName === "") ? fullName : refreshFullName
                }
              </span>
              <span style={{ color: "grey", fontWeight: "bold", textTransform: "lowercase", fontSize: "15px" }}>
                <i className="bi bi-envelope-at-fill"></i> {(RefreshEmail === "") ? email : RefreshEmail}
              </span>
              <span style={{ color: "grey", fontSize: "15px" }}>
                <i className="bi bi-telephone-fill"></i> {(RefreshNoTelepon === "") ? noTelepon : RefreshNoTelepon}
              </span>
              <Col>
                <div className='btn btn-danger m-1 shadow-prev-container scale-down-animation'
                  style={{ transition: "500ms" }}
                  onClick={() => { setmodalShowTopUp(true) }}> Topup <i className="bi bi-currency-exchange"></i>  </div>
                <div className='btn btn-success m-1 shadow-prev-container scale-down-animation'
                  style={{ transition: "500ms" }}
                  onClick={() => { setModalShowSaldo(true) }}> Saldo <i className="bi bi-wallet2"></i> </div>
              </Col>
            </div>
          </div>
        </div>
      </div>

      <div className='menu-container scaled-transition mt-3' >
        <div className='act-container mt-3'>

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
              {
                (menuTitle === "EDIT PROFILE")
                  ?
                  <span>
                    <i className="bi bi-pencil-square"></i> {menuTitle}
                  </span>
                  :
                  (menuTitle === "TIKET SAYA")
                    ?
                    <span>
                      <i className="bi bi-ticket-detailed"></i> {menuTitle}
                    </span>
                    :
                    (menuTitle === "ARTIKEL SAYA")
                      ?
                      <span>
                        <i className="bi bi-stickies"></i> {menuTitle}
                      </span>
                      : null

              }
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
        closewhenimageuploaded={() => setModalUpload(false)}
        show={modalUpload}
        onHide={() => setModalUpload(false)} />

      <ModalUpdateArtikel
        show={modalShow}
        thumbnail={previewImage}
        isshowthumbnail={showThumnail}
        onHide={() => setModalShow(false)} />

      <ModalSaldo
        show={modalShowSaldo}
        onHide={() => setModalShowSaldo(false)} />

      <ModalTopUp
        show={modalShowTopUp}
        onHide={() => setmodalShowTopUp(false)} />
    </>
  )
}

export default ProfileComponent