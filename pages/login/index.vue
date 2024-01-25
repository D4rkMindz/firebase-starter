<template>
  <div class="card bg-base-100 w-full">
    <div class="card-body">
      <h2 class="card-title">{{ $t('Please Login') }}</h2>

      <button class="btn" @click="loginWithGoogle" :disabled="loading.google.value">
        <img src="/img/logos/google.svg" alt="G" class="h-6 w-6 mr-2" loading="eager">
        Google
      </button>

      <div class="separator">{{ $t('Or continue with') }}</div>
      <p v-if="error" v-html="error" class="error"/>
      <form @submit.prevent="loginWithCredentials">
        <InputField v-model="email" :label="$t('Email')"/>
        <PasswordField v-model="password" :label="$t('Password')"/>
        <button type="submit" class="btn btn-primary w-full mt-2" :disabled="loading.password.value">{{
            $t("Login")
          }}
        </button>
      </form>
      <div class="separator mt-7 mb-7">{{ $t('Not yet signed up?') }}</div>
      <nuxt-link-locale to="/signup">
        <button class="btn btn-secondary w-full">{{ $t('Sign Up') }}</button>
      </nuxt-link-locale>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
* auth/invalid-credential
* auth/invalid-email
* auth/missing-password
* */
import {
  type Auth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword
} from "@firebase/auth";

const {t} = useI18n();
const auth = useFirebaseAuth();
const localePath = useLocalePath();
const route = useRoute();

const user = await getCurrentUser();

const email = ref("");
const password = ref("");

const error = ref("");
const loading = {
  google: ref(false),
  password: ref(false),
};

if (user) {
  let redirectTo: string = localePath("/");
  if (route.query?.redirect) {
    redirectTo = route.query.redirect.toString();
  }
  navigateTo(redirectTo);
}

async function loginWithGoogle() {
  loading.google.value = true;

  try {
    await signInWithRedirect(<Auth>auth, new GoogleAuthProvider());
  } catch (e: Error | any) {
    console.error('signinRedirect failed', e);
    error.value = t('auth/redirect-failed');
  }

  loading.google.value = false;
}


async function loginWithCredentials() {
  loading.password.value = true;

  try {
    await signInWithEmailAndPassword(<Auth>auth, email.value, password.value);
  } catch (e: Error | any) {
    let message = t('auth/invalid-credential');
    console.error('signInWithEmailAndPassword failed', e);

    const errorMap = {
      'auth/invalid-credential': t('auth/invalid-credential'),
      'auth/invalid-email': t('auth/invalid-email'),
      'auth/missing-password': t('auth/missing-password'),
    };
    const code = e?.code;
    if (code && code in errorMap) {
      message = errorMap[code].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br>');
    }

    error.value = message;
  }

  loading.password.value = false;
}

onMounted(async () => {
  try {
    const result = await getRedirectResult(<Auth>auth);

    if (result?.user) {
      let redirectTo: string = localePath("/");
      if (route.query?.redirect) {
        redirectTo = route.query.redirect.toString();
      }
      return navigateTo(redirectTo);
    }
  } catch (reason) {
    console.error('getRedirectResult failed', reason)
    error.value = t('auth/invalid-credential')
  }
});

useHead({
  title: t('Login'),
});
definePageMeta({
  layout: 'auth',
});
</script>

<style scoped lang="scss">
.separator {
  @apply divider text-sm font-light;
}

.error {
  @apply text-error-content bg-error border-error-content rounded text-center p-2 mt-3 mb-2;
}
</style>