function App() {
    //logic , structure and style
    const categories = [
        { _id: 112, name: "food" },
        { _id: 212, name: "Rent" },
        { _id: 312, name: "Travel" },
    ];

    // const fruits = ["mango", "apple", "orange"];
    // const users = [
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         image: "https://randomuser.me/api/portraits/men/1.jpg",
    //     },
    //     {
    //         id: 2,
    //         name: "Jane Doe",
    //         image: "https://randomuser.me/api/portraits/women/2.jpg",
    //     },
    //     {
    //         id: 3,
    //         name: "Sam Smith",
    //         image: "https://randomuser.me/api/portraits/men/3.jpg",
    //     },
    // ];
    const expences = [
        {
            _id: "123",
            expenceDate: "2024-02-25",
            title: "something",
            category: "112",
            amount: 100,
        },
        {
            _id: "223",
            expenceDate: "2024-02-20",
            title: "something2",
            category: "212",
            amount: 200,
        },
    ];
    const totalExpences = expences.reduce((acc, val) => {
        return acc + val.amount;
    }, 0);
    return (
        <div>
            <h1>Expence App</h1>
            <h2>Categories Listing - {categories.length} </h2>
            <ul>
                {categories.map((ele) => (
                    <li key={ele._id}>{ele.name}</li>
                ))}
            </ul>

            <h2>Listing Expences -{expences.length} </h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Expence Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {expences.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.expenceDate}</td>
                            <td>{ele.amount}</td>
                            <td>{ele.category}</td>
                            <td>{ele.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Total expences - {totalExpences}</h2>

            {/* <h2>List of fruits - {fruits.length}</h2>
            <ul>
                {fruits.map((ele, i) => (
                    <li key={i}>{ele} </li>
                ))}
            </ul>
            <h2>Images</h2>
            <ul>
                {users.map((ele) => (
                    <li key={ele.id}>
                        <img src={ele.image} alt={ele.name} />
                        <span>{ele.name}</span>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

// we can also use for loop  instead of map function --not suggested

// function App1() {
//     const categories = [
//         { _id: 112, name: "food" },
//         { _id: 212, name: "Rent" },
//         { _id: 312, name: "Travel" },
//     ];
//     function categoryItem() {
//         const result = [];
//         for (let i = 0; i <= categories.length; i++) {
//             result.push(<li>{categories[i].name}</li>);
//         }
//         return result;
//     }
//     return (
//         <>
//             <h1>Expence App</h1>
//             <h2>Categories Listing - {categories.length} </h2>
//             <ul>{categoryItem()}</ul>
//         </>
//     );
// }

export default App;
