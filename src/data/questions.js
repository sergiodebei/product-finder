
import { ALGOLIA_PRODUCTS } from '@/data/product';

// const uniqueValues = (arr, key) => {
    //   const values = arr.map(item => key.split('.').reduce((o, k) => (o || {})[k], item));
    //   return [...new Set(values.flat())].map(v => v.toString());
    // };

const uniqueValues = (arr, key) => {
    const keys = key.split('.');

    // Recursive function to handle nested arrays/objects
    const extractValues = (item, keys) => {
        const currentKey = keys[0];

        // If the item is an array, we need to process each element
        if (Array.isArray(item)) {
            return item.map(i => extractValues(i, keys)).flat();
        }

        // If there are more keys to process, continue recursively
        if (keys.length > 1 && item && typeof item === 'object') {
            return extractValues(item[currentKey], keys.slice(1));
        }

        // Otherwise, return the value
        return item ? item[currentKey] : null;
    };

    // Flatten the extracted values and remove duplicates
    const values = arr.map(item => extractValues(item, keys)).flat();
    return [...new Set(values)].map(v => v.toString());
};



export const QUESTIONS = [
    {
        question: 'Who are you shopping for?',
        key: 'gender',
        weight: 1,
        options:   uniqueValues(ALGOLIA_PRODUCTS, 'gender')
    },
    {
        question: 'How do you plan on using your jacket mainly?',
        key: 'activities',
        weight: 1,
        options: uniqueValues(ALGOLIA_PRODUCTS, 'activities.description')
    },
    // {
    //   question: 'What color do you like?',
    //   key: 'colors',
    //   weight: 1,
    //   multiple: true, 
    //   maxOptions: 3 // Maximum number of options that can be selected
    // },
    // {
    //   question: 'Do you prefer waterproof products?',
    //   key: 'waterproof',
    //   weight: 2
    // },
    {
      question: 'Review your preferences and submit:',
      key: '',
      weight: 0
    }
  ];