import {isFalsyVal, execute, deployToGithub} from './helpers'

export async function runLint(shouldRunLint: string): Promise<string> {
  if (!isFalsyVal(shouldRunLint)) {
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
  return await execute(
    `node_modules/.bin/ng build --configuration=${buildConfig} --base-href=${baseHref}`
  )
}

export async function deployBuild(deployConfig: {
  accessToken: string
  buildFolder: string
}): Promise<string> {
  const {accessToken, buildFolder} = deployConfig
  if (!accessToken) {
    throw Error(
      'Github Access token not provided. Please add it to your workflow yml'
    )
  }
  await deployToGithub({
    accessToken,
    branch: 'gh-pages',
    folder: buildFolder ? buildFolder : './dist',
    workspace: './'
  })
  return 'successfully deployed'
}

export async function installDeps(): Promise<string> {
  return await execute('npm install')
}
