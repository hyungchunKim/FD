"use client";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import { auth, db } from "@/libs/firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import useGitRepoStore from "@/store/useGitRepoStore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const router = useRouter();
  const { setGitToken } = useGitRepoStore();

  const handleLogin = async () => {
    const githubProvider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      //
      const { uid, displayName, email, photoURL } = user;

      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (token) {
        setGitToken(token);
      }
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid,
          displayName,
          email,
          photoURL,
          createdAt: new Date().toISOString(),
          isEmailConsent: false,
        });
      }

      await fetch("/api/setCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      console.log("Signed in with GitHub:", user);
      console.log("GitHub Access Token:", token);
      //repository저장
      // const repoResults = await fetchUserRepositories(token);
      // console.log("repoResults=", repoResults);
      // saveJsonDataToFirestore(repoResults);
      router.push("/me");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GithubAuthProvider.credentialFromError(error);

      console.error("Error Code:", errorCode);
      console.error("Error Message:", errorMessage);

      return {
        error: errorMessage,
        email,
        credential,
      };
    }
  };
  return { handleLogin };
};

//기능 되는 것
//github 로그인
// export const signInWithGithub = async () => {
//   // Create a GitHub Auth provider instance
//   const githubProvider = new GithubAuthProvider();
//   // Initialize Firestore
//   const firestore = getFirestore();
//   // Function to sign in with GitHub (optional)
//   try {
//     const result = await signInWithPopup(auth, githubProvider);
//     const user = result.user;
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     //
//     const { uid, displayName, email, photoURL } = user;

//     const userRef = doc(db, "users", uid);
//     const docSnap = await getDoc(userRef);
//     // const { setGitToken } = useGitRepoStore();
//     // if (token) {
//     //   setGitToken(token);
//     // }
//     if (!docSnap.exists()) {
//       await setDoc(userRef, {
//         uid,
//         displayName,
//         email,
//         photoURL,
//         createdAt: new Date().toISOString(),
//         isEmailConsent: false,
//       });
//     }

//     await fetch("/api/setCookie", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token }),
//     });
//     // Store user data in Firestore
//     // const userRef = doc(firestore, "users", user.uid);
//     // await setDoc(userRef, {
//     //   uid: user.uid,
//     //   email: user.email,
//     //   displayName: user.displayName,
//     //   photoURL: user.photoURL,
//     //   provider: "github",
//     //   githubAccessToken: token, // Optional: only if you need the GitHub token for further API calls
//     // });

//     console.log("Signed in with GitHub:", user);
//     console.log("GitHub Access Token:", token);
//     //repository저장
//     const repoResults = await fetchUserRepositories(token);
//     console.log("repoResults=", repoResults);
//     saveJsonDataToFirestore(repoResults);
//     return {
//       user,
//       token,
//     };
//   } catch (error: any) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.customData?.email;
//     const credential = GithubAuthProvider.credentialFromError(error);

//     console.error("Error Code:", errorCode);
//     console.error("Error Message:", errorMessage);

//     return {
//       error: errorMessage,
//       email,
//       credential,
//     };
//   }
// };
