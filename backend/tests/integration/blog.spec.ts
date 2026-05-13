import request from 'supertest'
import { spawnSync } from 'child_process'

// Integration tests assume the backend is running and reachable at http://127.0.0.1:3001
const BASE = process.env.TEST_API_BASE || 'http://127.0.0.1:3001'
const ADMIN_KEY = process.env.ADMIN_API_KEY || ''

function getAuthHeader(useAdminKey = true, jwt?: string) {
  const headers: any = {}
  if (useAdminKey && ADMIN_KEY) headers['x-admin-key'] = ADMIN_KEY
  if (jwt) headers['Authorization'] = `Bearer ${jwt}`
  return headers
}

describe('Blog integration', () => {
  let createdSlug = ''
  const testSlug = `ci-test-${Date.now()}`

  it('rejects unauthenticated create', async () => {
    const res = await request(BASE).post('/api/blog').send({ title: 'x', slug: 'x' })
    expect(res.status).toBe(403)
  })

  it('allows create with admin key', async () => {
    const res = await request(BASE).post('/api/blog').set(getAuthHeader(true)).send({ title: 'CI Test', slug: testSlug, contentMarkdown: '# hello' })
    expect([200,201]).toContain(res.status)
    expect(res.body.slug).toBe(testSlug)
    createdSlug = res.body.slug
  })

  it('exposes content_markdown on GET', async () => {
    const res = await request(BASE).get(`/api/blog/${createdSlug}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('contentMarkdown')
    expect(res.body.contentMarkdown).toContain('# hello')
  })

  it('can patch publish state using admin key', async () => {
    const res = await request(BASE).patch(`/api/blog/${createdSlug}`).set(getAuthHeader(true)).send({ isPublished: false })
    expect([200,201]).toContain(res.status)
    // read back
    const r2 = await request(BASE).get(`/api/blog/${createdSlug}`)
    expect(r2.status).toBe(200)
    expect(r2.body.isPublished).toBe(false)
  })

  it('can delete using admin key', async () => {
    const res = await request(BASE).delete(`/api/blog/${createdSlug}`).set(getAuthHeader(true))
    expect([200,201]).toContain(res.status)
    const r2 = await request(BASE).get(`/api/blog/${createdSlug}`)
    expect(r2.status).toBe(200)
    expect(r2.body).toBeNull()
  })
})
