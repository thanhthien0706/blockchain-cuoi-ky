// SPDX-License-Identifier: MIX
pragma solidity ^0.8.9;

contract BuyBook {
    address private owner;
    struct Book {
        uint id;
        string name;
        string category;
        string image;
        uint cost;
        uint rating;
        uint stock;
    }

    struct Order {
        uint time;
        Book book;
    }

    mapping(uint256 => Book) public books;
    mapping(address => mapping(uint => Order)) public orders;
    mapping(address => uint) public orderCount;

    event AddBook(string name, uint cost, uint quantity);
    event Buy(address buyer, uint orderId, uint bookId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function addBook(
        uint _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint _cost,
        uint _rating,
        uint _stock
    ) public onlyOwner {
        Book memory book = Book(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        books[_id] = book;

        emit AddBook(_name, _cost, _stock);
    }

    function buy(uint _id) public payable {
        Book memory book = books[_id];

        require(msg.value >= book.cost, "You don't have enough money");
        require(book.stock > 0, "Not enough quantity");

        // Create order
        Order memory order = Order(block.timestamp, book);
        orders[msg.sender][orderCount[msg.sender]] = order;

        books[_id].stock = book.stock - 1;

        emit Buy(msg.sender, orderCount[msg.sender], book.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    receive() external payable {}

    fallback() external payable {}
}
