import Fluent

struct CreateCollection: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("collection")
            .id()
            .field("name", .string)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("collection").delete()
    }

}
