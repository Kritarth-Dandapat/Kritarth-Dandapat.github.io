import { BookOpen, Brain, Code, Database, GraduationCap, Microscope, Trophy, Users, Award, MonitorPlay, Mic2 } from 'lucide-react';
import { BlogPost, Education, Experience, Project, Publication, SkillCategory } from './types';

export const CONTACT_INFO = {
  name: "Kritarth Dandapat",
  title: "AI Developer & Research Assistant",
  email: "kritarth@buffalo.edu",
  phone: "+1 (716) 612-0016",
  location: "Buffalo, NY",
  github: "https://github.com/Kritarth-Dandapat",
  linkedin: "https://linkedin.com/in/kritarth-dandapat",
  website: "https://kritarthdandapat.com",
  bio: "Passionate Computer Science student and AI researcher with expertise in computer vision, deep learning, and healthcare technology. On an accelerated track to graduate in 3 years while conducting high-impact research in dental health applications and materials science.",
  sopSnippet: "My academic journey has been driven by a fascination with the power of artificial intelligence to solve tangible, human-centric problems. I am driven to move beyond applying known techniques to creating original, high-impact research."
};

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science (Minor in Statistics)",
    institution: "University at Buffalo, SUNY",
    location: "Buffalo, NY",
    period: "Aug 2023 - June 2026 (Expected)",
    details: [
      "GPA: 3.8+ (Dean’s List: Fall 2023, Spring 2024, Fall 2024)",
      "Presidential Scholarship: $15,000 per annum",
      "Accelerated 3-year program (Taking 21-22 credit semesters)"
    ]
  }
];

export const RESEARCH_EXPERIENCE: Experience[] = [
  {
    role: "Research Assistant",
    organization: "Embedded Sensing and Computing (ESC) Group, University at Buffalo",
    location: "Buffalo, NY",
    period: "June 2024 - Present",
    description: [
      "Developing OralScan, a mobile application using a YOLOv8 model for real-time dental disease classification and tooth numbering from intraoral images.",
      "Building mobile and web applications using React Native and React for healthcare diagnostics.",
      "Co-authored a paper on the system’s formative usability and acceptability study, submitted to the Smart Health journal.",
      "Currently developing an orthodontics extension to track patient braces movements and classify braces types using YOLO-based models.",
      "Creating deep learning models for accurate orthodontic scoring using depth sensors."
    ],
    technologies: ["YOLOv8", "React Native", "React", "Computer Vision", "Healthcare AI"]
  },
  {
    role: "Undergraduate Researcher",
    organization: "Peng Research Lab, University at Buffalo",
    location: "Buffalo, NY",
    period: "June 2025 - Present",
    description: [
      "Conducting research on symmetry-aware graph neural networks (GNNs) for crystalline materials, contributing to work detailed in arXiv:2409.13851.",
      "Migrated the lab’s model tracking and hyperparameter optimization workflows from SigOpt to Weights & Biases (wandb) for final paper revisions.",
      "Benchmarked and trained models on new GNN architectures, including ALIGNN, to evaluate performance for resubmission.",
      "Contributed to a recent commentary paper on agentic AI for catalyst discovery (Peng et al., 2025, ChemRxiv).",
      "Collaborating with graduate students on high-throughput atomistic simulations and data pipelines."
    ],
    technologies: ["GNNs", "PyTorch", "WandB", "ALIGNN", "Material Science"]
  }
];

