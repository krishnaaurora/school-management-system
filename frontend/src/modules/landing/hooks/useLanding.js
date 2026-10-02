import { useState } from 'react';
import { SCHOOL_INFO, LEADERSHIP_PROFILES, CAMPUS_SPACES } from '../../../data/schoolData';

export function useLanding() {
  const [schoolInfo] = useState(SCHOOL_INFO);
  const [leadership] = useState(LEADERSHIP_PROFILES);
  const [campusSpaces] = useState(CAMPUS_SPACES);

  return {
    schoolInfo,
    leadership,
    campusSpaces,
  };
}
