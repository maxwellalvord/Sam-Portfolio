import { motion } from "framer-motion";

export const Landing = () => {
    return ( 
        <motion.section 
            id="home"
            className="hero"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
                <div className="hero-container">
                    <motion.div className="hero-content">
                        <motion.div className="hero-badge">
                            {/* <span> Welcome to</span> */}
                            <span className="stamp">Welcome</span>
                            <span className="stamp is-nope">To The</span>
                            <span className="stamp is-approved">Sam</span>
                            <span className="stamp is-draft">Show</span>
                        </motion.div>
                    </motion.div>
                </div>
        </motion.section>
    );
}   