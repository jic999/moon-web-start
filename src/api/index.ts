import ky from 'ky'

const api = ky.extend({
  prefixUrl: import.meta.env.VITE_API_BASE,
})

export function reqPostData(data: { id?: string; secretId?: string; data: any }) {
  return api.post('sync', { json: data }).json()
}

export function reqGetData(id: string) {
  return api.get(`sync/${id}`).json()
}
