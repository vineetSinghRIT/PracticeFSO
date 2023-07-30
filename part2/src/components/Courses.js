const Part=({partInfo})=>{
    return (<li>
      {partInfo.name} {partInfo.exercises}
    </li>)
  }
  
  
  const Course=({course})=>{
    const {name,parts}=course
    const total=parts.reduce((s,p)=> {return s+p.exercises},0)
  
    return(<>
    <h1>{name}</h1>
    <ul>
      {parts.map(part=><Part key={part.id} partInfo={part}></Part>)}
      <li>total of {total} exercises</li>
    </ul>
    </>)
  }
  
  const Courses=({courses})=>{
    return (<>
      {courses.map(courseN=><Course key={courseN.id} course={courseN}></Course>)}
    </>)
  }

  
  export default Courses