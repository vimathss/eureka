import { collection, onSnapshot, query, orderBy, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

export async function saveIdea(uid: string, ideaTitle: string, ideaContent: string) {
    try{
        await setDoc(doc(collection(db, 'userIdeas', uid, "ideas")), {
            title: ideaTitle,
            content: ideaContent,
            createdAt: serverTimestamp(),
        })
    }
    catch(error){
        throw error
    }
}


export function listenUserIdeas(
  uid: string,
  callback: (ideas: any[]) => void
) {
  const ideasRef = collection(db, 'userIdeas', uid, 'ideas')

  const q = query(ideasRef, orderBy('createdAt', 'desc'))

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const ideas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    callback(ideas)
  })

  return unsubscribe
}
