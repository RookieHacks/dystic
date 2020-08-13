const auth = firebase.auth();

const signedIn = document.getElementById('SignedInState');
const signedOut = document.getElementById('NotSignedIn');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('user-details');

const googleProvider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  console.log('Logging In With Google');
};

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    // signed in
    signedIn.hidden = false;
    signedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
  } else {
    // not signed in
    signedIn.hidden = true;
    signedOut.hidden = false;
    userDetails.innerHTML = '';
  }
});
