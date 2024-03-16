export default defineNuxtRouteMiddleware(async (to /*, from*/) => {
    if (process.server) {
        return;
    }

    if (to.meta.layout == 'auth') {
        return;
    }

    const user = await getCurrentUser();

    // redirect the user to the login page
    if (!user) {
        let redirect = to.fullPath;
        if (to?.name?.toString().split('___')[0] === 'logout') {
            redirect = '/';
        }

        return navigateTo({
            path: '/login',
            query: {
                redirect: redirect,
            },
        });
    }
});
