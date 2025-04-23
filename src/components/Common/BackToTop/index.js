import React, { useState, useEffect } from "react";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import "./styles.css";

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    };

    if (!isVisible) return null;

    return (
        <button
            className="back-to-top-btn"
            onClick={scrollToTop}
            onKeyPress={handleKeyPress}
            aria-label="Scroll to top"
            tabIndex={0}
        >
            <ArrowCircleUpRoundedIcon style={{ color: "var(--blue)" }} aria-hidden="true" />
        </button>
    );
}

export default BackToTop;