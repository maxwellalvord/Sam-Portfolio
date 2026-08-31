import { motion } from "framer-motion";
import { TrackCarousel } from "./TrackCarousel";
import { ImageDistortion } from "./ImageDistortion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Landing = () => {
    return ( 
        <motion.section 
            id="home"
            className="hero"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
                <ImageDistortion />
                <div className="hero-container">
                    <motion.div 
                    className="hero-content" 
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    >
                        <motion.div className="hero-badge">
                            <span className="tag-chip accent">Welcome</span>
                            <span className="tag-chip">Sam Show</span>
                            <span className="tag-chip">2026</span>
                        </motion.div>
                        <motion.h1
                        className="hero-title"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02}}
                        >Name or stage name here</motion.h1>
                        <motion.h2 className="hero-subtitle" variants={staggerContainer}>
                            Creative and Organizer
                        </motion.h2>
                        <motion.p className="hero-description" variants={staggerContainer}>
                            Insert short blurb here describing self?
                        </motion.p>

                        <motion.div className="cta-buttons" variants={staggerContainer}>
                            <motion.a
                                href="#projects"
                                className="cta-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Check my work
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="cta-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>
                        <motion.div className="social-links" variants={staggerContainer}>
                            <motion.a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-soundcloud"></i>
                            </motion.a>
                            <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> 
                                <i className="fa-brands fa-linkedin"></i>
                            </motion.a>
                            <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-twitter"></i>
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0, x: 50}}
                        animate={{ opacity: 1, x: 0}}
                        transition={{duration: 0.8, delay: 0.4 }}
                    >
                        <div className="poster-tile">
                          <TrackCarousel />
                        </div>
                    </motion.div>

                    <span className="vertical-tag">Portfolio &mdash; Selected Works</span>
                </div>
        </motion.section>
    );
}   