const auth = firebase.auth();

const signedIn = document.getElementById('SignedInState');
const signedOut = document.getElementById('NotSignedIn');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const usernameObj = document.getElementById('username');
const userIDObj = document.getElementById('userid');

const signOutmsg = document.getElementById('signoutmsg');

const savedJobsSection = document.getElementById('saved-jobs-section');

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

signOutBtn.onclick = () => {
  var confirmSignOut = confirm('Would you like to sign out?');
  if (confirmSignOut) {
    auth.signOut();
  } else {
    alert('You will stay logged in.');
  }
};

auth.onAuthStateChanged((user) => {
  if (user) {
    // signed in
    signedIn.hidden = false;
    signedOut.hidden = true;
    usernameObj.innerHTML = 'Greetings, ' + user.displayName + '!';
    userIDObj.innerHTML = 'User ID: ' + user.uid;
    savedJobsSection.hidden = false;
  } else {
    // not signed in
    signedIn.hidden = true;
    signedOut.hidden = false;
    usernameObj.innerHTML = '';
    userIDObj.innerHTML = '';
    signOutmsg.innerHTML = 'Signed out Successfully!';
    savedJobsSection.hidden = true;
  }
});

// Firebase firestore
const db = firebase.firestore();
const addJobBtn = document.getElementById('addJobBtn');
const jobList = document.getElementById('saved-jobs');
const jobInput = document.getElementById('newJobtxt');

let jobsRef;
let unsubscribe;

auth.onAuthStateChanged((user) => {
  if (user) {
    jobsRef = db.collection('saved-jobs');

    try {
      addJobBtn.onclick = () => {
        const { serverTimestamp } = firebase.firestore.FieldValue;
        boolVal = [true, false];

        jobsRef.add({
          uid: user.uid,
          title: jobInput.value,
          createdAt: serverTimestamp(),
          isMatch: boolVal[Math.floor(Math.random() * boolVal.length)],
        });
      };
    } catch (err) {
      alert('Error Occurred: ' + err.message);
    }

    unsubscribe = jobsRef
      .where('uid', '==', user.uid)
      .onSnapshot((querySnapshot) => {
        const jobTitleItems = querySnapshot.docs.map((doc) => {
          return `<li>${doc.data().title}</li>`;
        });
        jobList.innerHTML = jobTitleItems.join('');
      });
  }
});
