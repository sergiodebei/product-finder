import { useState } from 'react';

const PRODUCTS = [
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
    quizScore: 0
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
    quizScore: 0
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
    quizScore: 0
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
    quizScore: 0
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
    quizScore: 0
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
    quizScore: 0
  }
];

// TODO: for each steps we need to collect options fromt the products
// priority on the steps (to update the score) - diffent scorevalue based on the step  (gender 10, waterproof 3)

const STEPS = [
  {
    question: 'What gender do you prefer?',
    options: ['Male', 'Female'],
    key: 'gender'
  },
  {
    question: 'What color do you like?',
    options: ['savannah', 'dark jade', 'deep ice', 'red', 'blue', 'black', 'green', 'yellow', 'pink', 'purple', 'white', 'gray'],
    key: 'color'
  },
  {
    question: 'Do you prefer waterproof products?',
    options: ['yes', 'no'],
    key: 'waterproof'
  },
  {
    question: 'Review your preferences and submit:',
    options: [],
    key: ''
  }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userSelections, setUserSelections] = useState({});
  const [result, setResult] = useState([]);

  const handleOptionClick = (key, value) => {
    setUserSelections(prevSelections => ({
      ...prevSelections,
      [key]: value
    }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }

  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { gender, color, waterproof } = userSelections;
    
    PRODUCTS.forEach(product => product.quizScore = 0);

    const askQuestion = (filterFn, answer) => {
      PRODUCTS.forEach(product => {
        if (filterFn(product, answer)) {
          product.quizScore += 1;
        }
      });
    };

    // TODO: make it dynamic based on the key 'gender.code'
    askQuestion((product, answer) => product.gender.code.toLowerCase() === answer.toLowerCase(), gender);
    askQuestion((product, answer) => product.colors.includes(answer.toLowerCase()), color);
    askQuestion((product, answer) => product.waterproof === answer.toLowerCase(), waterproof);

    const maxScore = Math.max(...PRODUCTS.map(product => product.quizScore));
    const bestProducts = PRODUCTS.filter(product => product.quizScore === maxScore);


    setResult(bestProducts);
  };

  const handleReset = () => {
    setUserSelections({});
    setCurrentStep(0);
    setResult([]);
    PRODUCTS.forEach(product => product.quizScore = 0);
  };

  return (
<div>
      <form onSubmit={handleFormSubmit}>
        {STEPS.map((step, index) => (
          <fieldset key={index} style={{ display: currentStep === index ? 'block' : 'none' }} data-step={step.key}>
            <h2>{step.question}</h2>
            {step.options.map(option => (
              <button key={option} type="button" onClick={() => handleOptionClick(step.key, option)}>
                {option}
              </button>
            ))}
            {index === STEPS.length - 1 && (
              <>
                <button type="submit">Find Products</button>
                <button type="button" onClick={handleReset}>Reset</button>
              </>
            )}
          </fieldset>
        ))}
      </form>
      {result.length > 0 && (
        <div id="result">
          <h2>Best matching products:</h2>
          {result.map(product => (
            <p key={product.productNumber}>{product.productName}</p>
          ))}
        </div>
      )}
    </div>
  );
}
