import deploy from 'github-pages-deploy-action'
import * as cp from 'child_process'

export const execute = async (
  command: string,
  successMsg: string = 'success',
  errorMsg: string = 'error'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const exec = cp.execSync
    try {
      const result = exec(command)
      process.stdout.write(result)
      resolve(successMsg)
    } catch (error) {
      process.stderr.write(error)
      reject(errorMsg)
    }
  })
}

export const isFalsyVal = (val: string): boolean => !val || val === 'false'

export const deployToGithub = deploy
