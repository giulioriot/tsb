
import { useState } from "react";

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
      "Cibi bilanciati e funzionali (barrette, integratori, piatti ottimizzati)",
      "Cibi naturali, grezzi o raccolti direttamente",
      "Pasti preparati in casa con ingredienti genuini"
    ],
  },
  {
    question: "La pizza, per te, è…",
    answers: [
      "Qualcosa che ordino",
      "Un processo che inizia dall'impasto",
      "Da infornare, con l'impasto pronto"
    ],
  },
  {
    question: "Proveresti cibi alternativi (insetti, alghe, carne coltivata)?",
    answers: [
      "Se ha senso, sì",
      "Preferisco non cambiare le mie abitudini",
      "Sono curioso e aperto a nuovi sapori"
    ],
  },
  {
    question: "Nel tempo libero preferisci…",
    answers: [
      "Giocare al pc e stare su internet",
      "Andare a pesca o in campeggio",
      "Uscire con gli amici e socializzare"
    ],
  },
  {
    question: "Come organizzi le tue vacanze?",
    answers: [
      "Mi affido ai tour operator o chiedo alla AI",
      "Mi lascio guidare dall’istinto ed esploro liberamente",
      "Faccio una ricerca dettagliata prima di partire"
    ],
  },
  {
    question: "Come immagini la città del futuro?",
    answers: [
      "Automatizzata e personalizzata per ogni individuo",
      "Simile a quella attuale, con piccoli cambiamenti",
      "Sostenibile e connessa"
    ],
  }
];

const outcomes = ["Dataista", "Primitivista", "Equilibrio"];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([0, 0, 0]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    const updated = [...scores];
    updated[index] += 1;
    setScores(updated);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    const max = Math.max(...scores);
    const index = scores.indexOf(max);
    return outcomes[index];
  };

  if (finished) {
    return (
      <div className="text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Il tuo mondo ideale è:</h2>
        <p className="text-xl text-purple-800">{getResult()}</p>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-lg font-semibold mb-4">{q.question}</h1>
      <div className="space-y-2">
        {q.answers.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="block w-full px-4 py-2 bg-purple-200 hover:bg-purple-300 rounded"
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
}
