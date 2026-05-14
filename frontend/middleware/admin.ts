export default defineNuxtRouteMiddleware((to) => {
  // Protect any /admin route
  if (!to.path.startsWith('/admin')) return

  // On server, prevent SSR of admin pages (redirect to login)
  if (process.server) {
    return navigateTo('/admin/login')
  }

  // On client, require a stored JWT (admin_token)
  try {
    const token = localStorage.getItem('admin_token')
    if (!token) return navigateTo('/admin/login')
  } catch (e) {
    return navigateTo('/admin/login')
  }
})
