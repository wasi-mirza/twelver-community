import React from 'react';
import { useAuthProviderWeb } from '@my-project/auth';

const PendingApprovalPage: React.FC = () => {
  const { logoutUser } = useAuthProviderWeb();
  return (
    <div>
      <h1>Pending Approval</h1>
      <p>
        Thank you for submitting your enterprise registration. Your application is
        currently under review by our administrators.
      </p>
      <p>You will be notified once your application has been approved.</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default PendingApprovalPage;
