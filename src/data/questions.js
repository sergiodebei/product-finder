export const QUESTIONS = [
    {
      question: 'What gender do you prefer?',
      key: 'gender.code',
      weight: 1
    },
    {
      question: 'What color do you like?',
      key: 'colors',
      weight: 1,
      multiple: true, 
      maxOptions: 3 // Maximum number of options that can be selected
    },
    {
      question: 'Do you prefer waterproof products?',
      key: 'waterproof',
      weight: 2
    },
    {
      question: 'Review your preferences and submit:',
      key: '',
      weight: 0
    }
  ];