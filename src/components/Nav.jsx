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

export const Navbar = () => {
  return (
    <>
      <motion.a
        href="#home"
        className="logo"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src="/projects/suitosamuchrome.png" alt="Logo" />
      </motion.a>

      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.ul
          className="nav-links"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.li
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" className="nav-home-link">
              <img src="/projects/suitosamuchrome.png" alt="Home" />
            </a>
          </motion.li>
          <motion.li
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#projects">Projects</a>
          </motion.li>
          <motion.li
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#contact">Contact</a>
          </motion.li>
        </motion.ul>
      </motion.nav>
    </>
  );
};
