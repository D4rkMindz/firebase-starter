// import { getDownloadURL, ref as firebaseStorageRef, type TaskState, uploadBytesResumable } from 'firebase/storage';
// import { ref } from 'vue';
// import { useFirebaseStorage } from 'vuefire';
// import type { User } from '@firebase/auth';
//
// interface UploadConfig {
//     path: string;
//     data: Blob | Uint8Array | ArrayBuffer;
// }
//
// const usePhoneNumberverification = (user: User | null, phoneNumber: string) => {
//     const downloadUrl = ref('');
//     const hasFailed = ref(false);
//     const state = ref<TaskState>();
//     const progress = ref(0);
//
//     /**
//      * @returns Rounded number [0..100]
//      */
//     const calculatePercentage = (numerator: number, denominator: number): number => {
//         // do not divide by zero 😨
//         if (denominator === 0) {
//             return 0;
//         }
//
//         return Math.round((numerator / denominator) * 100);
//     };
//
//     return {
//         downloadUrl,
//         hasFailed,
//         state,
//         progress,
//         uploadFile,
//     };
// };
//
// export default useFileUpload;
