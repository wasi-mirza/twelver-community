import React, { useState } from 'react';
import { useUpdateProfileMutation, Profile } from '@my-project/gql';
import { useAuthProviderWeb } from '@my-project/auth';

const EnterpriseRegistrationPage: React.FC = () => {
  const { user, databaseUser, setDatabaseUser } = useAuthProviderWeb();
  const [updateProfile] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    companyName: '',
    tradeType: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!databaseUser?.profile) return;

    try {
      const { data } = await updateProfile({
        variables: {
          input: {
            id: databaseUser.profile.id!,
            ...formData,
          },
        },
      });
      if (data?.updateProfile) {
        setDatabaseUser({
          ...databaseUser,
          profile: data.updateProfile as Profile,
        });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div>
      <h1>Enterprise Registration</h1>
      <form onSubmit={handleSubmit}>
        <input name="companyName" placeholder="Company Name" onChange={handleChange} />
        <input name="tradeType" placeholder="Trade Type (e.g., Plumber)" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="postalCode" placeholder="Postal Code" onChange={handleChange} />
        <textarea name="description" placeholder="Description of services" onChange={handleChange} />
        <button type="submit">Submit for Approval</button>
      </form>
    </div>
  );
};

export default EnterpriseRegistrationPage;
