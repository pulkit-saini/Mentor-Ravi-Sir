export interface RoleWithJD {
  title: string;
  jd: string;
}

export interface Domain {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
  position: { x: number; y: number };
  subDomains: string[];
  tools: string[];
  skills: string[];
  roles: string[];
  rolesWithJDs: RoleWithJD[];
  projects?: string[];
  salary: {
    fresher: string;
    experienced: string;
  };
  marketDemand: string;
  careerGrowth: string;
}

export const domains: Domain[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    tagline: "The brain behind modern innovation.",
    description: "Master the future of intelligent systems and automation",
    icon: "🤖",
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
    position: { x: 18, y: 20 },
    subDomains: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Reinforcement Learning"
    ],
    tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
    skills: ["Mathematics", "Statistics", "Programming", "Data Analysis", "Neural Networks"],
    roles: ["AI Engineer", "ML Engineer", "Data Scientist", "Research Scientist"],
    rolesWithJDs: [
      { title: "AI Engineer", jd: "Design and implement AI systems and solutions. Build end-to-end AI applications from concept to deployment. Integrate AI models with production systems. Optimize AI performance and scalability. Required: Strong Python, ML frameworks, system design, and cloud platforms." },
      { title: "ML Engineer", jd: "Develop and deploy machine learning models in production. Build ML pipelines and infrastructure. Monitor model performance and retrain as needed. Implement MLOps best practices. Required: Python, TensorFlow/PyTorch, Docker, Kubernetes, and cloud experience." },
      { title: "Data Scientist", jd: "Extract insights from complex datasets using statistical methods and ML. Create predictive models and analyze business problems. Communicate findings to stakeholders. Design experiments and A/B tests. Required: Python/R, statistics, SQL, ML algorithms, and communication skills." },
      { title: "Research Scientist", jd: "Conduct research in AI/ML and publish findings. Develop novel algorithms and techniques. Stay at forefront of AI research. Collaborate with engineering teams to implement research. Required: PhD in CS/ML, deep learning expertise, publication record, and strong mathematical background." }
    ],
    projects: ["Image Recognition System", "Chatbot Development", "Predictive Analytics"],
    salary: {
      fresher: "$60k - $90k",
      experienced: "$120k - $200k+"
    },
    marketDemand: "Very High - Growing 40% annually",
    careerGrowth: "Exceptional - Leadership roles in 5-7 years"
  },
  {
    id: "webdev",
    name: "Web Development",
    tagline: "Build the digital experiences of tomorrow.",
    description: "Create stunning web applications that users love",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(139, 92, 246, 0.3)",
    position: { x: 63, y: 15 },
    subDomains: [
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "Mobile Web",
      "Progressive Web Apps"
    ],
    tools: ["React", "Node.js", "TypeScript", "Next.js", "Tailwind CSS"],
    skills: ["HTML/CSS", "JavaScript", "API Design", "UI/UX", "Database Management"],
    roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Web Designer"],
    rolesWithJDs: [
      { title: "Frontend Developer", jd: "Build responsive and interactive user interfaces. Implement designs using React, Vue, or Angular. Optimize web performance and accessibility. Collaborate with designers and backend teams. Required: HTML/CSS/JavaScript, React/Vue, TypeScript, and responsive design." },
      { title: "Backend Developer", jd: "Design and build server-side applications and APIs. Implement business logic and data models. Ensure security and scalability. Work with databases and cloud services. Required: Node.js/Python/Java, REST/GraphQL APIs, databases, and cloud platforms." },
      { title: "Full Stack Developer", jd: "Develop both frontend and backend components. Build end-to-end features from UI to database. Deploy and maintain web applications. Handle the complete development lifecycle. Required: Frontend frameworks, backend languages, databases, DevOps basics, and problem-solving." },
      { title: "Web Designer", jd: "Create visually appealing and user-friendly web designs. Design layouts, color schemes, and typography. Prototype interactions and user flows. Collaborate with developers for implementation. Required: Figma/Adobe XD, HTML/CSS, design principles, and user experience fundamentals." }
    ],
    projects: ["E-commerce Platform", "Social Media App", "Portfolio Website"],
    salary: {
      fresher: "$50k - $75k",
      experienced: "$100k - $160k"
    },
    marketDemand: "Very High - Constant demand across industries",
    careerGrowth: "Excellent - Tech lead in 4-6 years"
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Protect the digital frontier.",
    description: "Defend systems and data from cyber threats",
    icon: "🔐",
    color: "from-red-500 to-orange-500",
    glowColor: "rgba(239, 68, 68, 0.3)",
    position: { x: 16, y: 55 },
    subDomains: [
      "Network Security",
      "Application Security",
      "Cloud Security",
      "Ethical Hacking",
      "Incident Response"
    ],
    tools: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap"],
    skills: ["Network Protocols", "Cryptography", "Penetration Testing", "Risk Analysis", "Forensics"],
    roles: ["Security Analyst", "Penetration Tester", "Security Architect", "SOC Analyst"],
    rolesWithJDs: [
      { title: "Security Analyst", jd: "Monitor and analyze security threats and incidents. Implement security measures and policies. Respond to security breaches and vulnerabilities. Conduct security assessments. Required: Security tools, threat analysis, incident response, and networking fundamentals." },
      { title: "Penetration Tester", jd: "Conduct ethical hacking to identify vulnerabilities. Perform security testing on systems and applications. Document findings and recommend fixes. Stay updated on latest attack techniques. Required: Penetration testing tools, scripting, OWASP, and security certifications (CEH, OSCP)." },
      { title: "Security Architect", jd: "Design secure systems and infrastructure. Define security standards and best practices. Lead security initiatives and audits. Evaluate and implement security technologies. Required: Security frameworks, cloud security, architecture design, and 5+ years experience." },
      { title: "SOC Analyst", jd: "Monitor security events in Security Operations Center. Detect and respond to security incidents. Analyze logs and security alerts. Coordinate incident response. Required: SIEM tools, log analysis, threat intelligence, and security fundamentals." }
    ],
    projects: ["Vulnerability Assessment", "Security Audit", "Firewall Configuration"],
    salary: {
      fresher: "$65k - $85k",
      experienced: "$110k - $180k"
    },
    marketDemand: "High - Critical need for security professionals",
    careerGrowth: "Strong - CISO roles in 8-10 years"
  },
  {
    id: "blockchain",
    name: "Blockchain",
    tagline: "Decentralize the future.",
    description: "Build the next generation of trustless systems",
    icon: "⛓️",
    color: "from-green-500 to-teal-500",
    glowColor: "rgba(34, 197, 94, 0.3)",
    position: { x: 68, y: 60 },
    subDomains: [
      "Smart Contracts",
      "DeFi",
      "NFTs",
      "Cryptocurrency",
      "Distributed Systems"
    ],
    tools: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "Truffle"],
    skills: ["Cryptography", "Smart Contract Development", "DApp Development", "Token Economics"],
    roles: ["Blockchain Developer", "Smart Contract Developer", "Crypto Analyst", "DeFi Engineer"],
    rolesWithJDs: [
      { title: "Blockchain Developer", jd: "Build decentralized applications (DApps) and blockchain solutions. Develop and deploy smart contracts. Integrate blockchain with existing systems. Work with various blockchain platforms. Required: Solidity, Web3.js, Ethereum, cryptography, and distributed systems." },
      { title: "Smart Contract Developer", jd: "Write, test, and deploy secure smart contracts. Audit contract code for vulnerabilities. Optimize gas costs and performance. Implement complex DeFi logic. Required: Expert Solidity, security best practices, testing frameworks, and blockchain fundamentals." },
      { title: "Crypto Analyst", jd: "Analyze cryptocurrency markets and blockchain data. Research crypto projects and tokenomics. Provide insights on investment opportunities. Track on-chain metrics and trends. Required: Blockchain knowledge, data analysis, financial modeling, and crypto market understanding." },
      { title: "DeFi Engineer", jd: "Build decentralized finance protocols and applications. Implement lending, trading, and yield farming features. Ensure protocol security and efficiency. Integrate with DeFi ecosystem. Required: Solidity, DeFi protocols, Web3, smart contract security, and financial concepts." }
    ],
    projects: ["Token Creation", "DApp Development", "NFT Marketplace"],
    salary: {
      fresher: "$70k - $100k",
      experienced: "$130k - $220k+"
    },
    marketDemand: "High - Emerging technology with growing adoption",
    careerGrowth: "Rapid - Lead positions in 3-5 years"
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    tagline: "Scale infinitely, deploy globally.",
    description: "Master cloud infrastructure and services",
    icon: "☁️",
    color: "from-indigo-500 to-blue-500",
    glowColor: "rgba(99, 102, 241, 0.3)",
    position: { x: 43, y: 70 },
    subDomains: [
      "AWS Services",
      "Azure Cloud",
      "Google Cloud",
      "DevOps",
      "Serverless Architecture"
    ],
    tools: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"],
    skills: ["Cloud Architecture", "Infrastructure as Code", "CI/CD", "Monitoring", "Security"],
    roles: ["Cloud Architect", "DevOps Engineer", "Cloud Security Engineer", "SRE"],
    rolesWithJDs: [
      { title: "Cloud Architect", jd: "Design scalable and secure cloud infrastructure. Lead cloud migration and modernization projects. Define cloud strategy and best practices. Optimize costs and performance. Required: AWS/Azure/GCP expertise, architecture patterns, IaC (Terraform), and 5+ years experience." },
      { title: "DevOps Engineer", jd: "Build and maintain CI/CD pipelines. Automate deployment and infrastructure. Monitor system health and performance. Collaborate with development teams. Required: Docker, Kubernetes, Jenkins/GitLab CI, scripting (Python/Bash), and cloud platforms." },
      { title: "Cloud Security Engineer", jd: "Implement cloud security controls and policies. Monitor and respond to security threats. Conduct security assessments. Ensure compliance with standards. Required: Cloud security, IAM, encryption, compliance frameworks, and security tools." },
      { title: "SRE (Site Reliability Engineer)", jd: "Ensure system reliability and uptime. Build automation and monitoring. Respond to incidents and outages. Optimize system performance. Required: Linux, programming, observability tools, incident management, and cloud infrastructure." }
    ],
    projects: ["Microservices Deployment", "Auto-scaling System", "Cloud Migration"],
    salary: {
      fresher: "$65k - $90k",
      experienced: "$120k - $190k"
    },
    marketDemand: "Very High - Enterprise-wide cloud adoption",
    careerGrowth: "Excellent - Architect roles in 5-7 years"
  },
  {
    id: "datascience",
    name: "Data Science",
    tagline: "Turn data into insights.",
    description: "Unlock the power of data-driven decisions",
    icon: "📊",
    color: "from-yellow-500 to-orange-500",
    glowColor: "rgba(234, 179, 8, 0.3)",
    position: { x: 43, y: 35 },
    subDomains: [
      "Data Analysis",
      "Data Visualization",
      "Big Data",
      "Business Intelligence",
      "Predictive Analytics"
    ],
    tools: ["Python", "R", "SQL", "Tableau", "Power BI"],
    skills: ["Statistics", "Data Mining", "Machine Learning", "Data Cleaning", "Storytelling"],
    roles: ["Data Scientist", "Data Analyst", "BI Developer", "Analytics Engineer"],
    rolesWithJDs: [
      {
        title: "Data Analyst",
        jd: "Analyze complex datasets to extract actionable insights. Create visualizations and reports for stakeholders. Use SQL, Excel, and BI tools to identify trends and patterns. Collaborate with business teams to solve data-driven problems. Required: Strong analytical skills, proficiency in SQL, Excel, Tableau/Power BI, and basic statistics."
      },
      {
        title: "Data Scientist",
        jd: "Build predictive models and machine learning algorithms to solve business problems. Design experiments and A/B tests. Develop end-to-end ML pipelines from data collection to deployment. Communicate complex findings to non-technical stakeholders. Required: Advanced Python/R, machine learning, statistics, SQL, and domain expertise."
      },
      {
        title: "Data Engineer",
        jd: "Design and build scalable data pipelines and infrastructure. Develop ETL processes to move and transform data. Optimize database performance and ensure data quality. Work with big data technologies like Spark, Kafka, and cloud platforms. Required: Strong programming (Python/Java), SQL, ETL tools, and cloud experience (AWS/GCP/Azure)."
      },
      {
        title: "Machine Learning Engineer",
        jd: "Deploy and maintain ML models in production environments. Optimize model performance and scalability. Build automated training and deployment pipelines (MLOps). Collaborate with data scientists to productionize algorithms. Required: Strong software engineering, Python, ML frameworks (TensorFlow/PyTorch), Docker/Kubernetes, and cloud platforms."
      },
      {
        title: "BI Developer",
        jd: "Design and develop business intelligence solutions and dashboards. Create data models and semantic layers. Implement reporting systems and automated insights. Work with stakeholders to understand reporting needs. Required: Expertise in BI tools (Tableau, Power BI, Looker), SQL, data warehousing concepts, and data modeling."
      },
      {
        title: "AI Researcher",
        jd: "Conduct cutting-edge research in artificial intelligence and machine learning. Publish papers in top-tier conferences. Develop novel algorithms and techniques. Collaborate with engineering teams to implement research findings. Required: PhD or Masters in CS/ML, deep learning expertise, strong mathematical foundation, and publication record."
      }
    ],
    projects: ["Customer Segmentation", "Sales Forecasting", "Dashboard Creation"],
    salary: {
      fresher: "$55k - $80k",
      experienced: "$110k - $170k"
    },
    marketDemand: "Very High - Data-driven decision making is essential",
    careerGrowth: "Strong - Senior data roles in 5-7 years"
  },
  {
    id: "mobile",
    name: "Mobile Development",
    tagline: "Create apps that touch billions.",
    description: "Build native and cross-platform mobile applications",
    icon: "📱",
    color: "from-pink-500 to-rose-500",
    glowColor: "rgba(236, 72, 153, 0.3)",
    position: { x: 73, y: 40 },
    subDomains: [
      "iOS Development",
      "Android Development",
      "React Native",
      "Flutter",
      "Mobile UI/UX"
    ],
    tools: ["Swift", "Kotlin", "React Native", "Flutter", "Xcode"],
    skills: ["Mobile Design", "API Integration", "Push Notifications", "App Store Optimization", "Performance"],
    roles: ["iOS Developer", "Android Developer", "Mobile App Developer", "React Native Developer"],
    rolesWithJDs: [
      { title: "iOS Developer", jd: "Build native iOS applications using Swift/SwiftUI. Implement iOS-specific features and designs. Optimize performance and memory usage. Publish apps to App Store. Required: Swift, UIKit/SwiftUI, Xcode, iOS SDK, and Apple guidelines." },
      { title: "Android Developer", jd: "Develop native Android apps using Kotlin. Implement Material Design and Android features. Handle different screen sizes and devices. Publish to Google Play Store. Required: Kotlin/Java, Android SDK, Jetpack Compose, and Android best practices." },
      { title: "Mobile App Developer", jd: "Build cross-platform mobile applications. Implement features across iOS and Android. Handle API integrations and data storage. Ensure app performance and user experience. Required: React Native/Flutter, JavaScript/Dart, mobile UI/UX, and API integration." },
      { title: "React Native Developer", jd: "Develop cross-platform apps using React Native. Build reusable components and libraries. Bridge native modules when needed. Optimize bundle size and performance. Required: React Native, JavaScript/TypeScript, native modules, and mobile development fundamentals." }
    ],
    projects: ["Social Media App", "E-commerce Mobile App", "Fitness Tracker"],
    salary: {
      fresher: "$55k - $85k",
      experienced: "$110k - $175k"
    },
    marketDemand: "Very High - Mobile-first world",
    careerGrowth: "Excellent - Lead mobile architect in 5-6 years"
  },
  {
    id: "devops",
    name: "DevOps",
    tagline: "Automate, deploy, and scale.",
    description: "Bridge development and operations for seamless delivery",
    icon: "⚙️",
    color: "from-violet-500 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.3)",
    position: { x: 28, y: 75 },
    subDomains: [
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Container Orchestration",
      "Monitoring & Logging",
      "Site Reliability"
    ],
    tools: ["Jenkins", "GitLab CI", "Terraform", "Ansible", "Prometheus"],
    skills: ["Automation", "Cloud Platforms", "Scripting", "System Administration", "Security"],
    roles: ["DevOps Engineer", "SRE", "Platform Engineer", "Build Engineer"],
    rolesWithJDs: [
      { title: "DevOps Engineer", jd: "Automate software deployment and infrastructure. Build CI/CD pipelines for rapid delivery. Manage containerization and orchestration. Monitor system health and performance. Required: Docker, Kubernetes, CI/CD tools, IaC (Terraform), and cloud platforms." },
      { title: "SRE", jd: "Ensure high availability and reliability of services. Implement observability and monitoring. Respond to incidents and perform root cause analysis. Build automation to reduce toil. Required: Programming, Linux, observability tools, incident management, and SLO/SLI concepts." },
      { title: "Platform Engineer", jd: "Build internal platforms and tools for developers. Design developer experience and workflows. Maintain platform infrastructure. Enable self-service capabilities. Required: Kubernetes, platform tools, APIs, automation, and developer empathy." },
      { title: "Build Engineer", jd: "Maintain and optimize build systems. Implement continuous integration workflows. Improve build speed and reliability. Support development teams with build issues. Required: CI tools (Jenkins/GitLab), build systems, scripting, and version control." }
    ],
    projects: ["CI/CD Pipeline Setup", "Kubernetes Deployment", "Infrastructure Automation"],
    salary: {
      fresher: "$70k - $95k",
      experienced: "$125k - $190k"
    },
    marketDemand: "Very High - Essential for modern software delivery",
    careerGrowth: "Strong - Principal engineer in 6-8 years"
  },
  {
    id: "gamedev",
    name: "Game Development",
    tagline: "Craft immersive worlds.",
    description: "Create engaging games and interactive experiences",
    icon: "🎮",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.3)",
    position: { x: 48, y: 85 },
    subDomains: [
      "Game Design",
      "3D Graphics",
      "Game Physics",
      "Multiplayer Systems",
      "VR/AR Gaming"
    ],
    tools: ["Unity", "Unreal Engine", "Blender", "C#", "C++"],
    skills: ["3D Modeling", "Animation", "Physics", "AI Programming", "Performance Optimization"],
    roles: ["Game Developer", "Unity Developer", "Gameplay Programmer", "Technical Artist"],
    rolesWithJDs: [
      { title: "Game Developer", jd: "Design and develop video games. Implement gameplay mechanics and features. Optimize game performance. Collaborate with artists and designers. Required: Unity/Unreal Engine, C#/C++, game design principles, and 3D math." },
      { title: "Unity Developer", jd: "Build games and interactive experiences in Unity. Create game systems and mechanics. Integrate assets and animations. Optimize for target platforms. Required: Unity3D, C#, game development patterns, and performance optimization." },
      { title: "Gameplay Programmer", jd: "Implement core gameplay features and mechanics. Design game systems and AI behavior. Balance gameplay and tune parameters. Work closely with game designers. Required: C++/C#, game engines, gameplay patterns, and problem-solving skills." },
      { title: "Technical Artist", jd: "Bridge art and programming teams. Create shaders and visual effects. Optimize art assets for performance. Build tools for artists. Required: Shader programming, 3D software, scripting, game engines, and artistic sensibility." }
    ],
    projects: ["2D Platformer", "3D Action Game", "Mobile Puzzle Game"],
    salary: {
      fresher: "$50k - $75k",
      experienced: "$95k - $150k"
    },
    marketDemand: "High - Growing gaming industry",
    careerGrowth: "Good - Lead game developer in 6-8 years"
  },
  {
    id: "iot",
    name: "IoT",
    tagline: "Connect the physical world.",
    description: "Build smart devices and connected systems",
    icon: "🔌",
    color: "from-emerald-500 to-green-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    position: { x: 45, y: 50 },
    subDomains: [
      "Embedded Systems",
      "Sensor Networks",
      "Edge Computing",
      "Smart Devices",
      "Industrial IoT"
    ],
    tools: ["Arduino", "Raspberry Pi", "MQTT", "Node-RED", "AWS IoT"],
    skills: ["Embedded Programming", "Networking", "Hardware Integration", "Data Analytics", "Security"],
    roles: ["IoT Developer", "Embedded Systems Engineer", "IoT Architect", "Hardware Engineer"],
    rolesWithJDs: [
      { title: "IoT Developer", jd: "Develop IoT applications and solutions. Connect devices to cloud platforms. Implement data collection and processing. Build dashboards and analytics. Required: Embedded programming, MQTT/HTTP protocols, cloud IoT services, and sensor integration." },
      { title: "Embedded Systems Engineer", jd: "Design and program embedded systems. Work with microcontrollers and sensors. Optimize code for resource-constrained devices. Debug hardware-software integration. Required: C/C++, microcontrollers (Arduino/ESP32), RTOS, and hardware knowledge." },
      { title: "IoT Architect", jd: "Design end-to-end IoT solutions. Define system architecture and protocols. Ensure scalability and security. Lead IoT implementation projects. Required: IoT platforms, cloud architecture, networking, security, and 5+ years experience." },
      { title: "Hardware Engineer", jd: "Design and develop electronic hardware. Create circuit boards and schematics. Test and debug hardware systems. Collaborate with software teams. Required: Circuit design, PCB layout, electronics fundamentals, testing equipment, and CAD tools." }
    ],
    projects: ["Smart Home System", "Industrial Monitoring", "Wearable Device"],
    salary: {
      fresher: "$60k - $85k",
      experienced: "$110k - $165k"
    },
    marketDemand: "High - Expanding IoT ecosystem",
    careerGrowth: "Strong - IoT architect in 6-7 years"
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    tagline: "Design delightful experiences.",
    description: "Create beautiful and intuitive user interfaces",
    icon: "🎨",
    color: "from-fuchsia-500 to-pink-500",
    glowColor: "rgba(217, 70, 239, 0.3)",
    position: { x: 40, y: 10 },
    subDomains: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Interaction Design"
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
    skills: ["Design Thinking", "User Psychology", "Prototyping", "Visual Communication", "Usability Testing"],
    roles: ["UI Designer", "UX Designer", "Product Designer", "Interaction Designer"],
    rolesWithJDs: [
      { title: "UI Designer", jd: "Create beautiful and functional user interfaces. Design visual elements, icons, and layouts. Maintain design systems and style guides. Collaborate with developers for implementation. Required: Figma/Adobe XD, visual design, typography, color theory, and pixel-perfect execution." },
      { title: "UX Designer", jd: "Research user needs and behavior. Design user flows and wireframes. Conduct usability testing. Solve user experience problems. Required: User research, wireframing, prototyping, usability testing, and empathy for users." },
      { title: "Product Designer", jd: "Own end-to-end product design. Conduct research and ideation. Design UI/UX and interactions. Work with cross-functional teams. Required: UI/UX skills, product thinking, prototyping, user research, and business understanding." },
      { title: "Interaction Designer", jd: "Design interactive experiences and animations. Create micro-interactions and transitions. Prototype interactive flows. Define interaction patterns. Required: Prototyping tools, animation principles, interaction design, and attention to detail." }
    ],
    projects: ["Mobile App Redesign", "Website UX Audit", "Design System Creation"],
    salary: {
      fresher: "$50k - $70k",
      experienced: "$95k - $145k"
    },
    marketDemand: "High - User experience is critical",
    careerGrowth: "Good - Design director in 7-9 years"
  },
  {
    id: "arvr",
    name: "AR/VR",
    tagline: "Build the metaverse.",
    description: "Create immersive augmented and virtual reality experiences",
    icon: "🥽",
    color: "from-amber-500 to-red-500",
    glowColor: "rgba(245, 158, 11, 0.3)",
    position: { x: 18, y: 40 },
    subDomains: [
      "Virtual Reality",
      "Augmented Reality",
      "Mixed Reality",
      "3D Modeling",
      "Spatial Computing"
    ],
    tools: ["Unity", "Unreal Engine", "ARKit", "ARCore", "WebXR"],
    skills: ["3D Graphics", "Spatial UI", "Performance Optimization", "Hardware Integration", "User Interaction"],
    roles: ["VR Developer", "AR Developer", "XR Engineer", "3D Developer"],
    rolesWithJDs: [
      { title: "VR Developer", jd: "Build immersive virtual reality experiences. Develop VR applications for headsets (Oculus, HTC Vive). Optimize for VR performance and comfort. Implement VR interactions and controls. Required: Unity/Unreal, C#/C++, VR SDKs, 3D math, and XR design principles." },
      { title: "AR Developer", jd: "Create augmented reality applications. Implement AR features using ARKit/ARCore. Blend virtual content with real world. Optimize for mobile AR performance. Required: Unity, ARKit/ARCore, mobile development, computer vision, and spatial computing." },
      { title: "XR Engineer", jd: "Develop mixed reality and spatial computing solutions. Work across VR, AR, and MR platforms. Build immersive 3D experiences. Integrate with XR hardware. Required: Unity/Unreal, XR SDKs, 3D programming, spatial UI, and cross-platform development." },
      { title: "3D Developer", jd: "Create 3D web and app experiences. Implement 3D graphics and animations. Work with WebGL/Three.js. Optimize 3D performance. Required: Three.js/WebGL, JavaScript, 3D math, shaders, and graphics optimization." }
    ],
    projects: ["VR Training Simulation", "AR Shopping Experience", "Virtual Showroom"],
    salary: {
      fresher: "$65k - $90k",
      experienced: "$120k - $180k"
    },
    marketDemand: "Growing - Emerging technology with high potential",
    careerGrowth: "Rapid - XR architect in 4-6 years"
  }
];
