import firebase from "firebase/compat/app";
import React, { useState, memo, useEffect } from 'react';
import { Avatar, Button, Modal, Input } from '@mui/material'
import { Box } from '@mui/system';
import { db, storage } from '../../firebase';
import { useSelector } from "react-redux";
import styles from "./header.module.scss"
import { Link } from "react-router-dom";

function Header() {

    const [postOpen, setPostOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [user, setUser] = useState({})
    const [localImg, setLocalImg] = useState('')
    const [isShow, setIsShow] = useState(false)

    const userStore = useSelector(state => state.userReducer)

    useEffect(() => {
        setUser(userStore)
    }, [userStore])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setLocalImg(e.target.files[0].name)
        }
    }

    const handleUpLoad = () => {
        const dateNow = String(Date.now())

        let uploadTask = storage.ref('images').child(`${dateNow} ${image.name}`).put(image)

        uploadTask.on(
            "state_change",
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                    default: break;
                }
            },
            (error) => {
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(`${dateNow} ${image.name}`)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption,
                            imageURL: url,
                            username: user.user.name,
                            isLiked: false,
                            totalLike: [],
                            isSaved: false
                        })
                    })
            })

        setPostOpen(false)
        setImage(null)
        setCaption('')
    }

    const handlePost = () => {
        if (user.isOnline) {
            setPostOpen(true)
        } else {
            alert('You must be login to creat new post')
        }
    }

    const handleShow = () => {
        setIsShow(!isShow)
    }

    return (
        <div className={styles.header}>
            <Modal
                open={postOpen}
                onClose={() => setPostOpen(false)}
            >
                <Box className={styles.box}>
                    <i
                        className={`${styles.times} fas fa-times`}
                        onClick={() => {
                            setPostOpen(false)
                            setImage(null)
                        }}
                    >
                    </i>
                    <div className={styles.newPost}>
                        <div className={styles.newPostHeading} >Create a new post</div>
                        {image ? (
                            <div className={styles.upLoadPost} >
                                <div className={styles.upLoadPostWrap}>
                                    <img src={process.env.PUBLIC_URL + `/img/${localImg}`} alt="anh" />
                                    <div>
                                        <Input
                                            placeholder="Enter a caption"
                                            autoFocus
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        onClick={handleUpLoad}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.newPostWrap}>
                                <i className="far fa-images"></i>
                                <h2>Drag photos and videos here</h2>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        sx={{ display: "none" }}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={handleChange}
                                    />
                                    <Button variant="contained" component="span">
                                        Select from computer
                                    </Button>
                                </label>
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
            <div className={styles.header_heading}>
                <Link to='/'>
                    <img
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt='Instagram'
                        className={styles.header_logo}
                    />
                </Link>

                <div className={styles.header_input_wrap}>
                    <span><i className="fas fa-search"></i></span>
                    <span>Search</span>
                </div>
                <div className={styles.header_navbar}>
                    <Link to='/'>
                        <i className="fas fa-home"></i>
                    </Link>

                    <Link to='/direct' >
                        <i className="fab fa-facebook-messenger"></i>
                    </Link>


                    <i
                        className="far fa-plus-square"
                        onClick={handlePost}
                    >
                    </i>

                    <Link to='/explore'>
                        <i className="far fa-compass"></i>
                    </Link>

                    <i className="far fa-heart"></i>

                    <i
                        className={styles.avatar}
                        onClick={handleShow}
                    >
                        <Avatar sx={{ width: 23, height: 23 }} />
                        <div
                            className={styles.userInfo}
                            style={isShow ? { display: 'block' } : {}}
                        >
                            <ul className={styles.userInfoList}>
                                <li className={styles.userInfoItem}>
                                    <Link
                                        to={user.user ? `/${user.user.name}` : '/'}
                                        style={
                                            {
                                                textDecoration: 'none',
                                                color: 'black'
                                            }
                                        }
                                    >
                                        <div>
                                            <i className="far fa-user-circle"></i>
                                            <span>Profile</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={styles.userInfoItem}>
                                    <Link
                                        to={user.user ? `/${user.user.name}/saved` : '/'}
                                        style={
                                            {
                                                textDecoration: 'none',
                                                color: 'black'
                                            }
                                        }
                                    >
                                        <div>
                                            <i className="far fa-bookmark"></i>
                                            <span>Saved</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={styles.userInfoItem}>
                                    <div>
                                        <i className="fas fa-cog"></i>
                                        <span>Settings</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </i>

                </div>
            </div>
        </div>

    );
}

export default memo(Header);