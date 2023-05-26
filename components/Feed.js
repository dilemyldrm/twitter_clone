import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from '../components/Input'
import Post from "./Post";
import { useTheme } from "next-themes";
import {MdDarkMode, MdLightMode} from "react-icons/md"


const Feed = () => {

    const {systemTheme, theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if(!mounted) return null;
        
         const currenTheme = theme === 'system' ? systemTheme : theme;

         if (currenTheme === 'dark') {
            return (
                <MdLightMode className="w-7 h-7" role="button" onClick={() => setTheme('light')} />
            );
         
        }else {
        return (
            <MdDarkMode className="w-7 h-7" role="button" onClick={() => setTheme('dark')} />
        );
    }
    };

    const [posts, setPosts] = useState([])

    useEffect(
        () => onSnapshot(
            query(collection(db, "posts"), orderBy("timestamp", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs)
            }
        ), [db]
    )

    console.log(posts);

    return (
        <div className="sm:ml-[81px] xl:ml-[340px] w-[600px] min-h-screen border-r dark:border-gray-400 text-black dark:text-white py-2">

            <div className="sticky top-0 dark:bg-black flex justify-between font-medium text-[20px] px-4 py-2">
                Home
                {renderThemeChanger()}
            </div>

            <Input />

            {posts.map((post) => (
                <Post key={post.id} id={post.id} post={post.data()} />
            ))}

        </div>
    )
}

export default Feed