import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CategoriesService } from "../categories.service";
import { Category } from "../Category";
import { CategoryCreatedEvent } from "./category-created.event";

export class CreateCategoryCommand {
    constructor(
        readonly name: string,
        readonly icon: string,
        readonly color: string) { }
}


@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(
        private readonly repo: CategoriesService,
        private readonly publisher: EventBus,
    ) { }

    async execute(command: CreateCategoryCommand) {
        const item = { ...command } as Category;
        var created = await this.repo.Create(item);
        const event = new CategoryCreatedEvent(
            created.id,
            created.name,
            created.icon,
            created.color);
            console.log("finished command, sending event");
        this.publisher.publish(event);
    }
}
