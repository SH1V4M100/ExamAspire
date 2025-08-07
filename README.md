````markdown
# Exam Aspire

## Overview
A full-stack exam platform built with **Next.js** and **Payload CMS** that provides secure exam creation, real-time timed exam attempts, automated scoring, and detailed performance analytics.  
Designed for educational institutions and e-learning platforms, the system ensures fairness, transparency, and robust student tracking.

---

## ✨ Features

### 📝 Exam Functionality
- Create and schedule exams with multiple sections (Physics, Chemistry, Maths)
- Supports multiple question types:
  - Single correct answer
  - Multiple correct answers
  - Integer-type questions
- Optional **negative marking** for incorrect answers
- Built-in **exam timer** with **auto-save** for answers
- Detailed **result analysis** with subject-wise breakdowns
- Leaderboard and historical performance tracking

### 👤 User Management
- Secure **email/password authentication**
- Role-based access control (Admin & Student)
- Profile storage with personal details (name, email, contact number)
- Access control ensures only authenticated users can attempt exams

### 📊 Assessment System
- **Subject-wise scoring**: Physics, Chemistry, Maths tracked separately
- **Detailed analytics**: Overall score, subject scores, and attempt history
- **Time tracking**: Records start and end time for each exam attempt
- **Auto-save & recovery**: Answers saved automatically to prevent data loss

### 🖥️ Admin Panel
- Fully integrated **Payload CMS** for content and exam management
- Create and manage exams, users, and schedules
- Configure notifications and exam availability

---

## 🎯 Exam Scoring System

### Scoring Patterns

1. **Single Correct Answer Questions**
   - Type 1: ✅ +1 | ❌ -0.25  
   - Type 2: ✅ +2 | ❌ -0.5  
   - Type 4: ✅ +4 | ❌ -1  

2. **Multiple Correct Answers**
   - Fully correct = +2  
   - Partially correct = `2 × (correctly selected / total correct)`  
   - Any incorrect selection = 0  

3. **Integer Type Questions**
   - Correct answer = +4  
   - Incorrect answer = -1  

### Subject-wise Scoring
- Scores are calculated separately for **Physics**, **Chemistry**, and **Maths**
- Negative scores are capped at **0 per subject**
- **Total score** = Sum of all subject scores

### Negative Marking
- Applied for incorrect answers depending on question type
- Final subject score never goes below **zero**

### Special Cases
- **Mock exams** (exam.id = -1) do not submit scores
- **Unanswered questions** do not affect the score

### Result Calculation
- Automatic **time tracking** for each attempt
- Detailed result breakdown includes:
  - Total score vs maximum marks
  - Subject-wise score analysis
  - Count of correct and incorrect answers

---

## 🛠 Tech Stack

- **Frontend**: Next.js, TypeScript, React  
- **Styling**: Tailwind CSS  
- **Backend**: Node.js, Payload CMS  
- **Database**: MongoDB  
- **State Management**: React Hooks

---

## 🚀 Getting Started

### Step-by-Step Guide

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exam-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   * Copy `.env.example` to `.env`
   * Fill in required database and CMS credentials

4. **Run development server**
   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:3000`

---

## 📂 Project Structure

```
src/
 ├─ app/             # Next.js application routes
 ├─ collections/     # Payload CMS collections (Exams, Users, ExamAttempts)
 ├─ components/      # Reusable UI components
 ├─ blocks/          # Rich content blocks for CMS
 └─ hooks/           # Custom React hooks
```

---

## 🤝 Contributing

Pull requests are welcome!  
For significant changes, please open an **issue** first to discuss your proposed updates.

````