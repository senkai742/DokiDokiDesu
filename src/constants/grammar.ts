import { GrammarExample } from '../types/lesson';

export const LESSON_1_GRAMMAR: GrammarExample[] = [
  {
    id: 'rule1',
    type: 'toggle',
    formula: '[ N1 ] + [ は ] + [ N2 ] + [ です / じゃありません ]',
    explanation: 'Noun 1 is (or is not) Noun 2. は indicates the topic. です is affirmative, じゃありません is negative.',
    examples: [
      {
        primary: '私はエンジニアです。',
        secondary: '私はエンジニアじゃありません。',
        englishPrimary: 'I am an engineer.',
        englishSecondary: 'I am not an engineer.',
        romajiPrimary: 'Watashi wa enjinia desu.',
        romajiSecondary: 'Watashi wa enjinia ja arimasen.',
        tokens: [
          { text: '私', type: 'noun', note: 'I' },
          { text: 'は', type: 'particle', note: 'Topic marker. Read as "wa".' },
          { text: 'エンジニア', type: 'noun' },
          { text: 'です', type: 'predicate', note: 'Polite affirmative assertion.' },
        ],
        tokensSecondary: [
          { text: '私', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'エンジニア', type: 'noun' },
          { text: 'じゃありません', type: 'predicate', note: 'Polite negative assertion.' },
        ]
      }
    ]
  },
  {
    id: 'rule2',
    type: 'static',
    formula: '[ S ] + [ か ]',
    explanation: 'Particle か is used to form a question. It is added to the end of a sentence with rising intonation.',
    examples: [
      {
        primary: 'ミラーさんはアメリカ人ですか。',
        englishPrimary: 'Is Mr. Miller American?',
        romajiPrimary: 'Mira-san wa Americajin desu ka.',
        tokens: [
          { text: 'ミラーさん', type: 'noun', note: 'Mr. Miller' },
          { text: 'は', type: 'particle' },
          { text: 'アメリカ人', type: 'noun' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle', note: 'Question marker. Rising intonation.' },
        ]
      }
    ]
  },
  {
    id: 'rule3',
    type: 'static',
    formula: '[ N ] + [ も ]',
    explanation: 'Particle も is used instead of は when the statement about the topic is the same as the previous one.',
    examples: [
      {
        primary: 'グプタさんも会社員です。',
        englishPrimary: 'Mr. Gupta is also a company employee.',
        romajiPrimary: 'Guputa-san mo kaishain desu.',
        tokens: [
          { text: 'グプタさん', type: 'noun' },
          { text: 'も', type: 'particle', note: 'Means "also" or "too". Replaces "wa".' },
          { text: '会社員', type: 'noun' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'rule4',
    type: 'static',
    formula: '[ N1 ] + [ の ] + [ N2 ]',
    explanation: 'Particle の connects two nouns. N1 modifies N2. In this lesson, N1 represents an organization N2 belongs to.',
    examples: [
      {
        primary: 'ミラーさんはIMCの社員です。',
        englishPrimary: 'Mr. Miller is an IMC employee.',
        romajiPrimary: 'Mira-san wa IMC no shain desu.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'IMC', type: 'noun', note: 'N1 (The organization)' },
          { text: 'の', type: 'particle', note: 'Possessive/Modifying particle.' },
          { text: '社員', type: 'noun', note: 'N2 (The member)' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'rule5',
    type: 'static',
    formula: '[ Name ] + [ さん ]',
    explanation: 'さん is a suffix of respect added to the listener’s or a third person’s name. Never use it with your own name.',
    examples: [
      {
        primary: 'あの方はミラーさんです。',
        englishPrimary: 'That person is Mr. Miller.',
        romajiPrimary: 'Anokata wa Mira-san desu.',
        tokens: [
          { text: 'あの方', type: 'noun', note: 'That person (Polite)' },
          { text: 'は', type: 'particle' },
          { text: 'ミラー', type: 'noun' },
          { text: 'さん', type: 'particle', note: 'Respectful suffix. Like Mr./Ms.' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_2_GRAMMAR: GrammarExample[] = [
  {
    id: 'l2-rule1',
    type: 'static',
    formula: '[ これ / それ / あれ ] + [ は ] + [ N ] + [ です ]',
    explanation: 'Demonstratives as nouns. これ (near speaker), それ (near listener), あれ (far from both).',
    examples: [
      {
        primary: 'それは辞書ですか。',
        englishPrimary: 'Is that a dictionary?',
        romajiPrimary: 'Sore wa jisho desu ka.',
        tokens: [
          { text: 'それ', type: 'noun', note: 'That (near listener)' },
          { text: 'は', type: 'particle' },
          { text: '辞書', type: 'noun', note: 'Dictionary' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l2-rule2',
    type: 'static',
    formula: '[ この / その / あの ] + [ N ] + [ は ] ...',
    explanation: 'Demonstratives modifying nouns. Must be followed by a noun.',
    examples: [
      {
        primary: 'この本はわたしのです。',
        englishPrimary: 'This book is mine.',
        romajiPrimary: 'Kono hon wa watashi no desu.',
        tokens: [
          { text: 'この', type: 'particle', note: 'This (modifies N)' },
          { text: '本', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'わたし', type: 'noun' },
          { text: 'の', type: 'particle', note: 'Possessive marker' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l2-rule3',
    type: 'toggle',
    formula: 'はい、[ そうです ] / いいえ、[ そうじゃありません ]',
    explanation: 'Using そう to answer affirmative or negative questions about nouns.',
    examples: [
      {
        primary: 'はい、そうです。',
        secondary: 'いいえ、そうじゃありません。',
        englishPrimary: 'Yes, it is.',
        englishSecondary: 'No, it isn\'t.',
        romajiPrimary: 'Hai, sou desu.',
        romajiSecondary: 'Iie, sou ja arimasen.',
        tokens: [
          { text: 'はい', type: 'text' },
          { text: '、', type: 'text' },
          { text: 'そう', type: 'noun', note: 'So/That way (refers to previous statement)' },
          { text: 'です', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'いいえ', type: 'text' },
          { text: '、', type: 'text' },
          { text: 'そう', type: 'noun', note: 'So/That way (refers to previous statement)' },
          { text: 'じゃありません', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l2-rule4',
    type: 'static',
    formula: '[ S1 ] + [ か ] 、 [ S2 ] + [ か ]',
    explanation: 'Alternative question. Choose between two options. Do not use Hai/Iie in answer.',
    examples: [
      {
        primary: 'これは「９」ですか、「７」ですか。',
        englishPrimary: 'Is this a "9" or a "7"?',
        romajiPrimary: 'Kore wa kyuu desu ka, nana desu ka.',
        tokens: [
          { text: 'これ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '「９」', type: 'text' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
          { text: '、', type: 'text' },
          { text: '「７」', type: 'text' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l2-rule5',
    type: 'static',
    formula: '[ N1 ] + [ の ] + [ N2 ]',
    explanation: 'の can show content (what N2 is about) or ownership (who owns N2). N2 can be omitted if obvious.',
    examples: [
      {
        primary: 'あれはだれのかばんですか。',
        englishPrimary: 'Whose bag is that?',
        romajiPrimary: 'Are wa dare no kaban desu ka.',
        tokens: [
          { text: 'あれ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'だれ', type: 'noun', note: 'Who' },
          { text: 'の', type: 'particle' },
          { text: 'かばん', type: 'noun', note: 'Bag' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l2-rule6',
    type: 'static',
    formula: 'そうですか',
    explanation: 'Used when receiving new information to show understanding.',
    examples: [
      {
        primary: 'そうですか。',
        englishPrimary: 'I see.',
        romajiPrimary: 'Sou desu ka.',
        tokens: [
          { text: 'そう', type: 'noun', note: 'So/That way (I see/Is that so?)' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  }
];

export const LESSON_3_GRAMMAR: GrammarExample[] = [
  {
    id: 'l3-rule1',
    type: 'static',
    formula: '[ ここ / そこ / あそこ ] | [ こちら / そちら / あちら ]',
    explanation: 'Demonstratives for place and direction. Kochira/Sochira/Achira are politer equivalents.',
    examples: [
      {
        primary: 'お手洗いはあそこです。',
        englishPrimary: 'The rest room is there.',
        romajiPrimary: 'Otearai wa asoko desu.',
        tokens: [
          { text: 'お手洗い', type: 'noun', note: 'Rest room' },
          { text: 'は', type: 'particle' },
          { text: 'あそこ', type: 'noun', note: 'There (far away)' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l3-rule2',
    type: 'static',
    formula: '[ Place / Thing / Person ] + [ は ] + [ Place ] + [ です ]',
    explanation: 'Explain where a place, thing, or person is located.',
    examples: [
      {
        primary: '電話は２階です。',
        englishPrimary: 'The telephone is on the second floor.',
        romajiPrimary: 'Denwa wa ni-kai desu.',
        tokens: [
          { text: '電話', type: 'noun', note: 'Telephone' },
          { text: 'は', type: 'particle' },
          { text: '２階', type: 'noun', note: '2nd Floor' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l3-rule3',
    type: 'static',
    formula: '[ どこ / どちら ] + [ ですか ]',
    explanation: 'Asking "where" or "which direction". Also used to ask for names of organizations.',
    examples: [
      {
        primary: '会社はどちらですか。',
        englishPrimary: 'What company do you work for? (lit. Where is your company?)',
        romajiPrimary: 'Kaisha wa dochira desu ka.',
        tokens: [
          { text: '会社', type: 'noun', note: 'Company' },
          { text: 'は', type: 'particle' },
          { text: 'どちら', type: 'noun', note: 'Where/Which direction (Polite)' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l3-rule4',
    type: 'static',
    formula: '[ Country / Company ] + [ の ] + [ Product ]',
    explanation: 'Using の to show origin (made in) or maker (made by).',
    examples: [
      {
        primary: 'これは日本のコンピューターです。',
        englishPrimary: 'This is a Japanese computer.',
        romajiPrimary: 'Kore wa Nihon no konpyu-ta- desu.',
        tokens: [
          { text: 'これ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '日本', type: 'noun', note: 'Japan' },
          { text: 'の', type: 'particle' },
          { text: 'コンピューター', type: 'noun' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l3-rule5',
    type: 'table',
    formula: 'こ / そ / あ / ど System',
    explanation: 'The system of demonstrative words categorized by series.',
    examples: [],
    table: {
      headers: ['', 'こ series', 'そ series', 'あ series', 'ど series'],
      rows: [
        ['thing', 'これ', 'それ', 'あれ', 'どれ (L.8)'],
        ['thing/person', 'この', 'その', 'あの', 'どのN (L.16)'],
        ['place', 'ここ', 'そこ', 'あそこ', 'どこ'],
        ['direction/place', 'こちら', 'そちら', 'あちら', 'どちら'],
      ]
    }
  },
  {
    id: 'l3-rule6',
    type: 'static',
    formula: 'お + [ N ]',
    explanation: 'The prefix お is added to show respect to the listener or a third person.',
    examples: [
      {
        primary: '[お]国はどちらですか。',
        englishPrimary: 'Where are you from?',
        romajiPrimary: '[O]kuni wa dochira desu ka.',
        tokens: [
          { text: 'お', type: 'particle', note: 'Polite prefix' },
          { text: '国', type: 'noun', note: 'Country' },
          { text: 'は', type: 'particle' },
          { text: 'どちら', type: 'noun', note: 'Where (Polite)' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  }
];

export const LESSON_4_GRAMMAR: GrammarExample[] = [
  {
    id: 'l4-rule1',
    type: 'static',
    formula: '[ Ima ] + [ Num ] + [ ji ] + [ Num ] + [ pun / fun ] + [ desu ]',
    explanation: 'Expressing time using 時 (ji) for hours and 分 (pun/fun) for minutes.',
    examples: [
      {
        primary: '今何時ですか。',
        englishPrimary: 'What time is it now?',
        romajiPrimary: 'Ima nanji desu ka.',
        tokens: [
          { text: '今', type: 'noun', note: 'Now' },
          { text: '何時', type: 'noun', note: 'What time' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      },
      {
        primary: '７時１０分です。',
        englishPrimary: 'It is 7:10.',
        romajiPrimary: 'Shichi-ji juppun desu.',
        tokens: [
          { text: '７時', type: 'noun', note: '7 o\'clock' },
          { text: '１０分', type: 'noun', note: '10 minutes' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l4-rule2',
    type: 'static',
    formula: '[ V-masu ]',
    explanation: 'Verbs ending in ます work as predicates and make a sentence polite.',
    examples: [
      {
        primary: 'わたしは毎日勉強します。',
        englishPrimary: 'I study every day.',
        romajiPrimary: 'Watashi wa mainichi benkyou shimasu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '毎日', type: 'noun', note: 'Every day' },
          { text: '勉強します', type: 'predicate', note: 'To study (Polite)' },
        ]
      }
    ]
  },
  {
    id: 'l4-rule3',
    type: 'table',
    formula: 'Verb Tense Matrix',
    explanation: 'Verb conjugation for non-past and past tenses, affirmative and negative.',
    examples: [],
    table: {
      headers: ['', 'Non-past', 'Past'],
      rows: [
        ['Affirmative', '～ます (Study)', '～ました (Studied)'],
        ['Negative', '～ません (Not study)', '～ませんでした (Did not study)'],
      ]
    }
  },
  {
    id: 'l4-rule4',
    type: 'static',
    formula: '[ N (time) ] + [ に ] + [ V ]',
    explanation: 'The particle に marks the time when an action occurs. Used with specific numerals.',
    examples: [
      {
        primary: '６時半に起きます。',
        englishPrimary: 'I get up at six-thirty.',
        romajiPrimary: 'Roku-ji han ni okimasu.',
        tokens: [
          { text: '６時半', type: 'noun', note: '6:30' },
          { text: 'に', type: 'particle', note: 'Time marker' },
          { text: '起きます', type: 'predicate', note: 'To wake up' },
        ]
      }
    ]
  },
  {
    id: 'l4-rule5',
    type: 'static',
    formula: '[ N1 ] + [ から ] + [ N2 ] + [ まで ]',
    explanation: 'から indicates the starting time/place, and まで indicates the finishing time/place.',
    examples: [
      {
        primary: '９時から５時まで働きます。',
        englishPrimary: 'I work from nine to five.',
        romajiPrimary: 'Ku-ji kara go-ji made hatarakimasu.',
        tokens: [
          { text: '９時', type: 'noun' },
          { text: 'から', type: 'particle', note: 'From' },
          { text: '５時', type: 'noun' },
          { text: 'まで', type: 'particle', note: 'Until' },
          { text: '働きます', type: 'predicate', note: 'To work' },
        ]
      }
    ]
  },
  {
    id: 'l4-rule6',
    type: 'static',
    formula: '[ N1 ] + [ と ] + [ N2 ]',
    explanation: 'The particle と connects two nouns in a coordinated relation ("and").',
    examples: [
      {
        primary: '休みは土曜日と日曜日です。',
        englishPrimary: 'The holidays are Saturday and Sunday.',
        romajiPrimary: 'Yasumi wa doyoubi to nichiyoubi desu.',
        tokens: [
          { text: '休み', type: 'noun', note: 'Holiday/Rest' },
          { text: 'は', type: 'particle' },
          { text: '土曜日', type: 'noun', note: 'Saturday' },
          { text: 'と', type: 'particle', note: 'And' },
          { text: '日曜日', type: 'noun', note: 'Sunday' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l4-rule7',
    type: 'static',
    formula: '[ S ] + [ ね ]',
    explanation: 'Particle ね is added to the end of a sentence to show sympathy or ask for confirmation ("right?").',
    examples: [
      {
        primary: '大変ですね。',
        englishPrimary: 'That must be hard.',
        romajiPrimary: 'Taihen desu ne.',
        tokens: [
          { text: '大変', type: 'noun', note: 'Hard/Difficult' },
          { text: 'です', type: 'predicate' },
          { text: 'ね', type: 'particle', note: 'Sympathy/Confirmation' },
        ]
      }
    ]
  }
];

export const LESSON_5_GRAMMAR: GrammarExample[] = [
  {
    id: 'l5-rule1',
    type: 'static',
    formula: '[ N (place) ] + [ へ ] + [ V (move) ]',
    explanation: 'The particle へ (pronounced "e") indicates the direction of movement.',
    examples: [
      {
        primary: '京都へ行きます。',
        englishPrimary: 'I will go to Kyoto.',
        romajiPrimary: 'Kyoto e ikimasu.',
        tokens: [
          { text: '京都', type: 'noun', note: 'Kyoto' },
          { text: 'へ', type: 'particle', note: 'Direction marker. Read as "e".' },
          { text: '行きます', type: 'predicate', note: 'To go' },
        ]
      }
    ]
  },
  {
    id: 'l5-rule2',
    type: 'static',
    formula: '[ どこ / 何 / だれ ] + [ も ] + [ V (negative) ]',
    explanation: 'Total negation. Using も with an interrogative and a negative verb denies everything.',
    examples: [
      {
        primary: 'どこへも行きません。',
        englishPrimary: 'I don\'t go anywhere.',
        romajiPrimary: 'Doko e mo ikimasen.',
        tokens: [
          { text: 'どこ', type: 'noun', note: 'Where' },
          { text: 'へ', type: 'particle' },
          { text: 'も', type: 'particle', note: 'Total negation marker' },
          { text: '行きません', type: 'predicate', note: 'Do not go' },
        ]
      }
    ]
  },
  {
    id: 'l5-rule3',
    type: 'static',
    formula: '[ N (vehicle) ] + [ で ] + [ V (move) ]',
    explanation: 'The particle で indicates the means or method of transportation.',
    examples: [
      {
        primary: '電車で行きます。',
        englishPrimary: 'I\'ll go by train.',
        romajiPrimary: 'Densha de ikimasu.',
        tokens: [
          { text: '電車', type: 'noun', note: 'Train' },
          { text: 'で', type: 'particle', note: 'Means marker' },
          { text: '行きます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l5-rule4',
    type: 'static',
    formula: '[ N (person) ] + [ と ] + [ V ]',
    explanation: 'The particle と marks the person (or animal) you do something with.',
    examples: [
      {
        primary: '家族と日本へ来ました。',
        englishPrimary: 'I came to Japan with my family.',
        romajiPrimary: 'Kazoku to Nihon e kimashita.',
        tokens: [
          { text: '家族', type: 'noun', note: 'Family' },
          { text: 'と', type: 'particle', note: 'Companion marker (with)' },
          { text: '日本', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '来ました', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l5-rule5',
    type: 'static',
    formula: '[ いつ ] + [ V ]',
    explanation: 'いつ (when) asks about time. It does NOT take the particle に.',
    examples: [
      {
        primary: 'いつ日本へ来ましたか。',
        englishPrimary: 'When did you come to Japan?',
        romajiPrimary: 'Itsu Nihon e kimashita ka.',
        tokens: [
          { text: 'いつ', type: 'noun', note: 'When' },
          { text: '日本', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '来ました', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l5-rule6',
    type: 'static',
    formula: '[ S ] + [ よ ]',
    explanation: 'よ is used at the end of a sentence to emphasize new information or show an assertive view.',
    examples: [
      {
        primary: '次の普通ですよ。',
        englishPrimary: 'The next local train does.',
        romajiPrimary: 'Tsugi no futsuu desu yo.',
        tokens: [
          { text: '次', type: 'noun', note: 'Next' },
          { text: 'の', type: 'particle' },
          { text: '普通', type: 'noun', note: 'Local train' },
          { text: 'です', type: 'predicate' },
          { text: 'よ', type: 'particle', note: 'Assertive marker' },
        ]
      }
    ]
  }
];

export const LESSON_6_GRAMMAR: GrammarExample[] = [
  {
    id: 'l6-rule1',
    type: 'static',
    formula: '[ N ] + [ を ] + [ V (transitive) ]',
    explanation: 'The particle を indicates the direct object of a transitive verb.',
    examples: [
      {
        primary: 'ジュースを飲みます。',
        englishPrimary: 'I drink juice.',
        romajiPrimary: 'Ju-su o nomimasu.',
        tokens: [
          { text: 'ジュース', type: 'noun', note: 'Juice' },
          { text: 'を', type: 'particle', note: 'Object marker. Pronounced "o".' },
          { text: '飲みます', type: 'predicate', note: 'To drink' },
        ]
      }
    ]
  },
  {
    id: 'l6-rule2',
    type: 'static',
    formula: '[ N ] + [ を ] + [ します ]',
    explanation: 'します means that the action denoted by the noun is performed (sports, games, meetings, homework).',
    examples: [
      {
        primary: 'サッカーをします。',
        englishPrimary: 'Play football.',
        romajiPrimary: 'Sakka- o shimasu.',
        tokens: [
          { text: 'サッカー', type: 'noun', note: 'Soccer/Football' },
          { text: 'を', type: 'particle' },
          { text: 'します', type: 'predicate', note: 'To do/play' },
        ]
      }
    ]
  },
  {
    id: 'l6-rule3',
    type: 'static',
    formula: '[ 何を ] + [ しますか ]',
    explanation: 'A question to ask what someone does.',
    examples: [
      {
        primary: '月曜日何をしますか。',
        englishPrimary: 'What will you do on Monday?',
        romajiPrimary: 'Getsuyoubi nani o shimasu ka.',
        tokens: [
          { text: '月曜日', type: 'noun', note: 'Monday' },
          { text: '何を', type: 'noun', note: 'What (object)' },
          { text: 'します', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l6-rule4',
    type: 'static',
    formula: 'なん vs なに',
    explanation: 'なん is used before t/d/n rows and counters. なに is used in other cases.',
    examples: [
      {
        primary: 'それは何ですか。',
        englishPrimary: 'What is that?',
        romajiPrimary: 'Sore wa nan desu ka.',
        tokens: [
          { text: 'それ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '何', type: 'noun', note: 'Nan (before "d" sound)' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      },
      {
        primary: '何を買いますか。',
        englishPrimary: 'What will you buy?',
        romajiPrimary: 'Nani o kaimasu ka.',
        tokens: [
          { text: '何', type: 'noun', note: 'Nani (other cases)' },
          { text: 'を', type: 'particle' },
          { text: '買います', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l6-rule5',
    type: 'static',
    formula: '[ N (place) ] + [ で ] + [ V ]',
    explanation: 'The particle で indicates the place where an action occurs.',
    examples: [
      {
        primary: '駅で新聞を買います。',
        englishPrimary: 'I buy the newspaper at the station.',
        romajiPrimary: 'Eki de shinbun o kaimasu.',
        tokens: [
          { text: '駅', type: 'noun', note: 'Station' },
          { text: 'で', type: 'particle', note: 'Action place marker' },
          { text: '新聞', type: 'noun', note: 'Newspaper' },
          { text: 'を', type: 'particle' },
          { text: '買います', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l6-rule6',
    type: 'static',
    formula: '[ V-masen ] + [ か ]',
    explanation: 'A polite way to invite someone to do something.',
    examples: [
      {
        primary: 'いっしょに京都へ行きませんか。',
        englishPrimary: 'Won\'t you come to Kyoto with us?',
        romajiPrimary: 'Isshoni Kyoto e ikimasen ka.',
        tokens: [
          { text: 'いっしょに', type: 'text', note: 'Together' },
          { text: '京都', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '行きません', type: 'predicate', note: 'Won\'t go?' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l6-rule7',
    type: 'static',
    formula: '[ V-mashou ]',
    explanation: 'Used to positively invite or suggest doing something together ("Let\'s...").',
    examples: [
      {
        primary: 'ちょっと休みましょう。',
        englishPrimary: 'Let\'s have a break.',
        romajiPrimary: 'Chotto yasumimashou.',
        tokens: [
          { text: 'ちょっと', type: 'text', note: 'A little/bit' },
          { text: '休みましょう', type: 'predicate', note: 'Let\'s rest' },
        ]
      }
    ]
  }
];

export const LESSON_7_GRAMMAR: GrammarExample[] = [
  {
    id: 'l7-rule1',
    type: 'static',
    formula: '[ N (tool/means) ] + [ で ] + [ V ]',
    explanation: 'The particle で indicates a tool or means used for an action.',
    examples: [
      {
        primary: 'はしで食べます。',
        englishPrimary: 'I eat with chopsticks.',
        romajiPrimary: 'Hashi de tabemasu.',
        tokens: [
          { text: 'はし', type: 'noun', note: 'Chopsticks' },
          { text: 'で', type: 'particle', note: 'Tool marker' },
          { text: '食べます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l7-rule2',
    type: 'static',
    formula: '[ Word ] + [ は ] + [ Lang ] + [ で何ですか ]',
    explanation: 'Used to ask how to say a word or sentence in another language.',
    examples: [
      {
        primary: '「ありがとう」は英語で何ですか。',
        englishPrimary: 'What\'s "Arigatou" in English?',
        romajiPrimary: '"Arigatou" wa eigo de nan desu ka.',
        tokens: [
          { text: '「ありがとう」', type: 'text' },
          { text: 'は', type: 'particle' },
          { text: '英語', type: 'noun', note: 'English' },
          { text: 'で', type: 'particle', note: 'Means/Language marker' },
          { text: '何', type: 'noun' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l7-rule3',
    type: 'static',
    formula: '[ N (person) ] + [ に ] + [ あげます ]',
    explanation: 'Verbs like あげます (give), かします (lend), おしえます (teach) mark the recipient with に.',
    examples: [
      {
        primary: '木村さんに花をあげました。',
        englishPrimary: 'I gave flowers to Ms. Kimura.',
        romajiPrimary: 'Kimura-san ni hana o agemashita.',
        tokens: [
          { text: '木村さん', type: 'noun' },
          { text: 'に', type: 'particle', note: 'Recipient marker' },
          { text: '花', type: 'noun', note: 'Flower' },
          { text: 'を', type: 'particle' },
          { text: 'あげました', type: 'predicate', note: 'Gave (Polite)' },
        ]
      }
    ]
  },
  {
    id: 'l7-rule4',
    type: 'static',
    formula: '[ N (person) ] + [ に / から ] + [ もらいます ]',
    explanation: 'Verbs like もらいます (receive), かります (borrow) mark the source with に or から.',
    examples: [
      {
        primary: '山田さんに花をもらいました。',
        englishPrimary: 'I received flowers from Mr. Yamada.',
        romajiPrimary: 'Yamada-san ni hana o moraimashita.',
        tokens: [
          { text: '山田さん', type: 'noun' },
          { text: 'に', type: 'particle', note: 'Source marker (from)' },
          { text: '花', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: 'もらいました', type: 'predicate', note: 'Received' },
        ]
      }
    ]
  },
  {
    id: 'l7-rule5',
    type: 'toggle',
    formula: 'もう [ V-mashita ] か',
    explanation: 'もう means "already". Answers are "Hai, mou..." or "Iie, mada desu" (Not yet).',
    examples: [
      {
        primary: 'はい、もう送りました。',
        secondary: 'いいえ、まだです。',
        englishPrimary: 'Yes, I have already sent it.',
        englishSecondary: 'No, not yet.',
        romajiPrimary: 'Hai, mou okurimashita.',
        romajiSecondary: 'Iie, mada desu.',
        tokens: [
          { text: 'はい', type: 'text' },
          { text: '、', type: 'text' },
          { text: 'もう', type: 'text', note: 'Already' },
          { text: '送りました', type: 'predicate', note: 'Sent' },
        ],
        tokensSecondary: [
          { text: 'いいえ', type: 'text' },
          { text: '、', type: 'text' },
          { text: 'まだ', type: 'text', note: 'Not yet' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_8_GRAMMAR: GrammarExample[] = [
  {
    id: 'l8-rule1',
    type: 'toggle',
    formula: 'い-adj [ …い ] です | な-adj [ な ] です',
    explanation: 'Adjectives are divided into い-adjectives and な-adjectives. です is used for affirmative politeness.',
    examples: [
      {
        primary: '富士山は高いです。',
        secondary: 'ワット先生は親切です。',
        englishPrimary: 'Mount Fuji is high. (I-adj)',
        englishSecondary: 'Mr. Watt is kind. (Na-adj)',
        romajiPrimary: 'Fujisan wa takai desu.',
        romajiSecondary: 'Watto-sensei wa shinsetsu desu.',
        tokens: [
          { text: '富士山', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '高い', type: 'noun', note: 'Takai (High/Expensive)' },
          { text: 'です', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'ワット先生', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '親切', type: 'noun', note: 'Shinsetsu (Kind - Na-adj)' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l8-rule2',
    type: 'toggle',
    formula: 'い-adj [ …くない ] | な-adj [ じゃありません ]',
    explanation: 'Negative forms: I-adj replaces "i" with "kunai". Na-adj adds "ja arimasen".',
    examples: [
      {
        primary: 'この本はおもしろくないです。',
        secondary: 'あそこは静かじゃありません。',
        englishPrimary: 'This book is not interesting. (I-adj)',
        englishSecondary: 'It\'s not quiet there. (Na-adj)',
        romajiPrimary: 'Kono hon wa omoshirokunai desu.',
        romajiSecondary: 'Asoko wa shizuka ja arimasen.',
        tokens: [
          { text: 'この', type: 'particle' },
          { text: '本', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'おもしろくない', type: 'noun', note: 'Omoshirokunai (Not interesting)' },
          { text: 'です', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'あそこ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '静か', type: 'noun', note: 'Shizuka (Quiet)' },
          { text: 'じゃありません', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l8-rule3',
    type: 'static',
    formula: '[ N ] + [ は ] + [ どうですか ]',
    explanation: 'Used to ask for an impression or opinion about a thing, place, or person.',
    examples: [
      {
        primary: '日本の生活はどうですか。',
        englishPrimary: 'How is life in Japan?',
        romajiPrimary: 'Nihon no seikatsu wa dou desu ka.',
        tokens: [
          { text: '日本', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: '生活', type: 'noun', note: 'Life' },
          { text: 'は', type: 'particle' },
          { text: 'どう', type: 'noun', note: 'How' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l8-rule4',
    type: 'static',
    formula: '[ N1 ] + [ は ] + [ どんな ] + [ N2 ] + [ ですか ]',
    explanation: 'Used to ask the listener to describe or explain N1 within a category N2.',
    examples: [
      {
        primary: '奈良はどんな町ですか。',
        englishPrimary: 'What kind of town is Nara?',
        romajiPrimary: 'Nara wa donna machi desu ka.',
        tokens: [
          { text: '奈良', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'どんな', type: 'noun', note: 'What kind of' },
          { text: '町', type: 'noun', note: 'Town' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l8-rule5',
    type: 'static',
    formula: '[ S1 ] + [ が ] 、 [ S2 ]',
    explanation: 'The particle が is a conjunctive meaning "but". It links two sentences.',
    examples: [
      {
        primary: '日本の食べ物はおいしいですが、高いです。',
        englishPrimary: 'Japanese food is good but expensive.',
        romajiPrimary: 'Nihon no tabemono wa oishii desu ga, takai desu.',
        tokens: [
          { text: '日本の食べ物', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'おいしい', type: 'noun', note: 'Oishii (Delicious)' },
          { text: 'です', type: 'predicate' },
          { text: 'が', type: 'particle', note: 'But' },
          { text: '、', type: 'text' },
          { text: '高い', type: 'noun', note: 'Takai (Expensive)' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l8-rule6',
    type: 'static',
    formula: 'どれ',
    explanation: 'Interrogative to choose one from three or more options.',
    examples: [
      {
        primary: 'ミラーさんのかさはどれですか。',
        englishPrimary: 'Which is Mr. Miller\'s umbrella?',
        romajiPrimary: 'Mira-san no kasa wa dore desu ka.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: 'かさ', type: 'noun', note: 'Umbrella' },
          { text: 'は', type: 'particle' },
          { text: 'どれ', type: 'noun', note: 'Which one' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  }
];

export const LESSON_9_GRAMMAR: GrammarExample[] = [
  {
    id: 'l9-rule1',
    type: 'static',
    formula: '[ N ] + [ が ] + [ あります / 好きです / etc. ]',
    explanation: 'Preference, ability, and possession are marked with が instead of を.',
    examples: [
      {
        primary: 'わたしはイタリア料理が好きです。',
        englishPrimary: 'I like Italian food.',
        romajiPrimary: 'Watashi wa itaria ryouri ga suki desu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'イタリア料理', type: 'noun', note: 'Italian food' },
          { text: 'が', type: 'particle', note: 'Object marker for preference' },
          { text: '好き', type: 'noun', note: 'Suki (Like)' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l9-rule2',
    type: 'static',
    formula: '[ どんな ] + [ N ] + [ が好きですか ]',
    explanation: 'Used to ask the listener to name one specific item from a group.',
    examples: [
      {
        primary: 'どんなスポーツが好きですか。',
        englishPrimary: 'What sports do you like?',
        romajiPrimary: 'Donna supootsu ga suki desu ka.',
        tokens: [
          { text: 'どんな', type: 'noun', note: 'What (within a category)' },
          { text: 'スポーツ', type: 'noun', note: 'Sports' },
          { text: 'が', type: 'particle' },
          { text: '好き', type: 'noun' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l9-rule3',
    type: 'table',
    formula: 'Adverbs of Degree & Amount',
    explanation: 'Summary of how adverbs modify verbs based on degree and quantity.',
    examples: [],
    table: {
      headers: ['Type', 'Affirmative', 'Negative'],
      rows: [
        ['Degree', 'よく / だいたい / すこし (well/mostly/a little)', 'あまり / ぜんぜん (not well/not at all)'],
        ['Amount', 'たくさん / すこし (many/a little)', 'あまり / ぜんぜん (not many/not at all)'],
      ]
    }
  },
  {
    id: 'l9-rule4',
    type: 'static',
    formula: '[ S1 (Reason) ] + [ から ] 、 [ S2 (Result) ]',
    explanation: 'から connects two sentences to denote a causal relationship (Because...).',
    examples: [
      {
        primary: '時間がないですから、新聞を読みません。',
        englishPrimary: 'Because I don\'t have time, I don\'t read the newspaper.',
        romajiPrimary: 'Jikan ga nai desu kara, shinbun o yomimasen.',
        tokens: [
          { text: '時間', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: 'ない', type: 'predicate', note: 'None/Doesn\'t exist' },
          { text: 'です', type: 'predicate' },
          { text: 'から', type: 'particle', note: 'Because' },
          { text: '、', type: 'text' },
          { text: '新聞', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '読みません', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l9-rule5',
    type: 'static',
    formula: '[ どうして ] + [ S ] + [ か ]',
    explanation: 'The interrogative どうして is used to ask for a reason. Answer with から.',
    examples: [
      {
        primary: 'どうして朝新聞を読みませんか. ',
        englishPrimary: 'Why don\'t you read the newspaper in the morning?',
        romajiPrimary: 'Doushite asa shinbun o yomimasen ka.',
        tokens: [
          { text: 'どうして', type: 'noun', note: 'Why' },
          { text: '朝', type: 'noun', note: 'Morning' },
          { text: '新聞', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '読みません', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  }
];

export const LESSON_10_GRAMMAR: GrammarExample[] = [
  {
    id: 'l10-rule1',
    type: 'toggle',
    formula: 'あります (Inanimate) | います (Animate)',
    explanation: 'あります is used for inanimate objects and plants. います is used for people and animals.',
    examples: [
      {
        primary: 'コンピューターがあります。',
        secondary: '男の人がいます。',
        englishPrimary: 'There is a computer.',
        englishSecondary: 'There is a man.',
        romajiPrimary: 'Konpyu-ta- ga arimasu.',
        romajiSecondary: 'Otoko no hito ga imasu.',
        tokens: [
          { text: 'コンピューター', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate', note: 'Exists (Inanimate)' },
        ],
        tokensSecondary: [
          { text: '男の人', type: 'noun', note: 'Man' },
          { text: 'が', type: 'particle' },
          { text: 'います', type: 'predicate', note: 'Exists (Animate)' },
        ]
      }
    ]
  },
  {
    id: 'l10-rule2',
    type: 'static',
    formula: '[ N1 (place) ] + [ に ] + [ N2 ] + [ があります / います ]',
    explanation: 'The place where something exists is marked with に.',
    examples: [
      {
        primary: 'わたしの部屋に机があります。',
        englishPrimary: 'There is a desk in my room.',
        romajiPrimary: 'Watashi no heya ni tsukue ga arimasu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: '部屋', type: 'noun', note: 'Room' },
          { text: 'に', type: 'particle', note: 'Location marker' },
          { text: '机', type: 'noun', note: 'Desk' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l10-rule3',
    type: 'static',
    formula: '[ N1 (Topic) ] + [ は ] + [ N2 (place) ] + [ にあります / います ]',
    explanation: 'When picking up N1 as a known topic, the particle は is used instead of が.',
    examples: [
      {
        primary: '事務所にミラーさんがいます。',
        englishPrimary: 'Mr. Miller is in the office.',
        romajiPrimary: 'Jimusho ni Mira-san ga imasu.',
        tokens: [
          { text: '事務所', type: 'noun', note: 'Office' },
          { text: 'に', type: 'particle' },
          { text: 'ミラーさん', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: 'います', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l10-rule4',
    type: 'static',
    formula: '[ N1 ] + [ の ] + [ N2 (position) ]',
    explanation: 'Position nouns (ue, shita, naka, etc.) are used to specify location.',
    examples: [
      {
        primary: '机の上に写真があります。',
        englishPrimary: 'There is a picture on the desk.',
        romajiPrimary: 'Tsukue no ue ni shashin ga arimasu.',
        tokens: [
          { text: '机', type: 'noun', note: 'Desk' },
          { text: 'の', type: 'particle' },
          { text: '上', type: 'noun', note: 'Ue (Top/On)' },
          { text: 'に', type: 'particle' },
          { text: '写真', type: 'noun', note: 'Picture' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l10-rule5',
    type: 'static',
    formula: '[ N1 ] + [ や ] + [ N2 ]',
    explanation: 'や is used for non-exhaustive lists (A, B, and so on).',
    examples: [
      {
        primary: '箱の中に手紙や写真があります。',
        englishPrimary: 'There are letters, pictures, and so on in the box.',
        romajiPrimary: 'Hako no naka ni tegami ya shashin ga arimasu.',
        tokens: [
          { text: '箱', type: 'noun', note: 'Box' },
          { text: 'の', type: 'particle' },
          { text: '中', type: 'noun', note: 'Naka (Inside)' },
          { text: 'に', type: 'particle' },
          { text: '手紙', type: 'noun', note: 'Letter' },
          { text: 'や', type: 'particle', note: 'Non-exhaustive "and"' },
          { text: '写真', type: 'noun', note: 'Picture' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_11_GRAMMAR: GrammarExample[] = [
  {
    id: 'l11-rule1',
    type: 'table',
    formula: 'Common Counter Suffixes',
    explanation: 'Counters are used after numbers to count specific types of objects or time.',
    examples: [],
    table: {
      headers: ['Counter', 'Target', 'Example'],
      rows: [
        ['〜つ', 'General items (1-10)', 'ひとつ, ふたつ...'],
        ['〜人 (nin)', 'People', 'ひとり, ふたり, さんにん...'],
        ['〜枚 (mai)', 'Flat things (paper, CDs)', 'いちまい, にまい...'],
        ['〜台 (dai)', 'Machines/Vehicles', 'いちだい, にだい...'],
        ['〜時間 (jikan)', 'Hours (Duration)', 'いちじかん, にじかん...'],
      ]
    }
  },
  {
    id: 'l11-rule2',
    type: 'static',
    formula: '[ N ] + [ を / が ] + [ Quantifier ] + [ V ]',
    explanation: 'Quantifiers are usually placed just before the verb they modify.',
    examples: [
      {
        primary: 'りんごを４つ買いました。',
        englishPrimary: 'We bought four apples.',
        romajiPrimary: 'Ringo o yotsu kaimashita.',
        tokens: [
          { text: 'りんご', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '４つ', type: 'noun', note: '4 items' },
          { text: '買いました', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l11-rule3',
    type: 'static',
    formula: '[ どのくらい ] + [ V ]',
    explanation: 'どのくらい is used to ask the length of time something takes.',
    examples: [
      {
        primary: 'どのくらい日本語を勉強しましたか。',
        englishPrimary: 'How long did you study Japanese?',
        romajiPrimary: 'Dono kurai nihongo o benkyou shimashita ka.',
        tokens: [
          { text: 'どのくらい', type: 'noun', note: 'How long' },
          { text: '日本語', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '勉強しました', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l11-rule4',
    type: 'static',
    formula: '[ Period ] + [ に ] + [ Num-kai ] + [ V ]',
    explanation: 'Used to express how often an action occurs within a certain period.',
    examples: [
      {
        primary: '１か月に２回映画を見ます。',
        englishPrimary: 'I watch movies twice a month.',
        romajiPrimary: 'Ikkagetsu ni nikai eiga o mimasu.',
        tokens: [
          { text: '１か月', type: 'noun', note: '1 month' },
          { text: 'に', type: 'particle', note: 'Per/In' },
          { text: '２回', type: 'noun', note: '2 times' },
          { text: '映画', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '見ます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l11-rule5',
    type: 'static',
    formula: '[ Quantifier / N ] + [ だけ ]',
    explanation: 'だけ means "only". It indicates that there is nothing or no one else.',
    examples: [
      {
        primary: '休みは日曜日だけです。',
        englishPrimary: 'I only have Sundays off.',
        romajiPrimary: 'Yasumi wa nichiyoubi dake desu.',
        tokens: [
          { text: '休み', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '日曜日', type: 'noun', note: 'Sunday' },
          { text: 'だけ', type: 'particle', note: 'Only' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_12_GRAMMAR: GrammarExample[] = [
  {
    id: 'l12-rule1',
    type: 'table',
    formula: 'Past Tense: Nouns & Na-Adjectives',
    explanation: 'Conjugation for past affirmative and negative states for nouns and な-adjectives.',
    examples: [],
    table: {
      headers: ['Type', 'Affirmative', 'Negative'],
      rows: [
        ['Past', '～でした', '～じゃありませんでした'],
        ['Example', '雨でした (Was rain)', '簡単じゃありませんでした (Was not easy)'],
      ]
    }
  },
  {
    id: 'l12-rule2',
    type: 'table',
    formula: 'Past Tense: い-Adjectives',
    explanation: 'Conjugation for past affirmative and negative states for い-adjectives.',
    examples: [],
    table: {
      headers: ['Type', 'Affirmative', 'Negative'],
      rows: [
        ['Past', '～かったです', '～くなかったです'],
        ['Example', '暑かったです (Was hot)', '楽しくなかったです (Was not fun)'],
      ]
    }
  },
  {
    id: 'l12-rule3',
    type: 'static',
    formula: '[ N1 ] + [ は ] + [ N2 ] + [ より ] + [ Adj ] + [ です ]',
    explanation: 'Describes that N1 has more of a quality than N2.',
    examples: [
      {
        primary: 'この車はあの車より大きいです。',
        englishPrimary: 'This car is bigger than that car.',
        romajiPrimary: 'Kono kuruma wa ano kuruma yori ookii desu.',
        tokens: [
          { text: 'この', type: 'particle' },
          { text: '車', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'あの', type: 'particle' },
          { text: '車', type: 'noun' },
          { text: 'より', type: 'particle', note: 'Than' },
          { text: '大きい', type: 'noun' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l12-rule4',
    type: 'static',
    formula: '[ N1 ] + [ と ] + [ N2 ] + [ とどちらが ] + [ Adj ] + [ ですか ]',
    explanation: 'Used to ask the listener to choose between two items.',
    examples: [
      {
        primary: 'サッカーと野球とどちらがおもしろいですか。',
        englishPrimary: 'Which is more interesting, soccer or baseball?',
        romajiPrimary: 'Sakkaa to yakyuu to dochira ga omoshiroi desu ka.',
        tokens: [
          { text: 'サッカー', type: 'noun' },
          { text: 'と', type: 'particle' },
          { text: '野球', type: 'noun', note: 'Baseball' },
          { text: 'と', type: 'particle' },
          { text: 'どちら', type: 'noun', note: 'Which one (of two)' },
          { text: 'が', type: 'particle' },
          { text: 'おもしろい', type: 'noun' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l12-rule5',
    type: 'static',
    formula: '[ N1 ] + [ の中で ] + [ Interrogative ] + [ が一番 ] + [ Adj ] + [ ですか ]',
    explanation: 'Used to ask for the "most" (ichiban) within a group or category.',
    examples: [
      {
        primary: '日本料理の中で何が一番おいしいですか。',
        englishPrimary: 'Among Japanese dishes, what is the most delicious?',
        romajiPrimary: 'Nihon ryouri no naka de nani ga ichiban oishii desu ka.',
        tokens: [
          { text: '日本料理', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: '中で', type: 'particle', note: 'Among/Within' },
          { text: '何', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '一番', type: 'noun', note: 'Number one/Most' },
          { text: 'おいしい', type: 'noun' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  }
];

export const LESSON_13_GRAMMAR: GrammarExample[] = [
  {
    id: 'l13-rule1',
    type: 'toggle',
    formula: '[ N ] + [ が欲しいです ]',
    explanation: 'Expresses the speaker\'s desire to possess an object.',
    examples: [
      {
        primary: 'わたしは友達が欲しいです。',
        secondary: '車が欲しくないです。',
        englishPrimary: 'I want a friend.',
        englishSecondary: 'I don\'t want a car.',
        romajiPrimary: 'Watashi wa tomodachi ga hoshii desu.',
        romajiSecondary: 'Kuruma ga hoshikunai desu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '友達', type: 'noun', note: 'Friend' },
          { text: 'が', type: 'particle' },
          { text: '欲しい', type: 'noun', note: 'Want (Possess)' },
          { text: 'です', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '車', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '欲しくない', type: 'noun' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l13-rule2',
    type: 'toggle',
    formula: '[ V-masu (Stem) ] + [ たいです ]',
    explanation: 'Expresses the speaker\'s desire to perform an action. Particles を can be replaced by が.',
    examples: [
      {
        primary: 'わたしは沖縄へ行きたいです。',
        secondary: 'てんぷらを食べたくないです。',
        englishPrimary: 'I want to go to Okinawa.',
        englishSecondary: 'I don\'t want to eat tempura.',
        romajiPrimary: 'Watashi wa Okinawa e ikitai desu.',
        romajiSecondary: 'Tenpura o tabetakunai desu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '沖縄', type: 'noun', note: 'Okinawa' },
          { text: 'へ', type: 'particle' },
          { text: '行きたい', type: 'predicate', note: 'Ikitai (Want to go)' },
          { text: 'です', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'てんぷら', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '食べたくない', type: 'predicate', note: 'Tabetakunai (Not want to eat)' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l13-rule3',
    type: 'static',
    formula: '[ Place ] + [ へ ] + [ Purpose (V-stem / N) ] + [ に行きます ]',
    explanation: 'Expresses the purpose of movement using に.',
    examples: [
      {
        primary: '神戸へインド料理を食べに行きます。',
        englishPrimary: 'I\'m going to Kobe to eat Indian food.',
        romajiPrimary: 'Koube e indo ryouri o tabe ni ikimasu.',
        tokens: [
          { text: '神戸', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: 'インド料理', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '食べ', type: 'predicate', note: 'Tabe (Stem of tabemasu)' },
          { text: 'に', type: 'particle', note: 'Purpose marker' },
          { text: '行きます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l13-rule4',
    type: 'static',
    formula: '[ どこか / 何か ]',
    explanation: 'Means "somewhere" and "something". Particles へ and を can be omitted.',
    examples: [
      {
        primary: '何か飲みたいです。',
        englishPrimary: 'I want to drink something.',
        romajiPrimary: 'Nanika nomitai desu.',
        tokens: [
          { text: '何か', type: 'noun', note: 'Something' },
          { text: '飲みたい', type: 'predicate' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_14_GRAMMAR: GrammarExample[] = [
  {
    id: 'l14-rule1',
    type: 'table',
    formula: 'Verb Group Classification',
    explanation: 'Verbs are divided into three groups based on how they conjugate into the te-form.',
    examples: [],
    table: {
      headers: ['Group', 'ます-form ending', 'Example'],
      rows: [
        ['Group I', 'い-line (ki, shi, chi, etc.)', 'かきます, のみます'],
        ['Group II', 'え-line (most) / い-line (some)', 'たべます, みせます, みます'],
        ['Group III', 'きます, します', 'きます, コピーします'],
      ]
    }
  },
  {
    id: 'l14-rule2',
    type: 'table',
    formula: 'て-form Conjugation Rules',
    explanation: 'How to transform a verb into its te-form based on its Group I ending.',
    examples: [],
    table: {
      headers: ['ます-form ending', 'て-form change', 'Example'],
      rows: [
        ['い, ち, り', '～って', 'かいます → かって'],
        ['み, び, に', '～んで', 'のみます → のんで'],
        ['き', '～いて (Exception: いきます → いって)', 'かきます → かいて'],
        ['ぎ', '～いで', 'いそぎます → いそいで'],
        ['し', '～して', 'はなします → はなして'],
      ]
    }
  },
  {
    id: 'l14-rule3',
    type: 'static',
    formula: '[ V-te ] + [ ください ]',
    explanation: 'Used to ask, instruct, or encourage the listener to do something (Please do...).',
    examples: [
      {
        primary: 'すみませんが、この漢字の読み方を教えてください。',
        englishPrimary: 'Excuse me, but please tell me how to read this kanji.',
        romajiPrimary: 'Sumimasen ga, kono kanji no yomikata o oshiete kudasai.',
        tokens: [
          { text: 'すみません', type: 'text' },
          { text: 'が', type: 'particle', note: 'Introductory "but"' },
          { text: '、', type: 'text' },
          { text: 'この', type: 'particle' },
          { text: '漢字', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: '読み方', type: 'noun', note: 'How to read' },
          { text: 'を', type: 'particle' },
          { text: '教えてください', type: 'predicate', note: 'Please teach/tell' },
        ]
      }
    ]
  },
  {
    id: 'l14-rule4',
    type: 'toggle',
    formula: '[ V-te ] + [ います ]',
    explanation: 'Indicates that a certain action or motion is currently in progress (Be V-ing).',
    examples: [
      {
        primary: 'ミラーさんは今電話をかけています。',
        secondary: '今雨が降っていますか。',
        englishPrimary: 'Mr. Miller is making a phone call now.',
        englishSecondary: 'Is it raining now?',
        romajiPrimary: 'Mira-san wa ima denwa o kakete imasu.',
        romajiSecondary: 'Ima ame ga futte imasu ka.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '今', type: 'noun' },
          { text: '電話をかけています', type: 'predicate', note: 'Is making a call' },
        ],
        tokensSecondary: [
          { text: '今', type: 'noun' },
          { text: '雨', type: 'noun' },
          { text: 'が', type: 'particle', note: 'Subject marker for natural phenomena' },
          { text: '降っています', type: 'predicate', note: 'Is falling (rain)' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l14-rule5',
    type: 'static',
    formula: '[ V-masu (Stem) ] + [ ましょうか ]',
    explanation: 'Used when the speaker is offering to do something for the listener (Shall I...?).',
    examples: [
      {
        primary: '荷物を持ちましょうか。',
        englishPrimary: 'Shall I carry your parcel?',
        romajiPrimary: 'Nimotsu o mochimashou ka.',
        tokens: [
          { text: '荷物', type: 'noun', note: 'Parcel/Luggage' },
          { text: 'を', type: 'particle' },
          { text: '持ちましょうか', type: 'predicate', note: 'Shall I hold/carry?' },
        ]
      }
    ]
  }
];

export const LESSON_15_GRAMMAR: GrammarExample[] = [
  {
    id: 'l15-rule1',
    type: 'toggle',
    formula: '[ V-te ] + [ もいいです ]',
    explanation: 'Used to grant or ask for permission (May I... / You may...).',
    examples: [
      {
        primary: '写真を撮ってもいいです。',
        secondary: 'たばこを吸ってもいいですか。',
        englishPrimary: 'You may take pictures.',
        englishSecondary: 'May I smoke?',
        romajiPrimary: 'Shashin o totte mo ii desu.',
        romajiSecondary: 'Tabako o sutte mo ii desu ka.',
        tokens: [
          { text: '写真', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '撮ってもいいです', type: 'predicate', note: 'May take (picture)' },
        ],
        tokensSecondary: [
          { text: 'たばこ', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '吸ってもいいです', type: 'predicate', note: 'May smoke' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  },
  {
    id: 'l15-rule2',
    type: 'static',
    formula: '[ V-te ] + [ は いけません ]',
    explanation: 'Used to express prohibition (You must not...).',
    examples: [
      {
        primary: 'ここでたばこを吸ってはいけません。',
        englishPrimary: 'You must not smoke here.',
        romajiPrimary: 'Koko de tabako o sutte wa ikemasen.',
        tokens: [
          { text: 'ここ', type: 'noun' },
          { text: 'で', type: 'particle' },
          { text: 'たばこ', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '吸ってはいけません', type: 'predicate', note: 'Must not smoke' },
        ]
      }
    ]
  },
  {
    id: 'l15-rule3',
    type: 'toggle',
    formula: '[ V-te ] + [ います ] (States)',
    explanation: 'Describes a continuing state resulting from a past action (Married, living, knowing, etc.).',
    examples: [
      {
        primary: 'わたしは結婚しています。',
        secondary: 'わたしは大阪に住んでいます。',
        englishPrimary: 'I am married.',
        englishSecondary: 'I live in Osaka.',
        romajiPrimary: 'Watashi wa kekkon shite imasu.',
        romajiSecondary: 'Watashi wa Osaka ni sunde imasu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '結婚しています', type: 'predicate', note: 'Am married' },
        ],
        tokensSecondary: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '大阪', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '住んでいます', type: 'predicate', note: 'Am living/Live' },
        ]
      }
    ]
  },
  {
    id: 'l15-rule4',
    type: 'toggle',
    formula: '[ V-te ] + [ います ] (Habits)',
    explanation: 'Describes a habitual action or one\'s occupation (Working, studying, selling).',
    examples: [
      {
        primary: 'ミラーさんはIMCで働いています。',
        secondary: 'スーパーでフィルムを売っています。',
        englishPrimary: 'Mr. Miller works for IMC.',
        englishSecondary: 'Supermarkets sell films.',
        romajiPrimary: 'Mira-san wa IMC de hataraite imasu.',
        romajiSecondary: 'Su-pa- de firumu o utte imasu.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'IMC', type: 'noun' },
          { text: 'で', type: 'particle' },
          { text: '働いています', type: 'predicate', note: 'Is working' },
        ],
        tokensSecondary: [
          { text: 'スーパー', type: 'noun' },
          { text: 'で', type: 'particle' },
          { text: 'フィルム', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '売っています', type: 'predicate', note: 'Is selling' },
        ]
      }
    ]
  },
  {
    id: 'l15-rule5',
    type: 'static',
    formula: '知っています vs 知りません',
    explanation: 'The negative of "shitte imasu" (I know) is uniquely "shirimasen" (I don\'t know).',
    examples: [
      {
        primary: 'いいえ、知りません。',
        englishPrimary: 'No, I don\'t know.',
        romajiPrimary: 'Iie, shirimasen.',
        tokens: [
          { text: 'いいえ', type: 'text' },
          { text: '、', type: 'text' },
          { text: '知りません', type: 'predicate', note: 'Do not know (Unique negative form)' },
        ]
      }
    ]
  }
];

export const LESSON_16_GRAMMAR: GrammarExample[] = [
  {
    id: 'l16-rule1',
    type: 'static',
    formula: '[ V-te ], [ V-te ], [ V ]',
    explanation: 'Used to connect actions in the order they occur. The final verb determines the tense.',
    examples: [
      {
        primary: '朝ジョギングをしてシャワーを浴びて、会社へ行きます。',
        englishPrimary: 'In the morning, I jog, take a shower, and go to the office.',
        romajiPrimary: 'Asa jogingu o shite shawā o abite, kaisha e ikimasu.',
        tokens: [
          { text: '朝', type: 'noun' },
          { text: 'ジョギングをして', type: 'predicate', note: 'Jog and...' },
          { text: 'シャワーを浴びて', type: 'predicate', note: 'Take a shower and...' },
          { text: '会社へ行きます', type: 'predicate', note: 'Go to the office' },
        ]
      }
    ]
  },
  {
    id: 'l16-rule2',
    type: 'toggle',
    formula: 'Adjective Connection',
    explanation: 'Connecting adjectives: い-adj (～くて), な-adj / Noun (～で).',
    examples: [
      {
        primary: 'ミラーさんは若くて元気です。',
        secondary: 'ミラーさんはハンサムで親切です。',
        englishPrimary: 'Mr. Miller is young and energetic.',
        englishSecondary: 'Mr. Miller is handsome and kind.',
        romajiPrimary: 'Mira-san wa wakakute genki desu.',
        romajiSecondary: 'Mira-san wa hansamu de shinsetsu desu.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '若くて', type: 'adjective', note: 'Young and...' },
          { text: '元気です', type: 'adjective' },
        ],
        tokensSecondary: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'ハンサムで', type: 'adjective', note: 'Handsome and...' },
          { text: '親切です', type: 'adjective' },
        ]
      }
    ]
  },
  {
    id: 'l16-rule3',
    type: 'static',
    formula: '[ V1-te ] + [ から ] + [ V2 ]',
    explanation: 'Indicates that V2 occurs after V1 is completed.',
    examples: [
      {
        primary: 'コンサートが終わってから、レストランで食事しました。',
        englishPrimary: 'After the concert ended, we ate at a restaurant.',
        romajiPrimary: 'Konsāto ga owatte kara, resutoran de shokuji shimashita.',
        tokens: [
          { text: 'コンサート', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '終わってから', type: 'predicate', note: 'After ending' },
          { text: '、', type: 'text' },
          { text: 'レストランで', type: 'noun' },
          { text: '食事しました', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l16-rule4',
    type: 'static',
    formula: '[ N1 ] は [ N2 ] が [ Adjective ]',
    explanation: 'Used to describe an attribute (N2) of a topic (N1).',
    examples: [
      {
        primary: 'マリアさんは髪が長いです。',
        englishPrimary: 'Maria has long hair.',
        romajiPrimary: 'Maria-san wa kami ga nagai desu.',
        tokens: [
          { text: 'マリアさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '髪', type: 'noun', note: 'Hair' },
          { text: 'が', type: 'particle' },
          { text: '長いです', type: 'adjective', note: 'Is long' },
        ]
      }
    ]
  },
  {
    id: 'l16-rule5',
    type: 'toggle',
    formula: 'どうやって / どの',
    explanation: 'どうやって: How/In what way. どの: Which (among 3+).',
    examples: [
      {
        primary: '大学までどうやって行きますか。',
        secondary: 'サントスさんはどの人ですか。',
        englishPrimary: 'How do you go to the university?',
        englishSecondary: 'Which one is Mr. Santos?',
        romajiPrimary: 'Daigaku made douyatte ikimasu ka.',
        romajiSecondary: 'Santosu-san wa dono hito desu ka.',
        tokens: [
          { text: '大学', type: 'noun' },
          { text: 'まで', type: 'particle' },
          { text: 'どうやって', type: 'text', note: 'How' },
          { text: '行きます', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ],
        tokensSecondary: [
          { text: 'サントスさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'どの', type: 'text', note: 'Which' },
          { text: '人', type: 'noun' },
          { text: 'です', type: 'predicate' },
          { text: 'か', type: 'particle' },
        ]
      }
    ]
  }
];

export const LESSON_17_GRAMMAR: GrammarExample[] = [
  {
    id: 'l17-rule1',
    type: 'table',
    formula: 'Verb ない-form Conjugation',
    explanation: 'The negative form (nai-form) is the basis for many useful expressions.',
    examples: [],
    table: {
      headers: ['Group', 'ます-form ending', 'ない-form change'],
      rows: [
        ['Group I', 'い-line (ki, shi, chi, etc.)', 'あ-line + ない (Exception: い → わ)'],
        ['Group II', 'え-line / stem', 'stem + ない'],
        ['Group III', 'きます, します', 'こない, しない'],
      ]
    }
  },
  {
    id: 'l17-rule2',
    type: 'static',
    formula: '[ V-nai ] + [ ないでください ]',
    explanation: 'Used to ask or instruct someone not to do something (Please don\'t...).',
    examples: [
      {
        primary: 'ここで写真を撮らないでください。',
        englishPrimary: 'Please don\'t take pictures here.',
        romajiPrimary: 'Koko de shashin o toranaide kudasai.',
        tokens: [
          { text: 'ここ', type: 'noun' },
          { text: 'で', type: 'particle' },
          { text: '写真', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '撮らないでください', type: 'predicate', note: 'Please don\'t take' },
        ]
      }
    ]
  },
  {
    id: 'l17-rule3',
    type: 'static',
    formula: '[ V-nai (stem) ] + [ なければなりません ]',
    explanation: 'Used to express obligation or necessity (Must...).',
    examples: [
      {
        primary: '薬を飲まなければなりません。',
        englishPrimary: 'I must take medicine.',
        romajiPrimary: 'Kusuri o nomanakereba narimasen.',
        tokens: [
          { text: '薬', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '飲まなければなりません', type: 'predicate', note: 'Must drink/take' },
        ]
      }
    ]
  },
  {
    id: 'l17-rule4',
    type: 'static',
    formula: '[ V-nai (stem) ] + [ なくてもいいです ]',
    explanation: 'Used to indicate that an action is not necessary (Need not...).',
    examples: [
      {
        primary: 'あした来なくてもいいです。',
        englishPrimary: 'You don\'t have to come tomorrow.',
        romajiPrimary: 'Ashita konakutemo ii desu.',
        tokens: [
          { text: 'あした', type: 'noun' },
          { text: '来なくてもいいです', type: 'predicate', note: 'Don\'t have to come' },
        ]
      }
    ]
  },
  {
    id: 'l17-rule5',
    type: 'static',
    formula: '[ N ] + [ までに ]',
    explanation: 'Indicates a deadline by which an action must be completed (By...).',
    examples: [
      {
        primary: '土曜日までに本を返さなければなりません。',
        englishPrimary: 'I must return the book by Saturday.',
        romajiPrimary: 'Doyōbi made ni hon o kaesana kereba narimasen.',
        tokens: [
          { text: '土曜日', type: 'noun' },
          { text: 'までに', type: 'particle', note: 'By (Deadline)' },
          { text: '本', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '返さなければなりません', type: 'predicate', note: 'Must return' },
        ]
      }
    ]
  }
];

export const LESSON_18_GRAMMAR: GrammarExample[] = [
  {
    id: 'l18-rule1',
    type: 'table',
    formula: 'Verb Dictionary Form',
    explanation: 'The dictionary form is the basic form used for looking up verbs and specific patterns.',
    examples: [],
    table: {
      headers: ['Group', 'ます-form ending', 'Dictionary form change'],
      rows: [
        ['Group I', 'い-line (ki, chi, ri, etc.)', 'う-line (ku, tsu, ru, etc.)'],
        ['Group II', 'え-line / stem', 'stem + る'],
        ['Group III', 'きます, します', 'くる, する'],
      ]
    }
  },
  {
    id: 'l18-rule2',
    type: 'toggle',
    formula: '[ N / V-dictionary こと ] + [ ができます ]',
    explanation: 'Expresses ability or possibility (Can...).',
    examples: [
      {
        primary: 'ミラーさんは日本語ができます。',
        secondary: 'ミラーさんは漢字を読むことができます。',
        englishPrimary: 'Mr. Miller can speak Japanese.',
        englishSecondary: 'Mr. Miller can read Kanji.',
        romajiPrimary: 'Mira-san wa nihongo ga dekimasu.',
        romajiSecondary: 'Mira-san wa kanji o yomu koto ga dekimasu.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '日本語', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: 'できます', type: 'predicate', note: 'Can do/Speak' },
        ],
        tokensSecondary: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '漢字', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '読む', type: 'predicate', note: 'Read (Dict. Form)' },
          { text: 'こと', type: 'text', note: 'Nominalizer' },
          { text: 'が', type: 'particle' },
          { text: 'できます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l18-rule3',
    type: 'static',
    formula: 'わたしの趣味は [ N / V-dict こと ] です',
    explanation: 'Used to state your hobby concretely.',
    examples: [
      {
        primary: 'わたしの趣味は音楽を聞くことです。',
        englishPrimary: 'My hobby is listening to music.',
        romajiPrimary: 'Watashi no shumi wa ongaku o kiku koto desu.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: '趣味', type: 'noun', note: 'Hobby' },
          { text: 'は', type: 'particle' },
          { text: '音楽', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '聞く', type: 'predicate', note: 'Listen (Dict. Form)' },
          { text: 'こと', type: 'text' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l18-rule4',
    type: 'toggle',
    formula: '[ V-dict / Nの / Period ] + [ まえに ]',
    explanation: 'Indicates that an action occurs BEFORE another action or time.',
    examples: [
      {
        primary: '寝るまえに、本を読みます。',
        secondary: '食事のまえに、手を洗います。',
        englishPrimary: 'I read a book before I go to bed.',
        englishSecondary: 'I wash my hands before eating.',
        romajiPrimary: 'Neru mae ni, hon o yomimasu.',
        romajiSecondary: 'Shokuji no mae ni, te o araimasu.',
        tokens: [
          { text: '寝る', type: 'predicate', note: 'Sleep (Dict. Form)' },
          { text: 'まえに', type: 'particle', note: 'Before' },
          { text: '、', type: 'text' },
          { text: '本', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '読みます', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '食事', type: 'noun', note: 'Meal' },
          { text: 'の', type: 'particle' },
          { text: 'まえに', type: 'particle' },
          { text: '、', type: 'text' },
          { text: '手', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '洗います', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l18-rule5',
    type: 'static',
    formula: 'なかなか + [ Negative ]',
    explanation: 'Means "not easily" or "not as expected".',
    examples: [
      {
        primary: '日本ではなかなか馬を見ることができません。',
        englishPrimary: 'In Japan, we can rarely see horses.',
        romajiPrimary: 'Nihon de wa nakanaka uma o miru koto ga dekimasen.',
        tokens: [
          { text: '日本', type: 'noun' },
          { text: 'で', type: 'particle' },
          { text: 'は', type: 'particle' },
          { text: 'なかなか', type: 'text', note: 'Not easily' },
          { text: '馬', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '見る', type: 'predicate' },
          { text: 'こと', type: 'text' },
          { text: 'が', type: 'particle' },
          { text: 'できません', type: 'predicate', note: 'Cannot do' },
        ]
      }
    ]
  }
];

export const LESSON_19_GRAMMAR: GrammarExample[] = [
  {
    id: 'l19-rule1',
    type: 'table',
    formula: 'Verb た-form Conjugation',
    explanation: 'The た-form (past) follows the same rules as the て-form (replace て with た and で with だ).',
    examples: [],
    table: {
      headers: ['Group', 'て-form ending', 'た-form change'],
      rows: [
        ['Group I', '～て, ～で', '～た, ～だ'],
        ['Group II', '～て', '～た'],
        ['Group III', 'きて, して', 'きた, した'],
      ]
    }
  },
  {
    id: 'l19-rule2',
    type: 'static',
    formula: '[ V-ta ] + [ ことがあります ]',
    explanation: 'Used to describe past experiences (Have done...).',
    examples: [
      {
        primary: '馬に乗ったことがあります。',
        englishPrimary: 'I have ridden a horse.',
        romajiPrimary: 'Uma ni notta koto ga arimasu.',
        tokens: [
          { text: '馬', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '乗った', type: 'predicate', note: 'Rode (Ta-form)' },
          { text: 'こと', type: 'text', note: 'Experience' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l19-rule3',
    type: 'toggle',
    formula: '[ V1-tari ], [ V2-tari ] します',
    explanation: 'Used to list actions as examples. Tense is determined by the final します/しました.',
    examples: [
      {
        primary: '日曜日はテニスをしたり、映画を見たりします。',
        secondary: '日曜日はテニスをしたり、映画を見たりしました。',
        englishPrimary: 'On Sundays, I play tennis, see a movie and so on.',
        englishSecondary: 'Last Sunday, I played tennis, saw a movie and so on.',
        romajiPrimary: 'Nichiyōbi wa tenisu o shitari, eiga o mitari shimasu.',
        romajiSecondary: 'Nichiyōbi wa tenisu o shitari, eiga o mitari shimashita.',
        tokens: [
          { text: '日曜日', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'テニスをしたり', type: 'predicate', note: 'Play tennis and...' },
          { text: '、', type: 'text' },
          { text: '映画を見たり', type: 'predicate', note: 'See a movie and...' },
          { text: 'します', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '日曜日', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'テニスをしたり', type: 'predicate' },
          { text: '、', type: 'text' },
          { text: '映画を見たり', type: 'predicate' },
          { text: 'しました', type: 'predicate', note: 'Past tense' },
        ]
      }
    ]
  },
  {
    id: 'l19-rule4',
    type: 'table',
    formula: 'Becoming... (なります)',
    explanation: 'Indicates a change in state. Adjectives and nouns change their endings before なります.',
    examples: [],
    table: {
      headers: ['Word Type', 'Change', 'Example'],
      rows: [
        ['い-adj', '～い → ～く', '寒くなります (Get cold)'],
        ['な-adj', '～[な] → ～に', '元気になります (Get well)'],
        ['Noun', 'N → Nに', '25歳になります (Become 25)'],
      ]
    }
  },
  {
    id: 'l19-rule5',
    type: 'static',
    formula: 'そうですね',
    explanation: 'Used to express agreement or sympathy with the partner.',
    examples: [
      {
        primary: '寒くなりましたね。...そうですね。',
        englishPrimary: 'It\'s got cold, hasn\'t it? ...Yes, it has.',
        romajiPrimary: 'Samuku narimashita ne. ...Sou desu ne.',
        tokens: [
          { text: '寒く', type: 'adjective' },
          { text: 'なりました', type: 'predicate' },
          { text: 'ね', type: 'particle' },
          { text: '。', type: 'text' },
          { text: '...', type: 'text' },
          { text: 'そうですね', type: 'phrase', note: 'Agreement' },
        ]
      }
    ]
  }
];

export const LESSON_20_GRAMMAR: GrammarExample[] = [
  {
    id: 'l20-rule1',
    type: 'table',
    formula: 'Polite vs. Plain Style',
    explanation: 'Plain style is used with close friends and family, while polite style (ます/です) is for formal settings.',
    examples: [],
    table: {
      headers: ['Type', 'Polite Form', 'Plain Form'],
      rows: [
        ['Verb', '行きます (ikimasu)', '行く (iku)'],
        ['い-adj', '忙しいです (isogashii desu)', '忙しい (isogashii)'],
        ['な-adj', '好きです (suki desu)', '好きだ (suki da)'],
        ['Noun', '雨です (ame desu)', '雨だ (ame da)'],
      ]
    }
  },
  {
    id: 'l20-rule2',
    type: 'toggle',
    formula: 'Informal Questions',
    explanation: 'In plain style, the particle [か] is omitted, and rising intonation is used.',
    examples: [
      {
        primary: 'コーヒーを飲む？',
        secondary: 'うん、飲む。',
        englishPrimary: 'Do you want to drink coffee?',
        englishSecondary: 'Yeah, I do.',
        romajiPrimary: 'Kōhī o nomu?',
        romajiSecondary: 'Un, nomu.',
        tokens: [
          { text: 'コーヒー', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '飲む', type: 'predicate', note: 'Plain Form (rising)' },
          { text: '？', type: 'text' },
        ],
        tokensSecondary: [
          { text: 'うん', type: 'phrase', note: 'Informal Yes' },
          { text: '、', type: 'text' },
          { text: '飲む', type: 'predicate' },
          { text: '。', type: 'text' },
        ]
      }
    ]
  },
  {
    id: 'l20-rule3',
    type: 'static',
    formula: 'Particle Omission',
    explanation: 'Particles like [を], [は], [が], [へ] are often omitted in casual conversation.',
    examples: [
      {
        primary: 'ごはん食べる？',
        englishPrimary: 'Will you eat?',
        romajiPrimary: 'Gohan taberu?',
        tokens: [
          { text: 'ごはん', type: 'noun' },
          { text: '[を]', type: 'particle', note: 'Omitted' },
          { text: '食べる', type: 'predicate' },
          { text: '？', type: 'text' },
        ]
      }
    ]
  },
  {
    id: 'l20-rule4',
    type: 'static',
    formula: '～けど',
    explanation: 'The informal equivalent of [～が] (but).',
    examples: [
      {
        primary: '辛いけど、おいしい。',
        englishPrimary: 'It\'s spicy, but tasty.',
        romajiPrimary: 'Karai kedo, oishii.',
        tokens: [
          { text: '辛い', type: 'adjective' },
          { text: 'けど', type: 'text', note: 'But (Informal)' },
          { text: '、', type: 'text' },
          { text: 'おいしい', type: 'adjective' },
          { text: '。', type: 'text' },
        ]
      }
    ]
  },
  {
    id: 'l20-rule5',
    type: 'static',
    formula: 'Drop [い] in V-ている',
    explanation: 'In casual speech, the [い] in the progressive form is often dropped.',
    examples: [
      {
        primary: '辞書、持ってる？',
        englishPrimary: 'Do you have a dictionary? (lit: Are you holding?)',
        romajiPrimary: 'Jisho, motteru?',
        tokens: [
          { text: '辞書', type: 'noun' },
          { text: '、', type: 'text' },
          { text: '持ってる', type: 'predicate', note: 'Drop [い] from 持っている' },
          { text: '？', type: 'text' },
        ]
      }
    ]
  }
];

export const LESSON_21_GRAMMAR: GrammarExample[] = [
  {
    id: 'l21-rule1',
    type: 'toggle',
    formula: 'Plain form + と思います',
    explanation: 'Used to express conjecture or personal opinion (I think that...).',
    examples: [
      {
        primary: 'あした雨が降ると思います。',
        secondary: '日本は物価が高いと思います。',
        englishPrimary: 'I think it will rain tomorrow.',
        englishSecondary: 'I think that prices are high in Japan.',
        romajiPrimary: 'Ashita ame ga furu to omoimasu.',
        romajiSecondary: 'Nihon wa bukka ga takai to omoimasu.',
        tokens: [
          { text: 'あした', type: 'noun' },
          { text: '雨', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '降る', type: 'predicate', note: 'Plain Form' },
          { text: 'と', type: 'particle' },
          { text: '思います', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '日本', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '物価', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '高い', type: 'adjective' },
          { text: 'と', type: 'particle' },
          { text: '思います', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l21-rule2',
    type: 'toggle',
    formula: 'Plain form + と言います',
    explanation: 'Used to quote someone directly or indirectly.',
    examples: [
      {
        primary: 'ミラーさんは「来週東京へ行きます」と言いました。',
        secondary: 'ミラーさんは来週東京へ行くと言いました。',
        englishPrimary: 'Mr. Miller said "I will go to Tokyo next week".',
        englishSecondary: 'Mr. Miller said that he would go to Tokyo next week.',
        romajiPrimary: 'Mira-san wa "Raishū Tōkyō e ikimasu" to iimashita.',
        romajiSecondary: 'Mira-san wa raishū Tōkyō e iku to iimashita.',
        tokens: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '「...」', type: 'text', note: 'Direct Quote' },
          { text: 'と', type: 'particle' },
          { text: '言いました', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'ミラーさん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '行く', type: 'predicate', note: 'Plain Form (Indirect)' },
          { text: 'と', type: 'particle' },
          { text: '言いました', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l21-rule3',
    type: 'static',
    formula: 'Plain form + でしょう？',
    explanation: 'Used to confirm that the listener agrees with the speaker (..., right?).',
    examples: [
      {
        primary: 'あしたパーティーに行くでしょう？',
        englishPrimary: 'You are going to the party tomorrow, aren\'t you?',
        romajiPrimary: 'Ashita pa-ti- ni iku deshō?',
        tokens: [
          { text: 'あした', type: 'noun' },
          { text: 'パーティー', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '行く', type: 'predicate' },
          { text: 'でしょう', type: 'phrase', note: 'Confirmation' },
          { text: '？', type: 'text' },
        ]
      }
    ]
  },
  {
    id: 'l21-rule4',
    type: 'static',
    formula: 'N1 (place) で N2 があります',
    explanation: 'Means an event (party, festival, match) is held or takes place.',
    examples: [
      {
        primary: '東京でサッカーの試合があります。',
        englishPrimary: 'A soccer match will be held in Tokyo.',
        romajiPrimary: 'Tōkyō de sakka- no shiai ga arimasu.',
        tokens: [
          { text: '東京', type: 'noun' },
          { text: 'で', type: 'particle', note: 'At (event location)' },
          { text: 'サッカー', type: 'noun' },
          { text: 'の', type: 'particle' },
          { text: '試合', type: 'noun', note: 'Match/Event' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l21-rule5',
    type: 'toggle',
    formula: 'Suggestions & Obligations',
    explanation: 'Casual suggestion [demo] and casual obligation [naito].',
    examples: [
      {
        primary: 'ビールでも飲みませんか。',
        secondary: 'もう帰らないと。',
        englishPrimary: 'Shall we drink beer or something?',
        englishSecondary: 'I have to go home now.',
        romajiPrimary: 'Bi-ru demo nomimasen ka.',
        romajiSecondary: 'Mou kaeranaito.',
        tokens: [
          { text: 'ビール', type: 'noun' },
          { text: 'でも', type: 'particle', note: '...or something' },
          { text: '飲みませんか', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'もう', type: 'adverb' },
          { text: '帰らない', type: 'predicate', note: 'Nai-form' },
          { text: 'と', type: 'particle', note: 'Contracted (Must)' },
        ]
      }
    ]
  }
];

export const LESSON_22_GRAMMAR: GrammarExample[] = [
  {
    id: 'l22-rule1',
    type: 'static',
    formula: 'Sentence (Plain Form) + Noun',
    explanation: 'In Japanese, a whole sentence can modify a noun. The predicate of the modifying sentence must be in the plain form.',
    examples: [
      {
        primary: 'これはミラーさんが住んでいたうちです。',
        englishPrimary: 'This is the house where Mr. Miller lived.',
        romajiPrimary: 'Kore wa Mirā-san ga sundeita uchi desu.',
        tokens: [
          { text: 'これ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'ミラーさん', type: 'noun' },
          { text: 'が', type: 'particle', note: 'Subject in modifying clause' },
          { text: '住んでいた', type: 'predicate', note: 'Plain Past (modifying)' },
          { text: 'うち', type: 'noun', note: 'Modified Noun' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l22-rule2',
    type: 'toggle',
    formula: 'Noun Modification (Negative/State)',
    explanation: 'Negative forms and adjectives can also modify nouns using plain forms.',
    examples: [
      {
        primary: '京都へ行かない人',
        secondary: '背が高くて、髪が黒い人',
        englishPrimary: 'A person who does not go to Kyoto',
        englishSecondary: 'A person who is tall and has black hair',
        romajiPrimary: 'Kyōto e ikanai hito',
        romajiSecondary: 'Sega takakute, kami ga kuroi hito.',
        tokens: [
          { text: '京都', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '行かない', type: 'predicate', note: 'Plain Negative' },
          { text: '人', type: 'noun' },
        ],
        tokensSecondary: [
          { text: '背', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '高くて', type: 'adjective', note: 'Te-form (linking)' },
          { text: '、', type: 'text' },
          { text: '髪', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '黒い', type: 'adjective' },
          { text: '人', type: 'noun' },
        ]
      }
    ]
  },
  {
    id: 'l22-rule3',
    type: 'static',
    formula: 'N (Subject) が',
    explanation: 'When a sentence modifies a noun, the subject of that modifying sentence is indicated by [が], not [は].',
    examples: [
      {
        primary: 'これはミラーさんが作ったケーキです。',
        englishPrimary: 'This is the cake which Mr. Miller baked.',
        romajiPrimary: 'Kore wa Mirā-san ga tsukutta kēki desu.',
        tokens: [
          { text: 'これ', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'ミラーさん', type: 'noun' },
          { text: 'が', type: 'particle', note: 'Substitutes [は]' },
          { text: '作った', type: 'predicate', note: 'Baked (Plain)' },
          { text: 'ケーキ', type: 'noun' },
          { text: 'です', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l22-rule4',
    type: 'toggle',
    formula: 'V-dict + [ 時間 / 約束 / 用事 ]',
    explanation: 'Used to express time, an appointment, or an errand to do something.',
    examples: [
      {
        primary: '朝ごはんを食べる時間がありません。',
        secondary: '友達と映画を見る約束があります。',
        englishPrimary: 'I have no time to eat breakfast.',
        englishSecondary: 'I have an arrangement to see a movie with a friend.',
        romajiPrimary: 'Asagohan o taberu jikan ga arimasen.',
        romajiSecondary: 'Tomodachi to eiga o miru yakusoku ga arimasu.',
        tokens: [
          { text: '朝ごはん', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '食べる', type: 'predicate', note: 'Dict. Form' },
          { text: '時間', type: 'noun', note: 'Time' },
          { text: 'が', type: 'particle' },
          { text: 'ありません', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '友達', type: 'noun' },
          { text: 'と', type: 'particle' },
          { text: '映画', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '見る', type: 'predicate', note: 'Dict. Form' },
          { text: '約束', type: 'noun', note: 'Promise/Appointment' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_23_GRAMMAR: GrammarExample[] = [
  {
    id: 'l23-rule1',
    type: 'toggle',
    formula: '[V/Adj/N] + とき',
    explanation: 'Means "When...". The form depends on the type of word modifying [toki].',
    examples: [
      {
        primary: '新聞を読むとき、眼鏡をかけます。',
        secondary: '暇なとき、映画を見ます。',
        englishPrimary: 'I wear glasses when reading newspapers.',
        englishSecondary: 'When I have free time, I watch movies.',
        romajiPrimary: 'Shinbun o yomu toki, megane o kakemasu.',
        romajiSecondary: 'Hima na toki, eiga o mimasu.',
        tokens: [
          { text: '新聞', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '読む', type: 'predicate', note: 'Dict. Form' },
          { text: 'とき', type: 'phrase', note: 'When' },
          { text: '、', type: 'text' },
          { text: '眼鏡', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: 'かけます', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '暇', type: 'adjective' },
          { text: 'な', type: 'particle', note: 'Na-adj' },
          { text: 'とき', type: 'phrase' },
          { text: '、', type: 'text' },
          { text: '映画', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '見ます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l23-rule2',
    type: 'toggle',
    formula: 'V-dict vs V-ta + とき',
    explanation: 'V-dict + toki: Action not ended. V-ta + toki: Action already ended.',
    examples: [
      {
        primary: '東京へ行くとき、かばんを買いました。',
        secondary: '東京へ行ったとき、かばんを買いました。',
        englishPrimary: 'I bought the bag on the way to Tokyo.',
        englishSecondary: 'I bought the bag after arriving in Tokyo.',
        romajiPrimary: 'Tōkyō e iku toki, kaban o kaimashita.',
        romajiSecondary: 'Tōkyō e itta toki, kaban o kaimashita.',
        tokens: [
          { text: '東京', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '行く', type: 'predicate', note: 'Going (uncompleted)' },
          { text: 'とき', type: 'phrase' },
        ],
        tokensSecondary: [
          { text: '東京', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '行った', type: 'predicate', note: 'Went (completed)' },
          { text: 'とき', type: 'phrase' },
        ]
      }
    ]
  },
  {
    id: 'l23-rule3',
    type: 'toggle',
    formula: 'V-dict + と, ~',
    explanation: 'Describes an inevitable result of an action (If/When you do X, Y happens).',
    examples: [
      {
        primary: 'このボタンを押すと、お釣りが出ます。',
        secondary: '右へ曲がると、郵便局があります。',
        englishPrimary: 'If you press this button, change comes out.',
        englishSecondary: 'If you turn right, there is a post office.',
        romajiPrimary: 'Kono botan o osu to, otsuri ga demasu.',
        romajiSecondary: 'Migi e magaru to, yuubinkyoku ga arimasu.',
        tokens: [
          { text: 'ボタン', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '押す', type: 'predicate', note: 'Dict. Form' },
          { text: 'と', type: 'particle', note: 'If/When' },
          { text: '、', type: 'text' },
          { text: 'お釣り', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: '出ます', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '右', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '曲がる', type: 'predicate' },
          { text: 'と', type: 'particle', note: 'Conditional' },
          { text: '、', type: 'text' },
          { text: '郵便局', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: 'あります', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l23-rule4',
    type: 'static',
    formula: 'Noun が Adjective/Verb',
    explanation: 'Used to describe natural phenomena, states, or situations.',
    examples: [
      {
        primary: '電気が明るくなりました。',
        englishPrimary: 'The light became bright.',
        romajiPrimary: 'Denki ga akaruku narimashita.',
        tokens: [
          { text: '電気', type: 'noun' },
          { text: 'が', type: 'particle', note: 'State Marker' },
          { text: '明るく', type: 'adjective' },
          { text: 'なりました', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l23-rule5',
    type: 'static',
    formula: 'Noun (Place) を Verb',
    explanation: 'Indicates the location where a person or object passes through or along.',
    examples: [
      {
        primary: '公園を散歩します。',
        englishPrimary: 'I walk in the park.',
        romajiPrimary: 'Kōen o sanpo shimasu.',
        tokens: [
          { text: '公園', type: 'noun' },
          { text: 'を', type: 'particle', note: 'Path/Space' },
          { text: '散歩します', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_24_GRAMMAR: GrammarExample[] = [
  {
    id: 'l24-rule1',
    type: 'toggle',
    formula: 'くれます (kuremasu)',
    explanation: 'Used when someone gives something to the speaker or their family. Contrast with [agemasu] (giving to others).',
    examples: [
      {
        primary: '佐藤さんはわたしに花をくれました。',
        secondary: '佐藤さんは妹にお菓子をくれました。',
        englishPrimary: 'Ms. Sato gave me flowers.',
        englishSecondary: 'Ms. Sato gave my younger sister some sweets.',
        romajiPrimary: 'Satō-san wa watashi ni hana o kuremashita.',
        romajiSecondary: 'Satō-san wa imōto ni okashi o kuremashita.',
        tokens: [
          { text: '佐藤さん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'わたし', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '花', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: 'くれました', type: 'predicate', note: 'Gave (to me)' },
        ],
        tokensSecondary: [
          { text: '佐藤さん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '妹', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: 'お菓子', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: 'くれました', type: 'predicate', note: 'Gave (to family)' },
        ]
      }
    ]
  },
  {
    id: 'l24-rule2',
    type: 'toggle',
    formula: 'て + あげます / もらいます / くれます',
    explanation: 'Used to express doing/receiving favors. [agemasu] = for others, [moraimasu] = receive favor (recipient subject), [kuremasu] = do for me (giver subject).',
    examples: [
      {
        primary: 'わたしはおじいさんに道を教えてあげました。',
        secondary: 'わたしは友達にケーキを作ってもらいました。',
        englishPrimary: 'I showed the way to an elderly man.',
        englishSecondary: 'I had my friend make a cake for me.',
        romajiPrimary: 'Watashi wa ojiisan ni michi o oshiete agemashita.',
        romajiSecondary: 'Watashi wa tomodachi ni kēki o tsukutte moraimashita.',
        tokens: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: 'おじいさん', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '道', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '教えて', type: 'predicate', note: 'Te-form' },
          { text: 'あげました', type: 'predicate', note: 'Did for (favor)' },
        ],
        tokensSecondary: [
          { text: 'わたし', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '友達', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '作って', type: 'predicate' },
          { text: 'もらいました', type: 'predicate', note: 'Received favor' },
        ]
      }
    ]
  },
  {
    id: 'l24-rule3',
    type: 'static',
    formula: 'V-て + くれます',
    explanation: 'Someone does something for the speaker (Subject is the giver). Expresses appreciation.',
    examples: [
      {
        primary: '佐藤さんは宿題を出してくれました。',
        englishPrimary: 'Ms. Sato submitted the assignment for me.',
        romajiPrimary: 'Satō-san wa shukudai o dashite kuremashita.',
        tokens: [
          { text: '佐藤さん', type: 'noun' },
          { text: 'は', type: 'particle' },
          { text: '宿題', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '出して', type: 'predicate' },
          { text: 'くれました', type: 'predicate', note: 'Did for me' },
        ]
      }
    ]
  },
  {
    id: 'l24-rule4',
    type: 'toggle',
    formula: 'Question Word + が',
    explanation: 'In questions where the interrogative is the subject, [が] must be used instead of [は].',
    examples: [
      {
        primary: 'だれが手伝いに行きますか。',
        secondary: 'カリナさんが行きます。',
        englishPrimary: 'Who will go to help?',
        englishSecondary: 'Karina will go.',
        romajiPrimary: 'Dare ga tetsudai ni ikimasu ka.',
        romajiSecondary: 'Karina-san ga ikimasu.',
        tokens: [
          { text: 'だれ', type: 'noun', note: 'Question Word' },
          { text: 'が', type: 'particle', note: 'Subject Marker' },
          { text: '手伝い', type: 'noun' },
          { text: 'に', type: 'particle' },
          { text: '行きますか', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'カリナさん', type: 'noun' },
          { text: 'が', type: 'particle', note: 'New Info/Specific' },
          { text: '行きます', type: 'predicate' },
        ]
      }
    ]
  }
];

export const LESSON_25_GRAMMAR: GrammarExample[] = [
  {
    id: 'l25-rule1',
    type: 'toggle',
    formula: 'V-ta / Adj / N + ら',
    explanation: 'Means "If" or "Suppose...". Formed by adding [ra] to the past plain form.',
    examples: [
      {
        primary: 'お金があったら、旅行します。',
        secondary: '暇だったら、手伝ってください。',
        englishPrimary: 'If I had money, I would travel.',
        englishSecondary: 'If you have free time, please help me.',
        romajiPrimary: 'Kane ga attara, ryokou shimasu.',
        romajiSecondary: 'Hima dattara, tetsudatte kudasai.',
        tokens: [
          { text: 'お金', type: 'noun' },
          { text: 'が', type: 'particle' },
          { text: 'あった', type: 'predicate', note: 'Plain Past' },
          { text: 'ら', type: 'particle', note: 'If' },
          { text: '、', type: 'text' },
          { text: '旅行します', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '暇', type: 'adjective' },
          { text: 'だっ', type: 'particle', note: 'Na-adj/Noun past' },
          { text: 'た', type: 'particle' },
          { text: 'ら', type: 'particle' },
          { text: '、', type: 'text' },
          { text: '手伝って', type: 'predicate' },
          { text: 'ください', type: 'phrase' },
        ]
      }
    ]
  },
  {
    id: 'l25-rule2',
    type: 'static',
    formula: 'V-た + ら',
    explanation: 'Means "When" or "After". Indicates that an action will occur after a presumed event is completed.',
    examples: [
      {
        primary: 'うちへ帰ったら、すぐシャワーを浴びます。',
        englishPrimary: 'When I get home, I will take a shower immediately.',
        romajiPrimary: 'Uchi e kaettara, sugu shawaa o abimasu.',
        tokens: [
          { text: 'うち', type: 'noun' },
          { text: 'へ', type: 'particle' },
          { text: '帰ったら', type: 'predicate', note: 'After returning' },
          { text: '、', type: 'text' },
          { text: 'すぐ', type: 'adverb' },
          { text: 'シャワー', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: '浴びます', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l25-rule3',
    type: 'toggle',
    formula: 'V-て / Adj / N + も',
    explanation: 'Means "Although" or "Even if". Expresses actions contrary to expectations.',
    examples: [
      {
        primary: '高くても、このラジカセを買いたいです。',
        secondary: '日曜日でも、仕事をします。',
        englishPrimary: 'Even if it is expensive, I want to buy this radio.',
        englishSecondary: 'Even if it is Sunday, I still work.',
        romajiPrimary: 'Takakutemo, kono rajikase o kaitai desu.',
        romajiSecondary: 'Nichiyoubi demo, shigoto o shimasu.',
        tokens: [
          { text: '高く', type: 'adjective' },
          { text: 'て', type: 'particle', note: 'Te-form' },
          { text: 'も', type: 'particle', note: 'Even if' },
          { text: '、', type: 'text' },
          { text: '買いたいです', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: '日曜日', type: 'noun' },
          { text: 'で', type: 'particle', note: 'Noun + demo' },
          { text: 'も', type: 'particle' },
          { text: '、', type: 'text' },
          { text: '仕事', type: 'noun' },
          { text: 'を', type: 'particle' },
          { text: 'します', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l25-rule4',
    type: 'toggle',
    formula: 'もし / いくら',
    explanation: '[もし] emphasizes the hypothesis (if). [いくら] emphasizes the degree (no matter how much).',
    examples: [
      {
        primary: 'もし１億円あったら、旅行したいです。',
        secondary: 'いくら考えても、わかりません。',
        englishPrimary: 'If I had 100 million yen, I would want to travel.',
        englishSecondary: 'No matter how much I think, I do not understand.',
        romajiPrimary: 'Moshi ichiokuen attara, ryokou shitai desu.',
        romajiSecondary: 'Ikura kangaetemo, wakarimasen.',
        tokens: [
          { text: 'もし', type: 'adverb', note: 'Emphasis (Hypothesis)' },
          { text: '１億円', type: 'noun' },
          { text: 'あったら', type: 'predicate' },
        ],
        tokensSecondary: [
          { text: 'いくら', type: 'adverb', note: 'Emphasis (Degree)' },
          { text: '考えて', type: 'predicate' },
          { text: 'も', type: 'particle' },
          { text: '、', type: 'text' },
          { text: 'わかりません', type: 'predicate' },
        ]
      }
    ]
  },
  {
    id: 'l25-rule5',
    type: 'static',
    formula: 'Sub-clause Subject marker [が]',
    explanation: 'Reiterates that the subject in any subordinate clause (toki, ra, demo, etc.) is marked by [が].',
    examples: [
      {
        primary: '友達が来る前に、部屋を掃除します。',
        englishPrimary: 'Before my friend comes, I clean the room.',
        romajiPrimary: 'Tomodachi ga kuru mae ni, heya o souji shimasu.',
        tokens: [
          { text: '友達', type: 'noun' },
          { text: 'が', type: 'particle', note: 'Sub-clause Subject' },
          { text: '来る', type: 'predicate' },
          { text: '前', type: 'noun' },
          { text: 'に', type: 'particle' },
        ]
      }
    ]
  }
];

