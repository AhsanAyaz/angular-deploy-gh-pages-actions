import * as process from 'process'
import {createBuild, deployBuild, runLint} from '../src/commands'
import {execute} from '../src/helpers'

jest.mock('../src/helpers')

test('test does not run lint if run_lint is falsy', async () => {
  let shouldRunLint: any = 'false'
  process.env['execute_success'] = 'false'
  let result = await runLint(shouldRunLint)
  expect(result).toBe('not running lint')
  shouldRunLint = false
  result = await runLint(shouldRunLint)
  expect(result).toBe('not running lint')
})

test('test runs lint if run_lint is not falsy', async () => {
  const shouldRunLint: any = true
  process.env['execute_success'] = 'true'
  let result = await runLint(shouldRunLint)
  expect(result).toBe('successfully run lint')
})

test('test throws error for deployment if accessToken is not provided', async () => {
  const accessToken = ''
  const buildFolder = './dist/my-app'
  const deployBranch = 'my-custom-branch'
  process.env['execute_success'] = 'true'
  await expect(
    deployBuild({
      accessToken,
      buildFolder,
      deployBranch
    })
  ).rejects.toThrow(
    'Github Access token not provided. Please add it to your workflow yml'
  )
})

test('test runs fine for deployment if all inputs are correct', async () => {
  const accessToken = 'some-token'
  const buildFolder = './dist/my-app'
  const deployBranch = 'my-custom-branch'
  process.env['execute_success'] = 'true'
  const result = await deployBuild({
    accessToken,
    buildFolder,
    deployBranch
  })
  expect(result).toBe('successfully deployed')
})

test('test runs createBuild with provided values ', async () => {
  const buildConfig = 'beta'
  const baseHref = '/my-app/'
  process.env['execute_success'] = 'true'
  const result = await createBuild({
    buildConfig,
    baseHref
  })
  expect(result).toBe('success')
  expect(execute).toHaveBeenCalledWith(
    'node_modules/.bin/ng build --configuration=beta --base-href=/my-app/'
  )
})

test('test runs createBuild with default values if they are not explicitly provided', async () => {
  const buildConfig = ''
  const baseHref = ''
  process.env['execute_success'] = 'true'
  const result = await createBuild({
    buildConfig,
    baseHref
  })
  expect(result).toBe('success')
  expect(execute).toHaveBeenCalledWith(
    'node_modules/.bin/ng build --configuration=production'
  )
})
