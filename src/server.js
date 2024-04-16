
const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

var admin = require("firebase-admin");

var serviceAccount = require("E:/Cutomerfeedbackapi/config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://opinionai-a2613-default-rtdb.firebaseio.com'
});

// Initialize Firebase Admin SDK

 // Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

try {

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlHmvf9A4uY6osrbtw5AjnXK6Kw2jWjv4",
  authDomain: "opinionai-a2613.firebaseapp.com",
  projectId: "opinionai-a2613",
  storageBucket: "opinionai-a2613.appspot.com",
  messagingSenderId: "808932314858",
  appId: "1:808932314858:web:fb06c8554e38fbd84a1193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  process.exit(1); // Exit the process if Firebase initialization fails
}

const axios = require('axios');
// // Endpoint to fetch data from Instagram including comments and save to Firebase
// Endpoint to fetch data from Instagram including comments and save to Firebase
app.get('/fetch-instagram-data', async (req, res) => {
  try {
    // Make a request to Instagram API to fetch media data (replace ACCESS_TOKEN with your own)
    const mediaResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,
    caption&access_token=IGQWRQYTZACcVkzbnhzcmlnRnJNV0VHMWtxOVRfQjR2dWZAOUksxekh2XzhUa3FFNVpCNENKdWlrS01teGZAUTnVPNkdmLVNUcDFvT3lLUmJ0emlaNmdHSDNXUkFIVWF2Tk5rTUw3eWdoOFpGSmN3eDl4anhFTU5sRm8ZD`);
    console.log('Media data fetched from Instagram:', mediaResponse.data);

    // Extract media data
    const mediaData = mediaResponse.data.data;
    console.log('Extracted media data:', mediaData);

    // Array to store media data with comments
    const mediaWithComments = [];

    // Iterate through each media item
    for (const media of mediaData) {
      
      // Make a request to Instagram API to fetch comments for the media item
      const commentsResponse = await axios.get(`https://graph.instagram.com/${media.id}/comments?access_token=IGQWRQYTZACcVkzbnhzcmlnRnJNV0VHMWtxOVRfQjR2dWZAOUksxekh2XzhUa3FFNVpCNENKdWlrS01teGZAUTnVPNkdmLVNUcDFvT3lLUmJ0emlaNmdHSDNXUkFIVWF2Tk5rTUw3eWdoOFpGSmN3eDl4anhFTU5sRm8ZD`);
      console.log(`Comments fetched for media ${media.id} from Instagram:`, commentsResponse.data);

      // Extract comments data
      const commentsData = commentsResponse.data.data;
      console.log(`Extracted comments data for media ${media.id}:`, commentsData);

      // Add comments data to the media item
      media.comments = commentsData;

      // Add the media item with comments to the array
      mediaWithComments.push(media);
    }

    // Save data with comments to Firebase
    const db = admin.database();
    const ref = db.ref('instagramData');
    await ref.set(mediaWithComments);
    console.log('Data with comments saved to Firebase:', mediaWithComments);

    res.json({ success: true, message: 'Instagram data with comments saved to Firebase' });
  } catch (error) {
    console.error('Error fetching Instagram data with comments:', error);
    res.status(500).json({ success: false, message: 'Error fetching Instagram data with comments' });
  }
});







// app.get('/fetch-instagram-comments/:mediaId', async (req, res) => {
//   try {
//     const { mediaId } = req.params;
//     const accessToken = 'IGQWRQYTZACcVkzbnhzcmlnRnJNV0VHMWtxOVRfQjR2dWZAOUksxekh2XzhUa3FFNVpCNENKdWlrS01teGZAUTnVPNkdmLVNUcDFvT3lLUmJ0emlaNmdHSDNXUkFIVWF2Tk5rTUw3eWdoOFpGSmN3eDl4anhFTU5sRm8ZD'; // Replace with your actual access token

//     // Make a request to Instagram API to fetch comments
//     const response = await axios.get(`https://graph.instagram.com/${mediaId}/comments`, {
//       params: {
//         access_token: accessToken
//       }
//     });

//     // Process the response and extract comments
//     const comments = response.data.data;

//     res.json({ success: true, comments });
//   } catch (error) {
//     console.error('Error fetching Instagram comments:', error);
//     res.status(500).json({ success: false, message: 'Error fetching Instagram comments' });
//   }
// });


// Endpoint to fetch data from Instagram and save to Firebase
// app.get('/fetch-instagram-data', async (req, res) => {
//   try {
//     const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,
//     caption&access_token=IGQWRQYTZACcVkzbnhzcmlnRnJNV0VHMWtxOVRfQjR2dWZAOUksxekh2XzhUa3FFNVpCNENKdWlrS01teGZAUTnVPNkdmLVNUcDFvT3lLUmJ0emlaNmdHSDNXUkFIVWF2Tk5rTUw3eWdoOFpGSmN3eDl4anhFTU5sRm8ZD`);
//     const db = admin.database();
//     const ref = db.ref('instagramData');
//     await ref.set(response.data);
//     res.json({ success: true, message: 'Instagram data saved to Firebase' });
//   } catch (error) {
//     console.error('Error fetching Instagram data:', error);
//     res.status(500).json({ success: false, message: 'Error fetching Instagram data' });
//   }
// });

// // // Define a basic route
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


