import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { BrowserProvider, Contract, ethers } from "ethers";
import { abi, contractAddress } from "./abi/BuyBooks";
import Section from "./components/Section";
import Product from "./components/Product";
import { Container } from "react-bootstrap";
const { books } = require("./book.json")

const App = () => {
    const [account, setAccount] = useState(null);
    const [owner, setOwner] = useState(null);
    const [provider, setProvider] = useState<BrowserProvider>();
    const [buyBookContract, setBuyBookContract] = useState<Contract>();
    const [bookList, setBookList] = useState<any[]>([]);
    const [toggle, setToggle] = useState(false);
    const [item, setItem] = useState({});

    const togglePop = (item: any) => {
        setItem(item);
        toggle ? setToggle(false) : setToggle(true);
    };

    const loadBlockchainData = async () => {
        if ((window as any).ethereum) {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            setProvider(provider);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(contractAddress, abi, signer);
            setBuyBookContract(contract);
            setOwner(await contract.getOwner())

            const bookItem = []

            for (var i = 0; i < books.length; i++) {
                const item = await contract.books(i + 1);
                bookItem.push(item);
            }

            setBookList(bookItem)
        } else {
            alert("Please install metamask")
        }
    }

    const onWithdrawT = async () => {
        let transaction = await buyBookContract!.withdraw()
        await transaction.wait()
        alert("Withdraw Successfully")
    }

    useEffect(() => {
        loadBlockchainData()
    }, [])

    return (
        <Container style={{ marginTop: 20, marginBottom: 20 }}>
            <Navigation account={account} setAccount={setAccount} ownerAccount={owner} onWithdraw={onWithdrawT} />


            {bookList && (
                <>
                    <Section
                        items={bookList}
                        togglePop={togglePop}
                    />
                </>
            )}

            {toggle && (
                <Product
                    item={item}
                    provider={provider}
                    account={account}
                    buyBookContract={buyBookContract}
                    togglePop={togglePop}
                />
            )}

        </Container>
    )
}

export default React.memo(App);