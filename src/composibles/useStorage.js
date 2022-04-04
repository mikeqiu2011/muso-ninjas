import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser"

const { user } = getUser()

const useStorage = () => {
    const error = ref('')
    const url = ref('')  // file public url we can access
    const filePath = ref('')


    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
            error.value = null
        } catch (err) {
            console.log(err);
            error.value = err.message
        }

        if (!error.value) {
            console.log('file uploaded successfully');
        }
    }

    const deleteImage = async (filePath) => {
        const storageRef = projectStorage.ref(filePath)

        try {
            const res = await storageRef.delete()
            error.value = null
            console.log('image deleted');

            return res
        } catch (err) {
            console.log(err);
            error.value = err.message
        }

        if (!error.value) {
            console.log('file uploaded successfully');
        }
    }

    return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage