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

const projects = [
  { title: "Project 01", tag: "Branding", image: "/projects/bg2.jpg", span: true },
  { title: "Project 02", tag: "Visual", image: "/projects/bg3.jpg" },
  { title: "Project 03", tag: "Motion", image: "/projects/bgphoto.jpg" },
  { title: "Project 04", tag: "Photography", image: "/projects/gettyimages-872756920-640x640.jpg" },
  { title: "Project 05", tag: "Design", image: "/projects/1000_F_262481658_hfHV4aNMhckHbgHc1UbJnf9DSSwB6vIe.jpg" },
];

export const Second = () => {
    return (
      <motion.section
        id="projects"
        className="work"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="work-header"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.span className="eyebrow" variants={fadeInUp}>Selected Work</motion.span>
          <motion.h2 className="hero-title" variants={fadeInUp} style={{ fontSize: "3.5rem" }}>
            Placeholder Projects
          </motion.h2>
        </motion.div>

        <motion.div
          className="work-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className={`work-tile ${project.span ? "span-2" : ""}`}
              variants={fadeInUp}
            >
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="work-tile-info">
                <span className="work-tile-title">{project.title}</span>
                <span className="tag-chip">{project.tag}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    );
}
