import { useState, useEffect } from 'react';

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

// TODO: priority on the steps (to update the score) - diffent scorevalue based on the step  (gender 10, waterproof 3)

const INITIAL_STEPS = [
  {
    question: 'What gender do you prefer?',
    key: 'gender.code'
  },
  {
    question: 'What color do you like?',
    key: 'colors'
  },
  {
    question: 'Do you prefer waterproof products?',
    key: 'waterproof'
  },
  {
    question: 'Review your preferences and submit:',
    key: ''
  }
];

export default function Home() {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const [userSelections, setUserSelections] = useState({});
  const [result, setResult] = useState([]);

  useEffect(() => {
    const uniqueValues = (arr, key) => {
      const values = arr.map(item => key.split('.').reduce((o, k) => (o || {})[k], item));
      return [...new Set(values.flat())].map(v => v.toString());
    };

    const updatedSteps = INITIAL_STEPS.map(step => {
      if (step.key) {
        return {
          ...step,
          options: uniqueValues(PRODUCTS, step.key)
        };
      }
      return step;
    });

    setSteps(updatedSteps);
  }, []);

  const handleOptionClick = (key, value) => {
    setUserSelections(prevSelections => ({
      ...prevSelections,
      [key]: value
    }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }

  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    PRODUCTS.forEach(product => product.quizScore = 0);

    Object.entries(userSelections).forEach(([key, value]) => {
      PRODUCTS.forEach(product => {
        const productValue = getNestedValue(product, key);
        if (Array.isArray(productValue)) {
          if (productValue.includes(value.toLowerCase())) {
            product.quizScore += 1;
          }
        } else {
          if (productValue.toLowerCase() === value.toLowerCase()) {
            product.quizScore += 1;
          }
        }
      });
    });

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
        {steps.map((step, index) => (
          <fieldset key={index} style={{ display: currentStep === index ? 'block' : 'none' }} data-step={step.key}>
            <h2>{step.question}</h2>
            {step.options && step.options.map(option => (
              <button key={option} type="button" onClick={() => handleOptionClick(step.key, option)}>
                {option}
              </button>
            ))}
            {index === steps.length - 1 && (
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
