export default async function fetchWithTimeout(
  promise: Promise<any>,
  timeout: number
) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('Request timed out')),
      timeout
    )
    promise.then(
      (response: any) => {
        clearTimeout(timer)
        resolve(response)
      },
      (error: any) => {
        clearTimeout(timer)
        reject(error)
      }
    )
  })
}
