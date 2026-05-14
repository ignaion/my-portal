export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return

  if (process.server) return navigateTo('/admin/login')

  try {
    const token = localStorage.getItem('admin_token')
    if (!token) return navigateTo('/admin/login')
  } catch (e) {
    return navigateTo('/admin/login')
  }
})
