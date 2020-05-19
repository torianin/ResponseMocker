import Fluent

struct CreateMockedResponseCollection: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("response_collection")
            .id()
            .field("mocked_response_id", .uuid, .required, .references("responses", "id"))
            .field("collection_id", .uuid, .required, .references("collection", "id"))
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("response_collection").delete()
    }
}
