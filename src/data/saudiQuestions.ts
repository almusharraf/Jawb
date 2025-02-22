export const saudiQuestions = {
  categories: [
    {
      id: 'saudi-food',
      name: 'الأكلات الشعبية',
      icon: '🥘',
      questions: [
        {
          id: 'food-1',
          text: 'ما هو طبق الكبسة التقليدي؟',
          options: [
            { id: 1, text: 'أرز مع لحم', isCorrect: true },
            { id: 2, text: 'أرز مع دجاج', isCorrect: false },
            { id: 3, text: 'معكرونة', isCorrect: false },
            { id: 4, text: 'برياني', isCorrect: false }
          ],
          difficulty: 'easy',
          points: 100
        },
        {
          id: 'food-2',
          text: 'ما هو المطبق؟',
          options: [
            { id: 1, text: 'خبز محشي باللحم', isCorrect: true },
            { id: 2, text: 'حلويات', isCorrect: false },
            { id: 3, text: 'شوربة', isCorrect: false },
            { id: 4, text: 'سلطة', isCorrect: false }
          ],
          difficulty: 'medium',
          points: 300
        },
        {
          id: 'food-3',
          text: 'ما هو طبق الجريش؟',
          options: [
            { id: 1, text: 'حبوب القمح المجروشة', isCorrect: true },
            { id: 2, text: 'أرز بالخضار', isCorrect: false },
            { id: 3, text: 'لحم مشوي', isCorrect: false },
            { id: 4, text: 'حلويات', isCorrect: false }
          ],
          difficulty: 'hard',
          points: 500
        }
      ]
    },
    {
      id: 'saudi-landmarks',
      name: 'المعالم والمدن',
      icon: '🏰',
      questions: [
        {
          id: 'landmarks-1',
          text: 'أين يقع برج المملكة؟',
          options: [
            { id: 1, text: 'الرياض', isCorrect: true },
            { id: 2, text: 'جدة', isCorrect: false },
            { id: 3, text: 'الدمام', isCorrect: false },
            { id: 4, text: 'مكة', isCorrect: false }
          ],
          difficulty: 'easy',
          points: 100
        },
        {
          id: 'landmarks-2',
          text: 'ما هي مدينة نيوم؟',
          options: [
            { id: 1, text: 'مشروع مدينة مستقبلية', isCorrect: true },
            { id: 2, text: 'مدينة قديمة', isCorrect: false },
            { id: 3, text: 'منتجع سياحي', isCorrect: false },
            { id: 4, text: 'مركز تجاري', isCorrect: false }
          ],
          difficulty: 'medium',
          points: 300
        },
        {
          id: 'landmarks-3',
          text: 'أين تقع مدائن صالح؟',
          options: [
            { id: 1, text: 'العلا', isCorrect: true },
            { id: 2, text: 'تبوك', isCorrect: false },
            { id: 3, text: 'نجران', isCorrect: false },
            { id: 4, text: 'جازان', isCorrect: false }
          ],
          difficulty: 'hard',
          points: 500
        }
      ]
    },
    {
      id: 'saudi-history',
      name: 'التاريخ السعودي',
      icon: '👑',
      questions: [
        {
          id: 'history-1',
          text: 'متى تأسست المملكة العربية السعودية الحديثة؟',
          options: [
            { id: 1, text: '1932', isCorrect: true },
            { id: 2, text: '1925', isCorrect: false },
            { id: 3, text: '1940', isCorrect: false },
            { id: 4, text: '1950', isCorrect: false }
          ],
          difficulty: 'easy',
          points: 100
        },
        {
          id: 'history-2',
          text: 'من هو أول ملك للمملكة العربية السعودية؟',
          options: [
            { id: 1, text: 'الملك عبدالعزيز', isCorrect: true },
            { id: 2, text: 'الملك سعود', isCorrect: false },
            { id: 3, text: 'الملك فيصل', isCorrect: false },
            { id: 4, text: 'الملك خالد', isCorrect: false }
          ],
          difficulty: 'medium',
          points: 300
        },
        {
          id: 'history-3',
          text: 'متى تم اكتشاف النفط في المملكة؟',
          options: [
            { id: 1, text: '1938', isCorrect: true },
            { id: 2, text: '1950', isCorrect: false },
            { id: 3, text: '1945', isCorrect: false },
            { id: 4, text: '1960', isCorrect: false }
          ],
          difficulty: 'hard',
          points: 500
        }
      ]
    },
    {
      id: 'saudi-culture',
      name: 'الثقافة السعودية',
      icon: '🎭',
      questions: [
        {
          id: 'culture-1',
          text: 'ما هي العرضة السعودية؟',
          options: [
            { id: 1, text: 'رقصة شعبية تقليدية', isCorrect: true },
            { id: 2, text: 'أكلة شعبية', isCorrect: false },
            { id: 3, text: 'لباس تقليدي', isCorrect: false },
            { id: 4, text: 'احتفال ديني', isCorrect: false }
          ],
          difficulty: 'easy',
          points: 100
        },
        {
          id: 'culture-2',
          text: 'ما هو المجلس؟',
          options: [
            { id: 1, text: 'مكان للاجتماعات العائلية', isCorrect: true },
            { id: 2, text: 'مطعم شعبي', isCorrect: false },
            { id: 3, text: 'سوق تجاري', isCorrect: false },
            { id: 4, text: 'ملعب رياضي', isCorrect: false }
          ],
          difficulty: 'medium',
          points: 300
        },
        {
          id: 'culture-3',
          text: 'ما هو القط العسيري؟',
          options: [
            { id: 1, text: 'فن الرسم على الجدران', isCorrect: true },
            { id: 2, text: 'نوع من القطط', isCorrect: false },
            { id: 3, text: 'طبق تقليدي', isCorrect: false },
            { id: 4, text: 'رقصة شعبية', isCorrect: false }
          ],
          difficulty: 'hard',
          points: 500
        }
      ]
    },
    {
      id: 'saudi-geography',
      name: 'الجغرافيا',
      icon: '🗺️',
      questions: [
        // Add similar structure for geography questions
      ]
    },
    {
      id: 'saudi-economy',
      name: 'الاقتصاد',
      icon: '💰',
      questions: [
        // Add similar structure for economy questions
      ]
    }
  ]
}; 