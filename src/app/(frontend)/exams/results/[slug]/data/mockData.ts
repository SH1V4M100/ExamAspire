import { ExamData } from '../types';

// Sample mock data for testing the exam evaluation page
export const mockExamData: ExamData = {
  exam: {
    title: "Advanced Science Examination 2025",
    description: "Final comprehensive assessment covering Physics, Chemistry, and Mathematics concepts for the semester.",
    sections: [
      {
        subject: "Physics",
        questions: [
          {
            id: "phys-q1",
            questionText: "Which of the following is Newton's First Law of Motion?",
            options: [
              {
                id: "phys-q1-opt1",
                text: "Force equals mass times acceleration",
                isCorrect: false
              },
              {
                id: "phys-q1-opt2",
                text: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
                isCorrect: true
              },
              {
                id: "phys-q1-opt3",
                text: "For every action, there is an equal and opposite reaction",
                isCorrect: false
              },
              {
                id: "phys-q1-opt4",
                text: "Energy cannot be created or destroyed, only transformed",
                isCorrect: false
              }
            ]
          },
          {
            id: "phys-q2",
            questionText: "What is the unit of electrical resistance?",
            options: [
              {
                id: "phys-q2-opt1",
                text: "Volt",
                isCorrect: false
              },
              {
                id: "phys-q2-opt2",
                text: "Ampere",
                isCorrect: false
              },
              {
                id: "phys-q2-opt3",
                text: "Watt",
                isCorrect: false
              },
              {
                id: "phys-q2-opt4",
                text: "Ohm",
                isCorrect: true
              }
            ]
          },
          {
            id: "phys-q3",
            questionText: "Which phenomenon explains why the sky appears blue?",
            image: {
              url: "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg"
            },
            options: [
              {
                id: "phys-q3-opt1",
                text: "Rayleigh scattering",
                isCorrect: true
              },
              {
                id: "phys-q3-opt2",
                text: "Refraction",
                isCorrect: false
              },
              {
                id: "phys-q3-opt3",
                text: "Diffraction",
                isCorrect: false
              },
              {
                id: "phys-q3-opt4",
                text: "Polarization",
                isCorrect: false
              }
            ]
          }
        ]
      },
      {
        subject: "Chemistry",
        questions: [
          {
            id: "chem-q1",
            questionText: "What is the pH of a neutral solution at 25°C?",
            options: [
              {
                id: "chem-q1-opt1",
                text: "0",
                isCorrect: false
              },
              {
                id: "chem-q1-opt2",
                text: "7",
                isCorrect: true
              },
              {
                id: "chem-q1-opt3",
                text: "14",
                isCorrect: false
              },
              {
                id: "chem-q1-opt4",
                text: "1",
                isCorrect: false
              }
            ]
          },
          {
            id: "chem-q2",
            questionText: "Which of these is NOT a noble gas?",
            options: [
              {
                id: "chem-q2-opt1",
                text: "Helium",
                isCorrect: false
              },
              {
                id: "chem-q2-opt2",
                text: "Neon",
                isCorrect: false
              },
              {
                id: "chem-q2-opt3",
                text: "Nitrogen",
                isCorrect: true
              },
              {
                id: "chem-q2-opt4",
                text: "Argon",
                isCorrect: false
              }
            ]
          },
          {
            id: "chem-q3",
            questionText: "What is the chemical formula for glucose?",
            options: [
              {
                id: "chem-q3-opt1",
                text: "C6H12O6",
                isCorrect: true
              },
              {
                id: "chem-q3-opt2",
                text: "C12H22O11",
                isCorrect: false
              },
              {
                id: "chem-q3-opt3",
                text: "CH3COOH",
                isCorrect: false
              },
              {
                id: "chem-q3-opt4",
                text: "H2O",
                isCorrect: false
              }
            ]
          }
        ]
      },
      {
        subject: "Mathematics",
        questions: [
          {
            id: "math-q1",
            questionText: "What is the derivative of x²?",
            options: [
              {
                id: "math-q1-opt1",
                text: "x",
                isCorrect: false
              },
              {
                id: "math-q1-opt2",
                text: "2x",
                isCorrect: true
              },
              {
                id: "math-q1-opt3",
                text: "x³",
                isCorrect: false
              },
              {
                id: "math-q1-opt4",
                text: "2",
                isCorrect: false
              }
            ]
          },
          {
            id: "math-q2",
            questionText: "Which of the following is a prime number?",
            options: [
              {
                id: "math-q2-opt1",
                text: "1",
                isCorrect: false
              },
              {
                id: "math-q2-opt2",
                text: "4",
                isCorrect: false
              },
              {
                id: "math-q2-opt3",
                text: "9",
                isCorrect: false
              },
              {
                id: "math-q2-opt4",
                text: "11",
                isCorrect: true
              }
            ]
          },
          {
            id: "math-q3",
            questionText: "Solve for x: 3x - 7 = 8",
            image: {
              url: "https://images.pexels.com/photos/3808004/pexels-photo-3808004.jpeg"
            },
            options: [
              {
                id: "math-q3-opt1",
                text: "x = 3",
                isCorrect: false
              },
              {
                id: "math-q3-opt2",
                text: "x = 5",
                isCorrect: true
              },
              {
                id: "math-q3-opt3",
                text: "x = -1/3",
                isCorrect: false
              },
              {
                id: "math-q3-opt4",
                text: "x = 15",
                isCorrect: false
              }
            ]
          }
        ]
      }
    ]
  },
  answers: {
    "phys-q1": {
      selectedOptionIds: ["phys-q1-opt2"]
    },
    "phys-q2": {
      selectedOptionIds: ["phys-q2-opt4"]
    },
    "phys-q3": {
      selectedOptionIds: ["phys-q3-opt2"] // Incorrect answer
    },
    "chem-q1": {
      selectedOptionIds: ["chem-q1-opt2"]
    },
    "chem-q2": {
      selectedOptionIds: ["chem-q2-opt3"]
    },
    "chem-q3": {
      selectedOptionIds: ["chem-q3-opt2"] // Incorrect answer
    },
    "math-q1": {
      selectedOptionIds: ["math-q1-opt2"]
    },
    "math-q2": {
      selectedOptionIds: ["math-q2-opt4"]
    },
    "math-q3": {
      selectedOptionIds: ["math-q3-opt1"] // Incorrect answer
    }
  }
};