export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    role: "Tutor & Peer-Assisted Leader",
    organization: "Tutoring & Academic Support Services, University at Buffalo",
    location: "Buffalo, NY",
    period: "Aug 2024 - Present",
    description: [
      "Conducting two interactive 1-hour sessions per week, improving students’ understanding of Statistics by 30% based on quiz performance and feedback.",
      "Providing in-depth explanations, answering student queries, and reinforcing key concepts during PAL sessions.",
      "Serving as both a tutor and Peer-Assisted Learning (PAL) leader, helping students master statistical concepts."
    ]
  },
  {
    role: "Founder & Vice President (NSDC)",
    organization: "UB National Student Data Corps",
    location: "Buffalo, NY",
    period: "Oct 2023 - May 2024",
    description: [
      "Led the development and launch of the NSDC website, improving event coordination and communication.",
      "Co-founded and led the University at Buffalo chapter of the National Student Data Corps.",
      "Planned and executed various data science workshops and networking events, establishing a strong network of data science enthusiasts at UB."
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    title: "OralScan, an AI-Powered Mobile Tool for Geriatric Oral Healthcare: A Formative Usability and Acceptability Study",
    authors: "Soni, P., Dandapat, K., Gherardi, A., Bo, W., Li, R., & Xu, W.",
    venue: "Submitted to Smart Health",
    year: "2025",
    status: "Under Review"
  },
  {
    title: "Accelerating Multimetallic Catalyst Discovery with Robotics and Agentic AI",
    authors: "Peng, J., Liu, C., Luo, Y., & Dandapat, K.",
    venue: "ChemRxiv, ver. 1. DOI: 10.26434/chemrxiv-2025-13n3f",
    year: "2025",
    link: "https://doi.org/10.26434/chemrxiv-2025-13n3f"
  },
  {
    title: "Learning Ordering in Crystalline Materials with Symmetry-Aware Graph Neural Networks",
    authors: "Peng, J., et al.",
    venue: "arXiv Preprint, arXiv:2409.13851",
    year: "2024",
    link: "https://arxiv.org/abs/2409.13851",
    status: "Contributed to revisions and benchmarking"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Marine Guardian: Ship Detection",
    category: "Computer Vision",
    description: [
      "Developed computer vision system for detecting ships using first principles of computer vision.",
      "Implemented roundness-based classification achieving 98.72% accuracy with MobileNetV2.",
      "Created fast detection algorithm using geometric properties for real-time maritime monitoring.",
      "Used transfer learning with pre-trained EfficientNet as encoder with custom decoder."
    ],
    technologies: ["Python", "OpenCV", "TensorFlow", "EfficientNet", "MobileNetV2", "ResNet50", "KMeans"],
    stats: "98.72% Accuracy"
  },
  {
    title: "OralScan: AI-Powered Dental Care",
    category: "Healthcare AI",
    description: [
      "Developed mobile and web app for accessible, AI-driven oral health diagnostics and care recommendations.",
      "Built React Native mobile app and React web dashboard for real-time dental screening.",
      "Integrated YOLOv8 for disease/tooth detection and ResNet50-based CNNs for image analysis.",
      "Implemented guided camera system for easy image capture and secure server for data storage."
    ],
    technologies: ["React Native", "React", "Python", "YOLOv8", "ResNet50", "Secure Server"]
  },
  {
    title: "People Counting using CSRNet",
    category: "Deep Learning",
    description: [
      "Developed deep learning system for accurate people counting in dense crowd scenarios.",
      "Implemented CSRNet architecture to handle occlusions and improve detection robustness."
    ],
    technologies: ["PyTorch", "CSRNet", "Computer Vision", "CUDA", "OpenCV"]
  },
  {
    title: "Human Emotion Detection",
    category: "Computer Vision & AI",
    description: [
      "Engineered emotion detection system leveraging CNN, ResNet-34, and Vision Transformer (ViT).",
      "Achieved 87.5% accuracy in classifying human emotions from images."
    ],
    technologies: ["PyTorch", "TensorFlow", "CNN", "ResNet-34", "Vision Transformer", "OpenCV"],
    stats: "87.5% Accuracy"
  },
  {
    title: "UB Hacking Classifier Web App",
    category: "Web Development",
    description: [
      "Co-developed Classifier Web App during a hackathon, focusing on backend and database architecture.",
      "Built responsive front-end using ReactJS, MUI, and CSS."
    ],
    technologies: ["React", "MUI", "Firebase", "Node.js", "Express.js"]
  },
  {
    title: "Pathfinding Visualizer",
    category: "Algorithms",
    description: [
      "Developed interactive pathfinding visualizer in Python using Pygame.",
      "Implemented A* search algorithm for real-time visualization with customizable grid-based interface."
    ],
    technologies: ["Python", "Pygame", "A* Algorithm", "Data Structures"]
  },
  {
    title: "Personalized Student Shell (PSS)",
    category: "CLI Tool",
    description: [
      "Designed command-line shell to enhance student workflow with custom aliases and command history.",
      "Implemented auto-completion, code execution, tutorials, and gamification elements."
    ],
    technologies: ["Python", "SQLite", "JSON", "CLI", "Gamification"]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "Java", "C++", "Rust"]
  },
  {
    category: "AI/ML Frameworks",
    skills: ["PyTorch", "TensorFlow", "Computer Vision", "Deep Learning", "CNN", "ResNet", "Vision Transformer"]
  },
  {
    category: "Web Development",
    skills: ["React", "React Native", "Node.js", "Django", "Express.js"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "SQL", "Firebase", "SQLite"]
  },
  {
    category: "Tools & Libraries",
    skills: ["Git", "CUDA", "OpenCV", "NumPy", "Matplotlib", "Pygame", "Google Colab", "WandB"]
  }
];

