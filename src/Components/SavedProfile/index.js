import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { db } from '../../firebase';
import styles from './savedProfile.module.scss'

function SavedProfile() {
    const params = useParams()
    const userStore = useSelector(state => state.userReducer)
    const [saveList, setSaveList] = useState(null)
    useEffect(() => {
        db.collection('userInfo').onSnapshot(snapshot => {
            const userInfoList = snapshot.docs.map(doc => {
                return {
                    userInfoId: doc.id,
                    userInfo: doc.data()
                }
            })
            const userId = userInfoList.filter(userInfoItem => {
                return userInfoItem.userInfo.id === userStore.user.id
            })

            if (userId[0]) {
                db.collection('userInfo').doc(userId[0].userInfoId).onSnapshot(snapshot => {
                    setSaveList(snapshot.data().savedPost)
                })
            }
        })

        return () => {
            setSaveList(null)
        }
    }, [userStore.user.id, params.userName, userStore.user.name])


    const showSavedList = () => {
        if (saveList) {
            if (params.userName !== userStore.user.name) {
                setSaveList(null)
            }
            return saveList.map((url, index) => {
                return (
                    <img alt='anh' src={url} key={index} />
                )
            })
        }
    }

    return (
        <div className={styles.wrap}>
            {saveList ? showSavedList() : null}
        </div>
    );
}

export default SavedProfile;