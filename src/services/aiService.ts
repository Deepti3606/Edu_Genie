import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'demo-key';
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'demo-key';

export interface LessonPlanRequest {
  subject: string;
  grade: string;
  topic: string;
  duration: string;
}

export const generateLessonPlan = async (request: LessonPlanRequest) => {
  try {
    if (OPENAI_API_KEY === 'demo-key') {
      // Return enhanced mock data with jokes, quotes, and facts
      return {
        learningObjectives: [
          `Understand the fundamental concepts of ${request.topic}`,
          `Apply ${request.topic} principles to real-world scenarios`,
          `Analyze and evaluate different aspects of ${request.topic}`,
          `Create connections between ${request.topic} and other subjects`,
          `Demonstrate mastery through practical applications`
        ],
        lessonStructure: [
          {
            section: 'Introduction & Warm-up',
            duration: '10 minutes',
            activities: [
              'Quick review of previous lesson',
              `Introduce ${request.topic} with an engaging question`,
              'Share learning objectives with students',
              'Fun fact sharing session'
            ]
          },
          {
            section: 'Main Content Delivery',
            duration: '25 minutes',
            activities: [
              `Explain core concepts of ${request.topic}`,
              'Interactive demonstrations',
              'Student participation activities',
              'Real-world examples and applications'
            ]
          },
          {
            section: 'Practice & Application',
            duration: '15 minutes',
            activities: [
              'Guided practice exercises',
              'Group work and discussions',
              'Problem-solving activities',
              'Peer teaching moments'
            ]
          },
          {
            section: 'Wrap-up & Assessment',
            duration: '10 minutes',
            activities: [
              'Summary of key points',
              'Quick assessment quiz',
              'Homework assignment',
              'Preview of next lesson'
            ]
          }
        ],
        activities: [
          {
            name: `${request.topic} Exploration`,
            description: `Interactive activity to explore ${request.topic} concepts`,
            materials: ['Whiteboard', 'Markers', 'Handouts', 'Digital tools'],
            duration: '15 minutes'
          },
          {
            name: 'Group Discussion',
            description: `Collaborative discussion about ${request.topic} applications`,
            materials: ['Discussion prompts', 'Note-taking sheets'],
            duration: '10 minutes'
          }
        ],
        homework: [
          `Complete practice exercises on ${request.topic}`,
          `Research one real-world application of ${request.topic}`,
          `Prepare questions for next class discussion`,
          `Review notes and create a summary`
        ],
        amazingFacts: [
          `Did you know that ${request.topic} is used in many everyday applications?`,
          `Scientists have been studying ${request.topic} for over 100 years!`,
          `The principles of ${request.topic} can be found in nature everywhere`,
          `Modern technology heavily relies on understanding ${request.topic}`,
          `${request.topic} connects to many other subjects like math, science, and art`
        ],
        jokes: [
          `Why did the student love learning about ${request.topic}? Because it was absolutely fascinating!`,
          `What did the teacher say about ${request.topic}? "It's not just a subject, it's an adventure!"`,
          `How do you make ${request.topic} more interesting? Add some fun facts and jokes!`
        ],
        quotes: [
          `"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela`,
          `"The beautiful thing about learning is that no one can take it away from you." - B.B. King`,
          `"Learning never exhausts the mind." - Leonardo da Vinci`,
          `"Education is not preparation for life; education is life itself." - John Dewey`
        ],
        notes: `
# ${request.topic} - Complete Study Notes

## Introduction
${request.topic} is a fascinating subject that connects to many aspects of our daily lives. Understanding these concepts will help you see the world in a new way!

## Key Concepts
- Fundamental principles of ${request.topic}
- Real-world applications and examples
- Historical development and importance
- Modern innovations and discoveries

## Important Points to Remember
1. ${request.topic} is everywhere around us
2. It connects to other subjects like mathematics and science
3. Understanding it helps in problem-solving
4. It has practical applications in technology

## Fun Facts 🌟
- ${request.topic} has been studied for centuries
- Many famous scientists contributed to our understanding
- It's used in cutting-edge technology today
- You can see examples in nature and everyday life

## Study Tips
- Practice regularly with examples
- Connect concepts to real-world situations
- Ask questions when you don't understand
- Work with classmates to discuss ideas

## Remember This Quote
"${request.topic} is not just about memorizing facts, it's about understanding how the world works!"
        `
      };
    }

    const prompt = `Create comprehensive study notes for ${request.grade} students on "${request.topic}" in ${request.subject}.

    Include:
    1. Learning objectives (5 specific, measurable goals)
    2. Detailed lesson structure with time allocations
    3. Interactive activities suitable for the grade level
    4. 5 amazing facts about ${request.topic} that will wow students
    5. 3 educational jokes related to ${request.topic}
    6. 3 inspiring quotes about learning or ${request.topic}
    7. Complete study notes with key concepts, examples, and explanations
    8. Homework assignments
    9. Real-world applications and examples
    10. Study tips and memory aids

    Make it engaging, age-appropriate, and educational. Format as detailed JSON.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educator creating engaging, comprehensive study materials.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw new Error('Failed to generate lesson plan');
  }
};

export const searchYouTubeVideos = async (topic: string, grade: string) => {
  try {
    if (YOUTUBE_API_KEY === 'demo-key') {
      // Return mock YouTube videos
      return [
        {
          id: 'dQw4w9WgXcQ',
          title: `${topic} Explained for ${grade} Students`,
          description: `Learn about ${topic} in this engaging educational video designed for ${grade} level students.`,
          thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
          url: `https://www.youtube.com/embed/dQw4w9WgXcQ`,
          channelTitle: 'EduChannel',
          duration: '10:30'
        },
        {
          id: 'ScMzIvxBSi4',
          title: `${topic} - Fun Learning Video`,
          description: `Discover the amazing world of ${topic} with fun animations and clear explanations.`,
          thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
          url: `https://www.youtube.com/embed/ScMzIvxBSi4`,
          channelTitle: 'Learning Made Easy',
          duration: '8:45'
        },
        {
          id: 'oHg5SJYRHA0',
          title: `${topic} Experiments and Examples`,
          description: `See ${topic} in action with real experiments and practical examples.`,
          thumbnail: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=400',
          url: `https://www.youtube.com/embed/oHg5SJYRHA0`,
          channelTitle: 'Science Explorer',
          duration: '12:15'
        }
      ];
    }

    const searchQuery = `${topic} ${grade} educational video for students`;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      url: `https://www.youtube.com/embed/${item.id.videoId}`,
      channelTitle: item.snippet.channelTitle
    }));
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return [];
  }
};

