export default defineNuxtRouteMiddleware((to) => {
  // This middleware is intended to run globally for all routes and block access to /admin
  // If included as a non-global file it won't run automatically. Ensure filename ends with .global.ts

  if (!to.path.startsWith('/admin')) return

  // On server, redirect to /admin/login so SSR does not render admin pages to unauthenticated users
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
