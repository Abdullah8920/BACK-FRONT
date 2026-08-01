import express from "express"
import morgan from "morgan"
import cors from "cors";
// import { use } from "react";

const server = express()
const port = 5000;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

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
            data: []

        })
    }

    return res.status(200).send({
        status: true,
        data: users,
    })
})

server.post("/api/users/add", (req, res) => {
    const { user } = req.body;
    console.log('Body:', user);

    if (user == undefined || user == "") {
        return res.status(400).send({
            status: false,
            message: "user name is req",
        })
    }

    const usersClone = [...users];
    usersClone.push(user);
    users = usersClone;
    return res.status(200).send({
        status: true,
        message: "User added",
        // data: users,
    })
})

server.delete("/api/users/delete/:key", (req, res) => {
    const { key } = req.params;
    console.log("Key", key)

    const userclone = [...users];
    userclone.splice(key, 1);
    users = userclone;

    return res.status(200).send({
        status: true,
        message: "Data Succesfully deleted"
    });
});

server.put("/api/users/update", (req, res) => {
    const { key, update } = req.body


    const userclone = [...users];
    userclone.splice(key, 1, update);
    users = userclone;

    return res.status(200).send({
        status: true,
        message: "Data Updated Succesfully "
    });
});

server.delete("/api/users/delete-all", (req, res) => {
    // const { users } = []
    users = []

    return res.status(200).send({
        status: true,
        message: "ALL Data Updated Succesfully ",
        data: [],
    });
})

server.listen(port, () => {
    console.log(`server is running: ${port}`);
});