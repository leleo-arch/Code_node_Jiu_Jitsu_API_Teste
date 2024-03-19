const cors = require('cors');
const express = require ('express')
const myprojects = []
const app = express()
app.use(express.json())
app.use(cors())
const uuid = require('uuid')
const port = 5000

const chekprojectid = (request, respons, next ) => {
    const {id} = request.params
    const index = myprojects.findIndex(item => item.id === id)
    if (index < 0){
        return respons.status(404).json({messagem: "erros not existente"})
        }
        request.projectindex = index
        next()
}

app.get('/myprojects/', (request, response) => {
    return response.json(myprojects)
}) 


app.post('/myprojects', (request, response) => {
    const {name, age } = request.body
    const project = { id: uuid.v4(), name, age }
    myprojects.push(project)
    return response.status(201).json(project)
    
})

app.put('/myprojects/:id', (request, response) => {
    const {id} = request.params
    const {order, clientName, price, status} = request.body
    const index = request.projectindex
    const updateproject = {id, order, clientName, price, status}
    myprojects[index] = updateproject
    return response.json(updateproject)
    
});

app.delete('/myprojects/:id', chekprojectid, (request, response) => {
       const index = request.projectindex
        myprojects.splice(index,1)
        return response.status(204).json()
}) 

 app.patch('/myprojects/:id', (request, response) => {
    const {id} = request.params
    const {status, order, clientName, price} = request.body
    const updateproject = {id, order, clientName, price, status}
    const index = myprojects.findIndex(item => item.id === id)
    if (index < 0){
    return response.status(404).json({messagem: "erros not existente"})
    }
    myprojects[index] = updateproject
    return response.json(updateproject)
    
});

app.get(':id', (request, response) => {
    const {id} = request.params
    const updateproject = {id}
    const index = myprojects.findIndex(item => item.id === id)
    if (index < 0){
    return response.status(404).json({messagem: "erros not existente"})
    }
    myprojects[index] = updateproject 
    return response.json(updateproject)
    
});

app.listen(5000)