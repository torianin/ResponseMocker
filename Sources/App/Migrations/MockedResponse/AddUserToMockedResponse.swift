import Fluent

struct AddUserToMockedResponse: Migration {

    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("responses")
            .field("user_id", .uuid, .references("users", "id"))
            .update()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("responses")
            .deleteField("user_id")
            .update()
    }
}
