class EventHandler {
    /**
     * Called when the player correctly answers a question
     * @param {Character} player
     */
    onCorrectAnswer(player) {
        // Override this method
    }

    /**
     * Called when start of turn
     * @param {Character} player
     */
    onTurnStart(player) {
        // Override this method
    }

    /** 
     * Called when end of turn
     * @param {Character} player
     */
    onTurnEnd(player) {
        // Override this method
    }

    /** 
     * Called when just before end of turn
     * @param {Character} player
     */
    onTurnEndBefore(player) {
        // Override this method
    }

    /**
     * Called when the player takes damage
     * @param {Character} player
     * @param {Damage} damage
     */
    onTakeDamage(player, damage) {
        // Override this method
    }

    /** 
     * Called when just before the player takes damage
     * @param {Character} player
     * @param {Damage} damage
     */
    onTakeDamageBefore(player, damage) {
        // Override this method
    }

    /** Called when the player deals damage
     * @param {Character} player
     * @param {Damage} damage
     */
    onDealDamage(player, damage) {
        // Override this method
    }

    /**
     * Called when just before the player deals damage
     * @param {Character} player
     * @param {Damage} damage
     */
    onDealDamageBefore(player, damage) {
        // Override this method
    }
}