// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import {
  useAuthProviderWeb,
  useWebGoogleSignIn,
  useWebAppleSignIn,
} from '@my-project/auth';


function AuthButtons() {
  const { user, loading, logoutUser } = useAuthProviderWeb();
  const { googleSignIn } = useWebGoogleSignIn();
  const { appleSignIn } = useWebAppleSignIn();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>Signed in as: {user.email || user.displayName || user.uid}</div>
        <button onClick={logoutUser}>Sign out</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button onClick={() => googleSignIn()}>Continue with Google</button>
      <button onClick={() => appleSignIn()}>Continue with Apple</button>
    </div>
  );
}

export function App() {
  return (


      <div style={{ marginTop: 24 }}>
        <AuthButtons />
      </div>

  );
}

export default App;
