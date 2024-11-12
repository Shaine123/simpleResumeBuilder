
import React, { useRef } from 'react'
import './documentllayout.css'
import {useReactToPrint} from 'react-to-print'
import { PrintIcon } from '../../assets/images'
const DocumentLayout = ({personalInfo, experience, education, skills, projects}) => {
  
  const contentRef = useRef(null)
  const reactToPrint = useReactToPrint({contentRef})

  const dateConverter = (date) => {
   const d = new Date(date)
    return d.toLocaleDateString("en-US",{month: 'long', year: "numeric"})
  }

  const upperCaseFirstLetter = (name) => {
      const capitalLetter = name.split('')[0].toUpperCase()
      const skillName = name.split('').filter((char,index) => index !== 0)

      return `${capitalLetter}${skillName.join('')}`
  }


  return (
    <div>
          <button onClick={reactToPrint} className='generatePdf-btn'>
            <img src={PrintIcon} alt="print" />
            Generate Pdf
          </button>

         <div className="file-container" ref={contentRef}>
              <div className="header-section">
                  <h1>{personalInfo && personalInfo.name}</h1>
                  <h2>{personalInfo && personalInfo.location}</h2>
                  <div style={{display:'flex', justifyContent: 'center', gap:'5px'}}>
                    <p>{personalInfo && personalInfo.phone}</p>
                    <p>{personalInfo && personalInfo.email}</p>
                  </div>
              </div>
              <div className="body-section">
                 <h2>Summary</h2>
                 <div className="line"></div>
                 <p style={{marginTop: '8px '}}>{personalInfo && personalInfo.summary}</p>
              </div>
              <div className="body-section">
                 <h2>Projects</h2>
                 <div className="line"></div>
                 {
                   projects && projects.map((projects, index) => {
                      return <div className='sub-section' key={index}>
                          <h2>{projects && projects.name}</h2>
                           {
                                projects.detail && projects.detail.split('.').map((projectDetails, index) => {
                                   return <div key={index}>
                                      {
                                        index == 0 ?
                                        <p>{projectDetails}</p>
                                        :
                                        <li>{projectDetails}</li>
                                      }
                                   </div>
                                })
                           }
                      </div>
                   })
                 }
              </div>
              <div className="body-section">
                 <h2>Experience</h2>
                 <div className="line"></div>
                 {
                   experience && experience.map((experience, index) => {
                       return <div key={index} style={{marginTop: '8px'}}>
                           <h2>{ experience.companyName},{experience.position}</h2>
                           <p>{ dateConverter(experience.startDate)}-{dateConverter(experience.endDate)}</p>
                           <p>{experience.details}</p>
                       </div>
                   })
                 }
              </div>
              <div className="body-section">
                 <h2>Education</h2>
                 <div className="line"></div>
                 {
                   education && education.map((education, index) => {
                      return <div key={index} className='sub-section'>
                         <h2>{education && education.universityName}</h2>
                         <p style={{fontStyle: 'italic'}}>{education && education.degree}, {education && dateConverter(education.startDate)} - {education && dateConverter(education.endDate)} </p>
                      </div>
                   })
                 }
              </div>
              <div className="body-section">
                 <h2>Skills</h2>
                 <div className="line"></div>
                 <div className='skill-container' >
                     {
                        skills && skills.map((skills,index) => {
                           return  <p key={index} style={{fontStyle: 'italic'}}>
                              {
                               skills.name && upperCaseFirstLetter(skills.name)
                              
                              }</p>
                           
                        } )
                     }
                 </div>
              </div>
          </div>
    </div>
  )
}

export default DocumentLayout
