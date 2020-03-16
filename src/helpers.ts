import deploy from 'github-pages-deploy-action'
import * as cp from 'child_process'

export const execute = async (
  command: string,
  successMsg: string = 'success',
  errorMsg: string = 'error'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const exec = cp.exec
    exec(command, (err, stdout, stderr) => {
      if (err) {
        process.stderr.write(stderr)
        return reject(errorMsg)
      }
      process.stdout.write(stdout)
      resolve(successMsg)
    })
  })
}

export const isFalsyVal = (val: string): boolean => !val || val === 'false'

export const deployToGithub = deploy
