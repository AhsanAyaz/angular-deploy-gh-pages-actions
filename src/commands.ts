import { deployToGithub, execute, isFalsyVal, writeToConsole } from './helpers'

export async function runLint(shouldRunLint: string): Promise<string> {
  if (!isFalsyVal(shouldRunLint)) {
    writeToConsole('Running lint 💪')
    return await execute(
      'node_modules/.bin/ng lint',
      'successfully run lint',
      'could not run lint'
    )
  } else {
    return Promise.resolve('not running lint')
  }
}

export async function createBuild(params: {
  buildConfig?: string
  baseHref?: string
}): Promise<string> {
  let {buildConfig, baseHref} = params
  if (!buildConfig) {
    buildConfig = 'production'
  }
  if (!baseHref) {
    baseHref = '/'
  }
  writeToConsole('Creating ng build 💪')
  return await execute(
    `node_modules/.bin/ng build --configuration=${buildConfig} --base-href=${baseHref}`
  )
}

export async function deployBuild(deployConfig: {
  accessToken: string
  buildFolder: string
  deployBranch: string
}): Promise<string> {
  const {accessToken, buildFolder, deployBranch} = deployConfig
  if (!accessToken) {
    throw Error(
      'Github Access token not provided. Please add it to your workflow yml'
    )
  }
  writeToConsole('Deploying build ..💪')
  await deployToGithub({
    accessToken,
    branch: deployBranch ? deployBranch : 'gh-pages',
    folder: buildFolder ? buildFolder : './dist',
    workspace: './'
  })
  writeToConsole('Deployed build successfully! 🎉🎉🎉')
  return 'successfully deployed'
}

export async function installDeps(): Promise<string> {
  writeToConsole('Installing dependencies 🏃')
  return await execute('npm install')
}
