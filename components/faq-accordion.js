import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import data from '@/data/Faqs.json'

export default function FaqAccordion() {
  return (
    <>
      <div className="container w-75">
        <Accordion defaultActiveKey="0" flush>
          {data.map((item, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                {' '}
                <strong>{item.header} </strong>
              </Accordion.Header>
              <Accordion.Body>{item.body}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  )
}
