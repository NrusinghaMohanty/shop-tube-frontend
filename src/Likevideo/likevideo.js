import React from 'react'
import {useEffect} from "react"
import { useLikevideo } from "../Context/likevideoContext"
import "./likevideo.css"
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar"
import axios from "axios"

const Likevideo = () => {
    const { videoInlikevideo } = useLikevideo()
    const {likeVideodispatch} = useLikevideo()

    useEffect(() => {
        (async () => {
            const { likeVideos: data } = await axios
                .get("https://shoptube-backend.herokuapp.com/likevideo")
                .then((response) => {
                    return response.data;
                });
            console.log(data)
            likeVideodispatch({ type: "fetch", payload: data });
        })();
    }, [likeVideodispatch]);

    const removefromlikedvideo = (id) => {
        (async () => {
          const { success } = await axios
            .delete(`https://shoptube-backend.herokuapp.com/likevideo/${id}`)
            .then((response) => {
              return response.data;
            });
          if (success) {
            likeVideodispatch({ type: "REMOVE", payload: id });
          } else {
            console.log("error occured while removing video");
          }
        })();
      };

    const showLikevideo = (video) => {
        return (
            <>
                <div className="col">
                    <Link to={`/videos/${video._id}`}>
                        <div style={{ width: "560", height: "315" }}className="iframe">
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
                            <button onClick={()=>removefromlikedvideo(video._id)} className="btnn">Remove</button>
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
                    {videoInlikevideo.map(showLikevideo)}
                </div>
            </section>
        </div>
    )
}

export default Likevideo;