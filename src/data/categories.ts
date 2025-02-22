export const saudiCategories = [
  {
    id: 'saudi-food',
    name: 'الأكلات الشعبية',
    difficulty: 'medium',
    questions: [
      {
        id: 'food-1',
        text: 'ما اسم الطبق الشعبي الذي يُقدَّم في المناسبات ويتكون من الأرز واللحم؟',
        options: [
          { id: 1, text: 'المندي', isCorrect: false },
          { id: 2, text: 'الكبسة', isCorrect: true },
          { id: 3, text: 'الجريش', isCorrect: false }
        ],
        difficulty: 'easy',
        points: 100,
        timeBonus: 20
      },
      // Add more questions following the same structure
    ]
  },
  {
    id: 'saudi-cities',
    name: 'المناطق والمدن',
    difficulty: 'medium',
    questions: [
      {
        id: 'cities-1',
        text: 'في أي مدينة يقع برج المملكة الشهير؟',
        options: [
          { id: 1, text: 'الرياض', isCorrect: true },
          { id: 2, text: 'جدة', isCorrect: false },
          { id: 3, text: 'الدمام', isCorrect: false }
        ],
        difficulty: 'easy',
        points: 100,
        timeBonus: 15
      }
    ]
  }
  // Add other categories...
]; 