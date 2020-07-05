import Fluent

struct AddDescriptionToMockedResponse: Migration {

    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("responses")
            .field("description", .string)
            .update()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("responses")
            .deleteField("description")
            .update()
    }
}
