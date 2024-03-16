<script lang="ts" setup>
// See https://vueuse.org/core/useFileDialog
import { useFileDialog } from '@vueuse/core';
import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';

const user = await useCurrentUser();
const storage = useFirebaseStorage();
const uploadTaskExists = ref(false);
const uploadProgress = ref<object | null>(null);
const url = ref<string | null | undefined>('');

function uploadPicture() {
    const data = files.value?.item(0);
    if (data) {
        const mountainFileRef = storageRef(
            storage,
            `ProfilePictures/${user?.value?.uid}/${new Date().getTime()}.${data.type.split('/')[1]}`,
        );

        const fs = useStorageFile(mountainFileRef);
        uploadProgress.value = fs.uploadProgress;
        uploadTaskExists.value = !!fs.uploadTask;
        // url.value = fs.url.value;
        fs.upload(data);
    }
}

function handleDrop(e: any) {
    console.log(e);
}

function readURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = (e) => reject(e);
        reader.onload = (e) => resolve(e?.target?.result);
        reader.readAsDataURL(file);
    });
}

const dragActive = ref(false);
const { files, open /*, reset*/ } = useFileDialog();

watch(files, async () => {
    const file = files.value?.item(0);
    if (!file) {
        return;
    }
    url.value = await readURL(file);
    console.log('HERE', url.value);
    uploadPicture();
});
</script>

<template>
    <!-- disable the form while uploading -->
    <fieldset :disabled="!!uploadTaskExists">
        <span v-if="uploadProgress"
            >{{ Math.round(uploadProgress.value * 100) + '%' }} </span
        ><br />
        <div
            :data-drag-active="dragActive"
            class="upload-area"
            @click="open({ accept: 'image/*', multiple: false })"
            @drop.prevent="handleDrop"
            @dragenter.prevent="() => (dragActive = true)"
            @dragleave.prevent="() => (dragActive = false)"
        >
            <img
                v-if="url"
                :alt="files?.item(0)!.name ?? $t('Your Picture')"
                :src="url"
                class="preview"
            />
            <div v-else>
                {{ $t('Click to select a picture or drop one here') }}
            </div>
        </div>
    </fieldset>
</template>

<style lang="scss" scoped>
.upload-area {
    @apply cursor-pointer w-full p-3 h-20 text-center flex items-center justify-center bg-base-200 text-base-content border-base-200 border-2 rounded;

    & .preview {
        @apply w-12 h-12 object-cover;
    }
}

[data-drag-active='true'] {
    @apply bg-base-300 border-primary border-2 border-dashed;
}
</style>
