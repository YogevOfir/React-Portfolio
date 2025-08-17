import drone_segmentation from "../assets/projects/Drone_segmentation.png";
import notes_app from "../assets/projects/notes_app.png";
import techNaim from "../assets/projects/TechNaim.jpeg";
import portfolio from "../assets/projects/portfolio_image.png";
import bachelor from "../assets/diplomas/Bachelor.jpg";
import deepLearning from "../assets/diplomas/DeepLearning.png";
import metaReact from "../assets/diplomas/MetaReact.png";
import idf from "../assets/diplomas/IDF.jpeg"

export const HERO_CONTENT = `I'm a recent graduate in Computer Science and Mathematics with a passion for building impactful technology. I thrive on solving challenging problems, learning quickly, and continuously improving. With a detail-oriented mindset and strong communication skills, I'm eager to contribute to innovative projects and grow as a developer.`;

export const ABOUT_TEXT = `As a versatile full-stack developer, I specialize in creating efficient and user-friendly applications for both mobile and web platforms. My technical toolkit includes Java Script, React Native, Flutter, Java, C++, Python, along with experience in frameworks like React, Node.js, and databases such as FireBase and MongoDB. I enjoy working across the stack—from designing intuitive interfaces to building robust backend systems—and I'm always exploring new technologies to expand my capabilities. Whether collaborating with a team or working independently, I bring a self-driven approach and a commitment to delivering high-quality solutions.`;

export const EXPERIENCES = [
  {
    year: "2022 - 2025",
    role: "Computer Science & Mathematics B.sc",
    company: "Ariel University",
    image: bachelor,
    description: `Completed a Computer Science degree with a strong foundation in software development, algorithms, and system architecture, gaining hands-on experience through academic projects and collaborative problem-solving.`,
    technologies: ["Flutter", "FireBase", "Python", "Java", "C", "CPP", "SQL", "MongoDB"],
  },
  {
    year: "2025 - 2025",
    role: "Meta React Specialization",
    company: "Coursera",
    image: metaReact,
    description: `Completed the Meta React Specialization through Coursera, mastering front-end development with React, including component-based architecture, state management, and responsive design principles.`,
    technologies: ["React.js", "JavaScript"],
  },
  {
    year: "2022 - 2022",
    role: "Deep Learning Specialization",
    company: "Coursera",
    image: deepLearning,
    description: `Completed the Deep Learning Specialization on Coursera, gaining expertise in neural networks, convolutional and recurrent architectures, and practical applications of deep learning in real-world scenarios.`,
    technologies: ["Python", "TensorFlow", "Pytorch", "Keras", "NumPy"],
  },
  {
    year: "2018 - 2021",
    role: "Deputy Class Commander ",
    company: "IDF",
    image: idf,
    description: `Developed leadership and technical expertise in an artillery battery by managing classified equipment, optimizing command-level communication, and operating the SHEDER HAM system under high-pressure conditions.`,
    technologies: ["SHEDER-HAM"],
  },
];

export const PROJECTS = [
  {
    title: "TechNaim - Real-Time Technician Tracking & Scheduling",
    image: techNaim,
    url: "https://github.com/YogevOfir/TechNaim",
    description:
      "A real-time technician tracking and scheduling system designed to optimize field operations, enhance workforce coordination, and improve service delivery efficiency.",
    technologies: ["React-Native", "TypeScript", "CSS", "JavaScript", "Node.js", "MongoDB", "Express.js",],
  },
  {
    title: "Semantic Template Matching for UAV Localization",
    image: drone_segmentation,
    url: "https://github.com/YogevOfir/Semantic-Template-Matching-for-UAV-Localization",
    description:
      "A research project focused on enhancing unmanned aerial vehicle positioning accuracy using semantic image analysis and template matching techniques.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    url: "https://github.com/YogevOfir/React-Portfolio",
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["React", "TailwindCSS"],
  },
  {
    title: "NoteOverTheWorld",
    image: notes_app,
    url: "https://github.com/YogevOfir/NoteOverTheWorld",
    description:
      "A location-based note-taking app that allows users to save notes and visualize them on an interactive map using Google Maps integration.",
    technologies: ["Flutter", "FireBase"],
  },
];

export const CONTACT = {
  phoneNo: "053-531-0520 ",
  email: "yogev282000@gmail.com",
};
