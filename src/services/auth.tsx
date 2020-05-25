interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  }
}

export function signIn(username: string, password: string): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'token_retornado_pela_api',
        user: {
          name: 'Marcos Cesar',
          email: 'marcos.v.cesar@accenture.com'
        }
      })
    }, 2000)
  })
}