import { render } from '@testing-library/react';

// import { AuthProvider } from './auth.mob';
import { AuthProviderWeb } from './auth.web';

describe('Auth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthProviderWeb />);
    expect(baseElement).toBeTruthy();
  });
});
