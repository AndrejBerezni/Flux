import { FirebaseError } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import { app } from './config'

const storage = getStorage(app)

//Get image url from Firebase Storage:
export const getImageURL = async (path: string) => {
  try {
    const imageURL = await getDownloadURL(ref(storage, `${path}`))
    return imageURL
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message)
    }
  }
}
