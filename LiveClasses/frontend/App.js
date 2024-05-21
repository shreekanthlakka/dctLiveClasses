/**
 * createElement --has 3 parameters
 * 1st - elements like h1, p, li,ui etc
 * 2nd - attributes like id , class , onClick
 * 3rd
 *
 * const h1 = React.createElement(
 *       "h1", //element
 *      {id:"heading" , onclick = () => {} , classname= "class"}
 *      "Hello World"
 *
 * )
 *
 */

const parent = React.createElement(
    "div",
    { id: "parent" },
    React.createElement(
        "div",
        { id: "child1" },
        React.createElement(
            "div",
            { id: "child2" },
            React.createElement(
                "h1",
                { id: "heading" },
                "i am a heading Tag in Patent -> child1 -> child2 -> h1"
            )
        )
    )
);

/*
<div id="parent">
    <div id="child1">
        <div id="child2">
            <h1 id="heading">I am Heading tag</h1>
        </div>
    </div>
</div>; 
*/

/**
 *
 *
 *
 */

const h1 = React.createElement(
    "h1",
    { id: "heading" },
    "Hello world . This is from CDN React links and React.createElement()!!!"
);
// h2 here is an react obj written in jsx
const h2 = <h2 id="heading2"> Hello world . </h2>;

console.log("parent object", parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
