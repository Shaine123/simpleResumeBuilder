
import React, { isValidElement, useEffect, useRef, useState } from 'react'
import './homepage.css'
import { MenuIcon, PlusIcon } from '../../assets/images'
import DocumentLayout from '../documentLayout/DocumentLayout'
const HomePage = () => {
   
  const [activeTab,setActiveTab] = useState(1)

  const [personalInfo,setPersonalInfo] = useState()
  const [fName,setFname] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [location,setLocation] = useState('')
  const [summary,setSummary] = useState('')


  const [experience, setExperience] = useState([])
  const [compName, setCompName] = useState()
  const [position, setPosition] = useState()
  const [startDateJob, setStartDateJob] = useState()
  const [endDateJob, setEndDateJob] = useState()
  const [details, setDetails] = useState()

  const [education, setEducation] = useState([])
  const [universityName, setUniversityName] = useState()
  const [degree, setDegree] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const [skills, setSkills] = useState([])
  const [skillName, setSkillName] = useState()

  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState()
  const [projectDetail, setProjectDetail] =  useState()

  const activeInput = useRef(null)

  useEffect(() => {
    if(activeTab !== 6){
      activeInput.current.focus()
    }
  }, [activeTab])



  const handleTabs = (id) => {
       setActiveTab(id)
  }

  const handleSubmit = (id) => {
      if(id == 'PersonalInfo'){
         setPersonalInfo(
            {
               name: fName,
               email: email,
               phone: phone,
               location: location,
               summary: summary
             }
         )
      }else if(id == 'Experience'){
         if(experience.length <= 0){
            setExperience([{
               companyName: compName,
               position: position,
               startDate: startDateJob,
               endDate: endDateJob,
               details: details
           }])
         }else{
             let tempExperience = [...experience]
             tempExperience.push({
               companyName: compName,
               position: position,
               startDate: startDateJob,
               endDate: endDateJob,
               details: details
           })
           setExperience(tempExperience)
         }
        
      }else if(id == 'Education'){

         if(education.length <=0){
            setEducation(
              [ {
                  universityName: universityName,
                  degree: degree,
                  startDate: startDate,
                  endDate: endDate
               }]
            )
         }else {
             let tempEducation = [...education]
             tempEducation.push({
               universityName: universityName,
               degree: degree,
               startDate: startDate,
               endDate: endDate
            })
            setEducation(tempEducation)
         }
      
      }else if(id == 'Skills') {
          if(skills.length <= 0){
             setSkills(
                [
                  {
                     name: skillName
                  }
                ]
             )
          }else{
             let tempSkills = [...skills]
             tempSkills.push({
                name: skillName
             })
             setSkills(tempSkills)
          }
      }else if(id == 'Projects'){
          if(projects.length <= 0){
             setProjects(
               [
                  {
                      name: projectName,
                      detail: projectDetail
                  }
               ]
             )
          }else {
             let tempProject = [...projects]
             tempProject.push({
               name: projectName,
               detail: projectDetail
             })
             setProjects(tempProject)
          }
      }
  }

  const [editText, setEditText] = useState()
  const [isEdit, setIsEdit] = useState({id: 0, state: false})
  const handleEdits = (value,id,type) => {
   if(type == 'Experience' && editText !== undefined){  
    experience[id] = {...experience[id], ...value}
    setExperience(experience)
   }
   else if(type == 'Personal' && editText !== undefined){  
      const newPersonalInfo = {...personalInfo, ...value}
      setPersonalInfo(newPersonalInfo)
  }else if(type == 'Education' && editText !== undefined){
   education[id] = {...education[id], ...value}
   setEducation(education)
  }else if(type == 'Skills' && editText !== undefined){
   skills[id] = {...skills[id], ...value}
   setSkills(skills)
  }else if(type == 'Projects' && editText !== undefined){
     projects[id] = {...projects[id], ...value}
     setProjects(projects)
  }

     setIsEdit(false)
  }

  const handleDelete = (id,type) => {
      if(type == 'Experience'){
          if(experience.length > 1) {
            const newExperience = experience.filter((obj,index) => index !== id)
            setExperience(newExperience)
          }else {
            setExperience([])
          }
      }else if(type == 'Personal') {
         setPersonalInfo('')
      }else if(type == 'Education'){
         if(experience.length > 1) {
            const newEducation = education.filter((obj,index) => index !== id)
            setEducation(newEducation)
          }else {
            setEducation([])
          }
      }else if(type == 'Skills'){
         if(skills.length > 1) {
            let newSkills = skills.filter((obj,index) => index !== id)
            setSkills(newSkills)
          }else {
            setSkills([])
          }
      }else if(type == 'Projects'){
          if(projects.length > 1){
             const newProjects = projects.filter((obj,index) => index !== id)
             setProjects(newProjects)
          } else {
             setProjects([])
          }
      }
  }

  const [openMenu, setOpenMenu] = useState(false)

  const handleMenu = () => {
      setOpenMenu(!openMenu)
  }

  const [showResults,setShowResults] = useState(false)
  
  return (
    <div className = 'container'>
        <div className="header">
            <h1>Simple Resume Builder</h1>
            <p>Create your professionnal resume in just a few minutes</p>
        </div>
        <div className="hero-container">
          <div className="side-bar">
          <button className='hamburger-btn' onClick={handleMenu}>
                 <img src={MenuIcon} alt="menu" />
              </button>
              <ul style={openMenu ? {left:'0px'} : {left:'-1000px'}}>
                 <li onClick={() => handleTabs(1)} className= {`${activeTab == 1 ? 'active' : ''}`}>Personal</li>
                 <li onClick={() => handleTabs(2)} className= {`${activeTab == 2 ? 'active' : ''}`}>Experience</li>
                 <li onClick={() => handleTabs(3)} className= {`${activeTab == 3 ? 'active' : ''}`}>Education</li>
                 <li onClick={() => handleTabs(4)} className= {`${activeTab == 4 ? 'active' : ''}`}>Skills</li>
                 <li onClick={() => handleTabs(5)} className= {`${activeTab == 5 ? 'active' : ''}`}>Projects</li>
                 <li onClick={() => {
                   handleTabs(6)
                   setShowResults(!showResults)
                 }} className= {`${activeTab == 6 ? 'active' : ''}`}>Results</li>
              </ul>
          </div>
           <div className="resume-main" >
              <ul style={openMenu ? {left:'0px'} : {left:'-1000px'}}>
                 <li onClick={() => handleTabs(1)} className= {`${activeTab == 1 ? 'active' : ''}`}>Personal</li>
                 <li onClick={() => handleTabs(2)} className= {`${activeTab == 2 ? 'active' : ''}`}>Experience</li>
                 <li onClick={() => handleTabs(3)} className= {`${activeTab == 3 ? 'active' : ''}`}>Education</li>
                 <li onClick={() => handleTabs(4)} className= {`${activeTab == 4 ? 'active' : ''}`}>Skills</li>
                 <li onClick={() => handleTabs(5)} className= {`${activeTab == 5 ? 'active' : ''}`}>Projects</li>
              </ul>
              <div className="resume-content" >
                {
                   activeTab == 1 ? 
                   <div className="content">
                       <h1>Personal Information</h1>
                       <form action="" onSubmit={(e) => {
                          e.preventDefault()
                          handleSubmit('PersonalInfo')
                       }}>
                          <div className="input-container">
                             <label htmlFor="fName">Full Name</label>
                             <input type="text" name="fName" id="" ref={activeInput} onChange={(e)=>{setFname(e.target.value)}} />
                             {
                                 personalInfo && <div  className='sub-form-container'>
                                       <div className='result-container'>
                                          {
                                             isEdit.state && isEdit.id == 0 ? 
                                             <input 
                                             type="text"    
                                             name="" 
                                             id="" 
                                             placeholder={personalInfo.name}
                                             onChange={(e) => setEditText(e.target.value)}
                                          />
                                             :
                                          <p >{personalInfo && personalInfo.name}</p>
                                          }
                                          {
                                             isEdit.state && isEdit.id == 0  ?
                                             <button type="button" onClick={() => {handleEdits({name: editText},0, 'Personal')}}>Save</button>
                                             :
                                             <div style={{display: 'flex', gap: '5px'}}>
                                             <button type='button' onClick={() => {setIsEdit({id:0, state: !isEdit.state})}}>Edit</button>
                                             <button type='button' onClick={() => {handleDelete(0,'Personal')}}style={{backgroundColor:'#FF0000', }}>Delete</button>
                                             </div>
                                          }
                                       </div>
                                 </div>   
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="email">Email</label>
                             <input type="text" name="email" id="" onChange={(e)=>{setEmail(e.target.value)}} />
                             {
                                 personalInfo && <div  className='sub-form-container'>
                                       <div className='result-container'>
                                          {
                                             isEdit.state && isEdit.id == 0 ? 
                                             <input 
                                             type="text"    
                                             name="" 
                                             id="" 
                                             placeholder={personalInfo.email}
                                             onChange={(e) => setEditText(e.target.value)}
                                          />
                                             :
                                          <p >{personalInfo && personalInfo.email}</p>
                                          }
                                          {
                                             isEdit.state && isEdit.id == 0  ?
                                             <button type="button" onClick={() => {handleEdits({email: editText},0, 'Personal')}}>Save</button>
                                             :
                                             <div style={{display: 'flex', gap: '5px'}}>
                                             <button type='button' onClick={() => {setIsEdit({id:0, state: !isEdit.state})}}>Edit</button>
                                             </div>
                                          }
                                       </div>
                                 </div>   
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="phone">Phone</label>
                             <input type="text" name="phone" id="" onChange={(e)=>{setPhone(e.target.value)}} />
                             {
                                 personalInfo && <div  className='sub-form-container'>
                                       <div className='result-container'>
                                          {
                                             isEdit.state && isEdit.id == 0 ? 
                                             <input 
                                             type="text"    
                                             name="" 
                                             id="" 
                                             placeholder={personalInfo.phone}
                                             onChange={(e) => setEditText(e.target.value)}
                                          />
                                             :
                                          <p >{personalInfo && personalInfo.phone}</p>
                                          }
                                          {
                                             isEdit.state && isEdit.id == 0  ?
                                             <button type="button" onClick={() => {handleEdits({phone: editText},0, 'Personal')}}>Save</button>
                                             :
                                             <div style={{display: 'flex', gap: '5px'}}>
                                             <button type='button' onClick={() => {setIsEdit({id:0, state: !isEdit.state})}}>Edit</button>
                                             </div>
                                          }
                                       </div>
                                 </div>   
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="location">Location</label>
                             <input type="text" name="location" id="" onChange={(e)=>{setLocation(e.target.value)}}/>
                             {
                                 personalInfo && <div  className='sub-form-container'>
                                       <div className='result-container'>
                                          {
                                             isEdit.state && isEdit.id == 0 ? 
                                             <input 
                                             type="text"    
                                             name="" 
                                             id="" 
                                             placeholder={personalInfo.location}
                                             onChange={(e) => setEditText(e.target.value)}
                                          />
                                             :
                                          <p >{personalInfo && personalInfo.location}</p>
                                          }
                                          {
                                             isEdit.state && isEdit.id == 0  ?
                                             <button type="button" onClick={() => {handleEdits({location: editText},0, 'Personal')}}>Save</button>
                                             :
                                             <div style={{display: 'flex', gap: '5px'}}>
                                             <button type='button' onClick={() => {setIsEdit({id:0, state: !isEdit.state})}}>Edit</button>
                                             </div>
                                          }
                                       </div>
                                 </div>   
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="summary">Summary</label>
                             <textarea name="" id="" cols="20" onChange={(e)=>{setSummary(e.target.value)}} ></textarea>
                             {
                                 personalInfo && <div  className='sub-form-container'>
                                       <div className='result-container'>
                                          {
                                             isEdit.state && isEdit.id == 0 ? 
                                             <textarea 
                                               name="summary" 
                                               id="" 
                                               cols="30"
                                               value={summary}
                                               onChange={(e) => {
                                                setEditText(e.target.value)
                                                setSummary(e.target.value)
                                               }}
                                             />
                                             :
                                          <p >{personalInfo && personalInfo.summary}</p>
                                          }
                                          {
                                             isEdit.state && isEdit.id == 0  ?
                                             <button type="button" onClick={() => {handleEdits({summary: editText},0, 'Personal')}}>Save</button>
                                             :
                                             <div style={{display: 'flex', gap: '5px'}}>
                                             <button type='button' onClick={() => {setIsEdit({id:0, state: !isEdit.state})}}>Edit</button>
                                             </div>
                                          }
                                       </div>
                                 </div>   
                             }
                          </div>
                          <button type="submit" className='content-btn'>
                            <img src={PlusIcon} alt="plus" />
                            Add Information
                          </button>
                       </form>
                   </div>
                   :
                   activeTab == 2 ?
                    <div className="content">
                        <h1>Experience </h1>
                        <form action=""  onSubmit={(e) => {
                          e.preventDefault()
                          handleSubmit('Experience')
                       }} >
                          <div className="input-container">
                             <label htmlFor="compName">Company or Organization Name</label> 
                             <input type="text" name="compName" id="" ref={activeInput} onChange={(e)=>{setCompName(e.target.value)}}/>
                             {
                               experience && experience.map((experience,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <input 
                                                type="text"    
                                                name="" 
                                                id="" 
                                                placeholder={experience.companyName}
                                                onChange={(e) => setEditText(e.target.value)}
                                             />
                                              :
                                             <p >{experience && experience.companyName}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({companyName: editText},index, 'Experience')}}>Save</button>
                                              :
                                              <div style={{display: 'flex', gap: '5px'}}>
                                                <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                <button type='button' onClick={() => {handleDelete(index,'Experience')}}style={{backgroundColor:'#FF0000', }}>Delete</button>
                                              </div>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="position">Position</label>
                             <input type="text" name="position" id="" onChange={(e)=>{setPosition(e.target.value)}} />
                             {
                               experience && experience.map((experience,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <input 
                                                type="text"    
                                                name="" 
                                                id="" 
                                                placeholder={experience.position}
                                                onChange={(e) => setEditText(e.target.value)}
                                             />
                                              :
                                             <p >{experience && experience.position}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({position: editText},index, 'Experience')}}>Save</button>
                                              :
                                             <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <div className="input-container-date">
                             <div className="input-container">
                                <label htmlFor="start">Start Date</label>
                                <input type="date" name="start" id="" onChange={(e)=>{setStartDateJob(e.target.value)}} />
                                {
                                    experience && experience.map((experience,index) => {
                                          return <div key={index} className='sub-form-container'>
                                                <div className='result-container'>
                                                   {
                                                      isEdit.state && isEdit.id == index ? 
                                                      <input 
                                                         type="date"    
                                                         name="" 
                                                         id="" 
                                                         value={startDateJob}
                                                         onChange={(e) => {
                                                            setEditText(e.target.value)
                                                            setStartDateJob(e.target.value)
                                                         }}
                                                      />
                                                      :
                                                      <p >{experience && experience.startDate}</p>
                                                   }
                                                   {
                                                      isEdit.state && isEdit.id == index  ?
                                                      <button type="button" onClick={() => {handleEdits({startDate: editText},index, 'Experience')}}>Save</button>
                                                      :
                                                      <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                   }
                                                </div>
                                          </div>
                                       })
                             }
                             </div>
                             <div className="input-container">
                                <label htmlFor="end">End Date</label>
                                <input type="date" name="end" id="" onChange={(e)=>{setEndDateJob(e.target.value)}}/>
                                {
                                    experience && experience.map((experience,index) => {
                                       return <div key={index} className='sub-form-container'>
                                             <div className='result-container'>
                                                {
                                                   isEdit.state && isEdit.id == index ? 
                                                   <input 
                                                      type="date"    
                                                      name="" 
                                                      id="" 
                                                      value={endDateJob}
                                                      onChange={(e) => {
                                                            setEditText(e.target.value)
                                                            setEndDateJob(e.target.value)
                                                      }}
                                                   />
                                                   :
                                                   <p >{experience && experience.endDate}</p>
                                                }
                                                {
                                                   isEdit.state && isEdit.id == index  ?
                                                   <button type="button" onClick={() => {handleEdits({endDate: editText},index, 'Experience')}}>Save</button>
                                                   :
                                                   <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                }
                                             </div>
                                       </div>
                                    })
                             }
                             </div>
                          </div>
                          <div className="input-container">
                             <label htmlFor="details">Job Description</label>
                             <textarea name="details" id="" cols="20" onChange={(e)=>{setDetails(e.target.value)}}></textarea>
                             {
                               experience && experience.map((experience,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <textarea 
                                                name="" 
                                                id="" 
                                                cols="30" 
                                                rows="10"
                                                value={details}
                                                onChange={(e) => {
                                                   setEditText(e.target.value)
                                                   setDetails(e.target.value)
                                                }}
                                              />
                                              :
                                             <p>{experience && experience.details}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({details: editText},index, 'Experience')}}>Save</button>
                                              :
                                             <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <button type="submit" className='content-btn'>
                            <img src={PlusIcon} alt="plus" />
                            Add Experience
                          </button>
                       </form>
                    </div>
                   :
                   activeTab == 3 ?
                   <div className="content">
                       <h1>Eduction </h1>
                       <form action="" onSubmit={(e) => {
                          e.preventDefault()
                          handleSubmit('Education')
                       }} >
                          <div className="input-container">
                             <label htmlFor="university">University Name</label>
                             <input type="text" name="university" id="" ref={activeInput} onChange={(e)=>{setUniversityName(e.target.value)}} />
                             {
                               education && education.map((education,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <input 
                                                type="text"    
                                                name="" 
                                                id="" 
                                                placeholder={education.universityName}
                                                onChange={(e) => setEditText(e.target.value)}
                                             />
                                              :
                                             <p >{education && education.universityName}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({universityName: editText},index, 'Education')}}>Save</button>
                                              :
                                              <div style={{display: 'flex', gap: '5px'}}>
                                                <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                <button type='button' onClick={() => {handleDelete(index,'Education')}}style={{backgroundColor:'#FF0000', }}>Delete</button>
                                              </div>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="degree">Degree</label>
                             <input type="text" name="degree" id="" onChange={(e)=>{setDegree(e.target.value)}} />
                             {
                               education && education.map((education,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <input 
                                                type="text"    
                                                name="" 
                                                id="" 
                                                placeholder={education.degree}
                                                onChange={(e) => setEditText(e.target.value)}
                                             />
                                              :
                                             <p >{education && education.degree}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({degree: editText},index, 'Education')}}>Save</button>
                                              :
                                              <div style={{display: 'flex', gap: '5px'}}>
                                                <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                              </div>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <div className="input-container-date">
                             <div className="input-container">
                                <label htmlFor="start">Start Date</label>
                                <input type="date" name="start" id="" onChange={(e)=>{setStartDate(e.target.value)}}/>
                                {
                                       education && education.map((education,index) => {
                                          return <div key={index} className='sub-form-container'>
                                                <div className='result-container'>
                                                   {
                                                      isEdit.state && isEdit.id == index ? 
                                                      <input 
                                                         type="date"    
                                                         name="" 
                                                         id="" 
                                                         value={startDate}
                                                         onChange={(e) => {
                                                            setEditText(e.target.value)
                                                            setStartDate(e.target.value)
                                                         }}
                                                      />
                                                      :
                                                      <p >{education && education.startDate}</p>
                                                   }
                                                   {
                                                      isEdit.state && isEdit.id == index  ?
                                                      <button type="button" onClick={() => {handleEdits({startDate: editText},index, 'Education')}}>Save</button>
                                                      :
                                                      <div style={{display: 'flex', gap: '5px'}}>
                                                         <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                      </div>
                                                   }
                                                </div>
                                          </div>
                                       })
                             }
                             </div>
                             <div className="input-container">
                                <label htmlFor="end">End Date</label>
                                <input type="date" name="end" id="" onChange={(e)=>{setEndDate(e.target.value)}}/>
                                {
                                       education && education.map((education,index) => {
                                          return <div key={index} className='sub-form-container'>
                                                <div className='result-container'>
                                                   {
                                                      isEdit.state && isEdit.id == index ? 
                                                      <input 
                                                         type="date"    
                                                         name="" 
                                                         id="" 
                                                         value={endDate}
                                                         onChange={(e) => {
                                                            setEditText(e.target.value)
                                                            setEndDate(e.target.value)
                                                         }}
                                                      />
                                                      :
                                                      <p >{education && education.endDate}</p>
                                                   }
                                                   {
                                                      isEdit.state && isEdit.id == index  ?
                                                      <button type="button" onClick={() => {handleEdits({endDate: editText},index, 'Education')}}>Save</button>
                                                      :
                                                      <div style={{display: 'flex', gap: '5px'}}>
                                                         <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                      </div>
                                                   }
                                                </div>
                                          </div>
                                       })
                             }
                             </div>
                          </div>
                          <button type="submit" className='content-btn'>
                            <img src={PlusIcon} alt="plus" />
                            Add Education
                          </button>
                       </form>
                   </div>
                   :
                   activeTab == 4 ?
                   <div className="content">
                       <h1>Skills </h1>
                       <form action="" onSubmit={(e) => {
                          e.preventDefault()
                          handleSubmit('Skills')
                       }}>
                          <div className="input-container">
                             <label htmlFor="skill">Skill Name</label>
                             <input type="text" name="skill" id="" ref={activeInput} onChange={(e) => setSkillName(e.target.value)} />
                             {
                               skills && skills.map((skills,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <input 
                                                type="text"    
                                                name="" 
                                                id="" 
                                                placeholder={skills.name}
                                                onChange={(e) => setEditText(e.target.value)}
                                             />
                                              :
                                             <p className='skills-container'>{skills && skills.name}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({name: editText},index, 'Skills')}}>Save</button>
                                              :
                                              <div style={{display: 'flex', gap: '5px'}}>
                                                <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                <button type='button' onClick={() => {handleDelete(index,'Skills')}}style={{backgroundColor:'#FF0000', }}>Delete</button>
                                              </div>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <button type="submit" className='content-btn'>
                            <img src={PlusIcon} alt="plus" />
                            Add Skill
                          </button>
                       </form>
                   </div>
                   :
                   activeTab == 5 ?
                   <div className="content">
                       <h1>Projects </h1>
                       <form action="" onSubmit={(e) => {
                          e.preventDefault()
                          handleSubmit('Projects')
                       }}>
                          <div className="input-container">
                             <label htmlFor="project">Project Name</label>
                             <input type="text" name="project" id="" ref={activeInput} onChange={(e) => setProjectName(e.target.value)} />
                             {
                               projects && projects.map((projects,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <input 
                                                type="text"    
                                                name="" 
                                                id="" 
                                                placeholder={projects.name}
                                                onChange={(e) => setEditText(e.target.value)}
                                             />
                                              :
                                             <p >{projects && projects.name}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({name: editText},index, 'Projects')}}>Save</button>
                                              :
                                              <div style={{display: 'flex', gap: '5px'}}>
                                                <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                                <button type='button' onClick={() => {handleDelete(index,'Projects')}}style={{backgroundColor:'#FF0000', }}>Delete</button>
                                              </div>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <div className="input-container">
                             <label htmlFor="details">Details</label>
                             <textarea name="details" id="" cols="20"  onChange={(e) => setProjectDetail(e.target.value)} ></textarea>
                             {
                               projects && projects.map((projects,index) => {
                                  return <div key={index} className='sub-form-container'>
                                        <div className='result-container'>
                                           {
                                              isEdit.state && isEdit.id == index ? 
                                              <textarea 
                                                   name="" 
                                                   id="" 
                                                   cols="30" 
                                                   rows="10"
                                                   value = {projectDetail}
                                                   onChange={(e) => {
                                                       setEditText(e.target.value)
                                                       setProjectDetail(e.target.value)
                                                   }}
                                              />
                                              :
                                             <p >{projects && projects.detail}</p>
                                           }
                                           {
                                              isEdit.state && isEdit.id == index  ?
                                              <button type="button" onClick={() => {handleEdits({detail: editText},index, 'Projects')}}>Save</button>
                                              :
                                              <div style={{display: 'flex', gap: '5px'}}>
                                                <button type='button' onClick={() => {setIsEdit({id:index, state: !isEdit.state})}}>Edit</button>
                                              </div>
                                           }
                                        </div>
                                  </div>
                               })
                             }
                          </div>
                          <button type="submit" className='content-btn'>
                            <img src={PlusIcon} alt="plus" />
                            Add Project
                          </button>
                       </form>
                   </div>
                   :
                   ''
                }
              </div>
           </div>
           <div className={ `${showResults ? 'show-output' : 'resume-output'}`} >
                 <DocumentLayout
                  personalInfo = {personalInfo} 
                  experience = {experience}
                  education = {education}
                  skills = {skills}
                  projects = {projects}
               />
           </div>
        </div>
        <footer className='footer-text'>@2024ShaineDev.All Right Reserved</footer>
    </div>
  )
}

export default HomePage
