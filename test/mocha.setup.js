const path = require('path')
const { assert, expect, should } = require('chai')

process.env.NODE_ENV = 'test'
process.env.APP_JWT_SIGN_KEY = 'rUOIUnNOQlUwUhhN8Zk6'
global.__root = path.resolve(__dirname, '../')
global.path = path
global.assert = assert
global.expect = expect
global.should = should
global.FakeResponse = require('./configuration/FakeResponse')
global.TestConnection = require('./configuration/TestConnection')
