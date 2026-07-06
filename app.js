const express = require("express");
const path = require("path");
const app = express();

const tiers = [
    {
        name: "Premium Plus",
        price: "$9.99/month"
    },
    {
        name: "Premium Max",
        price: "$19.99/month"
    },
    {
        name: "Premium Ultra",
        price: "$49.99/month"
    },
    {
        name: "Premium Infinity",
        price: "$99.99/month"
    },
    {
        name: "Quantum Calculator Access",
        price: "$299.99/month"
    },
    {
        name: "Interdimensional Math Pass",
        price: "$999.99/month"
    },
    {
        name: "Answer-as-a-Service Enterprise Edition",
        price: "$4,999.99/month"
    },
    {
        name: "God Mode Calculator",
        price: "$99,999/month"
    }
];

app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {
        result: null,
        error: null,
        tier: null
    });
});

app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
        return res.render("index", {
            error: "Please enter valid numbers.",
            result: null
        });
    }

    let result;

    switch (operation) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                return res.render("index", {
                    error: "Cannot divide by zero.",
                    result: null
                });
            }
            result = a / b;
            break;
    }

    const randomTier = tiers[Math.floor(Math.random() * tiers.length)];

    res.render("index", {
        result,
        error: null,
        tier: randomTier
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
    console.log(`http://localhost:${PORT}`);
});