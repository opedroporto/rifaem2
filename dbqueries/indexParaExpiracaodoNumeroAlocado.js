db.getCollection("Numero").createIndex( { "dataExpiracao": 1 }, {
    expireAfterSeconds: 0,
    partialFilterExpression: {
        "status": {$eq: "reservado"}
    }
})