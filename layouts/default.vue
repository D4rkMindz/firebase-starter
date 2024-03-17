<template>
    <div class="bg-base-200 text-base-content">
        <div class="drawer">
            <input id="sidebar" class="drawer-toggle" type="checkbox" />

            <div class="content">
                <header class="header">
                    <div class="header-left">
                        <label class="btn btn-square btn-ghost" for="sidebar">
                            <Bars3Icon class="inline-block icon" />
                        </label>
                    </div>

                    <span class="header-spacer" />

                    <div class="header-right">
                        <SwitchLanguage />

                        <SwitchTheme />

                        <div class="dropdown dropdown-end">
                            <label
                                class="btn btn-ghost btn-circle avatar"
                                tabindex="0">
                                <div class="w-10 rounded-full">
                                    <img
                                        v-if="user"
                                        :src="user?.photoURL"
                                        alt="profile picture"
                                    />
                                    <div v-if="!user">
                                        <UserCircleIcon
                                            class="inline-block w-full rainbow"
                                        />
                                    </div>
                                </div>
                            </label>
                            <ul
                                class="profile-menu"
                                tabindex="0">
                                <li>
                                    <NuxtLink :to="localePath('/user/profile')">
                                        {{ $t('Profile') }}
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink :to="localePath('/logout')">
                                        {{ $t('Logout') }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main class="content-main">
                    <slot />
                </main>

                <Footer />
            </div>

            <div class="drawer-side overflow-hidden">
                <label class="drawer-overlay" for="sidebar"></label>

                <div class="drawer-menu">
                    <div class="logo-header grow-0 flex">
                        <NuxtLink
                            :to="localePath('/')"
                            aria-current="page"
                            aria-label="Homepage"
                            class="logo-link justify-center pt-2">
                            <span class="uppercase">APP</span>

                            <span class="text-base-content lowercase">name</span>
                        </NuxtLink>

                        <div class="grow-0 mr-4">

                            <label class="btn btn-square btn-ghost" for="sidebar">
                                <XMarkIcon class="inline-block icon" />
                            </label>
                        </div>
                    </div>

                    <div class="flex flex-col grow justify-between">
                        <div class="flex grow overflow-y-auto pl-4">
                            <ul class="menu w-full">
                                <li>
                                    <a data-set-theme="dark">{{ $t('Dark') }}</a>
                                </li>
                                <li>
                                    <a data-set-theme="light">{{ $t('Light') }}</a>
                                </li>
                                <li>
                                    <a data-set-theme="cyberpunk">{{ $t('Cyberpunk') }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="menu-footer">
                            <NuxtLink
                                :to="localePath('/docs/changelog')"
                                class="link link-hover font-mono text-xs text-opacity-50">
                                1.0.1
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid';
import { themeChange } from 'theme-change';
import Footer from '~/components/Layout/Footer.vue';
import SwitchTheme from '~/components/Layout/SwitchTheme.vue';
import SwitchLanguage from '~/components/Layout/SwitchLanguage.vue';

const localePath = useLocalePath();

const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

// we don't need this watcher on server
onMounted(() => {
    themeChange(false);

    watch(user, (user, prevUser) => {
        if (prevUser && !user) {
            // user logged out
            router.push(localePath('/login'));
        } else if (user && typeof route.query.redirect === 'string') {
            // user logged in
            router.push(route.query.redirect);
        }
    });
});
</script>

<style>
html {
    height: 100%;
    overflow: hidden;
    position: relative;
}

body {
    height: 100%;
    overflow: auto;
    position: relative;
}

p {
    white-space: pre-wrap;
}

.content {
    @apply drawer-content flex flex-col min-h-screen w-full;

    &-main {
        @apply flex-1 overflow-y-auto p-5;
    }
}

.header {
    @apply flex-none navbar bg-transparent sticky top-0;

    & .header-left,
    & .header-right {
        @apply flex-none;
    }

    & .header-spacer {
        @apply flex-1;
    }
}

.icon {
    @apply w-6 h-6 stroke-current;
}

.drawer-menu {
    @apply flex flex-col gap-2 h-screen w-80 bg-base-200 max-h-screen overflow-hidden;
}

.logo-header {
    @apply w-full z-20 flex flex-row justify-center pr-1 gap-2  bg-base-200 bg-opacity-90 backdrop-blur sticky top-2.5;
}

.logo-link {
    @apply inline-flex flex-1 gap-1 grow text-center text-primary px-2 transition-all duration-200 text-lg md:text-3xl;
}

.menu-footer {
    @apply flex grow-0 w-full z-20 justify-center bg-base-300 p-4;
    height: 2.5rem;
    min-height: 2.5rem;
}

.profile-menu {
    @apply menu dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52;
}
</style>
