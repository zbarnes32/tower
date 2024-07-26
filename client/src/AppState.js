import { reactive } from 'vue'
import { TowerEvent } from './models/TowerEvent.js'
import { TicketEvent, TicketProfile } from './models/Ticket.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {TowerEvent[]} */
  towerEvents: [],
  /** @type {TowerEvent} */
  activeTowerEvent: null,
  /** @type {TicketProfile[]} */
  eventProfiles: [],
  /** @type {TicketEvent[]} */
  accountEvents: [],
})