import { Account } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"



export class Ticket {
    constructor(data){
        this.id = data.id
        this.accountId = data.id
        this.eventId = data.eventId
    }
}

export class TicketProfile extends Ticket {
    constructor(data){
        super(data)
        this.profile = new Account(data.profile)
    }
}

export class TicketEvent extends Ticket {
    constructor(data){
        super(data)
        this.towerEvent = new TowerEvent(data.TowerEvent)
    }

}