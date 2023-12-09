import { ethers } from 'ethers';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const Navigation = ({ account, setAccount, ownerAccount, onWithdraw }: any) => {
    const connectHandler = async () => {
        if ((window as any).ethereum) {
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]
            setAccount(account);
        } else {
            alert("Please install metamask")
        }
    }

    // return (
    //     <nav>
    //         <div className='nav__brand'>
    //             <h1>BUY BOOK</h1>
    //         </div>

    //         <input
    //             type="text"
    //             className="nav__search"
    //         />

    //         {account ? (
    //             <div>
    //                 <button
    //                     type="button"
    //                     className='nav__connect'
    //                 >
    //                     {account.slice(0, 6) + '...' + account.slice(38, 42)}
    //                 </button>
    //                 {
    //                     account.toLowerCase() == ownerAccount.toLowerCase() ? <button type="button"
    //                         className='nav__connect' onClick={onWithdraw}>Withdraw</button> : null
    //                 }
    //             </div>
    //         ) : (
    //             <button
    //                 type="button"
    //                 className='nav__connect'
    //                 onClick={connectHandler}
    //             >
    //                 Connect
    //             </button>
    //         )}

    //         {/* <ul className='nav__links'>
    //             <li><a href="#Clothing & Jewelry">Clothing & Jewelry</a></li>
    //             <li><a href="#Electronics & Gadgets">Electronics & Gadgets</a></li>
    //             <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
    //         </ul> */}
    //     </nav>
    // );

    return (
        <Nav variant="pills" defaultActiveKey="#first" className='d-flex justify-content-between'>
            <Nav.Item>
                <h2>Books Store</h2>
            </Nav.Item>

            <Nav.Item>
                {
                    account ?
                        <>
                            <Button variant="light" style={{
                                marginRight: 10
                            }}>{account.slice(0, 6) + '...' + account.slice(38, 42)}</Button>
                            {
                                account.toLowerCase() == ownerAccount.toLowerCase() ?
                                    <Button variant="warning" onClick={onWithdraw}>Withdraw</Button>
                                    : null
                            }
                        </>
                        : <Button variant="primary" onClick={connectHandler}>Connect</Button>
                }
            </Nav.Item>
        </Nav>
    )
}

export default Navigation;