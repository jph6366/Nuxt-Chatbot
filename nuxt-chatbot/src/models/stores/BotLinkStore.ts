import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

import type { BotLinkModel } from '../domain/BotLinkModel'

export const useBotLinkStore = defineStore('botLink', () => {
    const botLinkState: Ref<BotLinkModel> = ref(
        {
            uuid: uuidv4(),
            apiUrl: 'https://mindful-dog.kipper.workers.dev/'
        } as BotLinkModel
    )

    const getUUID = async () => {
        // insert useCase
        return botLinkState.value.uuid
    }

    const getApiUrl = async () => {
        // insert useCase
        return botLinkState.value.apiUrl    
    }

    return {
        getUUID,
        getApiUrl,
        botLinkState
    }
})