export const isFalsyVal = jest.fn((val: string) => !val || val === 'false')

export const execute = jest.fn(
  async (
    command: string,
    successMsg: string = 'success',
    errorMsg: string = 'error'
  ) => {
    if (process.env['execute_success'] === 'true') {
      return Promise.resolve(successMsg)
    } else {
      return Promise.reject(errorMsg)
    }
  }
)

export const deployToGithub = jest.fn(async () => execute('deploy to github'))

export const writeToConsole = jest.fn(() => {})
