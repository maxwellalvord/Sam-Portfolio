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

// Add a real `image` per project once assets are ready - tiles stay as
// placeholders until then.
const projects = [
  { title: "Project 01", tag: "Branding", span: true },
  { title: "Project 02", tag: "Visual" },
  { title: "Project 03", tag: "Motion" },
  { title: "Project 04", tag: "Photography" },
  { title: "Project 05", tag: "Design" },
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
              <div className="work-tile-placeholder">
                <span>Coming soon</span>
              </div>
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
