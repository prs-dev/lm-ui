// const express = require('express')
// const ollama = require('ollama/browser')
import express from 'express'
import ollama from 'ollama'
const app = express()

app.use(express.json())

app.post('/api/chat', async(req, res) => {
    const text = req.body.text

    // console.log(text)
    
    const response = await ollama.chat({
        model: "llama3.2:1b",
        messages: [
            {
                role: "user",
                content: text
            }
        ]
    })
    return res.status(200).json(response)
    // console.log("ready")
})

app.listen(5000, () => {
    console.log("server is running...")
})


// import ollama from 'ollama'

// const response = await ollama.chat({
//     model: "llama3.2:1b",
//     messages: [
//         {
//             role: "user",
//             content: "why sky is blue ?"
//         }
//     ]
// })

// console.log(response.message)