import { useState, useEffect } from 'react';

import { PRODUCTS, INITIAL_STEPS } from '@/data/data';

export const Quiz = () => {
  const [steps, setSteps] = useState(INITIAL_STEPS || []);
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

  const handleOptionChange = (key, value, multiple) => {
    setUserSelections(prevSelections => {
      if (multiple) {
        const currentSelections = prevSelections[key] || [];
        const newSelections = currentSelections.includes(value)
          ? currentSelections.filter(item => item !== value)
          : [...currentSelections, value];
        return {
          ...prevSelections,
          [key]: newSelections
        };
      }
      return {
        ...prevSelections,
        [key]: value
      };
    });

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    PRODUCTS.forEach(product => product.score = 0);

    steps.forEach(step => {
      if (step.weight > 0) {
        const answer = userSelections[step.key];
        if (answer) {
          PRODUCTS.forEach(product => {
            const productValue = getNestedValue(product, step.key);
            if (Array.isArray(productValue)) {
              if (Array.isArray(answer)) {
                if (answer.some(ans => productValue.includes(ans.toLowerCase()))) {
                  product.score += step.weight;
                }
              } else {
                if (productValue.includes(answer.toLowerCase())) {
                  product.score += step.weight;
                }
              }
            } else {
              if (productValue.toLowerCase() === answer.toLowerCase()) {
                product.score += step.weight;
              }
            }
          });
        }
      }
    });

    const maxScore = Math.max(...PRODUCTS.map(product => product.score));
    const bestProducts = PRODUCTS.filter(product => product.score === maxScore);

    setResult(bestProducts);
  };

  const handleReset = () => {
    setUserSelections({});
    setCurrentStep(0);
    setResult([]);
    PRODUCTS.forEach(product => product.score = 0);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {steps.map((step, index) => (
          <fieldset key={index} style={{ display: currentStep === index ? 'block' : 'none' }} data-step={step.key}>
            <h2>{step.question}</h2>
            {step.options && step.options.map(option => (
              <label key={option}>
                <input
                  type={step.multiple ? "checkbox" : "radio"}
                  name={step.key}
                  value={option}
                  checked={step.multiple ? (userSelections[step.key] || []).includes(option) : userSelections[step.key] === option}
                  onChange={() => handleOptionChange(step.key, option, step.multiple)}
                />
                {option}
              </label>
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
        <p key={product.productNumber}>{product.productName} - score {product.score}</p>
          ))}
        </div>
      )}
    </div>
  );
}
