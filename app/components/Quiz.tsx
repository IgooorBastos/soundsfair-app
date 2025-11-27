'use client';

import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  lessonSlug: string;
  lessonLevel: number;
}

export default function QuizComponent({ questions, lessonSlug, lessonLevel }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);

    setScore(correctCount);
    setShowResults(true);

    // Save progress to localStorage
    const progressKey = `lesson-${lessonSlug}-quiz`;
    localStorage.setItem(progressKey, JSON.stringify({
      completed: true,
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
      date: new Date().toISOString(),
    }));

    // Award XP
    const passed = (correctCount / questions.length) >= 0.7;
    if (passed) {
      const xpKey = 'soundsfair-xp';
      const currentXP = parseInt(localStorage.getItem(xpKey) || '0');
      const xpEarned = 150; // 150 XP per lesson passed
      localStorage.setItem(xpKey, String(currentXP + xpEarned));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(''));
    setShowResults(false);
    setScore(0);
  };

  if (questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentQuestion];
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  return (
    <div className="bg-surface-charcoal border border-border-default rounded-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Level {lessonLevel} Quiz
        </h2>
        <p className="text-text-tertiary">
          You need 70% (7/10) to pass. You can retake as many times as needed.
        </p>
      </div>

      {!showResults ? (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-text-tertiary mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{selectedAnswers.filter(a => a).length}/{questions.length} answered</span>
            </div>
            <div className="w-full bg-surface-dark rounded-full h-2">
              <div
                className="bg-brand-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index); // A, B, C, D
                const isSelected = selectedAnswers[currentQuestion] === letter;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(letter)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all
                      ${isSelected
                        ? 'border-brand-gold bg-brand-gold/10 text-text-primary'
                        : 'border-border-default bg-surface-dark text-text-secondary hover:border-brand-gold/50'
                      }`}
                  >
                    <span className="font-semibold mr-3">{letter})</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-lg font-semibold transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                border-2 border-brand-gold text-brand-gold
                hover:bg-brand-gold hover:text-surface-black"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.some(a => !a)}
                className="px-8 py-3 rounded-lg font-semibold transition-all
                  disabled:opacity-40 disabled:cursor-not-allowed
                  bg-brand-gold text-surface-black
                  hover:bg-brand-gold-hover shadow-glow"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-lg font-semibold transition-all
                  bg-brand-gold text-surface-black
                  hover:bg-brand-gold-hover"
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <div className="text-center mb-8">
            <div className={`inline-block p-8 rounded-full mb-6 ${passed ? 'bg-semantic-success/10' : 'bg-semantic-warning/10'}`}>
              <div className="text-6xl font-bold">
                {passed ? '🎓' : '📚'}
              </div>
            </div>

            <h3 className="text-3xl font-bold text-text-primary mb-4">
              {passed ? 'Congratulations!' : 'Keep Learning'}
            </h3>

            <div className="text-5xl font-bold mb-2">
              <span className={passed ? 'text-semantic-success' : 'text-semantic-warning'}>
                {score}/{questions.length}
              </span>
            </div>
            <p className="text-2xl text-text-tertiary mb-6">
              {percentage}% Score
            </p>

            {passed ? (
              <div className="bg-semantic-success/10 border border-semantic-success/30 rounded-lg p-6 mb-6">
                <p className="text-semantic-success font-semibold text-lg mb-2">
                  ✅ Quiz Passed!
                </p>
                <p className="text-text-secondary">
                  You've earned <span className="text-brand-gold font-bold">150 XP</span> and unlocked the next level!
                </p>
              </div>
            ) : (
              <div className="bg-semantic-warning/10 border border-semantic-warning/30 rounded-lg p-6 mb-6">
                <p className="text-semantic-warning font-semibold text-lg mb-2">
                  📖 Review Needed
                </p>
                <p className="text-text-secondary">
                  You've earned <span className="text-brand-gold font-bold">50 XP</span> for attempting. Review the lesson and try again!
                </p>
              </div>
            )}
          </div>

          {/* Answer Review */}
          <div className="space-y-6 mb-8">
            <h4 className="text-xl font-semibold text-text-primary">Answer Review:</h4>
            {questions.map((q, index) => {
              const isCorrect = selectedAnswers[index] === q.correctAnswer;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? 'border-semantic-success/30 bg-semantic-success/5'
                      : 'border-semantic-error/30 bg-semantic-error/5'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary mb-2">
                        Question {index + 1}: {q.question}
                      </p>
                      <p className="text-text-secondary mb-2">
                        <span className="font-semibold">Your answer:</span> {selectedAnswers[index]}) {q.options[selectedAnswers[index].charCodeAt(0) - 65]}
                      </p>
                      {!isCorrect && (
                        <p className="text-semantic-success mb-2">
                          <span className="font-semibold">Correct answer:</span> {q.correctAnswer}) {q.options[q.correctAnswer.charCodeAt(0) - 65]}
                        </p>
                      )}
                      <p className="text-text-tertiary text-sm mt-3 p-3 bg-surface-dark rounded">
                        <span className="font-semibold">Explanation:</span> {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 rounded-lg font-semibold transition-all
                border-2 border-brand-gold text-brand-gold
                hover:bg-brand-gold hover:text-surface-black"
            >
              Retake Quiz
            </button>
            {passed && (
              <a
                href={`/lessons/level-${lessonLevel + 1}`}
                className="px-8 py-3 rounded-lg font-semibold transition-all text-center
                  bg-brand-gold text-surface-black
                  hover:bg-brand-gold-hover shadow-glow"
              >
                Next Level →
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}
