import { firebaseAuth, googleProvider } from "./firebase";

class AuthService {
  login(providerName) {
    // console.log(`login: ${providerName}`);
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  onAuthChange(onUserChanged) {
    // console.log(`onAuthChange: ${onUserChanged}`);
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  logout() {
    // console.log(`logout`);
    firebaseAuth.signOut();
  }

  getProvider(providerName) {
    switch (providerName) {
      case `Google`:
        return googleProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
