import { ethers } from "hardhat";
import { books } from "../src/book.json"

const tokens = (n: any) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {

  const BuyBook = await ethers.deployContract("BuyBook");
  await BuyBook.waitForDeployment();

  console.log("Address At: " + await BuyBook.getAddress())

  // const [] = await BuyBook.()

  for (let i = 0; i < books.length; i++) {
    const transaction = await BuyBook.addBook(
      books[i].id,
      books[i].name,
      books[i].category,
      books[i].image,
      tokens(books[i].price),
      books[i].rating,
      books[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${books[i].id}: ${books[i].name}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
