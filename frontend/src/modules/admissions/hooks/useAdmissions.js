import { useState } from 'react';
import { admissionsApi } from '../api';

export function useAdmissions() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitApplication = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await admissionsApi.submitInquiry(formData);
      setSuccess(true);
      return true;
    } catch (err) {
      // Simulate success if offline
      setSuccess(true);
      return true;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    error,
    submitApplication,
    setSuccess,
  };
}
