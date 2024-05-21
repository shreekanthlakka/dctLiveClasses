import { useEffect, useState } from "react";

function Projects() {
    const [name, setName] = useState("");
    const projects = [
        {
            name: "Project Alpha",
            teamMembers: ["Alice", "Bob", "Charlie"],
            manager: "Diane",
            budget: 100000,
        },
        {
            name: "Project Beta",
            teamMembers: ["Eve", "Frank", "Grace"],
            manager: "Hank",
            budget: 200000,
        },
        {
            name: "Project Gamma",
            teamMembers: ["Ivy", "John", "Kevin"],
            manager: "Liam",
            budget: 150000,
        },
        {
            name: "Project Delta",
            teamMembers: ["Mia", "Nathan", "Olivia"],
            manager: "Peter",
            budget: 120000,
        },
        {
            name: "Project Epsilon",
            teamMembers: ["Quinn", "Rachel", "Steve"],
            manager: "Tom",
            budget: 180000,
        },
    ];

    useEffect(() => {
        if (!name) return;
        const project = projects.find((ele) => ele.teamMembers.includes(name));
        if (!project) {
            console.log("not found");
        } else {
            console.log(`${name} is assigned to  Project  ==`, project.name);
        }
    }, [name]);
    function handleDetails(project) {
        console.log("Team members are -", project.teamMembers.join(","));
        console.log("Budget", project.budget);
    }
    return (
        <div>
            <h2>List of projects - {projects.length}</h2>

            <ul>
                {projects.map((proj) => (
                    <li key={proj.name}>
                        {proj.name} - {proj.manager}
                        <button onClick={() => handleDetails(proj)}>
                            {" "}
                            View Details{" "}
                        </button>
                    </li>
                ))}
            </ul>

            <input
                placeholder="search project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
    );
}

export default Projects;
