import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, Map, Code, GraduationCap, ExternalLink } from "lucide-react";

interface ExplorationCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  content: React.ReactNode;
  delay: number;
  angle: number;
}

interface DomainExplorationData {
  whatIsThis: {
    description: string[];
    usedIn: string[];
  };
  roles: Array<{ role: string; desc: string; jdLink?: string }>;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  howToLearn: Array<{ step: number; title: string; desc: string }>;
  practiceMaterials: Array<{ name: string; desc: string; url: string }>;
  courses: Array<{ title: string; platform: string; desc: string; url: string }>;
}

const domainData: Record<string, DomainExplorationData> = {
  ai: {
    whatIsThis: {
      description: [
        "AI is the science of creating systems that can think, learn, and make intelligent decisions.",
        "It powers innovations like self-driving cars, voice assistants, recommendation systems, and medical diagnosis."
      ],
      usedIn: ["Healthcare", "Autonomous Vehicles", "Virtual Assistants", "Gaming", "Finance"]
    },
    roles: [
      { role: "AI Engineer", desc: "Build and deploy AI systems and applications", jdLink: "#" },
      { role: "ML Engineer", desc: "Create machine learning models and pipelines", jdLink: "#" },
      { role: "AI Researcher", desc: "Conduct cutting-edge AI research and innovation", jdLink: "#" },
      { role: "NLP Engineer", desc: "Develop natural language processing solutions", jdLink: "#" },
      { role: "AI Data Scientist", desc: "Extract insights using AI and ML techniques", jdLink: "#" }
    ],
    skills: {
      technical: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
      soft: ["Problem Solving", "Critical Thinking", "Research Skills", "Innovation"],
      tools: ["Jupyter", "Google Colab", "Keras", "Scikit-learn", "Hugging Face", "OpenAI API", "LangChain", "NumPy"]
    },
    howToLearn: [
      { step: 1, title: "Learn Python & Math", desc: "Master Python basics, linear algebra, and calculus" },
      { step: 2, title: "Understand ML Basics", desc: "Study machine learning algorithms and concepts" },
      { step: 3, title: "Learn Deep Learning", desc: "Explore neural networks, CNNs, RNNs, and transformers" },
      { step: 4, title: "Work on AI Projects", desc: "Build chatbots, image classifiers, and recommendation systems" },
      { step: 5, title: "Explore Model Deployment", desc: "Learn to deploy AI models in production environments" }
    ],
    practiceMaterials: [
      { name: "Kaggle AI Competitions", desc: "Real-world AI challenges and datasets", url: "https://kaggle.com" },
      { name: "Google Colab", desc: "Free GPU-powered Jupyter notebooks", url: "https://colab.research.google.com" },
      { name: "Hugging Face", desc: "Pre-trained models and AI communities", url: "https://huggingface.co" },
      { name: "OpenAI Playground", desc: "Experiment with GPT and AI models", url: "https://platform.openai.com" }
    ],
    courses: [
      { title: "Deep Learning Specialization", platform: "Coursera", desc: "Comprehensive deep learning program by Andrew Ng", url: "https://www.coursera.org" },
      { title: "AI Engineer Nanodegree", platform: "Udacity", desc: "Build production-ready AI applications", url: "https://www.udacity.com" },
      { title: "Machine Learning A-Z", platform: "Udemy", desc: "Hands-on Python & R in data science", url: "https://www.udemy.com" }
    ]
  },
  webdev: {
    whatIsThis: {
      description: [
        "Web Development is the art of building interactive websites and web applications that power the internet.",
        "From social media platforms to e-commerce sites, web developers create the digital experiences we use every day."
      ],
      usedIn: ["E-commerce", "Social Media", "SaaS Products", "Portfolios", "Web Apps"]
    },
    roles: [
      { role: "Frontend Developer", desc: "Create beautiful user interfaces and experiences", jdLink: "#" },
      { role: "Backend Developer", desc: "Build server-side logic and APIs", jdLink: "#" },
      { role: "Full Stack Developer", desc: "Handle both frontend and backend development", jdLink: "#" },
      { role: "Web Designer", desc: "Design user-friendly and aesthetic web interfaces", jdLink: "#" },
      { role: "UI/UX Developer", desc: "Bridge design and development for optimal UX", jdLink: "#" }
    ],
    skills: {
      technical: ["HTML/CSS", "JavaScript", "React", "Node.js", "TypeScript"],
      soft: ["Creativity", "Attention to Detail", "Problem Solving", "Communication"],
      tools: ["VS Code", "Git", "Chrome DevTools", "Figma", "Postman", "Next.js", "Tailwind CSS", "MongoDB"]
    },
    howToLearn: [
      { step: 1, title: "Master HTML & CSS", desc: "Learn web structure, styling, and responsive design" },
      { step: 2, title: "Learn JavaScript", desc: "Understand programming fundamentals and DOM manipulation" },
      { step: 3, title: "Explore React", desc: "Build modern interactive UIs with React framework" },
      { step: 4, title: "Backend with Node.js", desc: "Create APIs and server-side applications" },
      { step: 5, title: "Build Full Projects", desc: "Create complete web apps from scratch" }
    ],
    practiceMaterials: [
      { name: "Frontend Mentor", desc: "Real-world frontend challenges", url: "https://frontendmentor.io" },
      { name: "CodePen", desc: "Experiment and showcase frontend code", url: "https://codepen.io" },
      { name: "JavaScript30", desc: "30 day vanilla JS coding challenge", url: "https://javascript30.com" },
      { name: "freeCodeCamp", desc: "Free interactive web development curriculum", url: "https://freecodecamp.org" }
    ],
    courses: [
      { title: "The Complete Web Developer Bootcamp", platform: "Udemy", desc: "Full-stack web development from scratch", url: "https://www.udemy.com" },
      { title: "Frontend Developer Career Path", platform: "Scrimba", desc: "Interactive frontend development course", url: "https://scrimba.com" },
      { title: "Full Stack Open", platform: "University of Helsinki", desc: "Modern full-stack development (Free)", url: "https://fullstackopen.com" }
    ]
  },
  cybersecurity: {
    whatIsThis: {
      description: [
        "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks and threats.",
        "In an increasingly connected world, cybersecurity professionals are the guardians of digital safety and privacy."
      ],
      usedIn: ["Banking", "Healthcare", "Government", "Tech Companies", "Defense"]
    },
    roles: [
      { role: "Security Analyst", desc: "Monitor and respond to security threats", jdLink: "#" },
      { role: "Penetration Tester", desc: "Ethically hack systems to find vulnerabilities", jdLink: "#" },
      { role: "Security Architect", desc: "Design secure systems and infrastructure", jdLink: "#" },
      { role: "SOC Analyst", desc: "Operate security operations centers", jdLink: "#" },
      { role: "Incident Responder", desc: "Handle security breaches and incidents", jdLink: "#" }
    ],
    skills: {
      technical: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing", "Forensics"],
      soft: ["Analytical Thinking", "Attention to Detail", "Continuous Learning", "Crisis Management"],
      tools: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap", "Splunk", "Snort", "Nessus"]
    },
    howToLearn: [
      { step: 1, title: "Learn Networking Basics", desc: "Understand TCP/IP, protocols, and network architecture" },
      { step: 2, title: "Study Security Fundamentals", desc: "Learn about threats, vulnerabilities, and defenses" },
      { step: 3, title: "Practice Ethical Hacking", desc: "Use tools like Kali Linux and Metasploit" },
      { step: 4, title: "Get Certified", desc: "Pursue certifications like CEH, OSCP, or Security+" },
      { step: 5, title: "Join CTF Competitions", desc: "Practice skills in Capture The Flag challenges" }
    ],
    practiceMaterials: [
      { name: "HackTheBox", desc: "Hands-on penetration testing labs", url: "https://hackthebox.com" },
      { name: "TryHackMe", desc: "Guided cybersecurity learning paths", url: "https://tryhackme.com" },
      { name: "PentesterLab", desc: "Web penetration testing exercises", url: "https://pentesterlab.com" },
      { name: "OverTheWire", desc: "Security wargames and challenges", url: "https://overthewire.org" }
    ],
    courses: [
      { title: "Certified Ethical Hacker (CEH)", platform: "EC-Council", desc: "Industry-recognized ethical hacking certification", url: "https://www.eccouncil.org" },
      { title: "Complete Cyber Security Course", platform: "Udemy", desc: "From beginner to advanced security concepts", url: "https://www.udemy.com" },
      { title: "Cybersecurity Specialization", platform: "Coursera", desc: "Comprehensive security fundamentals", url: "https://www.coursera.org" }
    ]
  },
  cloud: {
    whatIsThis: {
      description: [
        "Cloud Computing enables on-demand access to computing resources over the internet, eliminating the need for physical infrastructure.",
        "It powers everything from Netflix streaming to enterprise applications, offering scalability and global reach."
      ],
      usedIn: ["Enterprise IT", "Startups", "Gaming", "Streaming Services", "IoT"]
    },
    roles: [
      { role: "Cloud Architect", desc: "Design scalable cloud infrastructure solutions", jdLink: "#" },
      { role: "DevOps Engineer", desc: "Automate deployment and operations", jdLink: "#" },
      { role: "Cloud Security Engineer", desc: "Secure cloud environments and data", jdLink: "#" },
      { role: "SRE", desc: "Ensure reliability and performance of systems", jdLink: "#" },
      { role: "Cloud Consultant", desc: "Guide cloud migration and strategy", jdLink: "#" }
    ],
    skills: {
      technical: ["AWS/Azure/GCP", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      soft: ["System Thinking", "Automation Mindset", "Problem Solving", "Collaboration"],
      tools: ["AWS Console", "Azure Portal", "GCP", "Docker", "Kubernetes", "Terraform", "Jenkins", "Ansible"]
    },
    howToLearn: [
      { step: 1, title: "Learn Cloud Basics", desc: "Understand cloud concepts and service models" },
      { step: 2, title: "Choose a Platform", desc: "Start with AWS, Azure, or Google Cloud" },
      { step: 3, title: "Master Containers", desc: "Learn Docker and Kubernetes" },
      { step: 4, title: "Practice IaC", desc: "Use Terraform or CloudFormation for infrastructure" },
      { step: 5, title: "Get Certified", desc: "Pursue AWS/Azure/GCP certifications" }
    ],
    practiceMaterials: [
      { name: "AWS Free Tier", desc: "Free hands-on AWS services for 12 months", url: "https://aws.amazon.com/free" },
      { name: "Google Cloud Skills Boost", desc: "Interactive cloud labs and quests", url: "https://www.cloudskillsboost.google" },
      { name: "Azure Learn", desc: "Free Microsoft Azure learning paths", url: "https://learn.microsoft.com/azure" },
      { name: "KodeKloud", desc: "Hands-on DevOps and cloud labs", url: "https://kodekloud.com" }
    ],
    courses: [
      { title: "AWS Certified Solutions Architect", platform: "A Cloud Guru", desc: "Complete AWS certification prep", url: "https://acloudguru.com" },
      { title: "Azure Administrator Course", platform: "Udemy", desc: "Master Azure cloud administration", url: "https://www.udemy.com" },
      { title: "Google Cloud Engineer Path", platform: "Pluralsight", desc: "Become a GCP professional", url: "https://www.pluralsight.com" }
    ]
  },
  blockchain: {
    whatIsThis: {
      description: [
        "Blockchain is a decentralized, distributed ledger technology that enables secure and transparent transactions without intermediaries.",
        "It powers cryptocurrencies, NFTs, DeFi, and is revolutionizing industries from finance to supply chain."
      ],
      usedIn: ["Cryptocurrency", "DeFi", "NFTs", "Supply Chain", "Smart Contracts"]
    },
    roles: [
      { role: "Blockchain Developer", desc: "Build decentralized applications (DApps)", jdLink: "#" },
      { role: "Smart Contract Developer", desc: "Write and audit smart contracts", jdLink: "#" },
      { role: "Crypto Analyst", desc: "Analyze crypto markets and blockchain data", jdLink: "#" },
      { role: "DeFi Engineer", desc: "Build decentralized finance protocols", jdLink: "#" },
      { role: "Blockchain Architect", desc: "Design blockchain systems and infrastructure", jdLink: "#" }
    ],
    skills: {
      technical: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "Cryptography"],
      soft: ["Logical Thinking", "Security Mindset", "Innovation", "Continuous Learning"],
      tools: ["Remix IDE", "Hardhat", "Truffle", "MetaMask", "Ganache", "Ethers.js", "IPFS", "OpenZeppelin"]
    },
    howToLearn: [
      { step: 1, title: "Understand Blockchain Basics", desc: "Learn about distributed ledgers and consensus" },
      { step: 2, title: "Learn Solidity", desc: "Master smart contract programming language" },
      { step: 3, title: "Explore Ethereum", desc: "Build and deploy on Ethereum blockchain" },
      { step: 4, title: "Study DeFi & NFTs", desc: "Understand decentralized finance and digital assets" },
      { step: 5, title: "Build DApps", desc: "Create full-stack blockchain applications" }
    ],
    practiceMaterials: [
      { name: "CryptoZombies", desc: "Learn Solidity by building games", url: "https://cryptozombies.io" },
      { name: "Ethernaut", desc: "Web3/Solidity security challenges", url: "https://ethernaut.openzeppelin.com" },
      { name: "Remix IDE", desc: "Online Solidity development environment", url: "https://remix.ethereum.org" },
      { name: "Buildspace", desc: "Build Web3 projects with community", url: "https://buildspace.so" }
    ],
    courses: [
      { title: "Blockchain Specialization", platform: "Coursera", desc: "Complete blockchain technology program", url: "https://www.coursera.org" },
      { title: "Ethereum and Solidity Bootcamp", platform: "Udemy", desc: "Build blockchain applications from scratch", url: "https://www.udemy.com" },
      { title: "DeFi Developer Course", platform: "Moralis Academy", desc: "Master DeFi protocol development", url: "https://academy.moralis.io" }
    ]
  },
  datascience: {
    whatIsThis: {
      description: [
        "Data Science is the art of turning raw data into meaningful insights that drive real-world decisions.",
        "It combines statistics, programming, and domain expertise to extract patterns from data and solve complex problems."
      ],
      usedIn: ["Healthcare", "Finance", "E-commerce", "Marketing", "Sports Analytics"]
    },
    roles: [
      { role: "Data Analyst", desc: "Analyze data, create reports, and find actionable insights", jdLink: "#" },
      { role: "Data Scientist", desc: "Build predictive models and solve business problems with ML", jdLink: "#" },
      { role: "Data Engineer", desc: "Design and maintain data pipelines and infrastructure", jdLink: "#" },
      { role: "ML Engineer", desc: "Deploy and scale machine learning models in production", jdLink: "#" },
      { role: "BI Developer", desc: "Create dashboards and business intelligence solutions", jdLink: "#" }
    ],
    skills: {
      technical: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
      soft: ["Problem Solving", "Communication", "Critical Thinking", "Business Acumen"],
      tools: ["Jupyter", "VS Code", "Git", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Tableau"]
    },
    howToLearn: [
      { step: 1, title: "Learn Python", desc: "Master basics and libraries like NumPy, Pandas" },
      { step: 2, title: "Study Math & Stats", desc: "Linear algebra, probability, statistics" },
      { step: 3, title: "Explore Data Analysis", desc: "Data cleaning, exploration, visualization" },
      { step: 4, title: "Learn Machine Learning", desc: "Algorithms, model training, evaluation" },
      { step: 5, title: "Build Projects", desc: "Create portfolio and practice on real datasets" }
    ],
    practiceMaterials: [
      { name: "Kaggle", desc: "Datasets, competitions, and notebooks", url: "https://kaggle.com" },
      { name: "Google Colab", desc: "Free Jupyter notebooks in the cloud", url: "https://colab.research.google.com" },
      { name: "DataCamp Practice", desc: "Interactive coding challenges", url: "https://datacamp.com" },
      { name: "Analytics Vidhya", desc: "Challenges and practice problems", url: "https://analyticsvidhya.com" }
    ],
    courses: [
      { title: "IBM Data Science Professional Certificate", platform: "Coursera", desc: "Complete data science program with hands-on projects", url: "https://www.coursera.org" },
      { title: "Complete Data Science Bootcamp", platform: "Udemy", desc: "From Python basics to machine learning", url: "https://www.udemy.com" },
      { title: "Data Science Specialization", platform: "Simplilearn", desc: "Industry-recognized certification program", url: "https://www.simplilearn.com" }
    ]
  },
  mobile: {
    whatIsThis: {
      description: [
        "Mobile Development is the process of creating applications for smartphones and tablets that billions use daily.",
        "From social media to productivity apps, mobile developers build experiences that fit in your pocket but reach the world."
      ],
      usedIn: ["Social Media", "Gaming", "Fintech", "Health & Fitness", "E-commerce"]
    },
    roles: [
      { role: "iOS Developer", desc: "Build native apps for iPhone and iPad", jdLink: "#" },
      { role: "Android Developer", desc: "Create apps for Android devices", jdLink: "#" },
      { role: "React Native Developer", desc: "Develop cross-platform mobile apps", jdLink: "#" },
      { role: "Flutter Developer", desc: "Build beautiful mobile apps with Flutter", jdLink: "#" },
      { role: "Mobile UI/UX Designer", desc: "Design mobile app interfaces and experiences", jdLink: "#" }
    ],
    skills: {
      technical: ["Swift/Kotlin", "React Native", "Flutter", "Mobile UI", "API Integration"],
      soft: ["User-Centric Thinking", "Detail Orientation", "Problem Solving", "Adaptability"],
      tools: ["Xcode", "Android Studio", "VS Code", "Figma", "Firebase", "TestFlight", "Play Console"]
    },
    howToLearn: [
      { step: 1, title: "Choose Platform", desc: "Start with iOS (Swift), Android (Kotlin), or cross-platform" },
      { step: 2, title: "Learn UI Basics", desc: "Understand mobile design patterns and components" },
      { step: 3, title: "Master APIs", desc: "Learn to integrate backend services and REST APIs" },
      { step: 4, title: "Build Projects", desc: "Create real apps and publish to app stores" },
      { step: 5, title: "Optimize Performance", desc: "Learn app optimization and best practices" }
    ],
    practiceMaterials: [
      { name: "Codecademy Mobile", desc: "Interactive mobile development courses", url: "https://codecademy.com" },
      { name: "Flutter Codelab", desc: "Hands-on Flutter tutorials", url: "https://flutter.dev" },
      { name: "iOS Dev Resources", desc: "Apple's official developer resources", url: "https://developer.apple.com" },
      { name: "Android Codelabs", desc: "Google's Android development tutorials", url: "https://developer.android.com" }
    ],
    courses: [
      { title: "iOS & Swift Bootcamp", platform: "Udemy", desc: "Complete iOS app development course", url: "https://www.udemy.com" },
      { title: "Android Kotlin Developer", platform: "Udacity", desc: "Google's official Android course", url: "https://www.udacity.com" },
      { title: "React Native Specialization", platform: "Coursera", desc: "Build cross-platform mobile apps", url: "https://www.coursera.org" }
    ]
  },
  gamedev: {
    whatIsThis: {
      description: [
        "Game Development combines creativity, storytelling, and technology to create interactive entertainment experiences.",
        "From indie games to AAA titles, game developers build virtual worlds that captivate millions of players worldwide."
      ],
      usedIn: ["Console Gaming", "Mobile Games", "VR/AR Games", "PC Gaming", "Educational Games"]
    },
    roles: [
      { role: "Game Programmer", desc: "Write code for game mechanics and systems", jdLink: "#" },
      { role: "Game Designer", desc: "Design gameplay, levels, and game mechanics", jdLink: "#" },
      { role: "Unity Developer", desc: "Create games using Unity engine", jdLink: "#" },
      { role: "Unreal Developer", desc: "Build games with Unreal Engine", jdLink: "#" },
      { role: "3D Artist", desc: "Create 3D models and game assets", jdLink: "#" }
    ],
    skills: {
      technical: ["C#/C++", "Unity", "Unreal Engine", "3D Modeling", "Game Physics"],
      soft: ["Creativity", "Teamwork", "Problem Solving", "Attention to Detail"],
      tools: ["Unity", "Unreal Engine", "Blender", "Maya", "Photoshop", "Git", "Visual Studio"]
    },
    howToLearn: [
      { step: 1, title: "Choose Engine", desc: "Start with Unity (C#) or Unreal Engine (C++)" },
      { step: 2, title: "Learn C# or C++", desc: "Master the programming language for your engine" },
      { step: 3, title: "Study Game Design", desc: "Understand game mechanics, physics, and AI" },
      { step: 4, title: "Create Small Games", desc: "Build simple games to learn fundamentals" },
      { step: 5, title: "Polish and Publish", desc: "Complete projects and release to platforms" }
    ],
    practiceMaterials: [
      { name: "Unity Learn", desc: "Official Unity tutorials and projects", url: "https://learn.unity.com" },
      { name: "Unreal Online Learning", desc: "Free Unreal Engine courses", url: "https://www.unrealengine.com/learn" },
      { name: "itch.io", desc: "Publish and play indie games", url: "https://itch.io" },
      { name: "Game Dev Market", desc: "Assets and resources for games", url: "https://gamedevmarket.net" }
    ],
    courses: [
      { title: "Complete Unity Developer", platform: "Udemy", desc: "Build 2D and 3D games from scratch", url: "https://www.udemy.com" },
      { title: "Unreal Engine 5 C++ Developer", platform: "Udemy", desc: "Master Unreal with C++", url: "https://www.udemy.com" },
      { title: "Game Design and Development", platform: "Coursera", desc: "Michigan State University game dev program", url: "https://www.coursera.org" }
    ]
  },
  uiux: {
    whatIsThis: {
      description: [
        "UI/UX Design focuses on creating beautiful, intuitive, and user-friendly digital experiences.",
        "It combines psychology, design principles, and user research to craft interfaces that delight and engage users."
      ],
      usedIn: ["Web Apps", "Mobile Apps", "SaaS Products", "E-commerce", "Enterprise Software"]
    },
    roles: [
      { role: "UI Designer", desc: "Design visually appealing user interfaces", jdLink: "#" },
      { role: "UX Designer", desc: "Research and optimize user experiences", jdLink: "#" },
      { role: "Product Designer", desc: "End-to-end product design and strategy", jdLink: "#" },
      { role: "Interaction Designer", desc: "Design interactive elements and animations", jdLink: "#" },
      { role: "UX Researcher", desc: "Conduct user research and testing", jdLink: "#" }
    ],
    skills: {
      technical: ["Figma", "Adobe XD", "Sketch", "Prototyping", "Design Systems"],
      soft: ["Empathy", "Communication", "Critical Thinking", "Collaboration"],
      tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Miro", "Principle", "Framer", "Zeplin"]
    },
    howToLearn: [
      { step: 1, title: "Learn Design Basics", desc: "Study color, typography, layout, and composition" },
      { step: 2, title: "Master Figma", desc: "Learn the industry-standard design tool" },
      { step: 3, title: "Study UX Principles", desc: "Understand user psychology and research methods" },
      { step: 4, title: "Build Portfolio", desc: "Create case studies showcasing your process" },
      { step: 5, title: "Get Feedback", desc: "Join design communities and iterate on designs" }
    ],
    practiceMaterials: [
      { name: "Daily UI", desc: "100 day UI design challenge", url: "https://dailyui.co" },
      { name: "UX Design Challenge", desc: "Practice UX design problems", url: "https://uxtools.co/challenges" },
      { name: "Dribbble", desc: "Design inspiration and community", url: "https://dribbble.com" },
      { name: "Behance", desc: "Showcase and discover creative work", url: "https://behance.net" }
    ],
    courses: [
      { title: "Google UX Design Certificate", platform: "Coursera", desc: "Professional UX design program", url: "https://www.coursera.org" },
      { title: "UI/UX Design Bootcamp", platform: "Udemy", desc: "Complete UI/UX design course", url: "https://www.udemy.com" },
      { title: "Interaction Design Specialization", platform: "Coursera", desc: "UCSD interaction design program", url: "https://www.coursera.org" }
    ]
  },
  devops: {
    whatIsThis: {
      description: [
        "DevOps bridges software development and IT operations to deliver applications faster and more reliably.",
        "It automates infrastructure, streamlines deployment pipelines, and ensures systems run smoothly at scale."
      ],
      usedIn: ["Software Companies", "Startups", "Enterprise IT", "Cloud Platforms", "Tech Giants"]
    },
    roles: [
      { role: "DevOps Engineer", desc: "Automate deployment and infrastructure", jdLink: "#" },
      { role: "Site Reliability Engineer", desc: "Ensure system reliability and uptime", jdLink: "#" },
      { role: "Platform Engineer", desc: "Build internal developer platforms", jdLink: "#" },
      { role: "Build Engineer", desc: "Optimize CI/CD pipelines", jdLink: "#" },
      { role: "Infrastructure Engineer", desc: "Manage cloud infrastructure and automation", jdLink: "#" }
    ],
    skills: {
      technical: ["Linux", "Docker", "Kubernetes", "CI/CD", "IaC"],
      soft: ["Problem Solving", "Communication", "Automation Mindset", "Collaboration"],
      tools: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Terraform", "Ansible", "Prometheus", "Grafana"]
    },
    howToLearn: [
      { step: 1, title: "Master Linux", desc: "Learn Linux basics and shell scripting" },
      { step: 2, title: "Learn Containers", desc: "Master Docker and containerization" },
      { step: 3, title: "Study CI/CD", desc: "Build automated deployment pipelines" },
      { step: 4, title: "Learn Kubernetes", desc: "Orchestrate containers at scale" },
      { step: 5, title: "Practice IaC", desc: "Use Terraform to manage infrastructure as code" }
    ],
    practiceMaterials: [
      { name: "KodeKloud", desc: "Hands-on DevOps labs and challenges", url: "https://kodekloud.com" },
      { name: "Katacoda", desc: "Interactive DevOps scenarios", url: "https://katacoda.com" },
      { name: "Play with Docker", desc: "Free Docker playground", url: "https://labs.play-with-docker.com" },
      { name: "Kubernetes Playground", desc: "Practice K8s in browser", url: "https://labs.play-with-k8s.com" }
    ],
    courses: [
      { title: "DevOps Engineering Course", platform: "Udemy", desc: "Complete DevOps bootcamp", url: "https://www.udemy.com" },
      { title: "Kubernetes Administrator", platform: "Linux Academy", desc: "CKA certification prep", url: "https://acloudguru.com" },
      { title: "DevOps Specialization", platform: "Coursera", desc: "UC Davis DevOps program", url: "https://www.coursera.org" }
    ]
  },
  iot: {
    whatIsThis: {
      description: [
        "Internet of Things connects physical devices to the internet, enabling smart homes, wearables, and industrial automation.",
        "IoT combines hardware, software, and networking to create intelligent systems that interact with the physical world."
      ],
      usedIn: ["Smart Homes", "Wearables", "Industrial IoT", "Healthcare", "Agriculture"]
    },
    roles: [
      { role: "IoT Developer", desc: "Build IoT applications and systems", jdLink: "#" },
      { role: "Embedded Systems Engineer", desc: "Develop firmware for IoT devices", jdLink: "#" },
      { role: "IoT Architect", desc: "Design end-to-end IoT solutions", jdLink: "#" },
      { role: "Hardware Engineer", desc: "Design IoT hardware and circuits", jdLink: "#" },
      { role: "IoT Security Engineer", desc: "Secure IoT devices and networks", jdLink: "#" }
    ],
    skills: {
      technical: ["C/C++", "Python", "Arduino", "Raspberry Pi", "MQTT"],
      soft: ["Problem Solving", "Systems Thinking", "Innovation", "Attention to Detail"],
      tools: ["Arduino IDE", "Raspberry Pi", "Node-RED", "ThingSpeak", "AWS IoT", "MQTT", "Sensors"]
    },
    howToLearn: [
      { step: 1, title: "Start with Arduino", desc: "Learn microcontroller programming basics" },
      { step: 2, title: "Study Sensors", desc: "Understand different sensors and actuators" },
      { step: 3, title: "Learn Networking", desc: "Master IoT protocols like MQTT and HTTP" },
      { step: 4, title: "Explore Cloud IoT", desc: "Connect devices to cloud platforms" },
      { step: 5, title: "Build Projects", desc: "Create smart home or automation projects" }
    ],
    practiceMaterials: [
      { name: "Arduino Project Hub", desc: "Community projects and tutorials", url: "https://create.arduino.cc" },
      { name: "Hackster.io", desc: "IoT projects and community", url: "https://hackster.io" },
      { name: "Instructables", desc: "DIY IoT project guides", url: "https://instructables.com" },
      { name: "Tinkercad Circuits", desc: "Virtual Arduino simulation", url: "https://tinkercad.com" }
    ],
    courses: [
      { title: "IoT Specialization", platform: "Coursera", desc: "University of California IoT program", url: "https://www.coursera.org" },
      { title: "Complete IoT Course", platform: "Udemy", desc: "From basics to advanced IoT", url: "https://www.udemy.com" },
      { title: "Embedded Systems", platform: "edX", desc: "UT Austin embedded systems course", url: "https://www.edx.org" }
    ]
  },
  arvr: {
    whatIsThis: {
      description: [
        "AR/VR Development creates immersive experiences using Augmented and Virtual Reality technologies.",
        "From gaming to training simulations, AR/VR is transforming how we interact with digital content and the physical world."
      ],
      usedIn: ["Gaming", "Training Simulations", "Education", "Healthcare", "Real Estate"]
    },
    roles: [
      { role: "VR Developer", desc: "Create virtual reality experiences", jdLink: "#" },
      { role: "AR Developer", desc: "Build augmented reality applications", jdLink: "#" },
      { role: "Unity XR Developer", desc: "Develop XR apps with Unity", jdLink: "#" },
      { role: "3D Artist", desc: "Create 3D assets for AR/VR", jdLink: "#" },
      { role: "XR Designer", desc: "Design immersive user experiences", jdLink: "#" }
    ],
    skills: {
      technical: ["Unity", "Unreal", "C#", "3D Modeling", "Spatial Computing"],
      soft: ["Creativity", "Spatial Awareness", "Problem Solving", "User Empathy"],
      tools: ["Unity", "Unreal Engine", "Blender", "Meta Quest", "ARKit", "ARCore", "Vuforia"]
    },
    howToLearn: [
      { step: 1, title: "Learn Unity Basics", desc: "Master Unity game engine fundamentals" },
      { step: 2, title: "Study 3D Concepts", desc: "Understand 3D space, modeling, and rendering" },
      { step: 3, title: "Explore XR SDKs", desc: "Learn ARKit, ARCore, or Oculus SDK" },
      { step: 4, title: "Build VR/AR Apps", desc: "Create simple AR/VR experiences" },
      { step: 5, title: "Optimize Performance", desc: "Learn XR optimization techniques" }
    ],
    practiceMaterials: [
      { name: "Unity XR Learn", desc: "Official Unity XR tutorials", url: "https://learn.unity.com" },
      { name: "Meta Developer Hub", desc: "VR development resources", url: "https://developer.oculus.com" },
      { name: "8th Wall", desc: "Web-based AR platform", url: "https://8thwall.com" },
      { name: "AR Foundation Samples", desc: "Unity AR example projects", url: "https://github.com/Unity-Technologies" }
    ],
    courses: [
      { title: "VR Developer Nanodegree", platform: "Udacity", desc: "Professional VR development program", url: "https://www.udacity.com" },
      { title: "AR/VR Unity Course", platform: "Udemy", desc: "Build AR and VR apps with Unity", url: "https://www.udemy.com" },
      { title: "XR Development Specialization", platform: "Coursera", desc: "Extended reality development program", url: "https://www.coursera.org" }
    ]
  }
};

// Export domainData so it can be used by TimelineTree
export { domainData };

interface ExplorationBranchCardsProps {
  domainId: string;
  domainName: string;
}

export const ExplorationBranchCards = ({ domainId, domainName }: ExplorationBranchCardsProps) => {
  const data = domainData[domainId] || domainData.datascience;
  
  const cards: ExplorationCard[] = [
    {
      id: "what-is-this",
      title: "Ye Kya Hai? (What is this?)",
      icon: <BookOpen className="w-6 h-6" />,
      description: `Understanding ${domainName}`,
      delay: 0.3,
      angle: -60,
      content: (
        <div className="space-y-3">
          {data.whatIsThis.description.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-foreground/80">
              {paragraph}
            </p>
          ))}
          <div className="pt-2 space-y-2">
            <p className="text-xs font-semibold text-primary">Used in:</p>
            <div className="flex flex-wrap gap-2">
              {data.whatIsThis.usedIn.map((industry) => (
                <span key={industry} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "roles-jds",
      title: "Roles and JDs",
      icon: <Users className="w-6 h-6" />,
      description: `Career paths in ${domainName}`,
      delay: 0.5,
      angle: -30,
      content: (
        <div className="space-y-3">
          {data.roles.map((item) => (
            <div key={item.role} className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {item.role} {item.jdLink && <span className="text-primary hover:underline cursor-pointer text-xs">(JDs)</span>}
              </p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "essential-skills",
      title: "Essential Skills",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "What you need to master",
      delay: 0.7,
      angle: 0,
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary">Technical Skills:</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((skill) => (
                <span key={skill} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border border-primary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-secondary">Soft Skills:</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.soft.map((skill) => (
                <span key={skill} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-secondary/20 to-success/20 text-foreground border border-secondary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-primary">Essential Tools:</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-foreground border border-primary/10">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "how-to-learn",
      title: "How to Learn",
      icon: <Map className="w-6 h-6" />,
      description: "Your learning roadmap",
      delay: 0.9,
      angle: 30,
      content: (
        <div className="space-y-2">
          {data.howToLearn.map((item) => (
            <div key={item.step} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "practice-materials",
      title: "Practice Materials",
      icon: <Code className="w-6 h-6" />,
      description: "Hands-on learning resources",
      delay: 1.1,
      angle: 60,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground/80">Practice is key! Apply your learning on these platforms:</p>
          <div className="space-y-2">
            {data.practiceMaterials.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">{platform.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "courses",
      title: "Paid Courses",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Learning resources and platforms",
      delay: 1.3,
      angle: 90,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground/80">Trusted courses from top platforms:</p>
          <div className="space-y-3">
            {data.courses.map((course) => (
              <div key={course.title} className="p-3 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-colors">
                <p className="text-sm font-semibold text-foreground mb-1">{course.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{course.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                    {course.platform}
                  </span>
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    View Course →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Explore Your Path
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Six branches of knowledge to guide your {domainName} journey 🌿
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: card.delay,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* Organic branch connection line */}
              <motion.div
                className="absolute -top-8 left-1/2 w-0.5 bg-gradient-to-b from-success/60 to-transparent origin-top"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 32, opacity: 1 }}
                transition={{ delay: card.delay - 0.1, duration: 0.5 }}
              />

              {/* Leaf decoration */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-xl"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: [0, -10, 10, 0] }}
                transition={{
                  opacity: { delay: card.delay },
                  rotate: { delay: card.delay + 0.5, duration: 2, repeat: Infinity }
                }}
              >
                🍃
              </motion.div>

              <Card className="relative overflow-hidden border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </div>
                  </div>

                  {/* Divider with leaf */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="text-xs">🌱</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {card.content}
                  </div>

                  {/* Footer decoration */}
                  <motion.div
                    className="pt-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>Keep growing</span>
                      <span className="animate-pulse">🌿</span>
                    </span>
                  </motion.div>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.1), transparent 70%)"
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration - soil line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-800/40 to-transparent rounded-full" />
          <div className="flex justify-center gap-8 mt-2">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.6 + (i * 0.1), duration: 0.5 }}
                className="w-0.5 h-6 bg-gradient-to-b from-amber-800/60 to-transparent origin-top"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
