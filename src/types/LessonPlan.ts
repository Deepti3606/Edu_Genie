export interface LessonPlan {
  id: string;
  topic: string;
  subject: string;
  grade: string;
  duration: string;
  learningObjectives: string[];
  lessonStructure: LessonSection[];
  activities: Activity[];
  assessmentQuestions: AssessmentQuestion[];
  resources: Resource[];
  homework: string[];
  createdAt: Date;
}

export interface LessonSection {
  section: string;
  duration: string;
  activities: string[];
}

export interface Activity {
  name: string;
  description: string;
  materials: string[];
  duration: string;
}

export interface AssessmentQuestion {
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'fill-in-blank';
  question: string;
  options?: string[];
  correctAnswer?: string;
  sampleAnswer?: string;
  rubric?: string;
}

export interface Resource {
  type: 'video' | 'article' | 'website' | 'book';
  title: string;
  url: string;
  duration?: string;
  description?: string;
}