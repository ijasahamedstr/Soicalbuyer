import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a Context for form data
const FormContext = createContext();

// Custom hook to use form context
const useFormContext = () => useContext(FormContext);

// Provider component to manage form data
const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch initial form data from API
    axios.get('http://localhost:8000/api/formData')
      .then(response => setFormData(response.data || {}))
      .catch(error => console.error('Error fetching form data:', error));
  }, []);

  const updateFormData = (data) => {
    axios.post('http://localhost:8000/api/formData', data)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error updating form data:', error));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Form component to handle user input
const FormComponent = () => {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <form>
      <input
        type="text"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
        placeholder="Last Name"
      />
      {/* Add more fields as needed */}
    </form>
  );
};

// Display component to show form data
const DisplayComponent = () => {
  const { formData } = useFormContext();

  return (
    <div>
      <h3>Form Data:</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

// Main component to render FormProvider and components
const UserProfile = () => {
  return (
    <FormProvider>
      <div>
        <h1>Form Example</h1>
        <FormComponent />
        <DisplayComponent />
      </div>
    </FormProvider>
  );
};

export default UserProfile;
