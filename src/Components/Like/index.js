import React, { useEffect, useState } from 'react';
import * as styles from './like.module.scss';
import { db } from './../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../actions';


function Like({ postID, isLiked, totalLike, imageURL }) {
    const userStore = useSelector(state => state.userReducer)
    const [docId, setDocId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = db.collection('userInfo').onSnapshot(snapshot => {
            const userInfoList = snapshot.docs.map(doc => {
                return {
                    userInfoId: doc.id,
                    userInfo: doc.data()
                }
            })
            console.log(userInfoList)
            const userId = userInfoList.filter(userInfoItem => userInfoItem.userInfo.id === userStore.user.id)
            dispatch(getUserId(userId[0].userInfoId))
            setDocId(userId[0].userInfoId)
        })

        return () => unsubscribe()
    }, [dispatch, userStore.user.id])



    const handleClick = () => {
        if (userStore.isOnline) {
            if (!totalLike.includes(userStore.user.id)) {
                totalLike.push(userStore.user.id)
                isLiked = true
            } else {
                let userIndex = totalLike.indexOf(userStore.user.id)
                totalLike.splice(userIndex, 1)
                isLiked = false
            }
            db.collection('posts').doc(postID).update({
                isLiked: isLiked,
                totalLike: totalLike
            })
        }
    }

    const handleSaved = () => {
        if (userStore.isOnline) {
            db.collection('userInfo').doc(docId).get().then(info => {
                let savedPostList = info.data().savedPost
                if (!savedPostList.includes(imageURL)) {
                    savedPostList.push(imageURL)
                    db.collection('userInfo').doc(docId).update({
                        savedPost: savedPostList
                    }).then(() => {
                        console.log('add success')
                        alert('The post was saved successfully')
                    })
                } else {
                    const postIndex = savedPostList.indexOf(imageURL)
                    savedPostList.splice(postIndex, 1)
                    db.collection('userInfo').doc(docId).update({
                        savedPost: savedPostList
                    }).then(() => {
                        console.log('remove success')
                        alert('The post was deleted from saved successfully')
                    })
                }
            })
        }
    }

    return (
        <div>
            <div className={styles.postAction}>
                <div className={styles.postLike}>
                    <i
                        className="fas fa-heart"
                        onClick={handleClick}
                        style={isLiked ? { color: 'red' } : {}}
                    ></i>
                    <i
                        className="far fa-comment"
                    ></i>
                    <i className="fas fa-share"></i>
                </div>
                <i
                    onClick={handleSaved}
                    className="far fa-bookmark"
                ></i>
            </div>
            <h5>{totalLike.length} likes</h5>
        </div>
    );
}

export default Like;