import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const deleteDocument = async (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)

  try {
    isPending.value = true
    const documentRef = projectFirestore.collection(collection).doc(id)
    const res = await documentRef.delete()
    isPending.value = false

    return res
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }

  return { error, isPending }
}

const updateDocument = async (collection, id, updates) => {
  const error = ref(null)
  const isPending = ref(false)

  try {
    isPending.value = true
    const documentRef = projectFirestore.collection(collection).doc(id)
    await documentRef.update(updates)
    isPending.value = false
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }

  return { error, isPending }


}

export { deleteDocument, updateDocument } 