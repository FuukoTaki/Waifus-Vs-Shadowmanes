export class WalkState {
    enter(entity) {
        entity.switchAnimation("WALK");
    }

    update(entity) {

        if (entity.tryRolling()) {
            entity.fsm.set("ROLL");
            return;
        }

        if (!entity.tryMoving()) {
            entity.fsm.set("IDLE");
            return;
        }

        entity.move();
    }
}