export const generateQuiz = async (topic: string, grade: string) => {
  try {
    if (OPENAI_API_KEY === 'demo-key') {
      // Return enhanced mock quiz with exactly 10 MCQs
      return {
        multipleChoice: [
          {
            question: `What is the main concept behind ${topic}?`,
            options: [
              'A fundamental principle in science',
              'A mathematical equation',
              'A historical event',
              'A literary technique'
            ],
            correctAnswer: 'A fundamental principle in science',
            explanation: `${topic} is indeed a fundamental principle that helps us understand how things work.`
          },
          {
            question: `Which of the following is an example of ${topic} in everyday life?`,
            options: [
              'Cooking food',
              'Riding a bicycle',
              'Reading a book',
              'All of the above'
            ],
            correctAnswer: 'All of the above',
            explanation: `${topic} can be observed in many daily activities.`
          },
          {
            question: `Who is considered a pioneer in the study of ${topic}?`,
            options: [
              'Albert Einstein',
              'Isaac Newton',
              'Marie Curie',
              'Many scientists contributed'
            ],
            correctAnswer: 'Many scientists contributed',
            explanation: `The understanding of ${topic} developed through the work of many brilliant minds.`
          },
          {
            question: `What makes ${topic} important for ${grade} students to learn?`,
            options: [
              'It helps in understanding the world',
              'It connects to other subjects',
              'It develops critical thinking',
              'All of the above'
            ],
            correctAnswer: 'All of the above',
            explanation: `Learning ${topic} provides multiple benefits for students.`
          },
          {
            question: `Which field of study is most closely related to ${topic}?`,
            options: [
              'Science',
              'Mathematics',
              'Technology',
              'All fields are connected'
            ],
            correctAnswer: 'All fields are connected',
            explanation: `${topic} demonstrates how different subjects interconnect.`
          },
          {
            question: `What is the best way to remember concepts about ${topic}?`,
            options: [
              'Memorize definitions only',
              'Practice with examples',
              'Ignore the details',
              'Study once before exam'
            ],
            correctAnswer: 'Practice with examples',
            explanation: 'Active practice with real examples helps in better understanding and retention.'
          },
          {
            question: `How does ${topic} relate to modern technology?`,
            options: [
              'It has no connection',
              'It forms the foundation',
              'It is outdated',
              'It is only theoretical'
            ],
            correctAnswer: 'It forms the foundation',
            explanation: `Understanding ${topic} is crucial for technological advancement.`
          },
          {
            question: `What should you do if you don't understand a concept in ${topic}?`,
            options: [
              'Skip it and move on',
              'Ask questions and seek help',
              'Memorize without understanding',
              'Give up studying'
            ],
            correctAnswer: 'Ask questions and seek help',
            explanation: 'Asking questions is the best way to clear doubts and deepen understanding.'
          },
          {
            question: `Which of these is a good study strategy for ${topic}?`,
            options: [
              'Study alone always',
              'Never take notes',
              'Discuss with classmates',
              'Avoid practical examples'
            ],
            correctAnswer: 'Discuss with classmates',
            explanation: 'Collaborative learning helps in better understanding of complex concepts.'
          },
          {
            question: `What makes learning ${topic} fun and interesting?`,
            options: [
              'Connecting it to real life',
              'Finding patterns and relationships',
              'Discovering amazing facts',
              'All of the above'
            ],
            correctAnswer: 'All of the above',
            explanation: `${topic} becomes exciting when we see its connections and applications everywhere!`
          }
        ],
        totalQuestions: 10,
        passingScore: 7,
        timeLimit: 30
      };
    }

    const prompt = `Create exactly 10 multiple choice questions about "${topic}" for ${grade} students.

    Requirements:
    - Exactly 10 MCQs, no more, no less
    - Each question has 4 options (A, B, C, D)
    - Questions should be age-appropriate for ${grade}
    - Include a mix of difficulty levels
    - Each correct answer = 1 mark, wrong answer = 0 marks
    - Add explanations for correct answers
    - Make questions engaging and educational
    - Cover different aspects of the topic

    Format as JSON with array of questions, each having: question, options, correctAnswer, explanation`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educator creating engaging quizzes for students.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz');
  }
};

