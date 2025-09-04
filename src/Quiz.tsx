import { useState, useEffect } from "react"

const questions = [
  {
    question: "Come sei arrivato oggi?",
    options: [
      { text: "Con la mia auto/moto", type: "Dataista" },
      { text: "A piedi, in monopattino, in bici", type: "Primitivista" },
      { text: "Con i trasporti pubblici", type: "Simbiotista" },
    ],
  },
  {
    question: "Cosa preferisci mangiare?",
    options: [
      { text: "Cibi bilanciati e funzionali (barrette, integratori, piatti ottimizzati)", type: "Dataista" },
      { text: "Cibi naturali, grezzi o raccolti direttamente", type: "Primitivista" },
      { text: "Pasti preparati in casa con ingredienti genuini", type: "Simbiotista" },
    ],
  },
  {
    question: "La pizza, per te, è...",
    options: [
      { text: "Qualcosa che ordino", type: "Dataista" },
      { text: "Un processo che inizia dall'impasto", type: "Primitivista" },
      { text: "Da infornare, con l'impasto pronto", type: "Simbiotista" },
    ],
  },
  {
    question: "Proveresti cibi alternativi (insetti, alghe, carne coltivata)?",
    options: [
      { text: "Se ha senso, sì", type: "Dataista" },
      { text: "Preferisco non cambiare le mie abitudini", type: "Primitivista" },
      { text: "Sono curioso e aperto a nuovi sapori", type: "Simbiotista" },
    ],
  },
  {
    question: "Nel tempo libero preferisci...",
    options: [
      { text: "Giocare al pc e stare su internet", type: "Dataista" },
      { text: "Andare a pesca o in campeggio", type: "Primitivista" },
      { text: "Uscire con gli amici e socializzare", type: "Simbiotista" },
    ],
  },
  {
    question: "Come organizzi le tue vacanze?",
    options: [
      { text: "Mi affido ai tour operator o chiedo alla AI", type: "Dataista" },
      { text: "Mi lascio guidare dall'istinto ed esploro liberamente", type: "Primitivista" },
      { text: "Faccio una ricerca dettagliata prima di partire", type: "Simbiotista" },
    ],
  },
  {
    question: "Come immagini la città del futuro?",
    options: [
      { text: "Automatizzata e personalizzata per ogni individuo", type: "Dataista" },
      { text: "Simile a quella attuale, con piccoli cambiamenti", type: "Primitivista" },
      { text: "Sostenibile e connessa", type: "Simbiotista" },
    ],
  },
]

const POST_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec"; // Inserisci qui il tuo URL script pubblico

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState("")
  const [finished, setFinished] = useState(false)

  const handleAnswer = (type: string) => {
    setAnswers(prev => [...prev, type])
    const nextStep = step + 1
    if (nextStep < questions.length) {
      setStep(nextStep)
    } else {
      const result = calculateResult([...answers, type])
      setResult(result)
      setFinished(true)
    }
  }

  const calculateResult = (allAnswers: string[]) => {
    const tally: { [key: string]: number } = {}
    allAnswers.forEach(a => {
      tally[a] = (tally[a] || 0) + 1
    })
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1])
    return sorted[0][0]
  }

  useEffect(() => {
    if (finished && result) {
      fetch(POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          answers: answers.join(", "),
          result,
        }),
      })
    }
  }, [finished, result])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-orange-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8 text-center">
        {!finished ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">{questions[step].question}</h2>
            <div className="space-y-4">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.type)}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 font-medium py-3 px-4 rounded-xl transition"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4">🎟 Biglietto valido per il mondo {result}</h2>
            <p className="text-lg">Scopri come potresti vivere in equilibrio tra tecnologia, natura e comunità.</p>
          </div>
        )}
      </div>
    </div>
  )
}
