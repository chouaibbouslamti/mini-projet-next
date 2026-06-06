"use client";

import { useState } from "react";
import SimpleLayout from "../components/SimpleLayout";

const questions = [
  {
    question: "Dans quel element on met le code JavaScript ?",
    options: ["<script>", "<js>", "<body>", "<link>"],
    correct: "<script>",
  },
  {
    question: "Quel attribut utiliser pour referencer un script JavaScript externe ?",
    options: ["src", "rel", "href", "type"],
    correct: "src",
  },
  {
    question: 'Comment afficher "hello" avec une alerte ?',
    options: ['msg("hello")', 'alertbox("hello")', 'document.write("hello")', 'alert("hello")'],
    correct: 'alert("hello")',
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});

  const handleSubmit = () => {
    const score = questions.reduce((total, q, index) => {
      return answers[index] === q.correct ? total + 1 : total;
    }, 0);

    alert(`Votre note est : ${score} / ${questions.length}`);
  };

  return (
    <SimpleLayout title="Quiz JavaScript" subtitle="Tester vos connaissances">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
        {questions.map((q, qIndex) => (
          <div
            key={q.question}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5"
          >
            <h2 className="font-bold text-white mb-4">
              {qIndex + 1}. {q.question}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-lg p-3 hover:border-orange-500/50 transition cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    onChange={() => setAnswers({ ...answers, [qIndex]: option })}
                    className="accent-orange-500"
                  />
                  <span className="text-gray-300 text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-3 font-semibold transition"
        >
          Submit Result
        </button>
      </div>
    </SimpleLayout>
  );
}
