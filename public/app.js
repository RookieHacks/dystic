const auth = firebase.auth();

const signedIn = document.getElementById('SignedInState');
const signedOut = document.getElementById('NotSignedIn');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const usernameObj = document.getElementById('username');
const userIDObj = document.getElementById('userid');

const signOutmsg = document.getElementById('signoutmsg');

const googleProvider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function (result) {})
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log(errorCode);
    });
};

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    // signed in
    signedIn.hidden = false;
    signedOut.hidden = true;
    usernameObj.innerHTML = 'Greetings, ' + user.displayName + '!';
    userIDObj.innerHTML = 'User ID: ' + user.uid;
  } else {
    // not signed in
    signedIn.hidden = true;
    signedOut.hidden = false;
    usernameObj.innerHTML = '';
    userIDObj.innerHTML = '';
    signOutmsg.innerHTML = 'Signed out Successfully!';
  }
});
