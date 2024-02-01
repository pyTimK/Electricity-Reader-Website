import { db, storage } from "@/app/firebase";
import { DocumentData } from "firebase-admin/firestore";
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Firebase Helper Template
 */
export default abstract class FHT<T extends { id: string }> {
  abstract collectionName: string;
  //! Get
  async get(id: string) {
    if (!id) return null;
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      return null;
    }
  }

  //! Watch
  watch(id: string | undefined, callback: (data: T | null) => void) {
    if (!id) {
      callback(null);
      return () => {};
    }

    const docRef = doc(db, this.collectionName, id);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as T);
      } else {
        callback(null);
      }
    });
  }

  //! Update
  async update(obj: T | null, new_fields: Partial<T>) {
    if (!obj) return;
    const docRef = doc(db, this.collectionName, obj.id);
    await updateDoc(docRef, { ...new_fields } as DocumentData);
  }

  //! Create
  async create(device: T) {
    console.log(this.collectionName);
    console.log(device.id);
    const docRef = doc(db, this.collectionName, device.id);
    await setDoc(docRef, device);
  }

  //! Delete
  async delete(device: T) {
    const docRef = doc(db, this.collectionName, device.id);
    await deleteDoc(docRef);
  }
}

export class FHPicture {
  private idToURL: (id: string) => string;

  constructor(idToURL: (id: string) => string) {
    this.idToURL = idToURL;
  }

  //! Create
  async create(id: string, imgFile: File) {
    const storageRef = ref(storage, this.idToURL(id));

    await uploadBytes(storageRef, imgFile, {
      contentType: "image/jpeg",
    });
  }

  //! Get
  async get(id: string) {
    const storageRef = ref(storage, this.idToURL(id));
    const url = await getDownloadURL(storageRef);
    return url;
  }
}
