import Head from 'next/head'
import { Col, Row } from 'react-bootstrap'
import HomeControlls from '../components/HomeControlls'
import HomeHead from '../components/HomeHead'
import LandingMessage from '../components/LandingMessage'

export default function Home() {
  return (
    <div className="container-fluid">
      <Head>
        <title>My Flashcards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHead titleText="stuff i should know" />
      <LandingMessage />
      <HomeControlls />
      <Row style={{backgroundColor: "#535353", height: "200px"}}>
        <Col>
        </Col>
      </Row>
    </div>
  )
}
