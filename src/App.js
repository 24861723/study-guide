import React, { useState, useEffect } from 'react';
import { Trash2, Moon, Sun } from 'lucide-react';

const StudyGuide = () => {
  const [questions, setQuestions] = useState([
    { id: 1, questionImages: [], solutionImages: [], showSolution: false },
  ]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleSolution = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, showSolution: !q.showSolution } : q
      )
    );
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id), 0) + 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        questionImages: [],
        solutionImages: [],
        showSolution: false,
      },
    ]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleImageUpload = (event, type, id) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            [type === 'question' ? 'questionImages' : 'solutionImages']: [
              ...q[type === 'question' ? 'questionImages' : 'solutionImages'],
              ...imageUrls,
            ],
          };
        }
        return q;
      })
    );
  };

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Study Guide
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        {questions.map((question) => (
          <div
            key={question.id}
            className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Question {question.id}
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-4 h-4 border ${
                      question.questionImages.length > 0
                        ? 'bg-blue-500'
                        : 'bg-white dark:bg-gray-600'
                    } rounded`}
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                    Question
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, 'question', question.id)
                      }
                    />
                  </label>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-4 h-4 border ${
                      question.solutionImages.length > 0
                        ? 'bg-blue-500'
                        : 'bg-white dark:bg-gray-600'
                    } rounded`}
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
                    Solution
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, 'solution', question.id)
                      }
                    />
                  </label>
                </div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => toggleSolution(question.id)}
                >
                  {question.showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition duration-200"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div
              className="relative overflow-hidden"
              style={{ height: '400px' }}
            >
              <div
                className={`absolute inset-0 bg-white dark:bg-gray-700 transition-all duration-300 ease-in-out overflow-y-auto
                  ${
                    question.showSolution
                      ? 'opacity-0 translate-x-full'
                      : 'opacity-100 translate-x-0'
                  }`}
              >
                {question.questionImages.length > 0 ? (
                  question.questionImages.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Question ${index + 1}`}
                      className="max-w-full mb-4 rounded-lg shadow-sm"
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                      Question Preview
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`absolute inset-0 bg-white dark:bg-gray-700 transition-all duration-300 ease-in-out overflow-y-auto
                  ${
                    question.showSolution
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-full'
                  }`}
              >
                {question.solutionImages.length > 0 ? (
                  question.solutionImages.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Solution ${index + 1}`}
                      className="max-w-full mb-4 rounded-lg shadow-sm"
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                      Solution Preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-lg font-semibold"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default StudyGuide;
