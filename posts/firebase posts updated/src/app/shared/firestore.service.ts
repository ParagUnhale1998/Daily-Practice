import { Injectable } from '@angular/core';
import {Firestore,getDoc,getDocs,setDoc,addDoc,doc,collection,collectionData,deleteDoc,updateDoc} from '@angular/fire/firestore'
 
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private fireService:Firestore) {}

  getData() {
    let userCollection = collection(this.fireService,'users')
    return collectionData(userCollection,{idField:'id'})
  }
  
  getUserById(id: string) {
    const userDocRef = doc(this.fireService, 'users', id);
    return getDoc(userDocRef);
  }

  createData(data:any) {
    let userCollection = collection(this.fireService,'users')
    return addDoc(userCollection,data)
  }

  createUserData(userId: string, data: any) {
    // Specify the collection reference
    const userCollectionRef = collection(this.fireService, 'users');
  
    // Add a new document with the specified custom user ID
    return setDoc(doc(userCollectionRef, userId), data);
  }
 
  
  async getPostWithID(userId: string, postId: string): Promise<any> {
    const postDocRef = doc(this.fireService, 'users', userId, 'posts', postId);
    const postSnapshot = await getDoc(postDocRef);
    
    if (postSnapshot.exists()) {
      return postSnapshot.data();
    } else {
      throw new Error(`Post with ID ${postId} not found.`);
    }
  }

  async getAllUsers(): Promise<any[]> {
    const usersCollectionRef = collection(this.fireService, 'users');
    const usersQuerySnapshot = await getDocs(usersCollectionRef);
  
    const users: any[] = [];
    usersQuerySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
  
    return users;
  }

  
  async getAllUserPosts(userId: string): Promise<any[]> {
    const postsCollectionRef = collection(this.fireService, `users/${userId}/posts`);
    const postsQuerySnapshot = await getDocs(postsCollectionRef);

    const posts: any[] = [];
    postsQuerySnapshot.forEach((doc:any) => {
      const postData = doc.data();
      posts.push({ id: doc.id, ...postData });
    });

    return posts;
  }

  async getAllPosts(): Promise<any[]> {
    const postsCollectionRef = collection(this.fireService, 'posts');
    const postsQuerySnapshot = await getDocs(postsCollectionRef);

    const posts: any[] = [];
    postsQuerySnapshot.forEach((doc) => {
      const postData = doc.data();
      posts.push({ id: doc.id, ...postData });
    });

    return posts;
  }
  

  async createPost(userId: string, postData: any) {
    const postDocRef = collection(this.fireService, 'users', userId, 'posts');
    const newPostRef = await addDoc(postDocRef, postData);
    const newPostId = newPostRef.id;
    postData.id = newPostId;
    console.log('Post data with ID:', postData);
    await this.updatePost(userId, newPostId, { id: newPostId });
    // return setDoc(doc(postDocRef, postId), newPostId);

    // await addDoc(postDocRef, postData);
  }
  
  // async updatePost(userId: string, postId: string, updatedData: any) {
  //   const postDocRef = doc(this.fireService, 'users', userId, 'posts', postId);
  //   await setDoc(postDocRef, updatedData, { merge: true }); // Use merge option to update without overwriting
  // }

  async deletePost(userId: string, postId: string) {
    const postDocRef = doc(this.fireService, 'users', userId, 'posts', postId);
    await deleteDoc(postDocRef);
  }
  
  async getPost(userId: string, postId: string): Promise<any> {
    const postDocRef = doc(this.fireService, 'users', userId, 'posts', postId);
    const postDocSnapshot = await getDoc(postDocRef);
    if (postDocSnapshot.exists()) {
      return postDocSnapshot.data();
    } else {
      return null;
    }
  }
  
  async updatePost(userId: string, postId: string, updatedData: any): Promise<void> {
    const postDocRef = doc(collection(this.fireService, 'users', userId, 'posts'), postId);
    await updateDoc(postDocRef, updatedData);
  }

  async addCommentToPost(userId: string, postId: string, commentData: any): Promise<void> {
    const post = await this.getPost(userId, postId);
    if (post) {
      const updatedComments = [...post.comments, commentData];
      await this.updatePost(userId, postId, { comments: updatedComments });
    }
  }

  async incrementLikes(userId: string, postId: string): Promise<void> {
    const post = await this.getPost(userId, postId);
    if (post) {
      const updatedLikes = post.likes + 1;
      await this.updatePost(userId, postId, { likes: updatedLikes });
    }
  }

  async updateTitleAndContent(userId: string, postId: string, newTitle: string, newContent: string): Promise<void> {
    const post = await this.getPost(userId, postId);
    if (post) {
      await this.updatePost(userId, postId, { title: newTitle, content: newContent });
    }
  }
  // async addPost(userId: string, postData: any): Promise<void> {
  //   const userCollectionRef = collection(this.fireService, 'users');
  //   const postCollectionRef = collection(doc(userCollectionRef, userId), 'posts');

  //   // Add a new post document to the subcollection
  //   await addDoc(postCollectionRef, postData);
  // }

  // createUserData(data: any) {
  //   // Specify the collection reference
  //   const userCollectionRef = collection(this.fireService, 'users');

  //   // Add a new document with a custom user ID
  //   return addDoc(userCollectionRef, data);
  // }

  updateData(id: string, updatedData: any) {
    console.log(updatedData)
    const userDocRef = doc(this.fireService, 'users', id);
    return updateDoc(userDocRef, updatedData);
  }


  deleteData(id:any) {
    let docref = doc(this.fireService,'users/'+id)
    return deleteDoc(docref)
  }
}
