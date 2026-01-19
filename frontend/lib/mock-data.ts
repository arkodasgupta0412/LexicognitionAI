export interface Evidence {
  page: string
  source: string
  content: string
}

export interface GradeResult {
  grade: "PASS" | "REVIEW" | "FAIL"
  feedback: string
  perfectAnswer: string
  evidence: Evidence[]
}

export const mockQuestions = [
  "Based on the document, what are the main objectives discussed in the introduction? Please provide specific details.",
  "Can you explain the methodology described in the document? What approach was used and why?",
  "What are the key findings or results presented? Summarize the most important points.",
  "How does the document address potential limitations or challenges? What solutions are proposed?",
  "What conclusions are drawn at the end of the document? How do they relate to the initial objectives?",
  "Analyze the visual elements (figures, charts, diagrams) in the document. How do they support the main arguments presented?",
]

const passEvidence: Evidence[] = [
  {
    page: "3",
    source: "Introduction Section",
    content: "The primary objective is to establish a comprehensive framework for intelligent assessment systems.",
  },
  {
    page: "5",
    source: "Methodology Chapter",
    content: "A multi-phase approach was implemented, combining quantitative analysis with qualitative feedback.",
  },
  {
    page: "12",
    source: "Results Section",
    content: "Statistical analysis revealed a 94% accuracy rate in automated grading compared to human evaluators.",
  },
  {
    page: "18",
    source: "Visual Analysis Chapter",
    content: "All figures and charts accurately represent the data collected and support the conclusions drawn.",
  },
]

const reviewEvidence: Evidence[] = [
  {
    page: "7",
    source: "Analysis Section",
    content: "The document mentions several factors that could influence the outcome of the assessment process.",
  },
  {
    page: "9",
    source: "Discussion Chapter",
    content: "Further research is recommended to validate the findings across different demographic groups.",
  },
  {
    page: "19",
    source: "Visual Analysis Chapter",
    content: "Some visual elements are unclear or could be better explained in the text.",
  },
]

const failEvidence: Evidence[] = [
  {
    page: "4",
    source: "Background Section",
    content: "Historical context provides important foundation for understanding current approaches.",
  },
  {
    page: "8",
    source: "Data Analysis",
    content: "The dataset included over 10,000 samples collected across multiple institutions.",
  },
  {
    page: "15",
    source: "Appendix A",
    content: "Detailed breakdown of evaluation metrics used throughout the study.",
  },
  {
    page: "20",
    source: "Visual Analysis Chapter",
    content: "No visual elements are mentioned or analyzed in the response.",
  },
]

export function generateMockGrade(questionIndex: number): GradeResult {
  // Cycle through different grades for demo purposes
  const gradeTypes: Array<"PASS" | "REVIEW" | "FAIL"> = ["PASS", "REVIEW", "FAIL"]
  const grade = gradeTypes[questionIndex % 3]

  const feedbackMap = {
    PASS: "Excellent answer! You've demonstrated a strong understanding of the key concepts. Your response accurately reflects the information presented in the document with proper context and analysis.",
    REVIEW:
      "Your answer shows partial understanding but could be more comprehensive. Consider reviewing the specific sections mentioned in the evidence below to strengthen your knowledge.",
    FAIL: "Your answer doesn't adequately address the question. The key concepts seem to be misunderstood or missing. Please review the evidence cards and try to incorporate the main points in your response.",
  }

  const perfectAnswerMap = {
    PASS: "The document outlines three main objectives: (1) establishing a comprehensive framework for AI-powered assessment, (2) validating the accuracy of automated grading systems, and (3) demonstrating practical applications in educational settings. These objectives are supported by extensive research methodology detailed in chapters 2-4.",
    REVIEW:
      "The methodology chapter describes a multi-phase research approach that combines quantitative data analysis with qualitative feedback from educators. This hybrid method was chosen to ensure both statistical validity and practical applicability in real-world educational environments.",
    FAIL: "The document presents key findings including a 94% accuracy rate in automated grading, significant time savings for educators, and positive feedback from student participants. These results demonstrate the viability of AI-powered assessment as a complement to traditional evaluation methods.",
  }

  const evidenceMap = {
    PASS: passEvidence,
    REVIEW: reviewEvidence,
    FAIL: failEvidence,
  }

  return {
    grade,
    feedback: feedbackMap[grade],
    perfectAnswer: perfectAnswerMap[grade],
    evidence: evidenceMap[grade],
  }
}
