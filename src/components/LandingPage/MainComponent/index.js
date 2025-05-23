import React from "react";

import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/iphone.080029ada53f0cd57453.png";
import gradient from "../../../assets/gradient.12a666ed10b3b442b534.png";
import {Link} from "react-router-dom";

import { motion } from "framer-motion";

function MainComponent() {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'CryptoTracker',
                text: 'Track cryptocurrency prices in real-time!',
                url: window.location.href,
            })
            .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'))
            .catch((error) => console.log('Error copying:', error));
        }
    };

    return (
        <div className="flex-info">
            <div className="left-component">
                <motion.h1 className="track-crypto-heading"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Track Crypto
                </motion.h1>

                <motion.h1 className="real-time-heading"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Real Time.
                </motion.h1>

                <motion.p className="info-text"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                >
                    Track crypto through a public api in real time. Visit the dashboard to do so!
                </motion.p>

                <motion.div className="btn-flex"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    <Link to="/dashboard"><Button text={"Dashboard"}
                        outlined={false}
                        onClick={() => console.log("btn clicked")} />
                    </Link>
                    <Button text={"Share"} outlined={true} onClick={handleShare} />
                </motion.div>
            </div>

            <div className="phone-container">
                <motion.img 
                    src={iphone} 
                    className="iphone"
                    alt="iPhone mockup showing crypto tracking interface"
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        type: "smooth",
                        repeatType: "mirror",
                        duration: 2,
                        repeat: Infinity,
                    }}
                />
                <img 
                    src={gradient} 
                    className="gradient" 
                    alt="Decorative background gradient" 
                />
            </div>

        </div>
    )

}

export default MainComponent;