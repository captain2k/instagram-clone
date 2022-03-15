import React, { useEffect } from 'react';
import PostStory from './../PostStory';
import PostContent from './../PostContent'
import Account from './../Account';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from './../../firebase'
import { uploadPost } from '../../actions';

function Home() {

    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // When postList is updated, callback will be called => rerender component => show new posts
        const cleanUp = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            let postList = snapshot.docs.map(doc => { //map always return a array contains result of callback
                return {
                    id: doc.id,
                    post: doc.data()
                }
            })
            dispatch(uploadPost(postList));
            setPosts(postList)
        });
        return () => {
            cleanUp()
        }
    }, [dispatch])

    const showPost = () => {
        return posts.map(postItem => {
            const { id, post } = postItem
            return (
                <PostContent
                    key={id}
                    username={post.username}
                    imageURL={post.imageURL}
                    caption={post.caption}
                    postID={id}
                    isLiked={post.isLiked}
                    totalLike={post.totalLike}
                    isSaved={post.isSaved}
                />
            )
        })
    }

    return (
        <>
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                {/* post story */}
                {/* <div className="post_story">
                    <PostStory />
                </div> */}
                {/* Post content */}
                {showPost()}
            </div>
            <div className=" col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div className="subContent">
                    <Account />
                </div>
            </div>
        </>

    );
}

export default Home;