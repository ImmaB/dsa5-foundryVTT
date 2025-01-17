import DSA5_Utility from "../system/utility-dsa5.js"

export default class DSATables {
    static async showBotchCard(dataset, options = {}) {
        const result = DSA5_Utility.replaceDies(DSA5_Utility.replaceConditions(await DSATables[`get${dataset.table}Botch`](dataset)))
        const title = `${game.i18n.localize("TABLENAMES." + dataset.table)}`
        const content = await renderTemplate(`systems/dsa5/templates/tables/tableCard.html`, { result, title })

        ChatMessage.create({
            user: game.user.id,
            content,
            whisper: options.whisper,
            blind: options.blind
        })
    }

    static async roll2d6() {
        return (await new Roll("2d6").evaluate({ async: true })).total
    }

    static async getSpellBotch() {
        const res = await this.roll2d6()
        return game.i18n.localize("SPELLMISCAST." + res)
    }

    static async getLiturgyBotch() {
        const res = await this.roll2d6()
        return game.i18n.localize("LITURGYMISCAST." + res)
    }

    static async getDefenseBotch(options = { weaponless: false }) {
        let res = await this.roll2d6()
        if (options.weaponless == "true" && res < 7) res += 5

        return game.i18n.localize("DEFENSEBOTCH." + res)
    }
    static async getMeleeBotch(options = { weaponless: false }) {
        let res = await this.roll2d6()
        if (options.weaponless == "true" && res < 7) res += 5

        return game.i18n.localize("MELEEBOTCH." + res)
    }
    static async getRangeBotch() {
        const res = await this.roll2d6()
        return game.i18n.localize("RANGEBOTCH." + res)
    }
}