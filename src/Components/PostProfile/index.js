import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from './../../firebase';
import styles from './postProfile.module.scss'

function PostProfile({ sendPostNumber }) {

    const params = useParams()
    const [userPost, setUserPost] = useState(null)

    useEffect(() => {
        const cleanUp = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const postUser = snapshot.docs.filter(doc => {
                return doc.data().username === params.userName
            })
            if (postUser.length > 0) {
                const postUserList = []
                for (let i = 0; i < postUser.length; i++) {
                    postUserList.push(postUser[i].data())
                }
                setUserPost(postUserList)
                sendPostNumber(postUser.length)
            }
        })

        return () => cleanUp()
    }, [params.userName, sendPostNumber])

    const showUserPost = () => {
        return userPost.map((doc, index) => {
            return (
                <img alt='anh' src={doc.imageURL} key={index} />
            )
        })
    }

    return (
        <>
            {userPost ? (
                <div className={styles.photoWrap} >
                    {showUserPost()}
                </div>
            ) : (
                <>
                    <div className={styles.imageL}>
                        <img alt='anh' src='https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg' />
                    </div>
                    <div className={styles.imageR}>
                        <div className={styles.wrap}>
                            <strong>Start capturing and sharing your moments.</strong>
                            <p>Get the app to share your first photo or video.</p>
                            <div>
                                <img alt='anh' src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png' />
                                <img alt='anh' src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png' />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default PostProfile;