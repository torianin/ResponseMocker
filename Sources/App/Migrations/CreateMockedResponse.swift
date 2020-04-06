import Fluent

struct CreateMockedResponse: Migration {

    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("responses")
            .id()
            .field("path", .string, .required)
            .field("content", .string, .required)
            .field("created_at", .datetime)
            .field("updated_at", .datetime)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("responses").delete()
    }
}