export const searchDoubt = async (question: string) => {
  try {
    if (OPENAI_API_KEY === 'demo-key') {
      return {
        answer: `Great question! Here's a comprehensive answer to help you understand: ${question}. 

This is a common doubt that many students have. Let me break it down for you:

1. **Main Concept**: The key idea here is understanding the fundamental principles involved.

2. **Simple Explanation**: Think of it like this - imagine you're trying to understand how something works in everyday life.

3. **Example**: For instance, if you're asking about a science concept, try to relate it to something you see around you.

4. **Study Tip**: The best way to remember this is through practice and connecting it to real-world examples.

5. **Additional Resources**: You can also watch educational videos or discuss with your classmates to get different perspectives.

Remember, there's no such thing as a silly question - asking doubts is how we learn and grow! Keep questioning and exploring.`,
        relatedTopics: [
          'Fundamental concepts',
          'Real-world applications',
          'Study techniques',
          'Practice exercises'
        ],
        studyTips: [
          'Practice regularly with examples',
          'Connect concepts to daily life',
          'Discuss with peers and teachers',
          'Use visual aids and diagrams'
        ]
      };
    }

    const prompt = `Answer this student's doubt clearly and comprehensively: "${question}"

    Provide:
    1. A clear, easy-to-understand explanation
    2. Real-world examples if applicable
    3. Study tips to remember the concept
    4. Related topics they might want to explore
    5. Encouragement to keep learning

    Make it engaging and educational for students.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful tutor who explains concepts clearly to students of all levels.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    
    return {
      answer: aiResponse,
      relatedTopics: ['Study techniques', 'Practice exercises', 'Real-world applications'],
      studyTips: [
        'Practice regularly',
        'Ask questions when in doubt',
        'Connect to real-world examples',
        'Discuss with peers'
      ]
    };
  } catch (error) {
    console.error('Error searching doubt:', error);
    throw new Error('Failed to get answer');
  }
};