import {
    getDownloadURL,
    ref as firebaseStorageRef,
    type TaskState,
    uploadBytesResumable,
} from 'firebase/storage';
import { ref } from 'vue';
import { useFirebaseStorage } from 'vuefire';
import type { User } from '@firebase/auth';

interface UploadConfig {
    path: string;
    data: Blob | Uint8Array | ArrayBuffer;
}

const useFileUpload = (user: User | null) => {
    const downloadUrl = ref('');
    const hasFailed = ref(false);
    const state = ref<TaskState>();
    const progress = ref(0);

    /**
     * @returns Rounded number [0..100]
     */
    const calculatePercentage = (
        numerator: number,
        denominator: number,
    ): number => {
        // do not divide by zero 😨
        if (denominator === 0) {
            return 0;
        }

        return Math.round((numerator / denominator) * 100);
    };

    /**
     * Uploads a file to firebase cloud storage.
     *
     * @param storage Firebase storage instance
     * @param path Upload path, example: "images/image.png"
     * @param data Data to upload
     */
    const uploadFile = ({ path, data }: UploadConfig): Promise<string> => {
        // reset every time we upload
        hasFailed.value = false;
        progress.value = 0;

        const storage = useFirebaseStorage();
        const storageRef = firebaseStorageRef(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, data);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    progress.value = calculatePercentage(
                        snapshot.bytesTransferred,
                        snapshot.totalBytes,
                    );
                    state.value = snapshot.state;
                },
                () => {
                    hasFailed.value = true;
                    reject(user?.photoURL || '');
                },
                async () => {
                    // upload has completed successfully -> update state & generate download link.
                    state.value = 'success';
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref,
                    );
                    downloadUrl.value = downloadURL;
                    resolve(downloadURL);
                },
            );
        });
    };

    return {
        downloadUrl,
        hasFailed,
        state,
        progress,
        uploadFile,
    };
};

export default useFileUpload;
