import { Avatar, Input, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { db, storage } from '../../firebase';
import PostProfile from '../PostProfile';
import SavedProfile from '../SavedProfile';
import styles from './profile.module.scss'

function Profile() {
    const params = useParams()
    const [postNumber, setPostNumber] = useState(0)
    const [avatar, setAvatar] = useState('')
    const userStore = useSelector(state => state.userReducer)

    useEffect(() => {
        db.collection('userInfo').doc(userStore.userInfoId).get().then(info => {
            setAvatar(info.data().avatar)
        })
    }, [userStore.userInfoId])

    const sendPostNumber = (num) => {
        setPostNumber(num)
    }

    const handleUpload = (e) => {
        const fileAvatar = e.target.files[0]
        const dateNow = String(Date.now())

        let uploadTask = storage.ref('avatars').child(`${dateNow} ${fileAvatar.name}`).put(fileAvatar)

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
                    .ref("avatars")
                    .child(`${dateNow} ${fileAvatar.name}`)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('userInfo').doc(userStore.userInfoId).update({
                            avatar: url
                        }).then(() => {
                            setAvatar(url)
                        })
                    })
            })
    }

    return (
        <div className={styles.profile}>
            <div className={styles.heading}>
                <i>
                    <Avatar sx={{ width: 150, height: 150 }} src={avatar ? avatar : ''} />
                </i>
                <div className={styles.headingInfo}>
                    <div className={styles.name}>
                        <h3>{params.userName}</h3>
                        <label htmlFor="contained-button-file">
                            <Input
                                style={{ display: 'none' }}
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={handleUpload}
                            />
                            <Button
                                variant="contained"
                                component="span"
                            >
                                Upload Avatar
                            </Button>
                        </label>
                        <i className='fas fa-cog'></i>
                    </div>
                    <div className={styles.follow}>
                        <p><strong>{postNumber}</strong> posts</p>
                        <p><strong>0</strong> followers</p>
                        <p><strong>0</strong> following</p>
                    </div>
                    <p className={styles.nickname}>{params.userName}</p>
                </div>
            </div>
            <div className={styles.nav}>
                <NavLink
                    to=''
                >
                    <div>
                        <i className="fas fa-th"></i>
                        <span>POSTS</span>
                    </div>
                </NavLink>
                <NavLink
                    to={`saved`}
                >
                    <div style={{ marginLeft: 60, marginRight: 60 }}>
                        <i className="far fa-bookmark"></i>
                        <span>SAVED</span>
                    </div>
                </NavLink>
                <NavLink
                    to={`tagged`}
                >
                    <div>
                        <i className="fas fa-user-tag"></i>
                        <span>TAGGED</span>
                    </div>
                </NavLink>
            </div>
            <div className={styles.content}>
                <Routes>
                    <Route path='' element={<PostProfile sendPostNumber={sendPostNumber} />} />
                    <Route path={`saved`} element={<SavedProfile sendPostNumber={sendPostNumber} />} />
                </Routes>
            </div>

            <div className={styles.footer}>
                <div className={styles.about}>
                    <p>Meta</p>
                    <p>About</p>
                    <p>API</p>
                    <p>Terms</p>
                    <p>Locations</p>
                    <p>Instagram Lite</p>
                </div>
                <div className={styles.original}>
                    <p>2021 Instagram from Meta</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;