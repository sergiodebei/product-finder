import { useState, useEffect } from 'react';

import { PRODUCTS } from '@/data/products';
import { QUESTIONS } from '@/data/questions';

export const Quiz = () => {
  const [steps, setSteps] = useState(QUESTIONS || []);
  const [currentStep, setCurrentStep] = useState(0);
  const [userSelections, setUserSelections] = useState({});
  const [result, setResult] = useState([]);

useEffect(() => {
    const uniqueValues = (arr, key) => {
      const values = arr.map(item => key.split('.').reduce((o, k) => (o || {})[k], item));
      return [...new Set(values.flat())].map(v => v.toString());
    };

    const updatedSteps = QUESTIONS.map(step => {
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

  const handleOptionChange = (key, value, multiple, maxOptions) => {
    setUserSelections(prevSelections => {
      if (multiple) {
        const currentSelections = prevSelections[key] || [];
        if (currentSelections.includes(value)) {
          return {
            ...prevSelections,
            [key]: currentSelections.filter(item => item !== value)
          };
        } else if (currentSelections.length < maxOptions) {
          return {
            ...prevSelections,
            [key]: [...currentSelections, value]
          };
        }
        // Do nothing if the max limit is reached
        return prevSelections;
      }
      return {
        ...prevSelections,
        [key]: value
      };
    });
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

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {steps.map((step, index) => (
          <fieldset key={index} style={{ display: currentStep === index ? 'block' : 'none' }} data-step={step.key}>
            <h2>{step.question}</h2>
            {step.options && step.options.map(option => {
            	return (
              <label key={option}>
                <input
                  type={step.multiple ? "checkbox" : "radio"}
                  name={step.key}
                  value={option}
                  checked={step.multiple ? (userSelections[step.key] || []).includes(option) : userSelections[step.key] === option}
                  onChange={() => handleOptionChange(step.key, option, step.multiple, step.maxOptions)}
                />
                {option}
              </label>
            )})}
             <div>
              {index > 0 && (
                <button type="button" onClick={goToPreviousStep}>Previous</button>
              )}
              {index < steps.length - 1 ? (
                <button type="button" onClick={goToNextStep}>Next</button>
              ) : (
                <button type="submit">Find Products</button>
              )}
              {index === steps.length - 1 && (
                <button type="button" onClick={handleReset}>Reset</button>
              )}
            </div>
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