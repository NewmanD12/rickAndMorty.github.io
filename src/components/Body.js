import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import './Body.css'
import Button from 'react-bootstrap/Button';
import ReactCardFlip from "react-card-flip";


const frontBody = (card) => {
    return(
        <div>
            <p>Gender: {card.gender}</p>
            <p>Species: {card.species}</p>
            <p>Status: {card.status}</p>
        </div>
    )
}

const backBody = (card) => {
    return (
        <div>
            <p>No. of Episodes: {card.episode.length}</p>
            <p>Location: {card.location.name}</p>
            <p>Origin: {card.origin.name}</p>
        </div>
    )
}

function NextPageButton(props){
    // console.log(props.nextURL)
    if(props.nextURL){
      return(
        <Button className='button' onClick={() => props.setCurrent_URL(props.nextURL)}>Next Page</Button>
      )
    }
    return(
        <Button className='button' disabled>Next Page</Button>
    )
  }

function PreviousPageButton(props){
    if(props.prevURL){
        return(
            <Button className='button' onClick={() => props.setCurrent_URL(props.prevURL)}>Prev Page</Button>
          )
    }
    return(
        <Button className='button' disabled>Prev Page</Button>
    )
  }

function CardBody(props) {
    const {
        frontInfo,
        backInfo,
        flipped, 
        setFlipped
    } = props

    return (
        <ReactCardFlip isFlipped={flipped}>
            <Card.Body onClick={() => {setFlipped(!flipped)}}>{backInfo}</Card.Body>
            <Card.Body onClick={() => {setFlipped(!flipped)}}>{frontInfo}</Card.Body>
        </ReactCardFlip>
    )
}

const MainBody = (props) => {
    // console.log(props.characters)
    const cards = props.characters.map((card, index) => {
        
        let flipped = props.flipped
        const frontInfo = frontBody(card)
        const backInfo = backBody(card)

        return (
            <Card style={{ width: '18rem' }}  key={index}>
                <Card.Img variant="top" src={card.image} />
                <Card.Title>{card.name}</Card.Title>
                <CardBody frontInfo={frontInfo} backInfo={backInfo} flipped={flipped} setFlipped={props.setFlipped}/>
            </Card>

        )
    })

    let rows = []
    let currentRow = []
    let processed = 0
    for(let i = 0; i < cards.length; i++){
        if(currentRow.length === 0){
            currentRow.push(cards[i])
            processed ++ 
            if(processed === cards.length){
                rows.push(<Row className="justify-content-center" key={rows.length + 1}><Col lg={4}>{currentRow[0]}</Col></Row>)
            }
        }
        else if(currentRow.length === 1){
            currentRow.push(cards[i])
            processed++
            if(processed === cards.length){
                rows.push(<Row className="justify-content-center" key={rows.length + 1}><Col lg={4}>{currentRow[0]}</Col><Col lg={4}>{currentRow[1]}</Col></Row>)
            }
        }
        else if(currentRow.length === 2){
            currentRow.push(cards[i])
            processed++
            rows.push(<Row className="justify-content-center" key={rows.length + 1}><Col lg={4}>{currentRow[0]}</Col><Col lg={4}>{currentRow[1]}</Col><Col lg={4}>{currentRow[2]}</Col></Row>)
            currentRow = []
        }
    }
    return rows
}

const CharacterBody = (props) => {
    const {
        characters,
        setCurrent_URL, 
        nextURL,
        prevURL, 
        flipped, 
        setFlipped
    } = props

    return (
        <Container fluid='md' id='body'>
            <PreviousPageButton setCurrent_URL={setCurrent_URL} prevURL={prevURL}/>
            <NextPageButton setCurrent_URL={setCurrent_URL} nextURL={nextURL}/>
            <MainBody characters= {characters} flipped={flipped} setFlipped={setFlipped}/>
        </Container>  
    )

}


export default CharacterBody