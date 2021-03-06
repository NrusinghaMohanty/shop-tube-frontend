import React from 'react'
import {useEffect} from "react"
import { useWatchLater } from '../Context/watchContext'
import "./watchLater.css"
import { Link } from "react-router-dom"
import Navbar from "../Component/Navbar"
import axios from "axios"

const WatchLater = () => {
    const {videoInwatchLater,watchLaterdispatch}= useWatchLater()

    useEffect(() => {
        (async () => {
            const { watchLatervideos: data } = await axios
                .get("https://shoptube-backend.herokuapp.com/watchlater")
                .then((response) => {
                    return response.data;
                });

            watchLaterdispatch({ type: "fetch", payload: data });
        })();
    }, [watchLaterdispatch]);

    const removefromwatchlater = (id) => {
        (async () => {
          const { success } = await axios
            .delete(`https://shoptube-backend.herokuapp.com/watchlater/${id}`)
            .then((response) => {
              return response.data;
            });
          if (success) {
            watchLaterdispatch({ type: "REMOVE", payload: id });
          } else {
            console.log("error occured while removing video");
          }
        })();
      };


    const showWatchLater = (video) =>{
        return (
            <>
            <div className="col">
                <Link to={`/videos/${video._id}`} >
                    <div style={{ width: "560", height: "315" }} className="iframe">
                        <img src={video.imageurl} style={{ width: "100%" }} alt="not found"/>
                    </div>
                </Link>
                <div className="video-text">
                    {/* <div className="video-logo">
                        <img src={video.channellogourl} />
                    </div> */}
                    <div className="video-details">
                        <p>{video.name}</p>
                        <small>{video.channelname}</small>
                        <p>{video.date}</p>
                    </div>
                    <div>
                        {/* <i className="fas fa-ellipsis-v"></i> */}
                        <button onClick={()=>removefromwatchlater(video._id)} className="btnn">Remove</button>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
        return (
            <div>
                <Navbar />
                <section>
                    <div className="row">
                {videoInwatchLater.map(showWatchLater)}
                </div>
                </section>
            </div>
        )
    }

export default WatchLater
