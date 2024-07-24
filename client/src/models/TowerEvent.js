import { Account } from "./Account.js"


export class TowerEvent {
    constructor(data){
        this.id = data._id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = new Account(data.creator)
    }
}

const rawData = {
    "_id": "66a12c4ed0dff56dbb6f7f3c",
    "creatorId": "66a01f1b3c6756484d577837",
    "name": "Mega Marky",
    "description": "Lorem Khaled Ipsum is a major key to success. How’s business? Boomin. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. To succeed you must believe. When you believe, you will succeed. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Lion!",
    "coverImg": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
    "location": "At The Social Expo Center",
    "capacity": 87,
    "startDate": "2024-08-06T06:00:00.000Z",
    "isCanceled": false,
    "type": "concert",
    "createdAt": "2024-07-24T16:31:10.300Z",
    "updatedAt": "2024-07-24T16:31:10.300Z",
    "__v": 0,
    "creator": {
        "_id": "66a01f1b3c6756484d577837",
        "subs": [
            "auth0|66a01f1ae6d5fdc532af1ebe"
        ],
        "email": "zach123@zach.gov",
        "name": "zach123",
        "picture": "https://s.gravatar.com/avatar/fbca2c7cf15eac9ea6bf9f87cb38684f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fza.png",
        "createdAt": "2024-07-23T21:28:20.975Z",
        "updatedAt": "2024-07-23T21:28:20.975Z",
        "__v": 0,
        "id": "66a01f1b3c6756484d577837"
    },
    "id": "66a12c4ed0dff56dbb6f7f3c"
}