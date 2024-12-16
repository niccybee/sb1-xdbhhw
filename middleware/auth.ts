
export default defineNuxtRouteMiddleware((to, from) => {
  const headers = useRequestHeaders(['x-replit-user-id'])
  if (!headers['x-replit-user-id']) {
    return navigateTo('/')
  }
})
