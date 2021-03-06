import React from 'react'
import {useEffect} from "react"
import { useVideo } from '../Context/videoContext'
import "./video.css"
import { Link } from "react-router-dom"
import Navbar from "../Component/Navbar"
import axios from "axios"

const Video = () => {
    const { videos,videodispatch } = useVideo();

    // const [show, setshow] = useState(false);

    useEffect(() => {
        (async () => {
            const { videos: data } = await axios
                .get("https://shoptube-backend.herokuapp.com/videos")
                .then((response) => {
                    return response.data;
                });
              console.log("coming......")  
            videodispatch({ type: "fetch", payload: data });
        })();
    }, [videodispatch]);

    function showallVideos(video) {
        return (
            <>
                <div className="col">
                    <Link to={`/videos/${video._id}`}>
                        <div className="video-img">
                            <img src={video.imageurl} alt="not found" />
                        </div>
                    </Link>
                    <div className="video-text">
                        {/* <div className="video-logo">
                            <img src={video.channellogourl} className="logo-img"/>
                        </div> */}
                        <div className="video-details">
                            <p>{video.name}</p>
                            <small>{video.channelname}</small>
                            <p>{video.date}</p>
                        </div>
                        <div className="ellipse">
                            {/* <i className="fas fa-ellipsis-v"></i> */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div>
                <Navbar/>
                <section>
                    <div className="row row-2">
                        <h1>All video</h1>
                        {/* <input placeholder="search....." /> */}
                    </div>
                    <div className="row">
                        {videos.map(showallVideos)}
                    </div>
                </section>

            </div>

        </>
    )
}

export default Video;