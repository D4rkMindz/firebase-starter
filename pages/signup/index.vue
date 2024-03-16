<template>
    <div class="card bg-base-100 w-full">
        <div class="card-body">
            <h2 class="card-title">{{ $t('Sign up') }}</h2>

            <p v-if="error" class="error" v-html="error" />
            <form @submit.prevent="signupWithCredentials">
                <InputField v-model="email" :label="$t('Email')" />

                <PasswordField v-model="password" :label="$t('Password')" />

                <div class="password-validation">
                    <div class="check">
                        <ShieldCheckIcon
                            :class="{ success: validation.alphanumerical }"
                            class="icon"
                        />
                        <p :class="{ success: validation.alphanumerical }">
                            {{ $t('Contains alphanumerical character') }}
                        </p>
                    </div>
                    <div class="check">
                        <ShieldCheckIcon
                            :class="{ success: validation.special }"
                            class="icon"
                        />
                        <p :class="{ success: validation.special }">
                            {{ $t('Contains special character') }}
                        </p>
                    </div>
                    <div class="check">
                        <ShieldCheckIcon
                            :class="{ success: validation.uppercase }"
                            class="icon"
                        />
                        <p :class="{ success: validation.uppercase }">
                            {{ $t('Contains uppercase character') }}
                        </p>
                    </div>
                    <div class="check">
                        <ShieldCheckIcon
                            :class="{ success: validation.minLength }"
                            class="icon"
                        />
                        <p :class="{ success: validation.minLength }">
                            {{ $t('Is at least 8 characters long') }}
                        </p>
                    </div>
                </div>

                <PasswordField
                    v-model="passwordRetype"
                    :label="$t('Retype Password')"
                />

                <div class="password-validation">
                    <div class="check">
                        <ShieldCheckIcon
                            :class="{ success: validation.match }"
                            class="icon"
                        />
                        <p :class="{ success: validation.match }">
                            {{ $t('Passwords must match') }}
                        </p>
                    </div>
                </div>

                <button
                    :disabled="!validation.canSubmit()"
                    class="btn btn-success w-full mt-2"
                    type="submit"
                >
                    {{ $t('Sign up') }}
                </button>
            </form>

            <div class="separator mt-7 mb-7">
                {{ $t('Already have an account?') }}
            </div>

            <nuxt-link-locale to="/login">
                <button
                    class="btn btn-secondary btn-outline text-secondary-content w-full"
                >
                    {{ $t('Login') }}
                </button>
            </nuxt-link-locale>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ShieldCheckIcon } from '@heroicons/vue/24/outline';
import { type Auth, createUserWithEmailAndPassword } from '@firebase/auth';

const { t } = useI18n();

const route = useRoute();
const localePath = useLocalePath();
const auth: Auth = useFirebaseAuth() as Auth;

const validation = {
    canSubmit() {
        return (
            this.email &&
            this.alphanumerical &&
            this.special &&
            this.uppercase &&
            this.minLength &&
            this.match
        );
    },
    email: false,
    alphanumerical: false,
    special: false,
    uppercase: false,
    minLength: false,
    match: false,
};
const email = ref('');
const password = ref('');
const passwordRetype = ref('');

const error = ref('');

const user = await getCurrentUser();
if (user) {
    let redirectTo: string = localePath('/');
    if (route.query?.redirect) {
        redirectTo = route.query.redirect.toString();
    }
    navigateTo(redirectTo);
}

watch(email, (e) => {
    validation.email = e.length > 0;
});

watch(password, (p) => {
    validation.special = /^.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~].*$/.test(p);
    validation.alphanumerical = /^.*[a-zA-Z].*$/.test(p);
    validation.uppercase = /^.*[A-Z].*$/.test(p);
    validation.minLength = p.length >= 8;
    validation.match = passwordRetype.value === p && p.length > 0;
});

watch(passwordRetype, (p) => {
    validation.match = password.value === p && p.length > 0;
});

async function signupWithCredentials() {
    if (!validation.canSubmit()) {
        return;
    }
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value,
        );
        console.log('User created', user);
        navigateTo(localePath('/'));
        // } catch (e: Error | any) {
    } catch (e: Error | any) {
        let message = t('auth/invalid-credential');
        console.error('createUserWithEmailAndPassword failed', e);

        const errorMap = {
            'auth/email-already-in-use': t('auth/email-already-in-use'),
            'auth/invalid-email': t('auth/invalid-email'),
            'auth/missing-password': t('auth/missing-password'),
        };
        const code = e?.code;
        if (code && code in errorMap) {
            message = errorMap[code].replace(
                /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
                '<br>',
            );
        }

        error.value = message;
    }
}

useHead({
    title: t('Sign up') + ' @ ' + t('APP_NAME'),
});
definePageMeta({
    layout: 'auth',
});
</script>

<style lang="scss" scoped>
.separator {
    @apply divider text-sm font-light;
}

.password-validation {
    @apply rounded mt-2 mb-2 border rounded border-accent p-3;
    & p {
        @apply text-accent;
    }

    & .check {
        @apply w-full flex items-start gap-3;
    }

    & .icon {
        @apply h-6 w-6 text-accent;
    }

    & .success {
        @apply text-success;
    }
}

.error {
    @apply text-error-content bg-error border-error-content rounded text-center p-2 mt-3 mb-2;
}
</style>
