import { useState } from "react";

const Quiz = () => {
  const questions = [
    {
      question: "Come sei arrivato oggi?",
      answers: [
        "Con la mia auto/moto",
        "A piedi, in monopattino, in bici",
        "Con i trasporti pubblici"
      ],
    },
    {
      question: "Cosa preferisci mangiare?",
      answers: [
        "Cibi bilanciati e funzionali",
        "Cibi naturali, grezzi o raccolti direttamente",
        "Pasti preparati in casa con ingredienti genuini"
      ],
    },
    // Aggiungi altre domande...
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    setAnswers([...answers, index]);
    setStep(step + 1);
  };

  if (step >= questions.length) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Grazie per aver completato il quiz!</h2>
        <p className="mt-4">Il tuo mondo ideale è in arrivo… 🌍</p>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
      <div className="space-y-2">
        {q.answers.map((a, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="block w-full p-3 bg-blue-100 hover:bg-blue-200 rounded"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
