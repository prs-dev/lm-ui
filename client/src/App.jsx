import { useCallback, useEffect, useState } from "react"
import Markdown from 'react-markdown'

const App = () => {
  const [text, setText] = useState('')
  const [reply, setReply] = useState('')
  const [test, setTest] = useState('')
  const [index, setIndex] = useState(0)
  const [context, setContext] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Context:', context);
  console.log('JSON Stringified Context:', JSON.stringify(context));
    try {
      setContext(prev => [...prev, {
        role: 'user',
        content: text
      }])
      // console.log(JSON.stringify(context))
      const structure = await fetch("/api/chat", {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        // body: JSON.stringify(
        //   {
        //     role: "user",
        //     text
        //   }
        // )
        body: JSON.stringify([...context, {
          role: 'user',
          content: text
        }])
      })
      if (structure.ok) {
        const response = await structure.json()
        setReply(response.message.content)
        setContext(prev => [...prev, response.message])
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      if (!reply.length || index >= reply.split(' ').length) {
        return;
      }
      const words = reply.split(" ")
      // console.log(words, index)
      const displayedPart = words.slice(0, index + 1).join(' ');
      // console.log(displayedPart)
      setTest(displayedPart)

      // Increment the part index every second (or any interval you prefer)
      const timerId = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 200); // 40 words per minute

      return () => clearInterval(timerId)
  }, [index, reply])



  useEffect(() => {    // making context
    if(context.length > 6) {
      console.log("reached")
      const newArr = context.slice(-6)
      setContext(newArr)
    }
    return
  }, [context])

  console.log(context)


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSubmit}>
        <textarea name="" id="" cols="30" rows="10" onChange={e => setText(e.target.value)} />
        <button style={{ padding: "10px" }} type='submit'>Send</button>
      </form>
      <div>
        <strong>Assistant</strong>: <Markdown>{test}</Markdown>
      </div>
    </div>
  )
}

export default App