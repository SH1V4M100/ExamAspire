import { useState, useCallback } from 'react';
import { questions } from './data/questions';
import { Answer, ExamResult } from './types';
import Timer from './components/Timer';

function App() {
  const [userName, setUserName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionInput, setQuestionInput] = useState('1');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [examCompleted, setExamCompleted] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  const startExam = () => {
    if (userName.trim()) {
      setHasStarted(true);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === questions[currentQuestion].id
    );

    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      selectedOption: optionIndex,
      isCorrect: optionIndex === questions[currentQuestion].correctAnswer,
    };

    setAnswers((prev) => {
      const updated = [...prev];
      if (existingAnswerIndex !== -1) {
        updated[existingAnswerIndex] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  };

  const calculateScore = (examAnswers: Answer[]): number => {
    return examAnswers.reduce((score, answer) => {
      if (answer.isCorrect) return score + 4;
      if (answer.selectedOption !== null) return score - 1;
      return score;
    }, 0);
  };

  const finishExam = useCallback(() => {
    const score = calculateScore(answers);
    const timeSpent = 300 - timeLeft;

    const examResult: ExamResult = {
      userName,
      answers,
      score,
      totalQuestions: questions.length,
      timeSpent,
    };

    setResult(examResult);
    setExamCompleted(true);
  }, [answers, timeLeft, userName]);

  const navigateToQuestion = (questionNumber: number) => {
    if (questionNumber >= 1 && questionNumber <= questions.length) {
      setCurrentQuestion(questionNumber - 1);
      setQuestionInput(questionNumber.toString());
    }
  };

  // Step 1: Enter name
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
            placeholder="Your name"
          />
          <button
            disabled={!userName.trim()}
            onClick={startExam}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // Step 2: After exam is submitted
  if (examCompleted && result) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Exam Results</h1>
          <div className="space-y-4">
            <p className="text-xl">
              Name: <strong>{result.userName}</strong>
            </p>
            <p className="text-xl">
              Final Score: <strong>{result.score}</strong>
            </p>
            <p className="text-xl">
              Time Spent: <strong>{result.timeSpent} seconds</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selected = answers.find((a) => a.questionId === question.id)?.selectedOption;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">MCQ Examination</h1>
            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={finishExam} />
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuestionInput(value);
                    const parsed = parseInt(value, 10);
                    if (!isNaN(parsed)) {
                      navigateToQuestion(parsed);
                    }
                  }}
                  className="w-16 p-2 border border-gray-300 rounded"
                />
                <span className="text-gray-600">/ {questions.length}</span>
              </div>
            </div>

            {question.type === 'image' ? (
              <div className="mb-6">
                <img
                  src={question.content}
                  alt="Question"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-lg font-medium">What does this image show?</p>
              </div>
            ) : (
              <h2 className="text-xl font-semibold mb-4">{question.content}</h2>
            )}

            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selected === index
                      ? 'bg-blue-100 border-blue-400'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              disabled={currentQuestion === 0}
              onClick={() => navigateToQuestion(currentQuestion)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={finishExam}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Exam
            </button>
            <button
              disabled={currentQuestion === questions.length - 1}
              onClick={() => navigateToQuestion(currentQuestion + 2)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="text-sm text-gray-600 mt-6">
            <p>Marking scheme:</p>
            <ul className="list-disc list-inside">
              <li>Correct answer: +4 marks</li>
              <li>Wrong answer: -1 mark</li>
              <li>Unattempted: 0 marks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
