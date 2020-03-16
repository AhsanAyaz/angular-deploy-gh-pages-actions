import * as core from '@actions/core'
import * as commands from './commands'
import {isFalsyVal} from './helpers'

async function run(): Promise<void> {
  try {
    const baseHref = core.getInput('base_href')
    const buildConfig = core.getInput('build_configuration')
    const shouldRunLint = core.getInput('run_lint')
    const accessToken = core.getInput('github_access_token')
    const buildFolder = core.getInput('build_folder')

    await commands.installDeps()
    await commands.runLint(shouldRunLint)
    await commands.createBuild({
      baseHref,
      buildConfig
    })
    await commands.deployBuild({
      accessToken,
      buildFolder
    })
    // eslint-disable-next-line no-console
    console.log('project deployed')
  } catch (error) {
    const skipFailure = core.getInput('skip_failure')
    if (isFalsyVal(skipFailure)) {
      core.setFailed(error.message)
    }
  }
}

run()
