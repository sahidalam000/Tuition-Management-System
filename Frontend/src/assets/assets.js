import { FaLightbulb, FaPaintBrush, FaCode, FaReact, FaServer, FaMobileAlt, FaTools, FaNodeJs, FaStripe, FaVuejs, FaFire, FaDatabase, FaCloud, FaRobot } from 'react-icons/fa';

import sahidbhaiImg from '../assets/sahidbhai.avif';
import heroImg from '../assets/hero.avif';
import aboutImg from '../assets/about.avif';
import logo1Img from '../assets/logo1.avif';
import section1Img from '../assets/section1.avif';
import section2Img from '../assets/section2.avif';
import section3Img from '../assets/section3.avif';
import section4Img from '../assets/section4.avif';
import whoImg from '../assets/who.avif';
import mathsImg from '../assets/maths.avif';
import scienceImg from '../assets/science.avif';
import course1Img from '../assets/course1.avif';
import course2Img from '../assets/course2.avif';
import coursebackImg from '../assets/courseback.avif';



export const assets = {
    sahidbhaiImg, heroImg, aboutImg, logo1Img, section1Img, section2Img, section3Img, section4Img, whoImg, mathsImg, scienceImg, course1Img, course2Img, coursebackImg,

}


export const aboutInfo = [
    {
      icon: FaLightbulb,
      title: 'Innovative',
      description: 'I love creating unique solutions to complex problems with cutting-edge technologies.',
      color: 'text-purple'
    },
    {
      icon: FaPaintBrush,
      title: 'Design Oriented',
      description: 'Beautiful design and user experience are at the heart of everything I create.',
      color: 'text-pink'
    },
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'I write maintainable, efficient code following best practices and modern patterns.',
      color: 'text-blue'
    }
  ];



export const skills = [
  {
    title: 'Frontend Development',
    icon: FaReact,
    description: 'Building responsive and interactive user interfaces with modern frameworks.',
    tags: ['JavaScript','React.js', 'Tailwind CSS', 'Redux', ]
  },
  {
    title: 'Backend Development',
    icon: FaServer,
    description: 'Creating robust server-side applications and RESTful APIs.',
    tags: ['Node.js', 'Express.js', 'Rest API', ]
  },
  {
    title: 'Database Management',
    icon: FaDatabase,
    description: 'Designing and optimizing databases for performance and scalability.',
    tags: ['MongoDB', 'MySQL', 'Firebase']
  },
  // {
  //   title: 'Mobile Development',
  //   icon: FaMobileAlt,
  //   description: 'Building cross-platform mobile applications with modern tools.',
  //   tags: ['React Native', ]
  // },
  // {
  //   title: 'Cloud & DevOps',
  //   icon: FaCloud,
  //   description: 'Deploying and managing applications in cloud environments.',
  //   tags: ['AWS', 'Docker']
  // },
  {
    title: 'Tools & Technologies',
    icon: FaTools,
    description: 'Essential tools and technologies I use in my development workflow.',
    tags: ['Git & GitHub', 'VS Code', 'Postman', 'Figma']
  }
];



export const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with shopping cart, user authentication, and payment processing.",
    image: foodImg,
    tech: ["React", "Node.js", "Express.js", "MongoDB","Bootstrap", "Redux","Cloudinary", "Stripe"],
    icons: [FaReact, FaNodeJs, FaDatabase , FaStripe],
    demo: "#",
    code: "https://github.com/sahidalam000/Food-Delivery-Website-.git",
  },
  {
    title: "A Role-Based Job Portal",
    description: " Implemented core features including job posting, application tracking, profile management, and personalized dashboards for both user roles.",
    image: hireImg,
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    icons: [FaVuejs, FaFire, FaCloud , FaDatabase],
    demo: "#",
    code: "https://github.com/sahidalam000/HireHub-Role-Based-Job-Portal.git",
  },
  {
    title: "Personal Portfolio ",
    description: "A modern and responsive portfolio website showcasing my skills, projects, and experience with smooth animations and an intuitive user interface.",
    image: folioImg,
    tech: ["React", "Framer-motion", "Express.js", "MongoDB", "Tailwind CSS",],
    icons: [FaReact, FaDatabase],
    demo: "#",
    code: "#",
  },
  // {
  //   title: "Portfolio Website",
  //   description: "A personal portfolio to showcase projects, skills, and blogs with dark/light mode support.",
  //   image: projectImg4,
  //   tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Markdown"],
  //   icons: [FaReact, FaCloud],
  //   demo: "#",
  //   code: "#",
  // },
  // {
  //   title: "Chat App",
  //   description: "A real-time chat application with group messaging, emojis, and file sharing.",
  //   image: projectImg5,
  //   tech: ["Socket.IO", "React", "Node.js", "MongoDB"],
  //   icons: [FaReact, FaNodeJs, FaDatabase ],
  //   demo: "#",
  //   code: "#",
  // },
  // {
  //   title: "AI Image Generator",
  //   description: "Generate images using AI prompts powered by OpenAI's DALL·E model and Cloudinary.",
  //   image: projectImg6,
  //   tech: ["React", "OpenAI API", "Cloudinary", "Tailwind CSS"],
  //   icons: [FaRobot, FaReact, FaCloud],
  //   demo: "#",
  //   code: "#",
  // }
];


export const workData = [
  {
    role: "Full Stack Web Development Internship (Remote) ",
    company: "Webstack Academy, Bengaluru ",
    duration: "July 2024 – Sept 2024",
    description:
      "Developed and maintained a full-stack food ordering web applications using the MERN & Built features for integrated for order tracking and user authentication to enhance user engagement and data security.",
    color: "purple"
  },
  {
    role: "Web Development Summer Internship (Remote)",
    company: "Prodigy Infotech, Mumbai",
    duration: "July 2024 – Aug 2024",
    description:
      "Developed personal portfolio website using HTML, CSS & JavaScript & Built a functional stopwatch web app featuring start, stop & reset controls, improving DOM manipulation & JavaScript proficiency.",
    color: "pink"
  },
  // {
  //   role: "Junior Developer",
  //   company: "StartUp Ventures",
  //   duration: "2016 - 2018",
  //   description:
  //     "Started my career building basic websites and gradually took on more complex projects as I expanded my skill set.",
  //   color: "blue"
  // }
];
