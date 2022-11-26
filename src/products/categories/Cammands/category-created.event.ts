import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

export class CategoryCreatedEvent {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly icon: string,
        readonly color: string) { }
}

@EventsHandler(CategoryCreatedEvent)
export class CategoryCreatedEventHandler implements IEventHandler<CategoryCreatedEvent> {
    constructor() { }
// the command creates a recored in the event store, 
// the handle creates the real object
// Object that is optimized for reading
    handle(event: CategoryCreatedEvent) {
        console.log(`Hey, Category ${event.name} has just been created`);
        //Stream to UI
    }
}