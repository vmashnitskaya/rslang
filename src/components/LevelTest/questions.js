const questions = [
    {
        question: 'I ________________ from France.',
        answers: ['is', 'are', 'am', 'be'],
        correctAnswer: 'am',
    },
    {
        question: 'This is my friend. _____________ name is Peter.',
        answers: ['Her', 'Our', 'Yours', 'His'],
        correctAnswer: 'His',
    },
    {
        question: 'Mike is ______________.',
        answers: [
            'my sister’s friend',
            'friend my sister',
            'friend from my sister',
            'my sister friend’s',
        ],
        correctAnswer: 'my sister’s friend',
    },
    {
        question: 'My brother is ______________ artist.',
        answers: ['the', 'an', 'a', '-'],
        correctAnswer: 'an',
    },
    {
        question: '_______________ 20 desks in the classroom.',
        answers: ['This is', 'There is', 'They are', 'There are'],
        correctAnswer: 'There are',
    },
    {
        question: 'Paul ________________ romantic films.',
        answers: ['likes not', 'don’t like', 'doesn’t like', 'isn’t likes'],
        correctAnswer: 'doesn’t like',
    },
    {
        question: 'Sorry, I can’t talk. I _____________ right now.',
        answers: ['driving', '‘m driving', 'drives', 'drive'],
        correctAnswer: '‘m driving',
    },
    {
        question: 'She _________________ at school last week.',
        answers: ["didn't be", 'weren’t', 'wasn’t', 'isn’t'],
        correctAnswer: 'wasn’t',
    },
    {
        question: 'I _________________ the film last night.',
        answers: ['like', 'likes', 'liking', 'liked'],
        correctAnswer: 'liked',
    },
    {
        question: '__________________ a piece of cake? No, thank you.',
        answers: ['Do you like', 'Would you like', 'Want you', 'Are you like'],
        correctAnswer: 'Would you like',
    },
    {
        question: 'The living room is ___________________ than the bedroom.',
        answers: ['dmore big', 'more bigger', 'biggest', 'bigger'],
        correctAnswer: 'bigger',
    },
    {
        question: 'The car is very old. We’re going ____________________ a new car soon.',
        answers: ['to buy', 'buying', 'to will buy', 'buy'],
        correctAnswer: 'to buy',
    },
    {
        question: 'Jane is a vegetarian. She ____________________ meat.',
        answers: ['sometimes eats', 'never eats', 'often eats', 'usually eats'],
        correctAnswer: 'never eats',
    },
    {
        question: 'There aren’t ________________ buses late in the evening.',
        answers: ['some', 'any', 'no', 'a'],
        correctAnswer: 'any',
    },
    {
        question: 'The car park is _________________ to the restaurant.',
        answers: ['next', 'opposite', 'behind', 'in front'],
        correctAnswer: 'next',
    },
    {
        question: 'Sue ________________ shopping every day.',
        answers: ['is going', 'go', 'going', 'goes'],
        correctAnswer: 'goes',
    },
    {
        question: 'They _________________ in the park when it started to rain heavily.',
        answers: ['walked', 'were walking', 'were walk', 'are walking'],
        correctAnswer: 'were walking',
    },
    {
        question: '________________ seen fireworks before?',
        answers: ['Did you ever', 'Are you ever', 'Have you ever', 'Do you ever'],
        correctAnswer: 'Have you ever',
    },
    {
        question: 'We’ve been friends ____________________ many years.',
        answers: ['since', 'from', 'during', 'for'],
        correctAnswer: 'for',
    },
    {
        question: 'You _________________ pay for the tickets. They’re free.',
        answers: ['have to', 'don’t have', 'don’t need to', 'doesn’t have to'],
        correctAnswer: 'don’t need to',
    },
    {
        question: 'Jeff was ill last week and he _________________ go out.',
        answers: ["needn't", 'can’t', 'mustn’t', 'couldn’t'],
        correctAnswer: 'couldn’t',
    },
    {
        question: 'These are the photos ________________ I took on holiday.',
        answers: ['which', 'who', 'what', 'where'],
        correctAnswer: 'which',
    },
    {
        question: 'We’ll stay at home if it _______________ this afternoon.',
        answers: ['raining', 'rains', 'will rain', 'rain'],
        correctAnswer: 'rains',
    },
    {
        question: 'He doesn’t smoke now, but he __________________ a lot when he was young.',
        answers: ['has smoked', 'smokes', 'used to smoke', 'was smoked'],
        correctAnswer: 'used to smoke',
    },
    {
        question: 'Mark plays football ___________________ anyone else I know',
        answers: ['more good than', 'as better as', 'best than', 'better than'],
        correctAnswer: 'better than',
    },
    {
        question: 'I promise I __________________ you as soon as I’ve finished this cleaning.',
        answers: ['will help', 'am helping', 'going to help', 'have helped'],
        correctAnswer: 'will help',
    },
    {
        question: 'This town ___________________ by lots of tourists during the summer.',
        answers: ['visits', 'visited', 'is visiting', 'is visited'],
        correctAnswer: 'is visited',
    },
    {
        question:
            'He said that his friends ____________ to speak to him after they lost the football match.',
        answers: ['not want', 'weren’t', 'didn’t want', 'aren’t wanting'],
        correctAnswer: 'didn’t want',
    },
    {
        question: 'How about _________________ to the cinema tonight?',
        answers: ['going', 'go', 'to go', 'for going'],
        correctAnswer: 'going',
    },
    {
        question: 'Excuse me, can you ___________________ me the way to the station, please?',
        answers: ['give', 'take', 'tell', 'say'],
        correctAnswer: 'tell',
    },
    {
        question: 'I wasn’t interested in the performance very much. ________________.',
        answers: ['I didn’t, too.', 'Neither was I.', 'Nor I did.', 'So I wasn’t.'],
        correctAnswer: 'Neither was I.',
    },
    {
        question: 'Take a warm coat, _______________ you might get very cold outside.',
        answers: ['otherwise', 'in case', 'so that', 'in order to'],
        correctAnswer: 'otherwise',
    },
    {
        question: '__________________ this great book and I can’t wait to see how it ends.',
        answers: ['I don’t read', 'I’ve read', 'I’ve been reading', 'I read'],
        correctAnswer: 'I’ve been reading',
    },
    {
        question: 'What I like more than anything else ___________________ at weekends.',
        answers: ['playing golf', 'to play golf', 'is playing golf', 'is play golf'],
        correctAnswer: 'is playing golf',
    },
    {
        question:
            'She ________________ for her cat for two days when she finally found it in the garage.',
        answers: ['looked', 'had been looked', 'had been looking', 'were looking'],
        correctAnswer: 'had been looking',
    },
    {
        question: 'We won’t catch the plane _________________ we leave home now! Please hurry up!',
        answers: ['if', 'providing that', 'except', 'unless'],
        correctAnswer: 'unless',
    },
    {
        question: 'If I hadn’t replied to your email, I___________________ here with you now.',
        answers: ['can’t be', 'wouldn’t be', 'won’t be', 'haven’t been'],
        correctAnswer: 'wouldn’t be',
    },
    {
        question:
            'Do you think you ___________________ with my mobile phone soon? I need to make a call.',
        answers: ['finish', 'are finishing', 'will have finished', 'are finished'],
        correctAnswer: 'will have finished',
    },
    {
        question: 'I don’t remember mentioning __________________ dinner together tonight.',
        answers: ['go for', 'you going to', 'to go for', 'going for'],
        correctAnswer: 'going for',
    },
    {
        question: 'Was it Captain Cook ______________ New Zealand?',
        answers: ['who discovered', 'discovered', 'that discover', 'who was discovering'],
        correctAnswer: 'who discovered',
    },
    {
        question:
            'You may not like the cold weather here, but you’ll have to ________________, I’m afraid.',
        answers: ['tell it off', 'sort itself out', 'put up with it', 'put it off'],
        correctAnswer: 'put up with it',
    },
    {
        question: 'It’s cold so you should __________________ on a warm jacket.',
        answers: ['put', 'wear', 'dress', 'take'],
        correctAnswer: 'put',
    },
    {
        question: 'Paul will look ______________ our dogs while we’re on holiday.',
        answers: ['at', 'for', 'into', 'after'],
        correctAnswer: 'after',
    },
    {
        question: 'She ___________________ a lot of her free time reading.',
        answers: ['does', 'spends', 'has', 'makes'],
        correctAnswer: 'spends',
    },
    {
        question: 'Hello, this is Simon. Could I ___________________ to Jane, please?',
        answers: ['say', 'tell', 'call', 'speak'],
        correctAnswer: 'speak',
    },
    {
        question: 'They’re coming to our house ___________________ Saturday.',
        answers: ['in', 'at', 'on', 'with'],
        correctAnswer: 'on',
    },
    {
        question: 'I think it’s very easy to ___________ debt these days.',
        answers: ['go into', 'become', 'go down to', 'get into'],
        correctAnswer: 'get into',
    },
    {
        question: 'Come on! Quick! Let’s get _____________!',
        answers: ['highlight', 'cracking', 'massive', 'with immediate effect'],
        correctAnswer: 'cracking',
    },
    {
        question: 'I phoned her ____________ I heard the news.',
        answers: ['minute', 'during', 'by the time', 'the moment'],
        correctAnswer: 'the moment',
    },
    {
        question: 'I feel very ____________. I’m going to go to bed!',
        answers: ['nap', 'asleep', 'sleepy', 'sleeper'],
        correctAnswer: 'sleepy',
    },
];

export default questions;
