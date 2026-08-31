import { motion } from "framer-motion";

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

export const Contact = () => {
    return (
      <motion.section
        id="contact"
        className="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.span className="eyebrow" variants={fadeInUp}>Get In Touch</motion.span>
          <motion.h2 className="contact-headline" variants={fadeInUp}>
            Let&rsquo;s make<br />something.
          </motion.h2>
          <motion.a
            href="mailto:hello@example.com"
            className="contact-email"
            variants={fadeInUp}
          >
            hello@example.com
          </motion.a>
        </motion.div>

        <motion.div
          className="contact-meta"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <div className="contact-meta-label">Socials</div>
            <div className="social-links">
              <motion.a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-soundcloud"></i>
              </motion.a>
              <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
              </motion.a>
              <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-twitter"></i>
              </motion.a>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="contact-meta-label">Based In</div>
            <span className="tag-chip">Location / 2026</span>
          </motion.div>
        </motion.div>
      </motion.section>
    );
}
