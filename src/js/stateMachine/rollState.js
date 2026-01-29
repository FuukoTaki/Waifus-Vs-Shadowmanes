export class RollState {
    enter(entity) {
        entity.switchAnimation("ROLL");
        entity.getDirection();
    }

    update(entity) {

        entity.roll();

        if (entity.isRollFinished()) {
            entity.fsm.set("IDLE");
        }
    }
}