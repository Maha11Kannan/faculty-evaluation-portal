🎓 Faculty Evaluation System (MERN Stack)
A real-time, cloud-integrated platform designed to streamline the academic feedback process. This project allows students to evaluate faculty performance through a dynamic interface, while providing administrators with live data synchronization via the cloud.

🌟 Key Features & Novelty
Dynamic Cloud Integration: Unlike static forms, this system leverages MongoDB Atlas for real-time data persistence and global accessibility.

Secure Environment Management: Utilizes dotenv to mask sensitive connection strings and API keys, ensuring industry-standard security practices.

Restricted API Access: Backend is protected by a custom CORS policy that whitelists only the official React frontend, preventing unauthorized cross-origin requests.

Responsive Dashboard: A wireframe-designed dashboard that provides clear visual analytics for faculty performance.

🛠️ Technology Stack
Frontend: React.js (Component-driven UI)

Backend: Node.js & Express.js (RESTful API Architecture)

Database: MongoDB Atlas (NoSQL Cloud Cluster)

ODM: Mongoose (Schema Validation & Data Modeling)

Security: Dotenv & CORS Middleware

🔄 Project Workflow
The application follows a secure 4-step data lifecycle:

Client-Side: User interacts with the React frontend to submit feedback.

API Gateway: Data is transmitted via an asynchronous POST request to the Express server.

Security Layer: The server validates credentials from the .env file and checks the request origin.

Cloud Storage: Upon validation, the feedback is stored in the facultyDB collection within the mahalakshmikannan cluster.

⚙️ Setup and Installation
Clone the repository:

Bash
git clone https://github.com/yourusername/faculty-evaluation.git
Install dependencies (Run in both /client and /server folders):

Bash
npm install
Configure Environment Variables: Create a .env file in the server root and add your URI: MONGO_URI=mongodb+srv://mahak:maha123@mahalakshmikannan.ygpvvxf.mongodb.net/facultyDB?retryWrites=true&w=majority

Launch the System:

Backend: node server.js (Wait for ✅ MongoDB Connected Successfully!)

Frontend: npm start

📈 Future Scope
AI Sentiment Analysis: Implementing NLP to automatically categorize student comments as positive, neutral, or negative.

PDF Reports: Automated generation of monthly performance reports for department heads.