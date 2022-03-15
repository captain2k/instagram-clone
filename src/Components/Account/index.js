import { Avatar, Modal, Box, Input, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from "./account.module.scss"
import { auth, db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, signUp } from '../../actions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

function Account() {
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [userCarry, setUserCarry] = useState(null)
    const [avatar, setAvatar] = useState('')
    const userStore = useSelector(state => state.userReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        // not understand yet
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                setUser(authUser)
                const userInfo = {
                    id: authUser.uid,
                    name: authUser.displayName,
                    email: authUser.email
                }
                setUserCarry(userInfo)
                dispatch(signUp(userInfo))
            } else {
                // user had log out
                setUser(null)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user, username, dispatch])

    useEffect(() => {
        if (userStore.userInfoId) {
            db.collection('userInfo').doc(userStore.userInfoId).get()
                .then(info => {
                    setAvatar(info.data().avatar)
                })
        }
    }, [userStore.userInfoId])

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password) //create new user on firebase
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: username
                }).then((updateUser) => setUser(updateUser))
                // Create default info of user 
                db.collection('userInfo').add({
                    id: authUser.user.uid,
                    username: username,
                    savedPost: [],
                    avatar: ''
                })
            })
            .catch(err => alert(err.message))
        setOpen(false)
        setUsername('');
        setPassword('');
        setEmail('');
    }


    const handleSignIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
            .catch(err => {
                alert(err.message)
            })
        setOpenSignIn(false)
        setUsername('');
        setPassword('');
        setEmail('');
    }

    const handleSignOut = () => {
        auth.signOut();
        dispatch(signOut(userCarry))
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={style}>
                    <form className={styles.formSignUp}>
                        <img
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt='Instagram'
                        />
                        <div>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus={true}
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <Box sx={style}>
                    <form className={styles.formSignUp}>
                        <img
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt='Instagram'
                        />
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus={true}
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <div className={styles.account}>
                <div>
                    <i>
                        <Avatar sx={{ width: 56, height: 56 }} src={avatar ? avatar : ''} />
                    </i>
                    <h4>
                        <strong>{user ? user.displayName : "@chính chủ"}</strong>
                    </h4>
                </div>
                {user ? (
                    <h5 onClick={handleSignOut}>Log out</h5>
                ) : (
                    <span>
                        <h5 onClick={() => setOpenSignIn(true)}>Sign In</h5>
                        <h5 onClick={() => setOpen(true)}>Sign Up</h5>
                    </span>
                )
                }

            </div>
            <div className={styles.suggest}>
                <h4>Suggestions For You</h4>
                <h5>See All</h5>
            </div>
            <ul className={styles.suggestList}>
                <li>
                    <i>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </i>
                    <h4>
                        <strong>_phnam.202_</strong>
                        <p>Hải Nam</p>
                    </h4>
                    <h5>Follow</h5>
                </li>
                <li>
                    <i>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </i>
                    <h4>
                        <strong>lesyeuxdelicie</strong>
                        <p>elica’s fisheye lens</p>
                    </h4>
                    <h5>Follow</h5>
                </li>
                <li>
                    <i>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </i>
                    <h4>
                        <strong>inn.makescoffee</strong>
                        <p>yeens's homecafe</p>
                    </h4>
                    <h5>Follow</h5>
                </li>
                <li>
                    <i>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </i>
                    <h4>
                        <strong>rosalee_room</strong>
                        <p>Followed by the.kaha + 2 more</p>
                    </h4>
                    <h5>Follow</h5>
                </li>
            </ul>
        </>
    );
}

export default Account;