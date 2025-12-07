const firebaseConfig = {
  apiKey: "AIzaSyDHYIHUTg_kOIUx2kKav5055j_5nBSnnaQ",
  authDomain: "portola-e70b1.firebaseapp.com",
  databaseURL: "https://portola-e70b1-default-rtdb.firebaseio.com",
  projectId: "portola-e70b1",
  storageBucket: "portola-e70b1.firebasestorage.app",
  messagingSenderId: "957109056341",
  appId: "1:957109056341:web:3966ca635092c19c9835dc",
  measurementId: "G-JSJ8E28RPM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

const postContent = document.getElementById('postContent');
const submitPost = document.getElementById('submitPost');
const postsDiv = document.getElementById('posts');


fetchPosts();

async function fetchPosts() {
  const snapshot = await database.ref('posts').orderByChild('createdAt').once('value');
  const posts = [];
  snapshot.forEach(childSnapshot => {
    posts.push(childSnapshot.val());
  });
  renderPosts(posts);
}

function renderPosts(posts) {
  postsDiv.innerHTML = '';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.textContent = post.content;
    postsDiv.prepend(postEl);
  });
}

submitPost.addEventListener('click', async () => {
  const content = postContent.value.trim();
  if (!content) return;

  await database.ref('posts').push({
    content,
    createdAt: Date.now()
  });

  postContent.value = '';
  fetchPosts();
});


 // render saved posts on load
