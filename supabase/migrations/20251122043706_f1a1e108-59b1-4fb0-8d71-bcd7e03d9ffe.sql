-- Update AI/ML Internship with detailed JD
UPDATE internships 
SET 
  description = 'All students applying for the internship must complete any one of the tasks listed below within 5 days. This task will be used for evaluating and shortlisting candidates for the final interview.',
  responsibilities = ARRAY[
    'AI Career Recommender System - Build an AI-based recommendation system that helps students explore suitable career options based on their interests, skills, academic background, and personality inputs. Expected Features: Input form for students to enter details, AI/ML model to recommend career paths, Simple dashboard showing top recommended careers, required skills, and suggested learning roadmap.',
    'Job Market Analyzer – Future Skills & Opportunities - Develop a system that analyzes current and future job market trends using public datasets or APIs. Expected Features: Analyze growing fields (AI, Cloud, Cybersecurity), Identify high competition vs high demand fields, Visualize trends like top in-demand skills, future growth areas, and declining job roles.',
    'AI-Powered Resume Screening & Candidate Matching System - Create an AI model that reads and analyzes student resumes and suggests best matching job roles, highlights skill strengths and weaknesses, and gives a profile score. Expected Features: Resume upload/parse (PDF/Text), Extract skills, education, and experience, Matching engine to suggest suitable roles, Skill gap analysis.',
    'ML-Based Student Performance Prediction Model - Build a machine learning model to predict student performance or success probability based on attendance, past marks, practice history, and engagement. Expected Features: Clean dataset (real or synthetic), ML model with clear explanation, Dashboard showing risk levels or predicted scores, Suggestions for improvement.'
  ],
  requirements = ARRAY[
    'Upload your complete project code to GitHub (make the repository public)',
    'Deploy your project on Vercel / Render / Streamlit / any suitable platform (if it has a UI)',
    'Submit GitHub repository link and deployed project link',
    'Create a README.md file explaining: Project overview, Tech stack used, How to run the project locally, Demo screenshots or video',
    'Timeline: All students must complete and submit their chosen task within 5 days',
    'Shortlisting Criteria: Innovation & Learning Capability (30%), Timely Project Completion (50%), Enhanced Features & Implementation (20%)',
    'Interview Call: Only shortlisted candidates based on evaluation will be invited for the online interview',
    'Note: Use of AI tools (like ChatGPT, GitHub Copilot, etc.) is allowed — however, students must clearly understand and explain their own code during the interview'
  ],
  skills = ARRAY[
    'Python',
    'Scikit-learn',
    'TensorFlow / PyTorch (optional)',
    'Pandas',
    'NumPy',
    'Matplotlib/Seaborn',
    'NLP libraries',
    'Flask / FastAPI / Node.js (optional)',
    'React / HTML-CSS-JS (optional)',
    'GitHub',
    'Deployment (Vercel/Render/Streamlit)'
  ]
WHERE id = 'dea801e6-988e-45c0-9d9b-6d7ab4dac296';

