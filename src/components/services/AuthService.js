import auth from '@react-native-firebase/auth';

class AuthService {
  static async signUp(email, password) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async signIn(email, password) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


}

export default AuthService;
