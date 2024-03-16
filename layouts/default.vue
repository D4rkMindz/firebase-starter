<template>
    <div class="bg-base-200 text-base-content">
        <div class="drawer">
            <input id="sidebar" class="drawer-toggle" type="checkbox" />

            <div class="drawer-content flex flex-col min-h-screen w-full">
                <!-- Navbar -->
                <header
                    class="flex-none navbar bg-transparent sticky top-0 z-[1]"
                >
                    <div class="flex-none">
                        <label class="btn btn-square btn-ghost" for="sidebar">
                            <Bars3Icon class="inline-block icon" />
                        </label>
                    </div>

                    <span class="flex-1" />

                    <div class="flex-none">
                        <SwitchLanguage />

                        <SwitchTheme />

                        <div class="dropdown dropdown-end">
                            <label
                                class="btn btn-ghost btn-circle avatar"
                                tabindex="0"
                            >
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
                                class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52"
                                tabindex="0"
                            >
                                <li>
                                    <NuxtLink
                                        :to="localePath('/user/profile')"
                                        >{{ $t('Profile') }}</NuxtLink
                                    >
                                </li>
                                <li>
                                    <NuxtLink :to="localePath('/logout')">{{
                                        $t('Logout')
                                    }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main class="flex-1 overflow-y-auto p-5">
                    <slot />
                </main>

                <Footer />
            </div>

            <div class="drawer-side">
                <label class="drawer-overlay" for="sidebar"></label>
                <ul class="menu h-full p-4 overflow-y-auto w-80 bg-base-200">
                    <div class="logo-header">
                        <NuxtLink
                            :to="localePath('/')"
                            aria-current="page"
                            aria-label="Homepage"
                            class="flex-0 btn btn-ghost px-2"
                        >
                            <div
                                class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl"
                            >
                                <span class="lowercase">Cevi</span>
                                <span class="text-base-content uppercase"
                                    >E</span
                                >
                            </div>
                        </NuxtLink>
                        <NuxtLink
                            :to="localePath('/docs/changelog')"
                            class="link link-hover font-mono text-xs text-opacity-50"
                        >
                            <div
                                class="tooltip tooltip-bottom"
                                data-tip="Changelog"
                            >
                                1.0.1
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="h-4" />
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
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { Bars3Icon } from '@heroicons/vue/24/solid';
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

<style scoped>
p {
    white-space: pre-wrap;
}

.icon {
    @apply w-6 h-6 stroke-current;
}

.logo-header {
    @apply z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex;
}
</style>
