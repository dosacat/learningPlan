import React, { useState } from 'react'
import {TextField,Button,Box,Typography,Select, MenuItem,FormControl,InputLabel,Container } from '@mui/material';


const {Configuration, OpenAIApi} = require("openai")
const configuration = new Configuration({
    apiKey:process.env.REACT_APP_OPENAI_API_KEY,
})

const openai = new OpenAIApi (configuration)

function Dashboard() {
  const [topic, setTopic] = useState("");
  const[name, setName] = useState("")
  const [date, setDate] = useState("14.06.2023")
  const [grade, setGrade] = useState("7")
  const [apiResponse, setApiResponse] = useState("");


  async function postApi(){
    var prompt = `I need to create a well fomratted lesson plan for the ${topic}
    for grade ${grade} students which 
    includes the following fields. \n 
    Lesson title - a short description of the topic \n 
    Teacher's name - ${name} \n 
    Subject - The subject of the ${topic} \n 
    Grade - ${grade} . This is the grade of students the lesson plan is designed for. \n
    Date - ${date} \n
    Duration - This refers to how long the lesson is planned for.Let this be set to one hour \n
    Vocabulary - This includes a short list of essential words that the students will familiarize themselves with.\n
    Supporting tools - This must include any specific tools that teachers may use to convey the topic better. Tools can include live worksheets, smart boards, tablets, laptops, PowerPoint, whiteboards, and any other educational resources. \n
    Learning outcome- This should include 3 sub-parts. Knowledge, Skills, and Understanding. \n 
    Knowledge refers to what the teacher wants the students to learn. It includes a list of key areas of knowledge based on the topic, duration, and grade.\n
    Skills include what they want students to be proficient in: This includes topic-specific skills that are being developed and taken from the curriculum. \n
    Understanding includes what teachers want students to understand the concepts of. \n
    Differentiation - This includes topic-specific activities the teacher can modify for fast and slow learners to learn the topic better. Learning experiences - This component is divided into six sections that describe the different stages of the lesson: prepare, plan, investigate, apply, connect, evaluate, and reflect. \n
    Prepare - Generate 3 engaging topic-specific questions and activities that help the ${grade} graders make a personal connection to the topic. \n
    For example, if the topic is the human skeleton, the educator might ask the students what they know about bones, and then have them draw a human skeleton and label the bones. 
    Plan -Describe the activities to be completed in the following sections to the students and ensure the necessary media is available. 
    Investigate - Generate 3 activities students must perform to be actively engaged in the topic. This might involve watching a video, conducting an experiment, or participating in a group discussion on the topic. 
    If the topic is the human skeleton, the educator might have the students watch a video that explains the different bones in the body, and ask them to take notes on each bone. 
    Apply - Once the investigation is complete, the students will use the knowledge they have gained to create something. This might involve creating a poster, a presentation, or a written report on the investigated topic.
    Connect - help students make connections between the topic and the world around them. 
    \n
    Evaluate and reflect - Finally, students will reflect on what they have learned on the topic. This might include thinking about what they enjoyed, what new skills and knowledge they gained, and what they could have done better. 
    \n
    Educator assessment- This component is focused on how the teacher will assess what the students have learned. 
    This might involve quizzes, rubrics, or other forms of summative end-of-lesson assessments. For example, if the topic is the human skeleton, the educator might ask the students to take a quiz on the different bones in the body, and then ask them to reflect on what they learned and how they could improve their understanding in the future. 
    Educator reflection - Generate 3 questions that encourage the teacher to reflect on the content of the lesson, whether it was at the right level, whether there were any issues, and whether the pacing was appropriate. It also encourages the teacher to reflect on whether there was enough differentiation for students with different learning needs.`
    try {      
      const response = await openai.createCompletion({
        model:"text-davinci-003",
        
        prompt:`${prompt}`,
        temperature:0.8,
        max_tokens:2000,
        top_p:1.0,
        frequency_penalty:0.0,
        presence_penalty:0.0,
        })
    console.log(response.data.choices[0].text)
    setApiResponse(response.data.choices[0].text)
  }
    catch (exception) {
      setApiResponse("Something is going wrong, Please try again.");
    }
    setTopic("")
    setName("")
    setDate("14.06.2023")
    setGrade("7")
    
    
  }

  function postReq(event){
    event.preventDefault()
    postApi()

  }

  return (
      <Box align = "center" justify = "center" alignItems = "center" sx={{py:3.5, backgroundColor: '#328fa8'}}  >
      <form onSubmit={postReq} >

      <Typography variant="h5" sx={{ fontStyle: 'bold', color:"white"}}>Let's build your lesson plan!</Typography>
    <FormControl required>
    <InputLabel id="simple-select-label">Topic</InputLabel>
    <Select labelId="simple-select-label" value={topic} onChange={({target}) => setTopic(target.value)} sx={{ backgroundColor: '#ffffff', marginTop:2, width: 465, height: 50,}}>
      <MenuItem value="The carbon cycle and decomposition">The carbon cycle and decomposition</MenuItem>
      <MenuItem value="Nutritional needs for green plants">Nutritional needs for green plants</MenuItem>
      <MenuItem value="Fermentation process">Fermentation process</MenuItem>
      <MenuItem value="Respiration process in air">Respiration process in air</MenuItem>
      <MenuItem value="Life cycle of frogs">Life cycle of frogs</MenuItem>
    </Select>
    </FormControl>  
            <div>
            <TextField label="Teacher's Name" sx={{backgroundColor: '#ffffff',m: 1, width: '45ch'}} value={name} onChange={({target}) => setName(target.value)}  />
          </div>
          <div>
            <TextField label="Date" sx={{backgroundColor: '#ffffff',m: 1, width: '45ch'}} value={date} onChange={({target}) => setDate(target.value)} />
          </div>
          <div>
            <TextField label="Grade"  sx={{backgroundColor: '#ffffff',m: 1, width: '45ch'}} value={grade} onChange={({target}) => setGrade(target.value)} />
          </div>
          
          <div>
            <Button variant="contained" sx={{backgroundColor: "#edaf13",m:1.5}} type="submit">
              Create
            </Button>
           
          </div>
              
      </form>
      <Box align = "center" alignItems = "center" sx={{py:3.5,mx:5, backgroundColor: '#ffffff', justifyContent: 'flex-start'}}>
      {apiResponse && (
      <Container>
      <Typography variant="h5" display="block"> Your lesson plan is as follows: </Typography>
      <div>{apiResponse.split("\n").map(str=>(<p>{str} <br></br></p>))}</div>
      </Container>
      )}</Box>
      </Box>
    )

}

export default Dashboard;