-- Update Full Stack Internship with detailed JD
UPDATE internships 
SET 
  description = 'All students applying for the internship must complete any one of the tasks listed below within 5 days. This task will be used for evaluating and shortlisting candidates for the final interview.',
  responsibilities = ARRAY[
    'Temple Tourism Website - Create a website where users can explore temples across India. Include information such as temple history, beliefs, best time to visit, and travel routes. The design should be informative and visually attractive for both locals and tourists. Focus on clean navigation and easy accessibility.',
    'HMIS – Hospital Management System - Develop a simple system to manage hospital operations. Include patient registration, doctor appointments, billing, and staff management. Ensure an easy-to-use dashboard for both admin and staff. Try to implement modular pages for scalability.',
    'Custom Jacket Design Website - Build a web app where users can design and customize jackets. Allow color, size, fabric, and logo customization. Show a 3D preview or live visualization of the final jacket. The design should be interactive and user-friendly.',
    'NGO – Training and Skill Development Website - Design a website for an NGO that runs training and skill programs. Include sections like About Us, Programs, Volunteer Signup, and Success Stories. Add an option for Donations or Partnership Enquiries. Keep the tone inspiring and the layout simple and accessible.',
    'Skill Development Portal For State Govt - Create a website similar to Naan Mudhalvan, which provides students with career and skill development resources. Include course listings, institute details, and skill pathways. Add sections for student login, training providers, and career guidance.'
  ],
  requirements = ARRAY[
    'Upload your complete project code to GitHub (make repository public)',
    'Deploy your project on Vercel or Netlify',
    'Submit the live project link and GitHub repository link',
    'Create a short PDF report describing your approach, design choices, and learning experience',
    'Timeline: All students must complete and submit their chosen task within 5 days',
    'Shortlisting Criteria: Innovation & Learning Capability (30%), Timely Project Completion (50%), Enhanced Features & Implementation (20%)',
    'Interview Call: Only shortlisted candidates based on evaluation will be invited for the online interview',
    'Note: Use of AI tools (like ChatGPT, GitHub Copilot, etc.) is allowed — however, students must clearly understand and explain their own code during the interview'
  ],
  skills = ARRAY[
    'MongoDB',
    'Express.js',
    'React.js',
    'Node.js',
    'HTML',
    'CSS',
    'JavaScript',
    'PHP (optional)',
    'GitHub CI/CD',
    'Vercel/Netlify Deployment'
  ]
WHERE id = '379962e6-73e5-4e2b-bf0d-34b3c23a5190';

-- Update Google Workspace Internship with detailed JD
UPDATE internships 
SET 
  description = 'All students applying for the internship must complete any one of the tasks listed below within 5 days. This task will be used for evaluating and shortlisting candidates for the final interview.',
  responsibilities = ARRAY[
    'The Gemini-Powered Personalized Study Path Generator - Use the Gemini API to analyze a student''s performance data and dynamically generate personalized daily/weekly study plans, including links to resources and AI-generated flashcards.',
    'Automated Assignment Lifecycle Management System - Allow faculty to create, schedule, and publish assignments digitally. Enable students to submit assignments through a unified online portal. Provide tools for automated grading or structured manual evaluation.',
    'Secure & Smart Exam Proctoring/Authentication with Vision AI - Prototype a proof-of-concept for a secure exam environment. The system will leverage device camera data and Vision AI/Gemini (Visual Analysis) to continuously verify identity and detect unauthorized activity.',
    'The AI-Driven Code Review and Debugging Assistant - Develop an integrated tool using Gemini''s reasoning to perform an initial code review, identify bugs/non-optimal structures, and provide a natural language explanation of the issue and a suggested fix.'
  ],
  requirements = ARRAY[
    'Upload your complete project code to GitHub (make repository public)',
    'Deploy your project on Vercel or Netlify',
    'Submit the live project link and GitHub repository link',
    'Create a short PDF report describing your approach, design choices, and learning experience',
    'Timeline: All students must complete and submit their chosen task within 5 days',
    'Shortlisting Criteria: Innovation & Learning Capability (30%), Timely Project Completion (50%), Enhanced Features & Implementation (20%)',
    'Interview Call: Only shortlisted candidates based on evaluation will be invited for the online interview',
    'Note: Use of AI tools (like ChatGPT, GitHub Copilot, etc.) is allowed — however, students must clearly understand and explain their own code during the interview'
  ],
  skills = ARRAY[
    'Frontend Development (React/Vue/Angular)',
    'Backend Development (Node.js/Python/Java)',
    'Google Workspace APIs',
    'Gemini API',
    'Vision AI',
    'GitHub CI/CD',
    'Vercel/Netlify Deployment'
  ]
WHERE id = '0f0816c3-c044-4cdb-9621-535e4b0292f5';