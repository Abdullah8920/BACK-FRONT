import express from "express"
import morgan from "morgan"
import cors from "cors";

const server = express()
const port = 5000;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json()); // needed to parse JSON request bodies

let users = [];

server.get("/", (req, res) => {
    return res.status(200).send({
        message: "Your 1st api in Node JS!"
    });
});

server.get("/api/users", (req, res) => {
    if (users.length == 0) {
        return res.status(400).send({
            status: false,
            message: "NO User data Available",
        })
    }

    return res.status(200).send({
        status: true,
        data: users,
    })
})

server.post("/api/users", (req, res) => {
    const { user } = req.body;
    console.log('Body:', user);

    if (user == undefined || user == "") {
        return res.status(400).send({
            status: false,
            message: "user name is req",
        })
    }

    users.push(user);
    return res.status(200).send({
        status: true,
        message: "User added",
        data: users,
    })
})

server.listen(port, () => {
    console.log(`server is running: ${port}`);
})