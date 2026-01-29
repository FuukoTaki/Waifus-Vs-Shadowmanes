export class IdleState {
    enter(entity) {
        entity.switchAnimation("IDLE");
    }

    update(entity) {

        if (entity.tryRolling()) {
            entity.fsm.set("ROLL");
            return;
        }

        if (entity.tryMoving()) {
            entity.fsm.set("WALK");
            return;
        }
    }
}
