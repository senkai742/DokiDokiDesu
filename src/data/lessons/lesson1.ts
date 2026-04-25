import { Lesson } from '../../types/lesson';

export const lesson1: Lesson = {
  id: 1,
  title: 'Greetings & Basic Introductions',
  description: 'Learn how to introduce yourself and greet others in Japanese.',
  vocab: [
    {
      id: 'v1_1',
      kanji: '私',
      kana: 'わたし',
      romaji: 'watashi',
      english: 'I, me',
      partOfSpeech: 'Pronoun',
      exampleSentence: '私は学生です。',
      exampleEnglish: 'I am a student.',
    },
    {
      id: 'v1_2',
      kanji: 'あなた',
      kana: 'あなた',
      romaji: 'anata',
      english: 'you',
      partOfSpeech: 'Pronoun',
    },
    {
      id: 'v1_3',
      kanji: '日本人',
      kana: 'にほんじん',
      romaji: 'nihonjin',
      english: 'Japanese person',
      partOfSpeech: 'Noun',
    },
    {
      id: 'v1_4',
      kanji: '先生',
      kana: 'せんせい',
      romaji: 'sensei',
      english: 'teacher',
      partOfSpeech: 'Noun',
    },
    {
      id: 'v1_5',
      kanji: '学生',
      kana: 'がくせい',
      romaji: 'gakusei',
      english: 'student',
      partOfSpeech: 'Noun',
    },
  ],
  grammar: [
    {
      id: 'g1_1',
      title: 'Noun は Noun です',
      explanation: 'The particle は (wa) indicates the topic of the sentence, and です (desu) is a polite form of "to be".',
      examples: [
        {
          japanese: '私は学生です。',
          english: 'I am a student.',
          romaji: 'Watashi wa gakusei desu.',
        },
        {
          japanese: '田中さんは先生です。',
          english: 'Mr. Tanaka is a teacher.',
          romaji: 'Tanaka-san wa sensei desu.',
        },
      ],
    },
  ],
  kanji: [
    {
      id: 'k1_1',
      character: '私',
      onYomi: 'シ',
      kunYomi: 'わたし, わたくし',
      meaning: 'I, me, private',
      strokeCount: 7,
      examples: [
        { word: '私立', reading: 'しりつ', meaning: 'private' },
        { word: '私', reading: 'わたし', meaning: 'I' },
      ],
    },
  ],
  quiz: [
    {
      id: 'q1_1',
      question: 'How do you say "I" in Japanese politely?',
      options: ['Anata', 'Watashi', 'Sensei', 'Gakusei'],
      correctAnswer: 'Watashi',
      type: 'multiple-choice',
    },
    {
      id: 'q1_2',
      question: 'Translate: "I am a student."',
      options: [
        'Watashi wa sensei desu.',
        'Watashi wa gakusei desu.',
        'Anata wa gakusei desu.',
        'Sensei wa watashi desu.',
      ],
      correctAnswer: 'Watashi wa gakusei desu.',
      type: 'multiple-choice',
    },
  ],
};