export const CERTIFICATIONS = [
  "Machine Learning Specialization - Stanford University & DeepLearning.AI (Coursera)",
  "Deep Learning Specialization - Stanford University & DeepLearning.AI (Coursera)",
  "PyTorch for Deep Learning - Udemy Certificate",
  "Deep Learning Masterclass - TensorFlow 2, Neural.ai",
  "Django Masterclass - Tim Buchalka (Udemy Certificate)",
  "Node.js, Express, MongoDB - Jonas Schmedtmann (Udemy Certificate)",
  "The Ultimate React Course 2023 - Jonas Schmedtmann (Udemy Certificate)",
  "Python Programming Masterclass - Tim Buchalka (Udemy Certificate)"
];

export const AWARDS = [
  "Cybersecurity Excellence: Qualified for Top 100 in the World, Northeastern Cybersecurity C2C Finals, Placed 10th in the final (2025)",
  "Collegiate Lockdown: Top Two Teams Representing UB, Placed 4th in Finals (2025)",
  "Dean’s List: University at Buffalo (Fall 2023, Spring 2024, Fall 2024)",
  "Presidential Scholarship: Awarded $15,000 per annum"
];

export const COMPETITIONS = [
  {
    name: "Russell L. Agrusa CSE Student Innovation Competition",
    role: "Team Member, OralScan project",
    date: "November 2024"
  },
  {
    name: "Aging Innovations Challenge",
    role: "Team Member, OralScan project",
    date: "November 2024"
  },
  {
    name: "Community Champions for Disability Health Challenge",
    role: "PI, OralScan project",
    date: "October 2024"
  }
];

export const PRESENTATIONS = [
  {
    event: "CTSI Research Group of Doctors, Nurses, and Medical Students",
    type: "Oral Presentation and Demo",
    date: "April 2024"
  },
  {
    event: "SUNY Undergraduate Research Conference (SURC)",
    type: "Oral Presentation",
    date: "April 2024"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "The Accelerated Path: 22 Credits & Research",
    subtitle: "Reflections on graduating in 3 years while conducting dual-lab research.",
    date: "Winter 2024",
    content: [
      "My academic journey has been defined by a rigorous pursuit of knowledge. Graduating high school a year early, I embarked on a B.S. in Computer Science at the University at Buffalo with a clear goal: to maximize my learning efficiency. I am on track to graduate in just three years, a feat requiring 21-22 credits per semester—significantly above the standard load.",
      "This isn't just about speed; it's about capacity. Balancing this course load while maintaining a 3.8+ GPA, serving as a Teaching Assistant, and conducting research in two separate labs has honed my ability to manage complex workflows and sustain high-level intellectual effort. This endurance is what I plan to bring to a Ph.D. program."
    ],
    tags: ["Academics", "Time Management", "PhD Prep"]
  },
  {
    title: "Bridging AI & Healthcare: The OralScan Story",
    subtitle: "From YOLOv8 implementation to geriatric usability studies.",
    date: "Fall 2024",
    content: [
      "At the ESC Lab, I realized that technical accuracy is only one part of the solution; a successful system must be built on a deep understanding of the patient's needs. Developing OralScan involved not just implementing YOLOv8 for tooth detection, but understanding the geriatric context.",
      "We conducted formative usability and acceptability studies to assess its potential for real-world geriatric oral healthcare. The insights from these sessions with seniors directly influenced our design choices, making the app more accessible. Currently, I'm extending this work to orthodontics, tracking braces movement. This experience solidified my commitment to human-centric AI—technology that solves tangible problems."
    ],
    tags: ["Healthcare AI", "Computer Vision", "YOLOv8"]
  },
  {
    title: "Scientific Discovery with GNNs",
    subtitle: "Migrating workflows and benchmarking foundational models for materials.",
    date: "Summer 2024",
    content: [
      "In Professor Jiayu Peng's lab, I've seen how Deep Learning can uncover scientific insights in complex physical systems. My work on Symmetry-Aware Graph Neural Networks (GNNs) for crystalline materials involved migrating optimization workflows to Weights & Biases for better reproducibility.",
      "I also assisted in benchmarking new GNN architectures, such as the Atomistic Line Graph Neural Network (ALIGNN), on our dataset. This work culminated in a commentary on agentic AI for catalyst discovery. The intersection of AI and Physics is where I believe the most exciting 'zero-to-one' discoveries will happen in the next decade."
    ],
    tags: ["GNNs", "Material Science", "Research"]
  }
];

export const NAV_LINKS = [
  { label: "About", href: "#about", icon: <Users size={18} /> },
  { label: "Research", href: "#research", icon: <Microscope size={18} /> },
  { label: "Insights", href: "#insights", icon: <BookOpen size={18} /> },
  { label: "Projects", href: "#projects", icon: <Code size={18} /> },
  { label: "Timeline", href: "#education", icon: <GraduationCap size={18} /> },
];