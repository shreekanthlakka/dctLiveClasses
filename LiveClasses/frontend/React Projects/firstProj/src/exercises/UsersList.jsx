const users = [
    {
        id: 1,
        username: "Aarav Patel",
        email: "aarav.patel@example.com",
        country: "India",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 2,
        username: "Lily Wang",
        email: "lily.wang@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=22",
    },
    {
        id: 3,
        username: "Ethan Jones",
        email: "ethan.jones@example.com",
        country: "USA",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=33",
    },
    {
        id: 4,
        username: "Sophia Liu",
        email: "sophia.liu@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=44",
    },
    {
        id: 5,
        username: "Vihaan Krishna",
        email: "vihaan.krishna@example.com",
        country: "India",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=55",
    },
    {
        id: 6,
        username: "Emma Chen",
        email: "emma.chen@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=66",
    },
    {
        id: 7,
        username: "Noah Patel",
        email: "noah.patel@example.com",
        country: "India",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=77",
    },
    {
        id: 8,
        username: "Olivia Zhang",
        email: "olivia.zhang@example.com",
        country: "China",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=88",
    },
    {
        id: 9,
        username: "Mason Smith",
        email: "mason.smith@example.com",
        country: "USA",
        gender: "Male",
        profilePic: "https://i.pravatar.cc/150?img=99",
    },
    {
        id: 10,
        username: "Ava Gupta",
        email: "ava.gupta@example.com",
        country: "India",
        gender: "Female",
        profilePic: "https://i.pravatar.cc/150?img=100",
    },
];

function UsersList() {
    const totalMaleUsers = users.filter(
        (user) => user.gender === "Male"
    ).length;
    const tatalFemaleUsers = users.filter(
        (user) => user.gender === "Female"
    ).length;

    const output = users.reduce((acc, val) => {
        if (Object.prototype.hasOwnProperty.call(acc, val.country)) {
            acc[val.country]++;
        } else {
            acc[val.country] = 1;
        }
        return acc;
    }, {});

    console.log(output);

    // for (const ele of users) {
    //     if (ele.country in output) output[ele.country]++;
    //     else output[ele.country] = 1;
    // }

    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].country in output) output[users[i].country]++;
    //     else output[users[i].country] = 1;
    // }
    const countries = Object.entries(output);
    console.log(countries);

    return (
        <div>
            <h2>Users Profiles</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <td>Profile Pic</td>
                        <td>username</td>
                        <td>email</td>
                        <td>Gender</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((ele) => (
                        <tr key={ele.id}>
                            <td>
                                <img src={ele.profilePic} alt={ele.username} />
                            </td>
                            <td>{ele.username}</td>
                            <td>{ele.email}</td>
                            <td>{ele.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Users based on gender</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <td>Male</td>
                        <td>Female</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalMaleUsers}</td>
                        <td>{tatalFemaleUsers}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Users based on country</h2>
            {countries.map((ele) => (
                <h3 key={ele[0]}>
                    {ele[0]} - {ele[1]}
                </h3>
            ))}
            <table>
                <thead>
                    <tr>
                        <td>Country</td>
                        <td>Count</td>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(output).map((ele) => {
                        return (
                            <tr key={ele[0]}>
                                <td>{ele[0]}</td>
                                <td>{ele[1]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
