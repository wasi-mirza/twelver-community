import React from 'react';
import { useCreateProfileMutation, Profile } from '@my-project/gql';
import { useAuthProviderWeb } from '@my-project/auth';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage: React.FC = () => {
  const { databaseUser, setDatabaseUser, refetchDatabaseUser } =
    useAuthProviderWeb();
  const [createProfile] = useCreateProfileMutation();
  const navigate = useNavigate();

  const handleSelection = async (isEnterprise: boolean) => {
    if (!databaseUser) return;

    try {
      const { data } = await createProfile({
        variables: {
          input: {
            isEnterprise,
          },
        },
      });
      if (data?.createProfile) {
        const updatedUser = await refetchDatabaseUser();
        if (updatedUser) {
          navigate(isEnterprise ? '/register-enterprise' : '/dashboard', {
            replace: true,
          });
        }
      }
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  return (
    <div>
      <h1>Choose Your Role</h1>
      <p>Are you an individual looking for services, or an enterprise offering them?</p>
      <button onClick={() => handleSelection(false)}>I'm an Individual</button>
      <button onClick={() => handleSelection(true)}>I'm an Enterprise</button>
    </div>
  );
};

export default RoleSelectionPage;
