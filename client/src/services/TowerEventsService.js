import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TowerEventsService {
  async getAllTowerEvents() {
    const response = await api.get('api/events')
    // logger.log("Am I getting the events?", response.data) ✅
    const towerEvents = response.data.map(eventData => new TowerEvent(eventData))
    AppState.towerEvents = towerEvents

  }

}

export const towerEventsService = new TowerEventsService()