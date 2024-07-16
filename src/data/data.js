export const PRODUCTS = [
    {
      _links: [
        { rel: 'resizedImage', href: 'https://static.mammut.com/{size}/{identifier}' },
        { rel: 'file', href: 'https://static.mammut.com/file/{identifier}' }
      ],
      productNumber: '1017-04502',
      productName: 'Mountain T-Shirt Men Finsteraarhorn',
      productGroup: { code: '101703', description: '[101703] T-Shirts' },
      gender: { code: 'Male', description: 'Herren' },
      colors: ['savannah', 'dark jade', 'deep ice'],
      waterproof: 'no',
    },
    {
      _links: [
        { rel: 'resizedImage', href: 'https://static.mammut.com/{size}/{identifier}' },
        { rel: 'file', href: 'https://static.mammut.com/file/{identifier}' }
      ],
      productNumber: '1023-06702',
      productName: 'Mountain T-Shirt Women Eiger',
      productGroup: { code: '102306', description: '[102306] T-Shirts' },
      gender: { code: 'Female', description: 'Damen' },
      colors: ['red', 'blue', 'black'],
      waterproof: 'no',
    },
    {
      _links: [
        { rel: 'resizedImage', href: 'https://static.mammut.com/{size}/{identifier}' },
        { rel: 'file', href: 'https://static.mammut.com/file/{identifier}' }
      ],
      productNumber: '1017-04503',
      productName: 'Hiking T-Shirt Men Finsteraarhorn',
      productGroup: { code: '101703', description: '[101703] T-Shirts' },
      gender: { code: 'Male', description: 'Herren' },
      colors: ['blue', 'green', 'yellow'],
      waterproof: 'yes',
    },
    {
      _links: [
        { rel: 'resizedImage', href: 'https://static.mammut.com/{size}/{identifier}' },
        { rel: 'file', href: 'https://static.mammut.com/file/{identifier}' }
      ],
      productNumber: '1023-06703',
      productName: 'Hiking T-Shirt Women Jungfrau',
      productGroup: { code: '102306', description: '[102306] T-Shirts' },
      gender: { code: 'Female', description: 'Damen' },
      colors: ['pink', 'purple', 'white'],
      waterproof: 'yes',
    },
    {
      _links: [
        { rel: 'resizedImage', href: 'https://static.mammut.com/{size}/{identifier}' },
        { rel: 'file', href: 'https://static.mammut.com/file/{identifier}' }
      ],
      productNumber: '1017-04504',
      productName: 'Climbing T-Shirt Men Matterhorn',
      productGroup: { code: '101703', description: '[101703] T-Shirts' },
      gender: { code: 'Male', description: 'Herren' },
      colors: ['gray', 'black', 'white'],
      waterproof: 'no',
    },
    {
      _links: [
        { rel: 'resizedImage', href: 'https://static.mammut.com/{size}/{identifier}' },
        { rel: 'file', href: 'https://static.mammut.com/file/{identifier}' }
      ],
      productNumber: '1023-06704',
      productName: 'Climbing T-Shirt Women Mönch',
      productGroup: { code: '102306', description: '[102306] T-Shirts' },
      gender: { code: 'Female', description: 'Damen' },
      colors: ['yellow', 'blue', 'red'],
      waterproof: 'yes',
    }
  ];
  
  export const INITIAL_STEPS = [
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