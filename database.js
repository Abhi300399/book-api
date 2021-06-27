const books=[
    {
        ISBN:"1234book",
        title:"Getting started with mern",
        pubDate:"2021-07-07",
        language:"en",
        numPage:250,
        author:[1,2],
        publication:[1],
        category:["tech","programming","education","thriller"],
    },
];

const author=[
    {
        id:1,
        name:"Pavan",
        books:["1234book"],
    },
    {
        id:2,
        name:"Elon Musk",
        books:["1234book"],
    },
];

const publication=[
    {
        id:1,
        name:"writex",
        books:["1234book"],
    },
];

module.exports={books,author,publication};