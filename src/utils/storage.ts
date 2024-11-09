const SYNC_ID_KEY = '__sync_id__'

export const secretIdStorage = {
  set(id: string) {
    localStorage.setItem(SYNC_ID_KEY, id)
  },
  get() {
    return localStorage.getItem(SYNC_ID_KEY)
  },
  remove() {
    localStorage.removeItem(SYNC_ID_KEY)
  },
}
