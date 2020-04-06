import Fluent
import Vapor

final class MockedResponse: Model, Content {
    static let schema = "responses"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "path")
    var path: String

    @Field(key: "content")
    var content: String

    @Timestamp(key: "created_at", on: .create)
    var createdAt: Date?

    @Timestamp(key: "updated_at", on: .update)
    var updatedAt: Date?

    init() { }

    init(id: UUID? = nil, path: String, content: String) {
        self.id = id
        self.path = path
        self.content = content
    }
}
