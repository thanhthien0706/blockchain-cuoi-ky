import { ethers } from 'ethers';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

// Components
// import Rating from './Rating'

const Section = ({ items, togglePop }: any) => {
    return (
        <Row style={{ marginTop: 50 }}>
            {
                items.map((item: any, index: any) => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.image} style={{
                            height: 300
                        }} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                <Row>
                                    <span style={{ flex: 1 }}>{ethers.formatUnits(item.cost.toString(), 'ether')} ETH</span>
                                    <Button style={{ flex: 1 }} variant="success" onClick={() => togglePop(item)}>View</Button>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </Row >
    );
    // return (
    //     <div className='cards__section'>

    //         <hr />

    //         <div className='cards'>
    //             {items.map((item: any, index: any) => (
    //                 <div className='card' key={index} onClick={() => togglePop(item)}>
    //                     <div className='card__image'>
    //                         <img src={item.image} alt="Item" />
    //                     </div>
    //                     <div className='card__info'>
    //                         <h4>{item.name}</h4>
    //                         {/* <Rating value={item.rating} /> */}
    //                         <p>{ethers.formatUnits(item.cost.toString(), 'ether')} ETH</p>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default React.memo(Section);