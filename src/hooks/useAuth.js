import { useState, useEffect } from 'react';
import { getProfile } from '../api/auth';

export const useAuth = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  return { profile };
};