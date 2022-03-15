import { Avatar } from '@mui/material';
import React from 'react';
import styles from "./postStory.module.scss"

function PostStory() {
    return (
        <div className={styles.post_story}>
            <div className={styles.post_story_list}>
                <div className={styles.post_story_item}>
                    <i>
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </i>
                    <p>name</p>
                </div>
                <div className={styles.post_story_item}>
                    <i>
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </i>
                    <p>name</p>
                </div>
                <div className={styles.post_story_item}>
                    <i>
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </i>
                    <p>name</p>
                </div>
                <div className={styles.post_story_item}>
                    <i>
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </i>
                    <p>name</p>
                </div>
                <div className={styles.post_story_item}>
                    <i>
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </i>
                    <p>name</p>
                </div>
                <div className={styles.post_story_item}>
                    <i>
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </i>
                    <p>name</p>
                </div>
            </div>
        </div>
    );
}

// export default PostStory;