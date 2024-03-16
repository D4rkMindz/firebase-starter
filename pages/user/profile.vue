<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline/index.js';
import { useFileDialog } from '@vueuse/core';

import { updateCurrentUserProfile, type VueFirestoreDocumentData } from 'vuefire';
import { doc, type DocumentData, DocumentReference, setDoc } from '@firebase/firestore';
import useFileUpload from '~/composables/useFileUpload/useFileUpload.composable';
import type { Ref } from 'vue';

const { files, open, reset } = useFileDialog();
const { t } = useI18n();

interface Profile extends DocumentData {
    phoneNumber: string;
}

const email = ref<string>('');
const displayName = ref<string>('');
const phoneNumber = ref<string>('');
const user = await useCurrentUser();
let profile: Ref<VueFirestoreDocumentData<Profile> | undefined> | null = null;

if (!process.server) {
    profile = await getProfile(user);
    email.value = user.value?.email || '';
    displayName.value = user.value?.displayName || '';
    phoneNumber.value = profile?.value?.phoneNumber || '';
}

// const phoneNumber = ref<string>('');

/**
 * Profile
 */
function getProfileDoc(currentUser: any) {
    const db = useFirestore();
    // const profileRef = collection(db, 'profiles');
    // return doc(profileRef, currentUser?.value?.uid);
    return doc(db, 'profiles', currentUser?.value?.uid);
}

async function getProfile(userValue: any) {
    const profileRef = getProfileDoc(userValue);
    const document = useDocument<Profile>(profileRef);
    await document.promise.value;
    return document;
}

async function updateUserProfile() {
    if (displayName.value !== user.value?.displayName) {
        console.log(user.value?.displayName, '=>', displayName.value);
        await updateCurrentUserProfile({ displayName: displayName.value });
    }
    if (phoneNumber.value !== profile?.value?.phoneNumber && user.value) {
        console.log(profile?.value?.phoneNumber, '=>', phoneNumber.value);
        const profileRef: DocumentReference = getProfileDoc(user);
        const result = await setDoc(profileRef, { phoneNumber: phoneNumber.value });
        console.log(result);
    }
}

// watch(phoneNumber, (e) => console.log(e));

/**
 * File Upload
 */
const {
    uploadFile,
    progress,
    state,
    downloadUrl /*,
    hasFailed*/,
} = useFileUpload(user?.value || null);

const url = ref<string>('');

const dragActive = ref(false);

watch(files, () => uploadPicture(files?.value?.item(0)));

function openFileDialog() {
    open({ accept: 'image/*', multiple: false });
}

function setDroppedProfilePicture(e: any) {
    dragActive.value = false;

    uploadPicture(e.dataTransfer.files.item(0));
}

async function uploadPicture(file: File | undefined | null) {
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            reset();
            alert('File to large. Only 5MB allowed');
            return openFileDialog();
        }

        const fileURL = await readURL(file);
        url.value = String(fileURL);

        const now = new Date();
        const rightNow = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}_${String(now.getUTCHours()).padStart(2, '0')}-${String(now.getUTCMinutes()).padStart(2, '0')}-${String(now.getUTCSeconds()).padStart(2, '0')}.${String(now.getUTCMilliseconds()).padStart(3, '0')}`;
        const uploadURL = `ProfilePictures/${user?.value?.uid}/${rightNow}.${file.type.split('/')[1]}`;

        downloadUrl.value = '';

        const pictureURL = await uploadFile({
            data: file,
            path: uploadURL,
        });

        await updateCurrentUserProfile({ photoURL: pictureURL });

        url.value = '';
    }
}

function readURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = (e) => reject(e);
        reader.onload = (e) => resolve(e?.target?.result);
        reader.readAsDataURL(file);
    });
}

useHead({
    title: t('Profile'),
});
</script>

<template>
    <div class="h-full w-full flex justify-center">
        <div
            :data-drag-active="dragActive"
            class="card m-3 mt-10 md:m-10 bg-base-100 shadow-xl w-full h-fit md:w-2/3 xl:w-1/2"
            @drop.prevent="setDroppedProfilePicture"
            @dragenter.prevent="() => (dragActive = true)"
            @dragover.prevent="() => (dragActive = true)"
            @dragleave.prevent="() => (dragActive = false)"
        >
            <fieldset>
                <figure class="m-auto w-1/4 mt-10" @click="openFileDialog">
                    <div v-if="url" class="profile-picture-container">
                        <img
                            :alt="files?.item(0)!.name ?? $t('Your Picture')"
                            :src="url"
                            class="profile-picture"
                            style="opacity: 0.5"
                        />

                        <h3 v-if="state == 'running'" class="picture-text" style="opacity: 1">{{ progress }}%</h3>
                    </div>

                    <div v-else-if="user?.photoURL" class="profile-picture-container">
                        <img :alt="$t('Your profile picture')" :src="user?.photoURL" class="profile-picture" />

                        <h3 class="picture-text text-center">
                            {{ $t('Replace') }}
                        </h3>
                    </div>

                    <UserCircleIcon v-else class="inline-block w-full h-full rainbow" />
                </figure>
            </fieldset>

            <div class="card-body items-center text-center">
                <h2 class="card-title">{{ $t('Profile') }}</h2>

                <form class="w-full" @submit.prevent="updateUserProfile">
                    <InputField v-model="displayName" :label="$t('Name')" type="username" />

                    <InputField v-model="email" :label="$t('Email')" type="email" />

                    <PhoneInputField v-model="phoneNumber" />

                    <div class="card-actions justify-end">
                        <button class="btn btn-primary" type="submit">{{ $t('Save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.profile-picture {
    @apply mask mask-circle w-full opacity-100 object-cover object-center aspect-square;
}

// hover css
.profile-picture-container {
    @apply relative h-full w-full;

    &:hover {
        @apply cursor-pointer;

        & .picture-text,
        & img {
            @apply opacity-20 transition-opacity duration-75 ease-in-out;
        }

        & .picture-text {
            @apply opacity-100;
        }
    }

    & .picture-text {
        @apply absolute text-base-content top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0;
    }
}

// drag and drop css
// keep this order, otherwise the drag and drop css will be overridden by the hover css above
[data-drag-active='true'] {
    & img {
        @apply opacity-20 transition-opacity duration-300 ease-in-out;
    }

    & .picture-text {
        @apply opacity-100 transition-opacity duration-300 ease-in-out;
    }
}
</style>
