import app from './app'
import { AddressInfo } from 'net'
import createStudent from './endpoints/createStudent'
import createClass from './endpoints/createClass'

app.post("/students", createStudent)
app.post("/createClass", createClass)
