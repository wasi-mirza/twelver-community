import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md ${className}`}
    >
      {children}
    </div>
  );
};
