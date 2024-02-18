export const formatFirebaseError = (error: string) => {
  switch (error) {
    case 'Firebase: Error (auth/invalid-email).':
      return 'Please enter valid email'
    case 'Firebase: Error (auth/invalid-login-credentials).':
      return 'Please enter valid username / password'
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      return 'Weak password - it should be at least 6 characters long'
    case 'Firebase: Error (auth/missing-email).':
      return 'Please enter email'
    case 'Firebase: Error (auth/missing-password).':
      return 'Please enter password'
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'Account with this email address already exists'
    case 'Firebase: Error (auth/invalid-credential).':
      return 'Wrong password'
    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
      return 'Too many incorrect attempts. Reset you password or try again later.'
    default:
      return error
  }
}
