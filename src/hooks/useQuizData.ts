import { useState, useEffect } from "react";
import type { Question } from "../types";
import { mockQuestions } from "../data/mockQuestions";

export const useQuizData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // плейсхолдер
    setQuestions(mockQuestions);
  }, []);

  return { questions };
};
