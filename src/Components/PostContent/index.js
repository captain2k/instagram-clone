import firebase from '@firebase/app-compat';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import Like from './../Like';
import styles from './postContent.module.scss'

function PostContent({ username, imageURL, caption, postID, isLiked, totalLike, isSaved }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isShow, setIsShow] = useState(false)
    const [user, setUser] = useState({})

    const userStore = useSelector(state => state.userReducer)

    useEffect(() => {
        setUser(userStore)
        setIsShow(userStore.isOnline ? true : false)
    }, [userStore])

    useEffect(() => {
        let unsubscribe;
        if (postID) {
            unsubscribe = db
                .collection("posts")
                .doc(postID)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postID])


    const showComments = () => {
        return comments.map((comment, index) => {
            return (
                <p
                    key={index}
                    className={styles.commentText}
                >
                    <strong>{comment.username}</strong>
                    {comment.text}
                </p>
            )
        })
    }

    const handlePost = () => {
        db.collection("posts").doc(postID).collection("comments").add({
            text: comment,
            username: user.user.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    const deletePost = () => {
        db.collection('posts').doc(postID).delete()
    }

    return (
        <div className={styles.postContent}>
            <div className={styles.heading}>
                <div className={styles.userInfo}>
                    <i>
                        <Avatar alt={username} src={username} />
                    </i>
                    <Link to={`/${username}`}>
                        <p>{username}</p>
                    </Link>
                </div>
                <i
                    onClick={deletePost}
                    className="fas fa-times"
                ></i>
            </div>
            <div className={styles.imagePost}>
                <img
                    src={imageURL}
                    alt="anh"
                />
            </div>
            <div className={styles.postReact}>
                <Like postID={postID} isLiked={isLiked} totalLike={totalLike} isSaved={isSaved} imageURL={imageURL} />
                <h4 className={styles.tittle}>
                    <strong>{username}</strong>
                    {caption}
                </h4>
                <h5 style={{ color: 'gray' }}>View more comments</h5>
                {showComments()}
            </div>
            {isShow ? (
                <div className={styles.postComment}>
                    <i className="far fa-smile"></i>
                    <div className={styles.postCommentInput}>
                        <input
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={!comment}
                        onClick={handlePost}
                        style={comment ? { color: "#21a2f6b3" } : {}}
                    >
                        Post
                    </button>
                </div>
            ) : ""}
        </div>
    );
}

export default PostContent;